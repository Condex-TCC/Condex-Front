//Arquivo responsável por fazer a requisição para a API de visitantes do porteiro

import { GetCookie } from "../service/cookie"

//Função que recupera todos os visitantes cadastrados na API
//O endpoint do porteiro devolve tanto os visitantes cadastrados por moradores
//quanto os cadastrados por porteiros, sem nenhum filtro
export async function getVisitantesPorteiroAPI(){

    //Receperando o token de outorização
    let cookie = await GetCookie()
    let token = cookie.token

    //Endpoint
    let endPoint = "http://127.0.0.1:8000/api/porteiro/visitante/get"

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

//Função que cadastra um visitante feito pelo porteiro
//A API exige nome, cpf e morador (id do morador responsável)
//Ao cadastrar, a API grava o porteiro logado em employee_id
export async function insertVisitantePorteiroAPI(nome, cpf, idMorador){

    //Receperando o token de outorização
    let cookie = await GetCookie()
    let token = cookie.token

    //Endpoint
    let endPoint = "http://127.0.0.1:8000/api/porteiro/visitante/create"

    //Objeto com os elementos no formato que a API espera
    let novoVisitante = {
        nome: nome,
        cpf: cpf,
        morador: Number(idMorador)
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
            body: JSON.stringify(novoVisitante) //Convertendo o objeto em Json
        }
    )

    //Retornado uma promise com os dados da API
    return requisicao
}
