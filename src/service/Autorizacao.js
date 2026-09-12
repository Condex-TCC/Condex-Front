//Arquivo responsavel por intermediar a lógica entre a tela do porteiro e a API de Autorização

import { allowEntryAPI, getAutorizadosAPI, registerExitAPI } from "../api/AutorizacaoApi"
import { desembrulharItem, desembrulharLista } from "./utils"

//Função que recupera os visitantes com autorização válida (status "autorizado")
//São eles que aparecem na lista "Pré-cadastrados" da tela inicial do porteiro
export async function obtendoAutorizados() {

    //Tentando executar a requisição
    try {

        let response = await getAutorizadosAPI()

        let json = await response.json()

        const { message, status, data } = json

        if (!response.ok || status !== 200) {

            throw (message || ("Erro na requisição " + status))
        }

        //Normaliza a lista (a API pode devolver um array "duplo")
        return desembrulharLista(data)
    }
    catch (erro) {

        console.error("Erro ao buscar visitantes autorizados:", erro)

        //Devolve uma lista vazia para a tela não quebrar
        return []
    }
}

//Função que libera a entrada de um visitante autorizado
export async function liberarEntrada(idAutorizacao) {

    //Tentando executar a requisição
    try {

        let response = await allowEntryAPI(idAutorizacao)

        let json = await response.json()

        const { message, status, data } = json

        if (!response.ok || status !== 200) {

            throw (message || ("Erro na requisição " + status))
        }

        return { sucesso: true, mensagem: message, autorizacao: desembrulharItem(data) }
    }
    catch (erro) {

        console.error("Erro ao liberar entrada do visitante:", erro)

        return { sucesso: false, mensagem: typeof erro === "string" ? erro : "Não foi possível liberar a entrada do visitante." }
    }
}

//Função que registra a saída de um visitante que já teve a entrada liberada
export async function registrarSaida(idAutorizacao) {

    //Tentando executar a requisição
    try {

        let response = await registerExitAPI(idAutorizacao)

        let json = await response.json()

        const { message, status, data } = json

        if (!response.ok || status !== 200) {

            throw (message || ("Erro na requisição " + status))
        }

        return { sucesso: true, mensagem: message, autorizacao: desembrulharItem(data) }
    }
    catch (erro) {

        console.error("Erro ao registrar a saída do visitante:", erro)

        return { sucesso: false, mensagem: typeof erro === "string" ? erro : "Não foi possível registrar a saída do visitante." }
    }
}
