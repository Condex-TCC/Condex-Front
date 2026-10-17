//Arquivo responsável por fazer as requisições para a API de reservas e espaços do morador

import { GetCookie } from "../service/cookie"

//Função que monta os headers padrão das requisições do morador
function montaHeaders(){

    //Receperando o token de outorização
    let cookie = GetCookie()
    let token = cookie.token

    //Retornando os headers
    return {
        'Content-Type': 'application/json', //Tipo de formatação
        'Accept': 'application/json', // Obriga o Laravel a retornar JSON mesmo em erros
        "Authorization": `Bearer ${token}` //Eniva o token de autorização
    }
}

//Função que recupera todos os espaços (áreas comuns) que podem ser reservados
export async function getEspacosMoradorAPI(){

    //Endpoint
    let endPoint = "http://127.0.0.1:8000/api/morador/espaco/get"

    //Criando a requisição
    const requisicao = fetch(
        endPoint, //Passando o endPoint para a requisição
        {
            method: "GET", //Passando qual é o metodo HTTP
            headers: montaHeaders() //Passando os headers
        }
    )

    //Retornado uma promise com os dados da API
    return requisicao
}

//Função que recupera todas as reservas do morador logado
export async function getReservasMoradorAPI(){

    //Endpoint
    let endPoint = "http://127.0.0.1:8000/api/morador/reservas/get"

    //Criando a requisição
    const requisicao = fetch(
        endPoint, //Passando o endPoint para a requisição
        {
            method: "GET", //Passando qual é o metodo HTTP
            headers: montaHeaders() //Passando os headers
        }
    )

    //Retornado uma promise com os dados da API
    return requisicao
}

//Função que solicita uma nova reserva
//A API espera a data no formato dd/mm/aaaa e os horários no formato hh:mm:ss
export async function createReservaMoradorAPI(idEspaco, data, inicio, fim){

    //Endpoint
    let endPoint = "http://127.0.0.1:8000/api/morador/reservas/create"

    //Monstando o json que vai ser enviado para o back end
    let novaReserva = {
        id_espaco: idEspaco,
        data: data,
        inicio: inicio,
        fim: fim
    }

    //Criando a requisição
    const requisicao = fetch(
        endPoint, //Passando o endPoint para a requisição
        {
            method: "POST", //Passando qual é o metodo HTTP
            headers: montaHeaders(), //Passando os headers
            body: JSON.stringify(novaReserva) //Passando o corpo da requisição
        }
    )

    //Retornado uma promise com os dados da API
    return requisicao
}

//Função que cancela uma reserva do morador
export async function cancelReservaMoradorAPI(id){

    //Endpoint
    let endPoint = "http://127.0.0.1:8000/api/morador/reservas/cancel/" + id

    //Criando a requisição
    const requisicao = fetch(
        endPoint, //Passando o endPoint para a requisição
        {
            method: "PUT", //Passando qual é o metodo HTTP
            headers: montaHeaders() //Passando os headers
        }
    )

    //Retornado uma promise com os dados da API
    return requisicao
}
