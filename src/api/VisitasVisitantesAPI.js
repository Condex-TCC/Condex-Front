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
