//Arquivo responsavel por solicitar a requisição e trata-la

import { deleteApertamentoAPI, getApertamentosAPI, insertApertamentoAPI, showApertamentoAPI, updateApertamentoAPI } from "../api/ApertamentosAPI"

//Função que obtem todas as regras
export async function getApertamentos() {
    
    //Tendanto executar a requisição
    try{

        //Chamando a função que realiza a requisição no API
        let response = await getApertamentosAPI()

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
        console.error("Erro ao buscar o apertamento na API:", erro)

    }

}

//Função que deleta as unidades
export async function deleteApertamento(id) {
    
    //Tendanto executar a requisição
    try{

        //Chamando a função que realiza a requisição no API
        let response = await deleteApertamentoAPI(id)

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
        console.error("Erro ao buscar o apertamento na API:", erro)

    }

}

//Função que que cria os novos apertamentos
export async function insertApertamentos(bloco, numero, descricao) {
    
    //Tendanto executar a requisição
    try{

        //Chamando a função que realiza a requisição no API
        let response = await insertApertamentoAPI(bloco, numero, descricao)

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
        console.error("Erro ao buscar o apertamento na API:", erro)

    }

}

//Função que que recupera apenas um apertamento
export async function showApertamento(id) {
    
    //Tendanto executar a requisição
    try{

        //Chamando a função que realiza a requisição no API
        let response = await showApertamentoAPI(id)

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
        console.error("Erro ao buscar o apertamento na API:", erro)

    }

}

//Função que atualiza o apertamento
export async function updateApertamento(id, bloco, numero, descricao) {
    
    //Tendanto executar a requisição
    try{

        //Chamando a função que realiza a requisição no API
        let response = await updateApertamentoAPI(id, bloco, numero, descricao)

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
        console.error("Erro ao atualizar o apertamento na API:", erro)

    }

}