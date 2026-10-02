//Arquivo responsavel por fazer a requisição e tratar os dados

import { getComunicadosAPI, getRespostasAPI } from "../api/ComunicadosAPI"

//Função que obtem todos os laudos
export async function getComunicados() {
    
    //Tendanto executar a requisição
    try{

        //Chamando a função que realiza a requisição no API
        let response = await getComunicadosAPI()

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
        console.error("Erro ao buscar todos os comunicados da API:", erro)

    }

}

//Função que obtem todas as respostas
export async function getRespostas() {
    
    //Tendanto executar a requisição
    try{

        //Chamando a função que realiza a requisição no API
        let response = await getRespostasAPI()

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
        console.error("Erro ao buscar todos as respostas da API:", erro)

    }

}
