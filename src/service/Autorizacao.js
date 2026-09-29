//Arquivo responsavel por solicitar a requisição e trata-la

import { allowEntryAPI, getAuthorizedVisitorsAPI } from "../api/AutorizacaoApi"
import { USE_MOCK } from "../mock/ativo"
import { getActiveVisitorsMock } from "../mock/porteiroMock"

//Função que obtem os visitantes autorizados (pré cadastrados) para o porteiro
export async function getVisitantesPreCadastrados() {
    //Tendanto executar a requisição
    try{

        //Chamando a função que realiza a requisição no API
        let response = await getAuthorizedVisitorsAPI()

        //Convertendo o JSON para objetos no JS
        let json = await response.json()

        //Desestrutura o promisse
        const { status, data} = json

        //Verifica se houve algum erro na requisição
        if(status != 200){

            //Para a execução do try e lança um erro para o catch
            throw("Erro na requisição " + status)
        }

        //Retornando a lista de visitors autorizados
        return data
    }
    //Casso aconteça algum erro na requisição, cai nesse bloco
    catch(erro){

        //Exibe um alerta na tela
        console.error("Erro ao buscar os visitantes autorizados na API:", erro)

    }

}

//Função que libera a entrada de um visitante
//Devolve { sucesso, mensagem } para o card saber se pode tirar o
//visitante da lista de espera ou se precisa manter o card na tela
export async function registrarEntradaVisitante(id) {

    //Tendanto executar a requisição
    try{

        //Chamando a função que realiza a requisição no API
        let response = await allowEntryAPI(id)

        //Convertendo o JSON para objetos no JS
        let json = await response.json()

        //Desestrutura o promisse
        const { message, status} = json

        //Verifica se houve algum erro na requisição
        if(status != 200){

            //Para a execução do try e lança um erro para o catch
            throw(message || ("Erro na requisição " + status))
        }

        //Retornando a menssagem de sucesso
        return { sucesso: true, mensagem: message }
    }
    //Casso aconteça algum erro na requisição, cai nesse bloco
    catch(erro){

        //Exibe um alerta na tela
        console.error("Erro ao registrar a entrada do visitante na API:", erro)

        //Devolve o erro para a tela exibir sem remover o card
        return {
            sucesso: false,
            mensagem: typeof erro === "string" ? erro : "Não foi possível registrar a entrada do visitante."
        }
    }

}

//PENDENTE: o backend ainda não expõe um endpoint para os visitantes que já
//registraram entrada e estão dentro do condomínio. Enquanto isso, a lista vem
//do mock quando ele está ligado, e volta vazia quando não está, o que faz a
//tela mostrar o estado vazio corretamente. Quando o endpoint existir, basta
//trocar o bloco do mock pela mesma requisição feita nos outros métodos deste
//arquivo.
export async function getVisitantesAtivos() {

    //Com o mock ligado, devolve os visitantes fictícios que já entraram
    if(USE_MOCK){

        const response = await getActiveVisitorsMock()

        const json = await response.json()

        const { status, data } = json

        if(status != 200){

            throw("Erro na requisição " + status)
        }

        return data
    }

    //Nenhum visitante ativo, porque ainda não existe a origem desses dados na API
    return []
}
