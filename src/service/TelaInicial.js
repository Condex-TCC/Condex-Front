//Arquivos responsaveis por tratar os dados da tela inicial antes da tela inicial

import { getTelaIncialSindicoAPI } from "../api/TelaInicialAPI"

//Função que trata a requisição da tela inicial
export async function getTelaIncialSindico(){

    //Tendanto executar a requisição
    try{
    
        //Chamando a função que realiza a requisição no API
        let response = await getTelaIncialSindicoAPI()
    
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
        console.error("Erro os buscar os dados da tala inicial do sindico: ", erro)
    
    }
}