//Arquivo responsavel por buscar e atualizar o perfil do usuário logado

import { EditarPerilAPI, getUserAPI } from "../api/LoginApi"
import { primeiroAcessoAPI } from "../api/PrimeiroAcessoApi"
import { lerJson, montarMensagemErro } from "../utils/erroApi"

//Mensagem exibida quando o frontend não consegue falar com o servidor
const MENSAGEM_SEM_CONEXAO = "Não foi possível conectar à API. Verifique se o servidor está no ar."

//Função que busca os dados do usuário logado
//Devolve { sucesso, usuario } quando funciona e { sucesso: false, mensagem } quando falha,
//para a tela diferenciar o carregamento com erro de um perfil vazio
export async function buscarPerfil(tipoUsuario) {

    try{

        const response = await getUserAPI(tipoUsuario)
        const json = await lerJson(response)

        if(!response.ok){

            return {
                sucesso: false,
                mensagem: montarMensagemErro(json, response.status, "Não foi possível carregar os dados do perfil.")
            }
        }

        //A API devolve o usuário em data.usuario
        const usuario = json.data?.usuario

        if(!usuario){

            return { sucesso: false, mensagem: "Não foi possível carregar os dados do perfil." }
        }

        return { sucesso: true, usuario: usuario }
    }
    catch(erro){

        console.error("Erro ao buscar o perfil na API:", erro)

        return { sucesso: false, mensagem: MENSAGEM_SEM_CONEXAO }
    }
}

//Função que atualiza os dados do usuário logado
//Devolve { sucesso, mensagem } para a tela saber se pode navegar ou se
//precisa mostrar o erro devolvido pela API
export async function atualizarPerfil(tipoUsuario, nome, email, telefone, cpf) {

    try{

        const response = await EditarPerilAPI(tipoUsuario, nome, email, telefone, cpf)
        const json = await lerJson(response)

        if(!response.ok){

            return {
                sucesso: false,
                mensagem: montarMensagemErro(json, response.status, "Não foi possível atualizar o perfil.")
            }
        }

        return { sucesso: true, mensagem: json.message }
    }
    catch(erro){

        console.error("Erro ao atualizar o perfil na API:", erro)

        return { sucesso: false, mensagem: MENSAGEM_SEM_CONEXAO }
    }
}

//Função que conclui o primeiro acesso do usuário logado (dados completos + nova senha)
//Devolve { sucesso, mensagem } para a tela saber se pode navegar ou se
//precisa mostrar o erro devolvido pela API
export async function concluirPrimeiroAcesso(tipoUsuario, nome, email, telefone, cpf, password) {

    try{

        const response = await primeiroAcessoAPI(tipoUsuario, nome, email, telefone, cpf, password)
        const json = await lerJson(response)

        if(!response.ok){

            return {
                sucesso: false,
                mensagem: montarMensagemErro(json, response.status, "Não foi possível concluir o primeiro acesso.")
            }
        }

        return { sucesso: true, mensagem: json.message }
    }
    catch(erro){

        console.error("Erro ao concluir o primeiro acesso na API:", erro)

        return { sucesso: false, mensagem: MENSAGEM_SEM_CONEXAO }
    }
}
