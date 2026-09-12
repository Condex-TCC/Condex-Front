//Arquivo responsável por fazer a requisição para a API das áreas comuns[cite: 1]

import { GetCookie } from "../service/cookie"

//Função que recupera todas as áreas comuns do banco de dados[cite: 1]
export async function getAreasComunsAPI(){

    //Receperando o token de outorização[cite: 1]
    let cookie = await GetCookie()
    let token = cookie.token

    //Endpoint
    let endPoint = "http://127.0.0.1:8000/api/sindico/espaco/get"

    //Criando a requisição[cite: 1]
    const requisicao = fetch(
        endPoint, //Passando o endPoint para a requisição[cite: 1]
        {
            method: "GET", //Passando qual é o metodo HTTP[cite: 1]

            //Passando os headers[cite: 1]
            headers: {
                'Content-Type': 'application/json', //Tipo de formatação[cite: 1]
                'Accept': 'application/json', // Obriga o Laravel a retornar JSON mesmo em erros[cite: 1]
                "Authorization": `Bearer ${token}` //Eniva o token de autorização[cite: 1]
            },
        }
    )

    //Retornado uma promise com os dados da API[cite: 1]
    return requisicao
}

//Função que deleta a área comum[cite: 1]
export async function deleteAreaComunAPI(id){

    //Receperando o token de outorização[cite: 1]
    let cookie = await GetCookie()
    let token = cookie.token

    //Endpoint
    let endPoint = "http://127.0.0.1:8000/api/sindico/espaco/delete/" + id

    //Criando a requisição[cite: 1]
    const requisicao = fetch(
        endPoint, 
        {
            method: "DELETE", 

            //Passando os headers[cite: 1]
            headers: {
                'Accept': 'application/json', 
                "Authorization": `Bearer ${token}` 
            },
        }
    )

    //Retornado uma promise com os dados da API[cite: 1]
    return requisicao
}

//Função que salva no banco de dados a nova área comum[cite: 1]
export async function insertAreaComunAPI(nome, descricao, autorizacao){

    //Receperando o token de outorização[cite: 1]
    let cookie = await GetCookie()
    let token = cookie.token

    //Endpoint
    let endPoint = "http://127.0.0.1:8000/api/sindico/espaco/create"

    //Objeto com os elementos[cite: 1]
    let novaArea = {
        nome: nome,
        descricao: descricao,
        autorizacao: autorizacao
    }

    //Criando a requisição[cite: 1]
    const requisicao = fetch(
        endPoint, 
        {
            method: "POST", 

            //Passando os headers[cite: 1]
            headers: {
                'Content-Type': 'application/json', 
                'Accept': 'application/json', 
                "Authorization": `Bearer ${token}` 
            },

            //Passando o corpo da requisição[cite: 1]
            body: JSON.stringify(novaArea) 
        }
    )

    //Retornado uma promise com os dados da API[cite: 1]
    return requisicao
}

//Função que recupera apenas uma área comum[cite: 1]
export async function showAreaComunAPI(id){

    //Receperando o token de outorização[cite: 1]
    let cookie = await GetCookie()
    let token = cookie.token

    //Endpoint
    let endPoint = "http://127.0.0.1:8000/api/sindico/espaco/show/" + id

    //Criando a requisição[cite: 1]
    const requisicao = fetch(
        endPoint, 
        {
            method: "GET", 

            //Passando os headers[cite: 1]
            headers: {
                'Accept': 'application/json', 
                "Authorization": `Bearer ${token}` 
            },
        }
    )

    //Retornado uma promise com os dados da API[cite: 1]
    return requisicao
}

//Função que atualiza a área comum[cite: 1]
export async function updateAreaComunAPI(nome, descricao, autorizacao, id){

    //Receperando o token de outorização[cite: 1]
    let cookie = await GetCookie()
    let token = cookie.token

    //Endpoint
    let endPoint = "http://127.0.0.1:8000/api/sindico/espaco/update/" + id

    //Objeto com os valores que vão ser atualizados[cite: 1]
    let areaAtualizada = {
        nome: nome,
        descricao: descricao,
        autorizacao: autorizacao
    }

    //Criando a requisição[cite: 1]
    const requisicao = fetch(
        endPoint, 
        {
            method: "PUT", 

            //Passando os headers[cite: 1]
            headers: {
                'Content-Type': 'application/json', 
                'Accept': 'application/json', 
                "Authorization": `Bearer ${token}` 
            },

            //Passando o corpo da requisição[cite: 1]
            body: JSON.stringify(areaAtualizada) 
        }
    )

    //Retornado uma promise com os dados da API[cite: 1]
    return requisicao
}