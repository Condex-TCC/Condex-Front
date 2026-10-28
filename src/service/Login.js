//Arquivo responsavel por intermediar a lógica entre a telaLogin e a API

import { EditarPerilAPI, getUserAPI, LoginApi, redefinirSenhaAPI, validaCodigoAPI, validaContaAPI } from "../api/LoginApi";

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

//Função que edita os dados do usuário
export async function EditarPeril(usuario, nome, email, telefone, cpf){

    //Tentando executar a operação de login
    try{

        //Aguarda a conclução da tarefa de login no servidor
        const response = await EditarPerilAPI(usuario, nome, email, telefone, cpf)

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
        return message

    }
    //Caso alguma promisse retorne um reject irá cair aqui
    catch(error){

        //Exibe a menssagem de erro no login
        alert(error)
    }
}

//Função que recupera os dados do usuários
export async function getUser(usuario){

    //Tentando executar a operação de login
    try{

        //Aguarda a conclução da tarefa de login no servidor
        const response = await getUserAPI(usuario)

        //Aguarda a conclução ca converção da tarefa de json para objeto
        const dados = await response.json();
            
        // Desestruturando o json
        const { message, status, data } = dados;

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

//Função que valida a conta do usuário para iniciar a redefinição de senha
export async function validaContaUsuario(email, cpf, telefone){

    //Tentando executar a operação de validação da conta
    try{

        //Aguarda a conclução da tarefa de validação no servidor
        const response = await validaContaAPI(email, cpf, telefone)

        //Aguarda a conclução ca converção da tarefa de json para objeto
        const dados = await response.json();
            
        // Desestruturando o json
        const { message, status, data } = dados;

        //Verifica se o estatos da menssagem deu errado
        if(status !== 200){
            
            //Para a execução do o try, e rediceriona o fluxo para o cacth
            throw(`${message}! Dados da conta invalidos`)
        }

        //Exibe no console | Para validar
        // console.log(data);

        // Retornando o objeto com a data
        return data

    }
    //Caso alguma promisse retorne um reject irá cair aqui
    catch(error){

        //Exibe a menssagem de erro na validação da conta
        alert(error)
    }
}

//Função que valida o código enviado ao usuário para alterar a senha
export async function validaCodigo(id, tipo, codigo){

    //Tentando executar a operação de validação do código
    try{

        //Aguarda a conclução da tarefa de validação no servidor
        const response = await validaCodigoAPI(id, tipo, codigo)

        //Aguarda a conclução ca converção da tarefa de json para objeto
        const dados = await response.json();
            
        // Desestruturando o json
        const { message, status, data } = dados;

        //Verifica se o estatos da menssagem deu errado
        if(status !== 200){
            
            //Para a execução do o try, e rediceriona o fluxo para o cacth
            throw(`${message}! Código invalido`)
        }

        //Exibe no console | Para validar
        // console.log(message);

        // Retornando a menssagem
        return message

    }
    //Caso alguma promisse retorne um reject irá cair aqui
    catch(error){

        //Exibe a menssagem de erro na validação do código
        alert(error)
    }
}

//Função que redefine a senha do usuário
export async function redefinirSenha(id, tipo, codigo, novaSenha){

    //Tentando executar a operação de redefinição de senha
    try{

        //Aguarda a conclução da tarefa de redefinição no servidor
        const response = await redefinirSenhaAPI(id, tipo, codigo, novaSenha)

        //Aguarda a conclução ca converção da tarefa de json para objeto
        const dados = await response.json();
            
        // Desestruturando o json
        const { message, status, data } = dados;

        //Verifica se o estatos da menssagem deu errado
        if(status !== 200){
            
            //Para a execução do o try, e rediceriona o fluxo para o cacth
            throw(`${message}! Não foi possível redefinir a senha`)
        }

        //Exibe no console | Para validar
        // console.log(message);

        // Retornando a menssagem
        return message

    }
    //Caso alguma promisse retorne um reject irá cair aqui
    catch(error){

        //Exibe a menssagem de erro na redefinição da senha
        alert(error)
    }
}