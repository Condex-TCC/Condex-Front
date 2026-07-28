//Arquivo responsavel por intermediar a lógica entre a telaLogin e a API

import { LoginApi } from "../api/LoginApi";

//Função responsavel por realizar o login
export async function Login(emial, password){

    // 'await' faz o código esperar a resposta da API
    const response = await LoginApi(emial, password);
    const dados = await response.json();
        
    // Desestruturando o json
    const { message, status, data } = dados;

    console.log(message);
    console.log(status);
        
    // Desestruturando o json de data
    const { tipo_usuario, token } = data;

    console.log(tipo_usuario);
    console.log(token);

    // Retornamos o valor diretamente
    return tipo_usuario;
}