//Arquivo responsavel por intermediar a lógica entre as telas de encomenda e a API

import { deleteEncomendaAPI, getEncomendasAPI, insertEncomendaAPI, updateEncomendaAPI, withdrawEncomendaAPI } from "../api/EncomendaApi"
import { desembrulharItem, desembrulharLista } from "./utils"

//Função que recupera todas as encomendas cadastradas
export async function obtendoEncomendas() {

    //Tentando executar a requisição
    try {

        let response = await getEncomendasAPI()

        let json = await response.json()

        const { message, status, data } = json

        if (!response.ok || status !== 200) {

            throw (message || ("Erro na requisição " + status))
        }

        //Normaliza a lista (a API pode devolver um array "duplo")
        return desembrulharLista(data)
    }
    catch (erro) {

        console.error("Erro ao buscar encomendas:", erro)

        //Devolve uma lista vazia para a tela não quebrar
        return []
    }
}

//Função que cadastra uma nova encomenda
export async function criandoEncomenda({ nome, descricao }) {

    //Tentando executar a requisição
    try {

        let response = await insertEncomendaAPI(nome, descricao)

        let json = await response.json()

        const { message, status, errors } = json

        if (!response.ok || (status !== 200 && status !== 201)) {

            const mensagemErro = extrairMensagemDeErro(errors) || message || ("Erro na requisição " + status)

            throw (mensagemErro)
        }

        return { sucesso: true, mensagem: message }
    }
    catch (erro) {

        console.error("Erro ao cadastrar encomenda:", erro)

        return { sucesso: false, mensagem: typeof erro === "string" ? erro : "Não foi possível cadastrar a encomenda." }
    }
}

//Função que atualiza uma encomenda existente
export async function atualizaEncomenda(id, { nome, descricao }) {

    //Tentando executar a requisição
    try {

        let response = await updateEncomendaAPI(id, nome, descricao)

        let json = await response.json()

        const { message, status, data, errors } = json

        if (!response.ok || status !== 200) {

            const mensagemErro = extrairMensagemDeErro(errors) || message || ("Erro na requisição " + status)

            throw (mensagemErro)
        }

        return { sucesso: true, mensagem: message, encomenda: desembrulharItem(data) }
    }
    catch (erro) {

        console.error("Erro ao atualizar encomenda:", erro)

        return { sucesso: false, mensagem: typeof erro === "string" ? erro : "Não foi possível atualizar a encomenda." }
    }
}

//Função que registra a retirada de uma encomenda
export async function retirarEncomenda(id) {

    //Tentando executar a requisição
    try {

        let response = await withdrawEncomendaAPI(id)

        let json = await response.json()

        const { message, status, data } = json

        if (!response.ok || status !== 200) {

            throw (message || ("Erro na requisição " + status))
        }

        return { sucesso: true, mensagem: message, encomenda: desembrulharItem(data) }
    }
    catch (erro) {

        console.error("Erro ao registrar retirada da encomenda:", erro)

        return { sucesso: false, mensagem: typeof erro === "string" ? erro : "Não foi possível registrar a retirada da encomenda." }
    }
}

//Função que apaga uma encomenda
export async function deletaEncomenda(id) {

    //Tentando executar a requisição
    try {

        let response = await deleteEncomendaAPI(id)

        let json = await response.json()

        const { message, status } = json

        if (!response.ok || status !== 200) {

            throw (message || ("Erro na requisição " + status))
        }

        return { sucesso: true, mensagem: message }
    }
    catch (erro) {

        console.error("Erro ao deletar encomenda:", erro)

        return { sucesso: false, mensagem: "Não foi possível deletar a encomenda." }
    }
}

//Função auxiliar que tenta transformar o objeto de erros de validação do Laravel em uma frase legível
function extrairMensagemDeErro(errors) {

    if (!errors || errors.length === 0) return null

    const bagDeErros = errors[0]

    if (!bagDeErros || typeof bagDeErros !== "object") return null

    const todasAsMensagens = Object.values(bagDeErros).flat()

    return todasAsMensagens.length > 0 ? todasAsMensagens.join(" ") : null
}
