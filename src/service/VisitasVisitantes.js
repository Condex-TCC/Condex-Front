//Arquivo responsável por tratar as requisições de visitas e visitantes do síndico

import { getVisitasSindicoAPI, getVisitantesSindicoAPI, getVisitasMoradorAPI, getVisitasHisoticoMoradorAPI, cancelaVisitamoradorAPI, showVisitaMoradorAPI } from "../api/VisitasVisitantesAPI"

//Função que obtem as visitas registradas no condomínio
export async function getVisitasSindico(filtros = {}){

    //Tendanto executar a requisição
    try{

        //Chamando a função que realiza a requisição no API
        let response = await getVisitasSindicoAPI(filtros)

        //Convertendo o JSON para objetos no JS
        let json = await response.json()

        //Desestrutura o promisse
        const { status, data } = json

        //Verifica se houve algum erro na requisição
        if(status != 200){

            //Para a execução do try e lança um erro para o catch
            throw("Erro na requisição " + status)
        }

        //Retornando os dados
        return data
    }
    //Casso aconteça algum erro na requisição, cai nesse bloco
    catch(erro){

        //Exibe um alerta na tela
        console.error("Erro ao buscar as visitas na API:", erro)

    }
}

//Função que obtem os visitantes cadastrados no condomínio
export async function getVisitantesSindico(filtros = {}){

    //Tendanto executar a requisição
    try{

        //Chamando a função que realiza a requisição no API
        let response = await getVisitantesSindicoAPI(filtros)

        //Convertendo o JSON para objetos no JS
        let json = await response.json()

        //Desestrutura o promisse
        const { status, data } = json

        //Verifica se houve algum erro na requisição
        if(status != 200){

            //Para a execução do try e lança um erro para o catch
            throw("Erro na requisição " + status)
        }

        //Retornando os dados
        return data
    }
    //Casso aconteça algum erro na requisição, cai nesse bloco
    catch(erro){

        //Exibe um alerta na tela
        console.error("Erro ao buscar os visitantes na API:", erro)

    }
}

//Função que obtem as visitas do morador
export async function getVisitasMorador(){

    //Tendanto executar a requisição
    try{

        //Chamando a função que realiza a requisição no API
        let response = await getVisitasMoradorAPI()

        //Convertendo o JSON para objetos no JS
        let json = await response.json()

        //Desestrutura o promisse
        const { status, data } = json

        //Verifica se houve algum erro na requisição
        if(status != 200){

            //Para a execução do try e lança um erro para o catch
            throw("Erro na requisição " + status)
        }

        //Retornando os dados
        return data
    }
    //Casso aconteça algum erro na requisição, cai nesse bloco
    catch(erro){

        //Exibe um alerta na tela
        console.error("Erro ao buscar as visidas do morador na API:", erro)

    }
}

//Função que obtem as visitas do morador
export async function getVisitasHisoticoMorador(){

    //Tendanto executar a requisição
    try{

        //Chamando a função que realiza a requisição no API
        let response = await getVisitasHisoticoMoradorAPI()

        //Convertendo o JSON para objetos no JS
        let json = await response.json()

        //Desestrutura o promisse
        const { status, data } = json

        //Verifica se houve algum erro na requisição
        if(status != 200){

            //Para a execução do try e lança um erro para o catch
            throw("Erro na requisição " + status)
        }

        //Retornando os dados
        return data
    }
    //Casso aconteça algum erro na requisição, cai nesse bloco
    catch(erro){

        //Exibe um alerta na tela
        console.error("Erro ao buscar as visidas do morador na API:", erro)

    }
}


//Função que trata a requisição do cancelamento da vitia do morador
export async function cancelaVisitamorador(id){

    //Tendanto executar a requisição
    try{

        //Chamando a função que realiza a requisição no API
        let response = await cancelaVisitamoradorAPI(id)

        //Convertendo o JSON para objetos no JS
        let json = await response.json()

        //Desestrutura o promisse
        const {message, status, data } = json

        //Verifica se houve algum erro na requisição
        if(status != 200){

            //Para a execução do try e lança um erro para o catch
            throw("Erro na requisição " + status)
        }

        //Retornando os dados
        return message
    }
    //Casso aconteça algum erro na requisição, cai nesse bloco
    catch(erro){

        //Exibe um alerta na tela
        console.error("Erro ao cancelar uma visita do morador:", erro)

    }
}


//Função que trata a requisição do cancelamento da vitia do morador
export async function showVisitaMorador(id){

    //Tendanto executar a requisição
    try{

        //Chamando a função que realiza a requisição no API
        let response = await showVisitaMoradorAPI(id)

        //Convertendo o JSON para objetos no JS
        let json = await response.json()

        //Desestrutura o promisse
        const {message, status, data } = json

        //Verifica se houve algum erro na requisição
        if(status != 200){

            //Para a execução do try e lança um erro para o catch
            throw("Erro na requisição " + status)
        }

        //Retornando os dados
        return message
    }
    //Casso aconteça algum erro na requisição, cai nesse bloco
    catch(erro){

        //Exibe um alerta na tela
        console.error("Erro ao cancelar uma visita do morador:", erro)

    }
}

