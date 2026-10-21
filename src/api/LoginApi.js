//Arquivo responsavel por fazer a requisição para a API

import { GetCookie } from "../service/cookie"

//Função que interaje com o login
export function LoginApi(email, password){

    //Endpoint
    let endPoint = "http://127.0.0.1:8000/api/login"

    //Objeto com os elementos
    let credenciais = {
	    email: email,
	    password: password
    }

    //Criando a requisição
    const requisicao = fetch(
        endPoint, //Passando o endPoint para a requisição
        {
            method: "POST", //Passando qual é o metodo HTTP

            //Passando os headers
            headers: {
                'Content-Type': 'application/json', //Tipo de formatação
            },

            //Passando o corpo da requisição
            body: JSON.stringify(credenciais) //Convertendo o objeto em Json
        }
    )

    //Retornado uma promise com os dados da API
    return requisicao
}

//Função que edita os dados do usuário
export async function EditarPerilAPI(usuario, nome, email, telefone, cpf){

    //Receperando o token de outorização
    let cookie = await GetCookie()
    let token = cookie.token

    //Endpoint
    let endPoint = "http://127.0.0.1:8000/api/perfil/updade"

    //Objeto com os elementos
    let novosDados = {
        usuario: usuario,
        "dados": {
            nome: nome,
            email: email,
            telefone: telefone,
            cpf: cpf,
        }
    }

    //Criando a requisição
    const requisicao = fetch(
        endPoint, //Passando o endPoint para a requisição
        {
            method: "POST", //Passando qual é o metodo HTTP

            //Passando os headers
            headers: {
                'Content-Type': 'application/json', //Tipo de formatação
                'Accept': 'application/json', // Obriga o Laravel a retornar JSON mesmo em erros
                "Authorization": `Bearer ${token}` //Eniva o token de autorização
            },

            //Passando o corpo da requisição
            body: JSON.stringify(novosDados) //Convertendo o objeto em Json
        }
    )

    //Retornado uma promise com os dados da API
    return requisicao
}


//Função que recupera os dados do usuários
export async function getUserAPI(usuario){

    //Receperando o token de outorização
    let cookie = await GetCookie()
    let token = cookie.token

    //Endpoint
    let endPoint = "http://127.0.0.1:8000/api/perfil/show/" + usuario

    //Criando a requisição
    const requisicao = fetch(
        endPoint, //Passando o endPoint para a requisição
        {
            method: "GET", //Passando qual é o metodo HTTP

            //Passando os headers
            headers: {
                'Content-Type': 'application/json', //Tipo de formatação
                'Accept': 'application/json', // Obriga o Laravel a retornar JSON mesmo em erros
                "Authorization": `Bearer ${token}` //Eniva o token de autorização
            },
        }
    )

    //Retornado uma promise com os dados da API
    return requisicao
}