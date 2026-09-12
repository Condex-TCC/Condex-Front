//Arquivo responsável por fazer a requisição para a API dos moradores (visão do síndico)

import { apiFetch } from '../service/httpClient'

//Função que recupera todos os moradores do banco de dados
export function getMoradores(){

    return apiFetch('/sindico/morador/get', { method: 'GET' })
}

//Função que apaga um morador do banco de dados
export function deleteMoradores(id){

    return apiFetch(`/sindico/morador/delete/${id}`, { method: 'DELETE' })
}

//Função que verifica o se já existe algum morador com esse apertamento selecionado
export async function vefifyMoradorAPI(id){

    //Receperando o token de outorização
    let cookie = await GetCookie()
    let token = cookie.token

    //Endpoint
    let endPoint = "http://127.0.0.1:8000/api/sindico/morador/verify/" + id

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

//Função que que salva no banco de dados o novo morador
export async function insertMoradorAPI(nome, cpf, email, telefone, senha, id_unidade){

    //Receperando o token de outorização
    let cookie = await GetCookie()
    let token = cookie.token

    //Endpoint
    let endPoint = "http://127.0.0.1:8000/api/sindico/morador/create"

    //Objeto com os elementos
    let novaRegra = {
        nome: nome,
        cpf: cpf,
        email: email,
        telefone: telefone,
        password: senha,
        id_unidade: id_unidade,
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
            body: JSON.stringify(novaRegra) //Convertendo o objeto em Json
        }
    )

    //Retornado uma promise com os dados da API
    return requisicao
}

//Função que pega apenas um morador
export async function showMoradorAPI(id){

    //Receperando o token de outorização
    let cookie = await GetCookie()
    let token = cookie.token

    //Endpoint
    let endPoint = "http://127.0.0.1:8000/api/sindico/morador/show/" + id

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

//Função que que salva no banco de dados o novo morador
export async function updateMoradorAPI(id, nome, cpf, email, telefone, senha, id_unidade){

    //Receperando o token de outorização
    let cookie = await GetCookie()
    let token = cookie.token

    //Endpoint
    let endPoint = "http://127.0.0.1:8000/api/sindico/morador/update/" + id

    let novoMorador = {}

    //Verifica se a senha será envia ou não
    if(senha != null){

        //Objeto com os elementos
        novoMorador = {
            nome: nome,
            cpf: cpf,
            email: email,
            telefone: telefone,
            password: senha,
            id_unidade: id_unidade,
        }

    }else{

        //Objeto com os elementos | Sem a senha
        novoMorador = {
            nome: nome,
            cpf: cpf,
            email: email,
            telefone: telefone,
            id_unidade: id_unidade,
        }
    }

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

            //Passando o corpo da requisição
            body: JSON.stringify(novoMorador) //Convertendo o objeto em Json
        }
    )

    //Retornado uma promise com os dados da API
    return requisicao
}
