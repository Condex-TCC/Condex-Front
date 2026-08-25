//Arquivo responsável por fazer a requisição para a API das regras

import { GetCookie } from "../service/cookie"

//Função que recupera todos os laudos do banco de dados
export async function getLaudosAPI(){

    //Receperando o token de outorização
    let cookie = await GetCookie()
    let token = cookie.token

    //Endpoint
    let endPoint = "http://127.0.0.1:8000/api/sindico/laudos/get"

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

//Função que deleta o Laudo
export async function deleteLaudoAPI(id){

    //Receperando o token de outorização
    let cookie = await GetCookie()
    let token = cookie.token

    //Endpoint
    let endPoint = "http://127.0.0.1:8000/api/sindico/laudos/delete/" + id

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

// //Função que que salva no banco de dados a nova regra
// export async function insertRegraAPI(nome, descricao){

//     //Receperando o token de outorização
//     let cookie = await GetCookie()
//     let token = cookie.token

//     //Endpoint
//     let endPoint = "http://127.0.0.1:8000/api/sindico/regras/create"

//     //Objeto com os elementos
//     let novaRegra = {
//         nome: nome,
// 	    descricao: descricao
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
//             body: JSON.stringify(novaRegra) //Convertendo o objeto em Json
//         }
//     )

//     //Retornado uma promise com os dados da API
//     return requisicao
// }

// //Função que recupera apenas uma regra
// export async function showRegraAPI(id){

//     //Receperando o token de outorização
//     let cookie = await GetCookie()
//     let token = cookie.token

//     //Endpoint
//     let endPoint = "http://127.0.0.1:8000/api/sindico/regras/show/" + id

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
// export async function updateRegraAPI(nome, descricao, id){

//     //Receperando o token de outorização
//     let cookie = await GetCookie()
//     let token = cookie.token

//     //Endpoint
//     let endPoint = "http://127.0.0.1:8000/api/sindico/regras/update/" + id

//     //Objeto com os valores que vão ser atualizados
//     let porteiroAtualizado = {
//         nome: nome,
// 	    descricao: descricao
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