//Arquivo responsavel por solicitar a requisição e trata-la

import { allowEntryAPI, getAuthorizedVisitorsAPI } from "../api/AutorizacaoApi"

//Função que obtem os visitantes autorizados (pré cadastrados) para o porteiro
export async function getVisitantesPreCadastrados() {

    //Tendanto executar a requisição
    try{

        //Chamando a função que realiza a requisição no API
        let response = await getAuthorizedVisitorsAPI()

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
        console.error("Erro ao buscar os visitantes autorizados na API:", erro)

    }

}

//Função que libera a entrada de um visitante
export async function registrarEntradaVisitante(id) {

    //Tendanto executar a requisição
    try{

        //Chamando a função que realiza a requisição no API
        let response = await allowEntryAPI(id)

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
        console.error("Erro ao registrar a entrada do visitante na API:", erro)

    }

}
