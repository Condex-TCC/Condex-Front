//Arquivo responsável por fazer as requisições para a API de visitas e visitantes do síndico

import { GetCookie } from "../service/cookie"
import { montarQuery } from "../utils/busca"

//Função que obtem as visitas registradas no condomínio
export async function getVisitasSindicoAPI(filtros = {}){

    //Receperando o token de outorização
    let cookie = await GetCookie()
    let token = cookie.token

    //Endpoint
    //A API aceita o filtro ?nome= para buscar pelo nome do visitante
    let endPoint = "http://127.0.0.1:8000/api/sindico/visita/get" + montarQuery(filtros)

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

//Função que obtem os visitantes cadastrados no condomínio
export async function getVisitantesSindicoAPI(filtros = {}){

    //Receperando o token de outorização
    let cookie = await GetCookie()
    let token = cookie.token

    //Endpoint
    //A API aceita os filtros ?nome= e ?cpf=
    let endPoint = "http://127.0.0.1:8000/api/sindico/visitante/get" + montarQuery(filtros)

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

//Função que obtem as visitas do morador
export async function getVisitasMoradorAPI(){

    //Receperando o token de outorização
    let cookie = await GetCookie()
    let token = cookie.token

    //Endpoint
    //A API aceita os filtros ?nome= e ?cpf=
    let endPoint = "http://127.0.0.1:8000/api/morador/visita/get" 

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

//Função que obtem o histócio do morador
export async function getVisitasHisoticoMoradorAPI(){

    //Receperando o token de outorização
    let cookie = await GetCookie()
    let token = cookie.token

    //Endpoint
    //A API aceita os filtros ?nome= e ?cpf=
    let endPoint = "http://127.0.0.1:8000/api/morador/visita/historico" 

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

//Função que canclea uma vista do moradr
export async function cancelaVisitamoradorAPI(id){

    //Receperando o token de outorização
    let cookie = await GetCookie()
    let token = cookie.token

    //Endpoint
    //A API aceita os filtros ?nome= e ?cpf=
    let endPoint = "http://127.0.0.1:8000/api/morador/visita/cancela/" + id 

    //Criando a requisição
    const requisicao = fetch(
        endPoint, //Passando o endPoint para a requisição
        {
            method: "DELETE", //Passando qual é o metodo HTTP

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

//Função que autoriza uma vista do moradr
export async function autorizaVisitamoradorAPI(id){

    //Receperando o token de outorização
    let cookie = await GetCookie()
    let token = cookie.token

    //Endpoint
    //A API aceita os filtros ?nome= e ?cpf=
    let endPoint = "http://127.0.0.1:8000/api/morador/visita/autoriza/" + id 

    //Criando a requisição
    const requisicao = fetch(
        endPoint, //Passando o endPoint para a requisição
        {
            method: "PUT", //Passando qual é o metodo HTTP

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

//Função que obten os dados de uma unica visita
export async function showVisitaMoradorAPI(id){

    //Receperando o token de outorização
    let cookie = await GetCookie()
    let token = cookie.token

    //Endpoint
    //A API aceita os filtros ?nome= e ?cpf=
    let endPoint = "http://127.0.0.1:8000/api/morador/visita/show/" + id 

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

//Função que consulta o visitante
export async function consultaVisitanteAPI(rg, cpf){

    //Receperando o token de outorização
    let cookie = await GetCookie()
    let token = cookie.token

    //Endpoint
    let endPoint = "http://127.0.0.1:8000/api/morador/visitantes/consulta"

    //Montando o body que vai ser enviado na requisição
    let bodyObject = {
        rg: rg,
        cpf: cpf,
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

            //Passando o body
            body: JSON.stringify(bodyObject),
        }
    )

    //Retornado uma promise com os dados da API
    return requisicao

}

//Função que cadastra um novo visitante
export async function cadastraVisitanteAPI(nome, rg, cpf){

    //Receperando o token de outorização
    let cookie = await GetCookie()
    let token = cookie.token

    //Endpoint
    let endPoint = "http://127.0.0.1:8000/api/morador/visitantes/create"

    //Montando o body que vai ser enviado na requisição
    let bodyObject = {
        nome: nome,
        rg: rg,
        cpf: cpf,
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

            //Passando o body
            body: JSON.stringify(bodyObject),
        }
    )

    //Retornado uma promise com os dados da API
    return requisicao

}


//Função que cadastra uma nova visita
export async function cadastraVisitaMoradorAPI(id_visitante, hora_entrada, hora_saida){

    //Receperando o token de outorização
    let cookie = await GetCookie()
    let token = cookie.token

    //Endpoint
    let endPoint = "http://127.0.0.1:8000/api/morador/visita/create"

    //Montando o body que vai ser enviado na requisição
    let bodyObject = {
	    id_visitante: id_visitante,
	    hora_entrada: hora_entrada,
	    hora_saida: hora_saida
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

            //Passando o body
            body: JSON.stringify(bodyObject),
        }
    )

    //Retornado uma promise com os dados da API
    return requisicao

}


//Função que obtem as visitas da tela inical do porteiro
export async function getVisitasPorterioAPI(){

    //Receperando o token de outorização
    let cookie = await GetCookie()
    let token = cookie.token

    //Endpoint
    //A API aceita os filtros ?nome= e ?cpf=
    let endPoint = "http://127.0.0.1:8000/api/porteiro/visita/get" 

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
