//Arquivo responsável por fazer a requisição do primeiro acesso para a API

import { GetCookie } from "../service/cookie"

//Função que conclui o primeiro acesso do usuário logado
//A API exige o tipo de usuário e, dentro de "dados", nome, cpf, email, telefone e password
export async function primeiroAcessoAPI(usuario, nome, email, telefone, cpf, password){

    //Receperando o token de outorização
    let cookie = await GetCookie()
    let token = cookie.token

    //Endpoint
    let endPoint = "/api/perfil/primeiroAcesso"

    //Objeto com os elementos no formato que a API espera
    let dadosPrimeiroAcesso = {
        usuario: usuario,
        dados: {
            nome: nome,
            cpf: cpf,
            email: email,
            telefone: telefone,
            password: password
        }
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
            body: JSON.stringify(dadosPrimeiroAcesso) //Convertendo o objeto em Json
        }
    )

    //Retornado uma promise com os dados da API
    return requisicao
}
