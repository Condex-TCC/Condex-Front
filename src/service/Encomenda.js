//Arquivo responsavel por solicitar a requisição e trata-la

import { getEncomendasAPI, insertEncomendaAPI, withdrawEncomendaAPI } from "../api/EncomendaApi"
import { lerJson, montarMensagemErro } from "../utils/erroApi"

//Mensagem exibida quando o frontend não consegue falar com o servidor
const MENSAGEM_SEM_CONEXAO = "Não foi possível conectar à API. Verifique se o servidor está no ar."

//Função que obtem todas as encomendas
//Devolve a lista quando a API responde com sucesso e null quando a requisição
//falha, para a tela conseguir diferenciar "sem encomendas" de "erro ao buscar"
export async function getEncomendas() {

    //Tendanto executar a requisição
    try{

        //Chamando a função que realiza a requisição no API
        let response = await getEncomendasAPI()

        //Convertendo o JSON para objetos no JS
        let json = await lerJson(response)

        //Verifica se houve algum erro na requisição
        //O status HTTP é usado porque os erros do Laravel (401, 403, 500)
        //não trazem o campo "status" no corpo da resposta
        if(!response.ok){

            //Para a execução do try e lança um erro para o catch
            throw(montarMensagemErro(json, response.status, "Não foi possível buscar as encomendas."))
        }

        //Retornando a lista de encomendas
        return json.data
    }
    //Casso aconteça algum erro na requisição, cai nesse bloco
    catch(erro){

        //Exibe o erro no console para depuração
        console.error("Erro ao buscar as encomendas na API:", erro)

        //Sinaliza a falha para a tela
        return null
    }

}

//Função que cadastra uma nova encomenda
//Recebe o nome do destinatário, a descrição e o id do morador destinatário, que a
//API exige em "id_morador". O parâmetro detalhes leva bloco, apartamento e data do
//formulário. A API real ainda não tem colunas para esses dados, então são ignorados
//na requisição e só aproveitados pelo mock
//Devolve { sucesso, mensagem } para a tela saber se pode navegar ou se precisa
//mostrar o erro devolvido pela API
export async function cadastrarEncomenda(nome, descricao, idMorador, detalhes = {}) {

    //Tendanto executar a requisição
    try{

        //Chamando a função que realiza a requisição no API
        let response = await insertEncomendaAPI(nome, descricao, idMorador, detalhes)

        //Convertendo o JSON para objetos no JS
        let json = await lerJson(response)

        //Verifica se houve algum erro na requisição
        if(!response.ok){

            return {
                sucesso: false,
                mensagem: montarMensagemErro(
                    json,
                    response.status,
                    "Não foi possível cadastrar a encomenda.",
                    //Erro 500 aqui costuma ser o banco recusando um id_morador que não existe
                    "Não foi possível cadastrar a encomenda. Verifique se o ID do morador existe."
                )
            }
        }

        //Retornando o sucesso com a menssagem da API
        return {
            sucesso: true,
            mensagem: json.message
        }
    }
    //Casso aconteça algum erro na requisição, cai nesse bloco
    catch(erro){

        //Exibe o erro no console para depuração
        console.error("Erro ao cadastrar a encomenda na API:", erro)

        //Devolve uma mensagem amigável para a tela exibir
        return {
            sucesso: false,
            mensagem: MENSAGEM_SEM_CONEXAO
        }
    }

}

//Função que registra a retirada de uma encomenda
//Devolve { sucesso, mensagem } para a tela exibir a mensagem real da API,
//como "Esta encomenda já foi retirada!"
export async function registrarRetiradaEncomenda(id) {

    //Tendanto executar a requisição
    try{

        //Chamando a função que realiza a requisição no API
        let response = await withdrawEncomendaAPI(id)

        //Convertendo o JSON para objetos no JS
        let json = await lerJson(response)

        //Verifica se houve algum erro na requisição
        if(!response.ok){

            return {
                sucesso: false,
                mensagem: montarMensagemErro(json, response.status, "Não foi possível registrar a retirada da encomenda.")
            }
        }

        //Retornando o sucesso com a menssagem da API
        return {
            sucesso: true,
            mensagem: json.message
        }
    }
    //Casso aconteça algum erro na requisição, cai nesse bloco
    catch(erro){

        //Exibe o erro no console para depuração
        console.error("Erro ao registrar a retirada da encomenda na API:", erro)

        //Devolve uma mensagem amigável para a tela exibir
        return {
            sucesso: false,
            mensagem: MENSAGEM_SEM_CONEXAO
        }
    }

}
