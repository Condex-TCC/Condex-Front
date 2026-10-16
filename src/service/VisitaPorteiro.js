//Arquivo responsável por tratar as requisições de visitas (porteiro)

import { getVisitasAPI, allowEntryAPI, registerExitAPI } from "../api/VisitaPorteiroApi"

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

    //Erro interno do servidor | O texto do Laravel é técnico e não é exibido
    if (statusHttp >= 500) {
        return mensagemServidor || `${mensagemPadrao} O servidor recusou os dados enviados.`
    }

    //Demais casos, usa a mensagem da API e os detalhes dos campos
    return `${json?.message || mensagemPadrao} ${detalhes}`.trim()
}

//Função que normaliza um registro de visita vindo da API
//A API devolve o registro da visita com o visitante embutido em "visitante"
function normalizarVisita(item) {

    if (!item) return item

    return {
        ...item,
        visitanteId: item.visitanteId ?? item.fk_visitante ?? item.visitante?.id ?? null,
        nomeVisitante: item.nomeVisitante ?? item.visitante?.nome_visitante ?? item.visitante?.nome ?? null,
        cpfVisitante: item.cpfVisitante ?? item.visitante?.cpf_visitante ?? item.visitante?.cpf ?? null,
        moradorId: item.moradorId ?? item.visitante?.resident_id ?? null,
        entrada: item.entrada ?? null,
        saida: item.saida ?? null,
    }
}

//Função que busca o histórico de visitas
//Devolve a lista quando a API responde com sucesso e null quando falha
export async function getVisitas() {

    try {
        let response = await getVisitasAPI()
        let json = await lerJson(response)

        if (!response.ok) {
            throw (montarMensagemErro(json, response.status, "Não foi possível buscar as visitas."))
        }

        //A VisitaController::index devolve a lista direto em "data"
        const lista = Array.isArray(json.data) ? json.data : (Array.isArray(json) ? json : [])
        return lista.map(normalizarVisita)
    }
    catch (erro) {
        console.error("Erro ao buscar as visitas na API:", erro)
        return null
    }
}

//Função que devolve somente os visitantes que estão dentro do condomínio
//Uma visita está ativa enquanto não tem saída registrada
export async function getVisitasAtivas() {

    const visitas = await getVisitas()

    if (visitas === null) {
        return null
    }

    return visitas.filter((visita) => visita.saida == null)
}

//Função que registra a entrada de um visitante (requer o id do visitante)
//Devolve { sucesso, mensagem } para a tela exibir a resposta real da API
export async function registrarEntradaVisita(idVisitante) {

    try {
        let response = await allowEntryAPI(idVisitante)
        let json = await lerJson(response)

        if (!response.ok) {
            return {
                sucesso: false,
                mensagem: montarMensagemErro(json, response.status, "Não foi possível registrar a entrada do visitante.")
            }
        }

        return { sucesso: true, mensagem: json.message }
    }
    catch (erro) {
        console.error("Erro ao registrar a entrada do visitante na API:", erro)
        return { sucesso: false, mensagem: MENSAGEM_SEM_CONEXAO }
    }
}

//Função que registra a saída de um visitante (requer o id do visitante)
//Devolve { sucesso, mensagem } para a tela exibir a resposta real da API
export async function registrarSaidaVisita(idVisitante) {

    try {
        let response = await registerExitAPI(idVisitante)
        let json = await lerJson(response)

        if (!response.ok) {
            return {
                sucesso: false,
                mensagem: montarMensagemErro(json, response.status, "Não foi possível registrar a saída do visitante.")
            }
        }

        return { sucesso: true, mensagem: json.message }
    }
    catch (erro) {
        console.error("Erro ao registrar a saída do visitante na API:", erro)
        return { sucesso: false, mensagem: MENSAGEM_SEM_CONEXAO }
    }
}
