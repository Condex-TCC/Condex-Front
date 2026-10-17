//Arquivo responsável por tratar as requisições da api

import { aprovaReservaAPI, getReservasPendentesAPI, getReservasPorDataAPI, showReservaAPI } from "../api/ReservasAPI"


//Função que obtem todas as reservas que precisan se aprovação
export async function getReservaPendentes() {
    
    //Tendanto executar a requisição
    try{

        //Chamando a função que realiza a requisição no API
        let response = await getReservasPendentesAPI()
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
        console.error("Erro ao buscar reservas pendentes na API:", erro)

    }

}

//Função que obtem um reserva para o sindico
export async function showReserva(id) {
    
    //Tendanto executar a requisição
    try{

        //Chamando a função que realiza a requisição no API
        let response = await showReservaAPI(id)
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
        console.error("Erro ao buscar a reserva selecionada na API:", erro)

    }

}

//Função que autoriza a reserva para o morador
export async function aprovaReserva(id, aprovada) {
    
    //Tendanto executar a requisição
    try{

        //Chamando a função que realiza a requisição no API
        let response = await aprovaReservaAPI(id,aprovada)
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
        console.error("Erro ao autorizar a reserva na API:", erro)

    }

}


//Função que obtem todas as reservas de um determinado dia (aaaa-mm-dd)
//Devolve { reservas, reservas_pendentes } ou undefined caso a API falhe
export async function getReservasPorData(data) {

    //Tendanto executar a requisição
    try{

        //Chamando a função que realiza a requisição no API
        let response = await getReservasPorDataAPI(data)
        //Convertendo o JSON para objetos no JS
        let json = await response.json()

        //Verifica se houve algum erro na requisição
        if(json.status != 200){

            //Para a execução do try e lança um erro para o catch
            throw("Erro na requisição " + json.status)
        }

        //Retornando os dados
        return json.data
    }
    //Casso aconteça algum erro na requisição, cai nesse bloco
    catch(erro){

        //Exibe o erro no console para depuração
        console.error("Erro ao buscar as reservas do dia na API:", erro)

    }

}

//Função que converte a data do padrão da API (2026-10-05) para o padrão brasileiro (05/10/2026)
export function formatarDataReserva(data) {

    //Sem data, não tenta formatar
    if(!data){

        return ''
    }

    //Pega apenas aaaa-mm-dd, caso a API devolva também o horário
    const [ano, mes, dia] = String(data).slice(0, 10).split('-')

    //Retorna a data no formato dd/mm/aaaa
    return `${dia}/${mes}/${ano}`
}

//Função que remove os segundos do horário (14:30:00 vira 14:30)
export function formatarHoraReserva(hora) {

    //Sem horário, não tenta formatar
    if(!hora){

        return ''
    }

    //Retorna apenas hh:mm
    return String(hora).slice(0, 5)
}

//Função que devolve a data de hoje no padrão aaaa-mm-dd, usando o fuso do navegador
export function dataHojeIso() {

    //Data atual do navegador
    const hoje = new Date()

    //Completa mês e dia com zero à esquerda
    const mes = String(hoje.getMonth() + 1).padStart(2, '0')
    const dia = String(hoje.getDate()).padStart(2, '0')

    //Retorna a data no formato aaaa-mm-dd
    return `${hoje.getFullYear()}-${mes}-${dia}`
}