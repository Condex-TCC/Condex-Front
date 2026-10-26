//Arquivo responsavel por solicitar a requisição e trata-la

import { getEncomendasAPI, insertEncomendaAPI, withdrawEncomendaAPI } from "../api/EncomendaApi"
import { lerJson, montarMensagemErro } from "../utils/erroApi"

//Mensagem exibida quando o frontend não consegue falar com o servidor
const MENSAGEM_SEM_CONEXAO = "Não foi possível conectar à API. Verifique se o servidor está no ar."

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
        moradorTelefone: item.moradorTelefone ?? item.morador?.telefone ?? null,
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

        //A API devolve { data: { encomendas: [...] } } (EncomendaController::index)
        const lista = Array.isArray(json.data?.encomendas)
            ? json.data.encomendas
            : (Array.isArray(json.data) ? json.data : [])

        return lista.map(normalizarEncomenda)
    }
    catch (erro) {
        console.error("Erro ao buscar as encomendas na API:", erro)
        return null
    }
}

//Função que cadastra uma nova encomenda
//Recebe o nome da encomenda (ex.: Pacote do Mercado Livre), a descrição e o id do
//morador destinatário, que a API exige em "id_morador". Os dados do morador são
//devolvidos pela própria API na relação morador. O parâmetro detalhes só é usado pelo mock
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
