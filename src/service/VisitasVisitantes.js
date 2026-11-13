//Arquivo responsável por tratar as requisições de visitas e visitantes do síndico

import { getVisitasSindicoAPI, getVisitantesSindicoAPI, getVisitasMoradorAPI, getVisitasHisoticoMoradorAPI, cancelaVisitamoradorAPI, showVisitaMoradorAPI, autorizaVisitamoradorAPI, consultaVisitanteAPI, cadastraVisitanteAPI, cadastraVisitaMoradorAPI, getVisitasPorterioAPI, getHistoricoVisitasPorterioAPI, showVisitasPorterioAPI, deleteVisitaPorterioAPI, registraEntradaVisitaAPI, registraSaidaVisitaAPI, consultaVisitantePortieroAPI, cadastraVisitantePorteiroAPI, getMoradoresVisitasPortieroAPI, cadastraVisitaPorteiroAPI } from "../api/VisitasVisitantesAPI"

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
export async function autorizaVisitamorador(id){

    //Tendanto executar a requisição
    try{

        //Chamando a função que realiza a requisição no API
        let response = await autorizaVisitamoradorAPI(id)

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
        console.error("Erro ao autorizar uma visita do morador uma visita do morador:", erro)

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
        return data
    }
    //Casso aconteça algum erro na requisição, cai nesse bloco
    catch(erro){

        //Exibe um alerta na tela
        console.error("Erro ao cancelar uma visita do morador:", erro)

    }
}

//Função que trata a requisição da consulta do visitante
export async function consultaVisitante(rg, cpf){

    //Tendanto executar a requisição
    try{

        //Chamando a função que realiza a requisição no API
        let response = await consultaVisitanteAPI(rg, cpf)

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
        return data
    }
    //Casso aconteça algum erro na requisição, cai nesse bloco
    catch(erro){

        //Exibe um alerta na tela
        console.error("Erro ao consulta se o visitante existe no banco de dados:", erro)

    }
}

//Função que trata a requisição o cadastro do visitante
export async function cadastraVisitante(nome, rg, cpf){

    //Tendanto executar a requisição
    try{

        //Chamando a função que realiza a requisição no API
        let response = await cadastraVisitanteAPI(nome, rg, cpf)

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
        console.error("Erro ao cadastrar visitante:", erro)

    }
}

//Função que trata a requisição para cadastrar o cadstro de uma nova visita
export async function cadastraVisitaMorador(id_visitante, hora_entrada, hora_saida){

    //Tendanto executar a requisição
    try{

        //Chamando a função que realiza a requisição no API
        let response = await cadastraVisitaMoradorAPI(id_visitante, hora_entrada, hora_saida)

        //Convertendo o JSON para objetos no JS
        let json = await response.json()

        //Desestrutura o promisse
        const {message, status, data } = json

        //Verifica se houve algum erro na requisição
        if(status != 200 && status != 400){

            //Para a execução do try e lança um erro para o catch
            throw("Erro na requisição " + status)
        }

        //Retornando os dados
        return { message, status }
    }
    //Casso aconteça algum erro na requisição, cai nesse bloco
    catch(erro){

        //Exibe um alerta na tela
        console.error("Erro ao cadastrar visita do morador:", erro)

    }
}

//Função que retonra as visitas do poritero
export async function getVisitasPorterio(){

    //Tendanto executar a requisição
    try{

        //Chamando a função que realiza a requisição no API
        let response = await getVisitasPorterioAPI()

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
        return data
    }
    //Casso aconteça algum erro na requisição, cai nesse bloco
    catch(erro){

        //Exibe um alerta na tela
        console.error("Erro ao buscar visitantes para o porteiro:", erro)

    }
}

//Função que retonra as visitas do poritero
export async function getHistoricoVisitasPorterio(){

    //Tendanto executar a requisição
    try{

        //Chamando a função que realiza a requisição no API
        let response = await getHistoricoVisitasPorterioAPI()

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
        return data
    }
    //Casso aconteça algum erro na requisição, cai nesse bloco
    catch(erro){

        //Exibe um alerta na tela
        console.error("Erro ao buscar histórico de visitantes para o porteiro:", erro)

    }
}

