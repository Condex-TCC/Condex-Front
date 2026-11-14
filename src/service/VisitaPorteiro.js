//Arquivo responsável por tratar as requisições de visitas (porteiro)

import { getVisitasAPI, allowEntryAPI, registerExitAPI } from "../api/VisitaPorteiroApi"
import { lerJson, montarMensagemErro } from "../utils/erroApi"
import { GetCookie } from "./cookie"
import { buscarPerfil } from "./Perfil"

//Mensagem exibida quando o frontend não consegue falar com o servidor
const MENSAGEM_SEM_CONEXAO = "Não foi possível conectar à API. Verifique se o servidor está no ar."

//Função que normaliza um registro de visita vindo da API
//A API devolve o registro da visita com o visitante, o morador visitado e o porteiro embutidos
//(relações "visitante", "morador" e "porteiro" do model Visita)
function normalizarVisita(item) {

    if (!item) return item

    return {
        ...item,
        visitanteId: item.visitanteId ?? item.fk_visitante ?? item.visitante?.id ?? null,
        nomeVisitante: item.nomeVisitante ?? item.visitante?.nome_visitante ?? item.visitante?.nome ?? null,
        cpfVisitante: item.cpfVisitante ?? item.visitante?.cpf_visitante ?? item.visitante?.cpf ?? null,
        moradorVisitadoId: item.moradorVisitadoId ?? item.fk_morador ?? null,
        moradorVisitadoNome: item.moradorVisitadoNome ?? item.morador?.nome ?? item.morador?.nome_morador ?? null,
        entrada: item.entrada ?? null,
        saida: item.saida ?? null,
    }
}

//Função que busca o histórico de visitas
//Devolve a lista quando a API responde com sucesso e null quando falha
export async function getVisitas(filtros = {}) {

    try {
        let response = await getVisitasAPI(filtros)
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
export async function getVisitasAtivas(filtros = {}) {

    const visitas = await getVisitas(filtros)

    if (visitas === null) {
        return null
    }

    return visitas.filter((visita) => visita.saida == null)
}

//Guarda o id do porteiro logado para não buscar o perfil a cada entrada registrada
let idPorteiroEmCache = null
let tokenDoCache = null

//Função que descobre o id do porteiro logado pelo perfil (GET /perfil)
async function obterIdPorteiroLogado() {

    const { token, tipo } = GetCookie()

    //Se o token mudou, outro usuário entrou no sistema e o cache deixa de valer
    if(idPorteiroEmCache && tokenDoCache === token){

        return idPorteiroEmCache
    }

    const resultado = await buscarPerfil(tipo)

    if(!resultado.sucesso){

        return null
    }

    idPorteiroEmCache = resultado.usuario.id
    tokenDoCache = token

    return idPorteiroEmCache
}

//Função que registra a entrada de um visitante (requer o visitante e o morador que será visitado)
//Devolve { sucesso, mensagem } para a tela exibir a resposta real da API
export async function registrarEntradaVisita(visitante, idMorador) {

    try {

        //O porteiro escolhe o morador visitado a cada entrada
        if(!idMorador){

            return { sucesso: false, mensagem: "Selecione o morador que será visitado." }
        }

        //A API também exige o id do porteiro logado, que precisa bater com o token
        const idPorteiro = await obterIdPorteiroLogado()

        if(!idPorteiro){

            return { sucesso: false, mensagem: "Não foi possível identificar o porteiro logado. Entre novamente no sistema." }
        }

        let response = await allowEntryAPI(idPorteiro, idMorador, visitante.id)
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

//Função que registra a saída de um visitante (requer o visitante, com o id do morador)
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
