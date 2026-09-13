//Arquivo responsavel por solicitar a requisição e trata-la

import { getEncomendasAPI, insertEncomendaAPI, withdrawEncomendaAPI } from "../api/EncomendaApi"

//Função que obtem todas as encomendas
export async function getEncomendas() {

    //Tendanto executar a requisição
    try{

        //Chamando a função que realiza a requisição no API
        let response = await getEncomendasAPI()

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
        console.error("Erro ao buscar as encomendas na API:", erro)

    }

}

//Função que cadastra uma nova encomenda
export async function cadastrarEncomenda(nome, descricao) {

    //Tendanto executar a requisição
    try{

        //Chamando a função que realiza a requisição no API
        let response = await insertEncomendaAPI(nome, descricao)

        //Convertendo o JSON para objetos no JS
        let json = await response.json()

        //Desestrutura o promisse
        const { message, status, data} = json

        //Verifica se houve algum erro na requisição
        if(status != 201 && status != 200){

            //Para a execução do try e lança um erro para o catch
            throw("Erro na requisição " + status)
        }

        //Retornando a menssagem
        return message
    }
    //Casso aconteça algum erro na requisição, cai nesse bloco
    catch(erro){

        //Exibe um alerta na tela
        console.error("Erro ao cadastrar a encomenda na API:", erro)

    }

}

//Função que registra a retirada de uma encomenda
export async function registrarRetiradaEncomenda(id) {

    //Tendanto executar a requisição
    try{

        //Chamando a função que realiza a requisição no API
        let response = await withdrawEncomendaAPI(id)

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
        console.error("Erro ao registrar a retirada da encomenda na API:", erro)

    }

}