//Função que retonra os dados de uma única visita
export async function showVisitasPorterio(id){

    //Tendanto executar a requisição
    try{

        //Chamando a função que realiza a requisição no API
        let response = await showVisitasPorterioAPI(id)

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
        return data
    }
    //Casso aconteça algum erro na requisição, cai nesse bloco
    catch(erro){

        //Exibe um alerta na tela
        console.error("Erro ao buscar os dade uma visita para o porteiro:", erro)

    }
}

//Função que delete uma visita não autorizada ainda
export async function deleteVisitaPorterio(id){

    //Tendanto executar a requisição
    try{

        //Chamando a função que realiza a requisição no API
        let response = await deleteVisitaPorterioAPI(id)

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
        console.error("Erro ao deletar uma visita:", erro)

    }
}

//Função que registra a entrada do visitante no condominio
export async function  registraEntradaVisita(id){

    //Tendanto executar a requisição
    try{

        //Chamando a função que realiza a requisição no API
        let response = await registraEntradaVisitaAPI(id)

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
        console.error("Erro ao registrar a entrada de uma visita no condominio:", erro)

    }
}

//Função que registra a saida do visitante no condominio
export async function registraSaidaVisita(id){

    //Tendanto executar a requisição
    try{

        //Chamando a função que realiza a requisição no API
        let response = await registraSaidaVisitaAPI(id)

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
        console.error("Erro ao registrar a saida de uma visita no condominio:", erro)

    }
}

//Função que trata a requisição da consulta do visitante
export async function consultaVisitantePortiero(rg, cpf){

    //Tendanto executar a requisição
    try{

        //Chamando a função que realiza a requisição no API
        let response = await consultaVisitantePortieroAPI(rg, cpf)

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
        return data
    }
    //Casso aconteça algum erro na requisição, cai nesse bloco
    catch(erro){

        //Exibe um alerta na tela
        console.error("Erro ao consulta se o visitante existe no banco de dados:", erro)

    }
}

//Função que trata a requisição o cadastro do visitante
export async function cadastraVisitantePorteiro(nome, rg, cpf){

    //Tendanto executar a requisição
    try{

        //Chamando a função que realiza a requisição no API
        let response = await cadastraVisitantePorteiroAPI(nome, rg, cpf)

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
        console.error("Erro ao cadastrar visitante:", erro)

    }
}

//Função que obtem todos os moradores cadastrados no banco de dados
export async function getMoradoresVisitasPortiero(){

    //Tendanto executar a requisição
    try{

        //Chamando a função que realiza a requisição no API
        let response = await getMoradoresVisitasPortieroAPI()

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
        return data
    }
    //Casso aconteça algum erro na requisição, cai nesse bloco
    catch(erro){

        //Exibe um alerta na tela
        console.error("Erro ao buscar moradores no banco de dados:", erro)

    }
}

//Função que trata a requisição para cadastrar o cadstro de uma nova visita
export async function cadastraVisitaPorteiro(id_visitante, id_Morador, hora_entrada, hora_saida){

    //Tendanto executar a requisição
    try{

        //Chamando a função que realiza a requisição no API
        let response = await cadastraVisitaPorteiroAPI(id_visitante, id_Morador, hora_entrada, hora_saida)

        //Convertendo o JSON para objetos no JS
        let json = await response.json()

        //Desestrutura o promisse
        const {message, status, data } = json

        //Verifica se houve algum erro na requisição
        if(status != 200 && status != 400){

            //Para a execução do try e lança um erro para o catch
            throw("Erro na requisição " + status)
        }

        //Retornando os dados
        return { message, status }
    }
    //Casso aconteça algum erro na requisição, cai nesse bloco
    catch(erro){

        //Exibe um alerta na tela
        console.error("Erro ao cadastrar visita do porteiro:", erro)

    }
}