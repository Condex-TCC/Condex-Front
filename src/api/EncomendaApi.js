//Arquivo responsável por fazer a requisição para a API das encomendas

import { GetCookie } from "../service/cookie"
import { USE_MOCK } from "../mock/ativo"
import { getEncomendasMock, insertEncomendaMock, withdrawEncomendaMock } from "../mock/porteiroMock"

//Função que recupera todas as encomendas do banco de dados
export async function getEncomendasAPI(){

    //Com o mock ligado, devolve os dados fictícios em memória
    if(USE_MOCK){

        return getEncomendasMock()
    }

    //Receperando o token de outorização
    let cookie = await GetCookie()
    let token = cookie.token

    //Endpoint
    let endPoint = "http://127.0.0.1:8000/api/porteiro/encomenda/get"

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

//Função que cadastra uma nova encomenda
//O parâmetro detalhes leva bloco, apartamento e data do formulário. A API
//real ainda não tem colunas para esses dados, então eles são ignorados
//nessa chamada e só são usados pelo mock
export async function insertEncomendaAPI(nome, descricao, detalhes = {}){

    //Com o mock ligado, grava o registro em memória
    if(USE_MOCK){

        return insertEncomendaMock(nome, descricao, detalhes)
    }

    //Receperando o token de outorização
    let cookie = await GetCookie()
    let token = cookie.token

    //Endpoint
    let endPoint = "http://127.0.0.1:8000/api/porteiro/encomenda/create"

    //Objeto com os elementos
    let novaEncomenda = {
        nome: nome,
        descricao: descricao,
        id_morador: 1 //Provisório, apenas para engambelar o Rubens | TODO: Consertar aqui depois
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
            body: JSON.stringify(novaEncomenda) //Convertendo o objeto em Json
        }
    )

    //Retornado uma promise com os dados da API
    return requisicao
}

//Função que registra a retirada de uma encomenda
export async function withdrawEncomendaAPI(id){

    //Com o mock ligado, marca a retirada em memória
    if(USE_MOCK){

        return withdrawEncomendaMock(id)
    }

    //Receperando o token de outorização
    let cookie = await GetCookie()
    let token = cookie.token

    //Endpoint
    let endPoint = "http://127.0.0.1:8000/api/porteiro/encomenda/withdraw/" + id

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
