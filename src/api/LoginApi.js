//Arquivo responsavel por fazer a requisição para a API

//Função que interaje com o login
export function LoginApi(email, password){

    //Endpoint
    let endPoint = "http://127.0.0.1:8000/api/login"

    //Objeto com os elementos
    let credenciais = {
	    email: email,
	    password: password
    }

    //Criando a requisição
    const requisicao = fetch(
        endPoint, //Passando o endPoint para a requisição
        {
            method: "POST", //Passando qual é o metodo HTTP

            //Passando os headers
            headers: {
                'Content-Type': 'application/json', //Tipo de formatação
            },

            //Passando o corpo da requisição
            body: JSON.stringify(credenciais) //Convertendo o objeto em Json
        }
    )

    //Retornado uma promise com os dados da API
    return requisicao
}