//Arquivo responsavel por solicitar a requisição e trata-la

import { getEncomendasAPI, insertEncomendaAPI, withdrawEncomendaAPI } from "../api/EncomendaApi"

//Mensagem exibida quando o frontend não consegue falar com o servidor
const MENSAGEM_SEM_CONEXAO = "Não foi possível conectar à API. Verifique se o servidor está no ar."

//Lê o corpo da resposta como JSON sem estourar quando o corpo não é JSON
//Isso acontece quando o servidor está fora do ar ou devolve uma página de erro
async function lerJson(response) {

    try {
        return await response.json()
    }
    catch {
        return {}
    }
}

//Monta a mensagem de erro a partir da resposta da API
//Os erros de validação vêm em { message, errors: [ { campo: [mensagens] } ] }
//e os erros do próprio Laravel (401, 403, 404, 500) vêm apenas com { message }
function montarMensagemErro(json, statusHttp, mensagemPadrao, mensagemServidor) {

    //Guarda as mensagens de cada campo que não passou na validação
    let detalhes = ""

    if (Array.isArray(json?.errors)) {

        detalhes = json.errors

            .map((erro) => typeof erro === "object" && erro !== null
                ? Object.values(erro).flat().join(" ")
                : String(erro))

            .join(" ")
    }

    //Sessão expirada ou token inválido
    if (statusHttp === 401) {
        return "Sua sessão expirou. Faça login novamente."
    }

    //Usuário logado sem permissão para essa ação
    if (statusHttp === 403) {
        return "Você não tem permissão para realizar essa ação."
    }

    //Registro que não existe mais na API
    if (statusHttp === 404) {
        return `${mensagemPadrao} Registro não encontrado.`
    }

    //Erro interno do servidor, como a violação de uma chave estrangeira no banco
    //O texto do Laravel é técnico e pode expor o SQL, então nunca é exibido na tela
    if (statusHttp >= 500) {
        return mensagemServidor || `${mensagemPadrao} O servidor recusou os dados enviados.`
    }

    //Demais casos, usa a mensagem da API e os detalhes dos campos
    return `${json?.message || mensagemPadrao} ${detalhes}`.trim()
}

//Função que normaliza um item de encomenda vindo da API (EncomendaResources)
function normalizarEncomenda(item) {

    if (!item) return item

    return {
        ...item,
        data: item.data ?? item.data_retirada ?? item.retirada_em ?? null,
        data_retirada: item.data_retirada ?? item.data ?? null,
        recebida: item.recebida ?? item.data_recebimento ?? null,
        nome: item.nome ?? item.nome_encomenda ?? null,
        descricao: item.descricao ?? item.descricao_encomenda ?? null,
        moradorId: item.moradorId ?? item.morador?.id ?? item.fk_id_morador_encomenda ?? null,
        moradorNome: item.moradorNome ?? item.morador?.nome ?? null,
    }
}

//Função que obtem todas as encomendas
//Devolve a lista quando a API responde com sucesso e null quando a requisição
//falha, para a tela conseguir diferenciar "sem encomendas" de "erro ao buscar"
export async function getEncomendas() {

    try {
        let response = await getEncomendasAPI()
        let json = await lerJson(response)

        if (!response.ok) {
            throw (montarMensagemErro(json, response.status, "Não foi possível buscar as encomendas."))
        }

        const lista = Array.isArray(json.data) ? json.data : []
        return lista.map(normalizarEncomenda)
    }
    catch (erro) {
        console.error("Erro ao buscar as encomendas na API:", erro)
        return null
    }
}

//Função que cadastra uma nova encomenda
//Recebe o nome do destinatário, a descrição e o id do morador destinatário, que a
//API exige em "id_morador". O parâmetro detalhes leva bloco, apartamento e data do
//formulário. A API real ainda não tem colunas para esses dados, então são ignorados
//na requisição e só aproveitados pelo mock
//Devolve { sucesso, mensagem } para a tela saber se pode navegar ou se precisa
//mostrar o erro devolvido pela API
export async function cadastrarEncomenda(nome, descricao, idMorador, detalhes = {}) {

    try {
        let response = await insertEncomendaAPI(nome, descricao, idMorador, detalhes)
        let json = await lerJson(response)

        if (!response.ok) {
            return {
                sucesso: false,
                mensagem: montarMensagemErro(
                    json,
                    response.status,
                    "Não foi possível cadastrar a encomenda.",
                    //Erro 500 aqui costuma ser o banco recusando um id_morador que não existe
                    "Não foi possível cadastrar a encomenda. Verifique se o ID do morador existe."
                )
            }
        }

        return { sucesso: true, mensagem: json.message }
    }
    catch (erro) {
        console.error("Erro ao cadastrar a encomenda na API:", erro)
        return { sucesso: false, mensagem: MENSAGEM_SEM_CONEXAO }
    }
}

//Função que registra a retirada de uma encomenda
//Devolve { sucesso, mensagem } para a tela exibir a mensagem real da API,
//como "Esta encomenda já foi retirada!"
export async function registrarRetiradaEncomenda(id) {

    try {
        let response = await withdrawEncomendaAPI(id)
        let json = await lerJson(response)

        if (!response.ok) {
            return {
                sucesso: false,
                mensagem: montarMensagemErro(json, response.status, "Não foi possível registrar a retirada da encomenda.")
            }
        }

        return { sucesso: true, mensagem: json.message }
    }
    catch (erro) {
        console.error("Erro ao registrar a retirada da encomenda na API:", erro)
        return { sucesso: false, mensagem: MENSAGEM_SEM_CONEXAO }
    }
}
