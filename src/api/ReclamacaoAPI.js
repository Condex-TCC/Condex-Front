//Arquivo responsável por fazer a requisição para a API das reclamações (síndico e morador)
//e retornar uma promise

//Importando a função que recupera os dados salvos no cookie (onde fica o token)
import { GetCookie } from "../service/cookie"

//Função que recupera todas as reclamações não visualizadas pelo síndico
export async function getReclamacoesAPI(){

    //Recuperando o token de autorização
    let cookie = await GetCookie() //Chama a função que lê o cookie
    let token = cookie.token //Pega apenas o token que está dentro do cookie

    //Endpoint | //Rota das reclamações não visualizadas
    let endPoint = "http://127.0.0.1:8000/api/sindico/reclamacao/get"

    //Criando a requisição
    const requisicao = fetch(
        endPoint, //Passando o endPoint para a requisição
        {
            method: "GET", //Passando qual é o metodo HTTP

            //Passando os headers
            headers: {
                'Content-Type': 'application/json', //Tipo de formatação
                'Accept': 'application/json', // Obriga o Laravel a retornar JSON mesmo em erros
                "Authorization": `Bearer ${token}` //Envia o token de autorização
            },
        }
    )

    //Retornando uma promise com os dados da API
    return requisicao
}

//Função que recupera todas as reclamações (histórico) para o síndico
export async function getReclamacoesHistoricoAPI(){

    //Recuperando o token de autorização
    let cookie = await GetCookie() //Chama a função que lê o cookie
    let token = cookie.token //Pega apenas o token que está dentro do cookie

    //Endpoint | Rota do histórico de reclamações
    let endPoint = "http://127.0.0.1:8000/api/sindico/reclamacao/historico/get" 

    //Criando a requisição
    const requisicao = fetch(
        endPoint, //Passando o endPoint para a requisição
        {
            method: "GET", //Passando qual é o metodo HTTP

            //Passando os headers
            headers: {
                'Content-Type': 'application/json', //Tipo de formatação
                'Accept': 'application/json', // Obriga o Laravel a retornar JSON mesmo em erros
                "Authorization": `Bearer ${token}` //Envia o token de autorização
            },
        }
    )

    //Retornando uma promise com os dados da API
    return requisicao
}

//Função que recupera apenas uma reclamação e a marca como visualizada
export async function showReclamacaoAPI(id){

    //Recuperando o token de autorização
    let cookie = await GetCookie() //Chama a função que lê o cookie
    let token = cookie.token //Pega apenas o token que está dentro do cookie

    //Endpoint | Rota da reclamação, com o id no final
    let endPoint = "http://127.0.0.1:8000/api/sindico/reclamacao/show/" + id 

    //Criando a requisição
    const requisicao = fetch(
        endPoint, //Passando o endPoint para a requisição
        {
            method: "POST", //Passando qual é o metodo HTTP (a rota é POST porque marca a reclamação como visualizada)

            //Passando os headers
            headers: {
                'Content-Type': 'application/json', //Tipo de formatação
                'Accept': 'application/json', // Obriga o Laravel a retornar JSON mesmo em erros
                "Authorization": `Bearer ${token}` //Envia o token de autorização
            },
        }
    )

    //Retornando uma promise com os dados da API
    return requisicao
}

//Função que o síndico utiliza para responder uma reclamação
export async function respondeReclamacaoAPI(id, resposta){

    //Recuperando o token de autorização
    let cookie = await GetCookie() //Chama a função que lê o cookie
    let token = cookie.token //Pega apenas o token que está dentro do cookie

    //Endpoint | Rota de resposta, com o id da reclamação no final
    let endPoint = "http://127.0.0.1:8000/api/sindico/reclamacao/resposta/" + id 

    //Construindo o objeto que será enviado no body do json
    let bodyJson = {
        resposta: resposta //Texto da resposta do síndico
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
                "Authorization": `Bearer ${token}` //Envia o token de autorização
            },

            //Passando o body
            body: JSON.stringify(bodyJson) //Convertendo o objeto em Json
        }
    )

    //Retornando uma promise com os dados da API
    return requisicao
}

//Função que recupera todas as reclamações do morador
export async function getReclamacoesMoradorAPI(){

    //Recuperando o token de autorização
    let cookie = await GetCookie() //Chama a função que lê o cookie
    let token = cookie.token //Pega apenas o token que está dentro do cookie

    //Endpoint | Rota das reclamações do morador
    let endPoint = "http://127.0.0.1:8000/api/morador/reclamacao/get"

    //Criando a requisição
    const requisicao = fetch(
        endPoint, //Passando o endPoint para a requisição
        {
            method: "GET", //Passando qual é o metodo HTTP

            //Passando os headers
            headers: {
                'Content-Type': 'application/json', //Tipo de formatação
                'Accept': 'application/json', // Obriga o Laravel a retornar JSON mesmo em erros
                "Authorization": `Bearer ${token}` //Envia o token de autorização
            },
        }
    )

    //Retornando uma promise com os dados da API
    return requisicao
}

//Função que salva no banco de dados a nova reclamação do morador
export async function insertReclamacaoAPI(reclamacao){

    //Recuperando o token de autorização
    let cookie = await GetCookie() //Chama a função que lê o cookie
    let token = cookie.token //Pega apenas o token que está dentro do cookie

    //Endpoint | Rota de cadastro da reclamação
    let endPoint = "http://127.0.0.1:8000/api/morador/reclamacao/create"

    //Construindo o objeto que será enviado no body do json
    let novaReclamacao = {
        reclamacao: reclamacao //Texto da reclamação escrita pelo morador
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
                "Authorization": `Bearer ${token}` //Envia o token de autorização
            },

            //Passando o corpo da requisição
            body: JSON.stringify(novaReclamacao) //Convertendo o objeto em Json
        }
    )

    //Retornando uma promise com os dados da API
    return requisicao
}

//Função que deleta a reclamação do morador
export async function deleteReclamacaoAPI(id){

    //Recuperando o token de autorização
    let cookie = await GetCookie() //Chama a função que lê o cookie
    let token = cookie.token //Pega apenas o token que está dentro do cookie

    //Endpoint | Rota de exclusão, com o id da reclamação no final
    let endPoint = "http://127.0.0.1:8000/api/morador/reclamacao/delete/" + id

    //Criando a requisição
    const requisicao = fetch(
        endPoint, //Passando o endPoint para a requisição
        {
            method: "DELETE", //Passando qual é o metodo HTTP

            //Passando os headers
            headers: {
                'Accept': 'application/json', // Obriga o Laravel a retornar JSON mesmo em erros
                "Authorization": `Bearer ${token}` //Envia o token de autorização
            },
        }
    )

    //Retornando uma promise com os dados da API
    return requisicao
}