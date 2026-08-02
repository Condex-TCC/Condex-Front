//Arquivo responsavel por intermediar a lógica entre a telaLogin e a API

import { LoginApi } from "../api/LoginApi";

//Função responsavel por realizar o login
export async function HendleLogin(emial, password){

    //Tentando executar a operação de login
    try{

        //Aguarda a conclução da tarefa de login no servidor
        const response = await LoginApi(emial, password);

        //Aguarda a conclução ca converção da tarefa de json para objeto
        const dados = await response.json();
            
        // Desestruturando o json
        const { message, status, data } = dados;

        //Exibe no console a responsta
        // console.log(message);
        // console.log(status);
            
        //Verifica se o estatos da menssagem deu errado
        if(status === 400){
            
            //Para a execução do o try, e rediceriona o fluxo para o cacth
            throw(`${message}! Usuário ou senha invalida`)
        }

        //Exibe no console | Para validar
        // console.log(tipo_usuario);
        // console.log(token);

        // Retornando o objeto com a data
        return data

    }
    //Caso alguma promisse retorne um reject irá cair aqui
    catch(error){

        //Exibe a menssagem de erro no login
        alert(error)
    }
}