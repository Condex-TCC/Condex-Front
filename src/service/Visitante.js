//Arquivo responsavel por intermediar a lógica entre as telas de visitante e a API

import { deleteVisitanteAPI, getVisitantesAPI, insertVisitanteAPI, updateVisitanteAPI } from "../api/VisitanteApi"
import { desembrulharItem, desembrulharLista } from "./utils"

//Função que recupera todos os visitantes cadastrados
export async function obtendoVisitantes() {

    //Tentando executar a requisição
    try {

        //Chamando a função que realiza a requisição na API
        let response = await getVisitantesAPI()

        //Convertendo o JSON para objeto no JS
        let json = await response.json()

        //Desestrutura a resposta
        const { message, status, data } = json

        //Verifica se houve algum erro na requisição
        if (!response.ok || status !== 200) {

            //Para a execução do try e lança um erro para o catch
            throw (message || ("Erro na requisição " + status))
        }

        //Normaliza a lista (a API pode devolver um array "duplo")
        return desembrulharLista(data)
    }
    //Caso aconteça algum erro na requisição, cai nesse bloco
    catch (erro) {

        //Mostra o erro real no console (útil para debug técnico)
        console.error("Erro ao buscar visitantes:", erro)

        //Devolve uma lista vazia para a tela não quebrar, quem chama decide como avisar o usuário
        return []
    }
}

//Função que realiza o cadastro de um novo visitante
//Recebe um único objeto (nome, cpf, fkMorador) vindo do formulário
export async function criandoVisitante({ nome, cpf, fkMorador }) {

    //Tentando executar a requisição
    try {

        //Chamando a função que realiza a requisição na API
        let response = await insertVisitanteAPI(nome, cpf, fkMorador)

        //Convertendo o JSON para objeto no JS
        let json = await response.json()

        //Desestrutura a resposta
        const { message, status, errors } = json

        //Verifica se houve algum erro na requisição (validação, duplicidade de CPF, etc.)
        if (!response.ok || (status !== 200 && status !== 201)) {

            //Tenta montar uma mensagem mais clara a partir dos erros de validação, se existirem
            const mensagemErro = extrairMensagemDeErro(errors) || message || ("Erro na requisição " + status)

            //Para a execução do try e lança para o catch a mensagem de erro
            throw (mensagemErro)
        }

        //Retorna sucesso com a mensagem vinda da API
        return { sucesso: true, mensagem: message }
    }
    //Caso aconteça algum erro na requisição, cai nesse bloco
    catch (erro) {

        //Mostra o erro real no console (útil para debug técnico)
        console.error("Erro ao cadastrar visitante:", erro)

        //Retorna falha e a mensagem para ser exibida ao porteiro
        return { sucesso: false, mensagem: typeof erro === "string" ? erro : "Não foi possível cadastrar o visitante." }
    }
}

//Função que atualiza um visitante existente
export async function atualizaVisitante(id, { nome, cpf, fkMorador }) {

    //Tentando executar a requisição
    try {

        //Chamando a função que realiza a requisição na API
        let response = await updateVisitanteAPI(id, nome, cpf, fkMorador)

        //Convertendo o JSON para objeto no JS
        let json = await response.json()

        //Desestrutura a resposta
        const { message, status, data, errors } = json

        //Verifica se houve algum erro na requisição
        if (!response.ok || status !== 200) {

            const mensagemErro = extrairMensagemDeErro(errors) || message || ("Erro na requisição " + status)

            throw (mensagemErro)
        }

        //Retorna sucesso com o visitante atualizado
        return { sucesso: true, mensagem: message, visitante: desembrulharItem(data) }
    }
    //Caso aconteça algum erro na requisição, cai nesse bloco
    catch (erro) {

        console.error("Erro ao atualizar visitante:", erro)

        return { sucesso: false, mensagem: typeof erro === "string" ? erro : "Não foi possível atualizar o visitante." }
    }
}

//Função que apaga um visitante
export async function deletaVisitante(id) {

    //Tentando executar a requisição
    try {

        //Chamando a função que realiza a requisição na API
        let response = await deleteVisitanteAPI(id)

        //Convertendo o JSON para objeto no JS
        let json = await response.json()

        //Desestrutura a resposta
        const { message, status } = json

        //Verifica se houve algum erro na requisição
        if (!response.ok || status !== 200) {

            throw (message || ("Erro na requisição " + status))
        }

        return { sucesso: true, mensagem: message }
    }
    //Caso aconteça algum erro na requisição, cai nesse bloco
    catch (erro) {

        console.error("Erro ao deletar visitante:", erro)

        return { sucesso: false, mensagem: "Não foi possível deletar o visitante." }
    }
}

//Função auxiliar que tenta transformar o objeto de erros de validação do Laravel
//(ex: { nome: ["campo obrigatório"], cpf: ["já está em uso"] }) em uma única frase legível
function extrairMensagemDeErro(errors) {

    //Se não houver nenhum erro estruturado, não há o que extrair
    if (!errors || errors.length === 0) return null

    //O Laravel manda um objeto de validação dentro do primeiro item do array "errors"
    const bagDeErros = errors[0]

    if (!bagDeErros || typeof bagDeErros !== "object") return null

    //Pega todas as mensagens de todos os campos e junta em uma frase só
    const todasAsMensagens = Object.values(bagDeErros).flat()

    return todasAsMensagens.length > 0 ? todasAsMensagens.join(" ") : null
}
