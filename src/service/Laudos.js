//Arquivo responsavel por fazer a requisição e tratar os dados

import { deleteLaudoAPI, getLaudosAPI, insertLaudoAPI, showLaudoAPI, updateLaudoAPI } from "../api/LaudosAPI"


//Função que obtem todas as regras
export async function obtendoLaudo() {
    
    //Tendanto executar a requisição
    try{

        //Chamando a função que realiza a requisição no API
        let response = await getLaudosAPI()

        //Convertendo o JSON para objetos no JS
        let json = await response.json()

        //Desestrutura o promisse
        const { message, status, data} = json

        //Verifica se houve algum erro na requisição
        if(status != 200){

            //Para a execução do try e lança um erro para o catch
            throw("Erro na requisição " + status)
        }

        //Retornando a menssagem
        return data
    }
    //Casso aconteça algum erro na requisição, cai nesse bloco
    catch(erro){

        //Exibe um alerta na tela
        console.error("Erro ao buscar o porteiro na API:", erro)

    }

}

//Função que deleta os laudos
export async function deleteLaudo(id) {
    
    //Tendanto executar a requisição
    try{

        //Chamando a função que realiza a requisição no API
        let response = await deleteLaudoAPI(id)

        //Convertendo o JSON para objetos no JS
        let json = await response.json()

        //Desestrutura o promisse
        const { message, status, data} = json

        //Verifica se houve algum erro na requisição
        if(status != 200){

            //Para a execução do try e lança um erro para o catch
            throw("Erro na requisição " + status)
        }

        //Retornando a menssagem
        return message
    }
    //Casso aconteça algum erro na requisição, cai nesse bloco
    catch(erro){

        //Exibe um alerta na tela
        console.error("Erro ao buscar o porteiro na API:", erro)

    }

}

// Função que cria o laudo
export async function insertLaudo(nome, documento) {

    // Tentando executar a requisição
    try {
        // Chamando a função que realiza a requisição na API
        let response = await insertLaudoAPI(nome, documento)

        // Convertendo o JSON para objetos no JS
        let json = await response.json()

        // Desestrutura a promise[cite: 2]
        const { message, status, data } = json

        // Verifica se houve algum erro na requisição (No Insomnia, o sucesso retornou 200)
        if (status != 200) {
            // Para a execução do try e lança um erro para o catch
            throw("Erro na requisição " + status)
        }

        // Retornando a mensagem de sucesso
        return message
    } 
    // Caso aconteça algum erro na requisição, cai nesse bloco
    catch(erro) {
        // Exibe um alerta no console
        console.error("Erro ao cadastrar o laudo na API:", erro) 
    }
}

// Função que recupera apenas um laudo específico
export async function showLaudo(id) {

    // Tentando executar a requisição
    try {

        // Chamando a função que realiza a requisição na API
        let response = await showLaudoAPI(id)

        // Convertendo o JSON para objetos no JS
        let json = await response.json()

        // Desestrutura a promise 
        const { message, status, data } = json

        // Verifica se houve algum erro na requisição
        if(status != 200){
            // Para a execução do try e lança um erro para o catch
            throw("Erro na requisição " + status)
        }

        // Retornando apenas a propriedade data (que contém os dados do laudo segundo o Insomnia)
        return data
    }
    // Caso aconteça algum erro na requisição, cai nesse bloco
    catch(erro){

        // Exibe um alerta no console
        console.error("Erro ao buscar o laudo na API:", erro)
    }
}

// Função que atualiza o laudo
export async function updateLaudo(id, nome, documentoOuCaminho) {
    
    try {
        // Chamando a função que realiza a requisição na API
        let response = await updateLaudoAPI(id, nome, documentoOuCaminho)

        // Convertendo o JSON
        let json = await response.json()

        // Desestrutura a promise
        const { message, status } = json

        // Verifica se houve algum erro
        if(status != 200){
            throw("Erro na requisição " + status)
        }

        // Retornando a mensagem de sucesso para exibir no front
        return message
    }
    catch(erro){
        console.error("Erro ao atualizar o laudo na API:", erro)
    }
}