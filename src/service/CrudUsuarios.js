//Arquivo responsavel por intermediar a lógica entre a tela que de controle de usuários pelo sindico e a API

import { deleteMoradores, getMoradores } from "../api/MoradoresApi"
import { deletePorteirosAPI, getPorteiro, insertPorteiroAPI, showPorteiroAPI } from "../api/PorteiroApi"


//Função responsavel por realizar o login
export async function LoadindUsers(tipoUser){

    //Tendanto executar a requisição
    try{

        //Variável que irá armazenar o usuários recuperados
        let users = null

        //Verifica qual tipo de usuário é
        if(tipoUser === "morador"){

            //Chama a promessa e pausa a execução dessa função até que termine de carregar a função
            users = await getMoradores()

        }else if(tipoUser === "porteiro"){

            //Chama a promessa e pausa a execução dessa função até que termine de carregar a função
            users = await getPorteiro()

        }else{

            //Para a execução do try e lança um erro para o catch
            throw("Não foi possivel carregar o usuário")
            
        }

        //Convertendo o json em objeto javaScrip
        const dados = await users.json()

        //Desestrutura o promisse
        const { message, status, data} = dados

        //Verifica se houve algum erro na requisição
        if(status != 200){

            //Para a execução do try e lança um erro para o catch
            throw("Erro na requisição " + status)
        }

        //Retorna os dados da requisição
        return data

    }
    //Casso aconteça algum erro na requisição, cai nesse bloco
    catch(erro){

        //Exibe um alerta na tela
        alert(erro)

    }
}

//Função que realiza o delete do morador
export async function deleteMorador(id) {
    
    //Tendanto executar a requisição
    try{
        //Chamando a função que realiza a requisição no API
        let response = await deleteMoradores(id)

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
        alert(erro)

    }

}

//Função que realiza o delete do porteiro
export async function deletePorterio(id) {
    
    //Tendanto executar a requisição
    try{
        //Chamando a função que realiza a requisição no API
        let response = await deletePorteirosAPI(id)

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
        alert(erro)

    }

}

//Função que realiza a gravação no porteiro
export async function criandoPorteiro(nome, email, password) {
    
    //Tendanto executar a requisição
    try{

        //Chamando a função que realiza a requisição no API
        let response = await insertPorteiroAPI(nome, email, password)

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
        alert(erro)

    }

}

//Função que obtem os dados do porteiro
export async function obtendoPorteiro(id) {
    
    //Tendanto executar a requisição
    try{

        //Chamando a função que realiza a requisição no API
        let response = await showPorteiroAPI(id)

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