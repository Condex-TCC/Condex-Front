//Arquivo responsável por fazer a requisição para a API das regras

import { GetCookie } from "../service/cookie"

//Função que recupera todos os porteiros do banco de dados
export async function getRegras(){

    //Receperando o token de outorização
    let cookie = await GetCookie()
    let token = cookie.token

    //Endpoint
    let endPoint = "http://127.0.0.1:8000/api/sindico/regras/get"

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

//Função que deleta a regra
export async function deleteRegraAPI(id){

    //Receperando o token de outorização
    let cookie = await GetCookie()
    let token = cookie.token

    //Endpoint
    let endPoint = "http://127.0.0.1:8000/api/sindico/regras/delete/" + id

    //Criando a requisição
    const requisicao = fetch(
        endPoint, //Passando o endPoint para a requisição
        {
            method: "DELETE", //Passando qual é o metodo HTTP

            //Passando os headers
            headers: {
                'Accept': 'application/json', // Obriga o Laravel a retornar JSON mesmo em erros
                "Authorization": `Bearer ${token}` //Eniva o token de autorização
            },
        }
    )

    //Retornado uma promise com os dados da API
    return requisicao
}

// //Função que interaje com o login
// export async function insertPorteiroAPI(nome, email, password){

//     //Receperando o token de outorização
//     let cookie = await GetCookie()
//     let token = cookie.token

//     //Endpoint
//     let endPoint = "http://127.0.0.1:8000/api/sindico/porteiro/create"

//     //Objeto com os elementos
//     let novoPorteiro = {
//         nome: nome,
// 	    email: email,
// 	    password: password
//     }

//     //Criando a requisição
//     const requisicao = fetch(
//         endPoint, //Passando o endPoint para a requisição
//         {
//             method: "POST", //Passando qual é o metodo HTTP

//             //Passando os headers
//             headers: {
//                 'Content-Type': 'application/json', //Tipo de formatação
//                 'Accept': 'application/json', // Obriga o Laravel a retornar JSON mesmo em erros
//                 "Authorization": `Bearer ${token}` //Eniva o token de autorização
//             },

//             //Passando o corpo da requisição
//             body: JSON.stringify(novoPorteiro) //Convertendo o objeto em Json
//         }
//     )

//     //Retornado uma promise com os dados da API
//     return requisicao
// }

// //Função que recupera o usuário
// export async function showPorteiroAPI(id){

//     //Receperando o token de outorização
//     let cookie = await GetCookie()
//     let token = cookie.token

//     //Endpoint
//     let endPoint = "http://127.0.0.1:8000/api/sindico/porteiro/show/" + id

//     //Criando a requisição
//     const requisicao = fetch(
//         endPoint, //Passando o endPoint para a requisição
//         {
//             method: "GET", //Passando qual é o metodo HTTP

//             //Passando os headers
//             headers: {
//                 'Accept': 'application/json', // Obriga o Laravel a retornar JSON mesmo em erros
//                 "Authorization": `Bearer ${token}` //Eniva o token de autorização
//             },
//         }
//     )

//     //Retornado uma promise com os dados da API
//     return requisicao
// }

// //Função que atualiza o porteiro
// export async function updatePorteiroAPI(nome, email, password, id){

//     //Receperando o token de outorização
//     let cookie = await GetCookie()
//     let token = cookie.token

//     //Endpoint
//     let endPoint = "http://127.0.0.1:8000/api/sindico/porteiro/update/" + id

//     //Objeto com os valores que vão ser atualizados
//     let porteiroAtualizado = {
//         nome: nome,
// 	    email: email,
// 	    password: password
//     }

//     //Criando a requisição
//     const requisicao = fetch(
//         endPoint, //Passando o endPoint para a requisição
//         {
//             method: "PUT", //Passando qual é o metodo HTTP

//             //Passando os headers
//             headers: {
//                 'Content-Type': 'application/json', //Tipo de formatação
//                 'Accept': 'application/json', // Obriga o Laravel a retornar JSON mesmo em erros
//                 "Authorization": `Bearer ${token}` //Eniva o token de autorização
//             },

//             //Passando o corpo da requisição
//             body: JSON.stringify(porteiroAtualizado) //Convertendo o objeto em Json
//         }
//     )

//     //Retornado uma promise com os dados da API
//     return requisicao
// }