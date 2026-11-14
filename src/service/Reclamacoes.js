//Arquivo responsável por chamar as requisições das reclamações, tratar a resposta
//e devolver os dados já tratados para as pages

//Importando as funções da pasta api que realizam as requisições
import { deleteReclamacaoAPI, getReclamacoesAPI, getReclamacoesHistoricoAPI,
getReclamacoesMoradorAPI, insertReclamacaoAPI, respondeReclamacaoAPI,
showReclamacaoAPI } from "../api/ReclamacaoAPI"

//Função que obtem todas as reclamações não visualizadas pelo síndico
export async function getReclamacoes() {

    //Tentando executar a requisição
    try{

        //Chamando a função que realiza a requisição na API
        let response = await getReclamacoesAPI()

        //Convertendo o JSON para objetos no JS
        let json = await response.json()

        //Desestruturando a resposta da API
        const { message, status, data} = json

        //Verifica se houve algum erro na requisição
        if(status != 200){

            //Para a execução do try e lança um erro para o catch
            throw("Erro na requisição " + status)
        }

        //Retornando os dados
        return data
    }
    //Caso aconteça algum erro na requisição, cai nesse bloco
    catch(erro){

        //Exibe o erro no console
        console.error("Erro ao buscar as reclamações não visualizadas na API:", erro)

    }

}

//Função que obtem todas as reclamações (histórico) para o síndico
export async function getReclamacoesHistorico() {

    //Tentando executar a requisição
    try{

        //Chamando a função que realiza a requisição na API
        let response = await getReclamacoesHistoricoAPI()

        //Convertendo o JSON para objetos no JS
        let json = await response.json()

        //Desestruturando a resposta da API
        const { message, status, data} = json

        //Verifica se houve algum erro na requisição
        if(status != 200){

            //Para a execução do try e lança um erro para o catch
            throw("Erro na requisição " + status)
        }

        //Retornando os dados
        return data
    }
    //Caso aconteça algum erro na requisição, cai nesse bloco
    catch(erro){

        //Exibe o erro no console
        console.error("Erro ao buscar o histórico de reclamações na API:", erro)

    }

}

//Função que recupera apenas uma reclamação e a marca como visualizada
export async function showReclamacao(id) {

    //Tentando executar a requisição
    try{

        //Chamando a função que realiza a requisição na API
        let response = await showReclamacaoAPI(id)

        //Convertendo o JSON para objetos no JS
        let json = await response.json()

        //Desestruturando a resposta da API
        const { message, status, data} = json

        //Verifica se houve algum erro na requisição
        if(status != 200){

            //Para a execução do try e lança um erro para o catch
            throw("Erro na requisição " + status)
        }

        //Retornando os dados
        return data
    }
    //Caso aconteça algum erro na requisição, cai nesse bloco
    catch(erro){

        //Exibe o erro no console
        console.error("Erro ao buscar a reclamação selecionada na API:", erro)

    }

}

//Função que o síndico utiliza para responder a reclamação
export async function respondeReclamacao(id, resposta) {

    //Tentando executar a requisição
    try{

        //Chamando a função que realiza a requisição na API
        let response = await respondeReclamacaoAPI(id, resposta)

        //Convertendo o JSON para objetos no JS
        let json = await response.json()

        //Desestruturando a resposta da API
        const { message, status, data} = json

        //Verifica se houve algum erro na requisição
        if(status != 200){

            //Para a execução do try e lança um erro para o catch
            throw("Erro na requisição " + status)
        }

        //Retornando a mensagem
        return message
    }
    //Caso aconteça algum erro na requisição, cai nesse bloco
    catch(erro){

        //Exibe o erro no console
        console.error("Erro ao responder a reclamação na API:", erro)

    }

}

//Função que obtem todas as reclamações do morador
export async function getReclamacoesMorador() {

    //Tentando executar a requisição
    try{

        //Chamando a função que realiza a requisição na API
        let response = await getReclamacoesMoradorAPI()

        //Convertendo o JSON para objetos no JS
        let json = await response.json()

        //Desestruturando a resposta da API
        const { message, status, data} = json

        //Verifica se houve algum erro na requisição
        if(status != 200){

            //Para a execução do try e lança um erro para o catch
            throw("Erro na requisição " + status)
        }

        //Retornando os dados
        return data
    }
    //Caso aconteça algum erro na requisição, cai nesse bloco
    catch(erro){

        //Exibe o erro no console
        console.error("Erro ao buscar as reclamações do morador na API:", erro)

    }

}

//Função que cadastra a reclamação do morador
export async function insertReclamacao(reclamacao) {

    //Tentando executar a requisição
    try{

        //Chamando a função que realiza a requisição na API
        let response = await insertReclamacaoAPI(reclamacao)

        //Convertendo o JSON para objetos no JS
        let json = await response.json()

        //Desestruturando a resposta da API
        const { message, status, data} = json

        //Verifica se houve algum erro na requisição
        if(status != 200){

            //Para a execução do try e lança um erro para o catch
            throw("Erro na requisição " + status)
        }

        //Retornando a mensagem
        return message
    }
    //Caso aconteça algum erro na requisição, cai nesse bloco
    catch(erro){

        //Exibe o erro no console
        console.error("Erro ao cadastrar a reclamação na API:", erro)

    }

}

//Função que deleta a reclamação do morador
export async function deleteReclamacao(id) {

    //Tentando executar a requisição
    try{

        //Chamando a função que realiza a requisição na API
        let response = await deleteReclamacaoAPI(id)

        //Convertendo o JSON para objetos no JS
        let json = await response.json()

        //Desestruturando a resposta da API
        const { message, status, data} = json

        //Verifica se houve algum erro na requisição
        if(status != 200){

            //Para a execução do try e lança um erro para o catch
            throw("Erro na requisição " + status)
        }

        //Retornando a mensagem
        return message
    }
    //Caso aconteça algum erro na requisição, cai nesse bloco
    catch(erro){

        //Exibe o erro no console
        console.error("Erro ao deletar a reclamação na API:", erro)

    }

}