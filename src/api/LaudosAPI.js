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


// Função que envia o novo laudo para a API
export async function insertLaudoAPI(nome, documento) {

    // Recuperando o token de autorização
    let cookie = await GetCookie()
    let token = cookie.token

    // Endpoint baseado no seu print do Insomnia
    let endPoint = "http://127.0.0.1:8000/api/sindico/laudos/create"

    // Criando um FormData para suportar envio de arquivo e texto juntos
    let formData = new FormData()
    
    // Adicionando o arquivo com o nome da chave exato exigido no Insomnia
    formData.append("documento", documento)
    
    // Adicionando o JSON stringificado na chave "dados" como mostrado no Insomnia
    formData.append("dados", JSON.stringify({ nome: nome }))

    // Criando a requisição[cite: 1]
    const requisicao = fetch(
        endPoint,
        {
            method: "POST",
            headers: {
                'Accept': 'application/json', // Obriga o Laravel a retornar JSON mesmo em erros
                "Authorization": `Bearer ${token}` // Envia o token de autorização
                // Não coloque Content-Type aqui, o FormData resolve automaticamente!
            },
            body: formData 
        }
    )

    // Retornado uma promise com os dados da API
    return requisicao
}

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