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

//Função que recupera apenas um laudo
export async function showLaudoAPI(id){

    //Receperando o token de outorização
    let cookie = await GetCookie()
    let token = cookie.token

    //Endpoint
    let endPoint = "http://127.0.0.1:8000/api/sindico/laudos/show/" + id

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

// Função que atualiza o laudo
export async function updateLaudoAPI(id, nome, documentoOuCaminho) {

    // Recuperando o token de autorização
    let cookie = await GetCookie()
    let token = cookie.token

    // Endpoint baseado no seu print do Insomnia para atualizar
    let endPoint = "http://127.0.0.1:8000/api/sindico/laudos/update/" + id

    // Criando o FormData (mesma estrutura do create)
    let formData = new FormData()
    
    // Se o usuário selecionou um arquivo, envia o arquivo. Se não, envia o caminho antigo em formato de texto.
    formData.append("documento", documentoOuCaminho)
    
    // Adicionando os dados do nome como JSON stringificado, conforme o print do Insomnia
    formData.append("dados", JSON.stringify({ nome: nome }))

    // Criando a requisição
    const requisicao = fetch(
        endPoint,
        {
            method: "POST", // Mantendo POST conforme a imagem do Insomnia
            headers: {
                'Accept': 'application/json',
                "Authorization": `Bearer ${token}` 
                // Sem Content-Type, o navegador define automaticamente como multipart/form-data com o boundary correto
            },
            body: formData
        }
    )

    // Retornado uma promise com os dados da API
    return requisicao
}