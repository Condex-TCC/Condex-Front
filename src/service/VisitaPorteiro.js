//Arquivo responsável por tratar as requisições de visitas (porteiro)

import { getVisitasAPI, allowEntryAPI, registerExitAPI } from "../api/VisitaPorteiroApi"
import { lerJson, montarMensagemErro } from "../utils/erroApi"

//Mensagem exibida quando o frontend não consegue falar com o servidor
const MENSAGEM_SEM_CONEXAO = "Não foi possível conectar à API. Verifique se o servidor está no ar."

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
