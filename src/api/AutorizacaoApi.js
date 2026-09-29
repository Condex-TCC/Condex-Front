//Arquivo responsável por fazer a requisição para a API das autorizações de visitantes

import { GetCookie } from "../service/cookie"
import { USE_MOCK } from "../mock/ativo"
import { allowEntryMock, getAuthorizedVisitorsMock } from "../mock/porteiroMock"

//Função que recupera os visitantes autorizados (pré cadastrados) do porteiro
export async function getAuthorizedVisitorsAPI(){

    //Com o mock ligado, devolve os dados fictícios em memória
    if(USE_MOCK){

        return getAuthorizedVisitorsMock()
    }

    //Receperando o token de outorização
    let cookie = await GetCookie()
    let token = cookie.token

    //Endpoint
    let endPoint = "http://127.0.0.1:8000/api/porteiro/autorizacao/authorized"

    //Criando a requisição
    const requisicao = fetch(
        endPoint, //Passando o endPoint para a requisição
        {
            method: "GET", //Passando qual é o metodo HTTP

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

//Função que libera a entrada de um visitante autorizado
export async function allowEntryAPI(id){

    //Com o mock ligado, registra a entrada em memória
    if(USE_MOCK){

        return allowEntryMock(id)
    }

    //Receperando o token de outorização
    let cookie = await GetCookie()
    let token = cookie.token

    //Endpoint
    let endPoint = "http://127.0.0.1:8000/api/porteiro/autorizacao/entry/" + id

    //Criando a requisição
    const requisicao = fetch(
        endPoint, //Passando o endPoint para a requisição
        {
            method: "PUT", //Passando qual é o metodo HTTP

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
