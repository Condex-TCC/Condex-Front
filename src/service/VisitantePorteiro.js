//Arquivo responsavel por fornecer os visitantes para o porteiro

import { getVisitantesPorteiroAPI, insertVisitantePorteiroAPI } from "../api/VisitantePorteiroApi"
import { lerJson, montarMensagemErro } from "../utils/erroApi"

//Função que desembrulha a lista que vem dentro de um array extra
//A API devolve { data: [ [visitantes] ] }, então o primeiro passo é
//sempre pegar o primeiro elemento quando ele for uma lista
function desembrulharLista(data){

    //Sem dado devolvido, a tela recebe uma lista vazia
    if(!Array.isArray(data)){

        return []
    }

    //Desembrulha o array extra quando a API responde com lista de listas
    return Array.isArray(data[0]) ? data[0] : data
}

//Função que converte o registro devolvido pela API no formato usado pelo card
//Campos reais da API: id, name, cpf, resident_id (morador) e employee_id (porteiro)
//
//Regra de negócio da API:
//  resident_id preenchido e employee_id nulo        -> cadastrado pelo MORADOR
//  resident_id preenchido e employee_id preenchido  -> cadastrado pelo PORTEIRO
//Os dois casos são visitantes válidos, então nenhum registro é descartado
//por causa do employee_id nulo
function paraVisitante(visitante){

    return {
        id: visitante.id,
        nome: visitante.name,
        cpf: visitante.cpf,
        moradorId: visitante.resident_id,
        porteiroId: visitante.employee_id,
        cadastradoPor: visitante.employee_id == null ? 'morador' : 'porteiro'
    }
}

//Função que obtem todos os visitantes cadastrados que o porteiro pode ver
//Devolve a lista quando a API responde com sucesso e null quando a requisição
//falha, para a tela diferenciar "sem visitantes" de "erro ao buscar"
export async function getVisitantesPorteiro() {

    //Tenta executar a requisição
    try{

        //Chamando a função que realiza a requisição na API
        let response = await getVisitantesPorteiroAPI()

        //Convertendo o JSON para objetos no JS
        let json = await lerJson(response)

        //Verifica se houve algum erro na requisição
        //O status HTTP é usado porque os erros do Laravel (401, 403, 500)
        //não trazem o campo "status" no corpo da resposta
        if(!response.ok){

            //Para a execução do try e lança um erro para o catch
            throw(montarMensagemErro(json, response.status, "Não foi possível buscar os visitantes."))
        }

        //Converte cada registro da API no formato esperado pelo card
        return desembrulharLista(json.data).map(paraVisitante)
    }
    //Caso aconteça algum erro na requisição, cai nesse bloco
    catch(erro){

        //Exibe o erro no console para depuração
        console.error("Erro ao buscar os visitantes na API:", erro)

        //Sinaliza a falha para a tela
        return null
    }
}

//Função que cadastra um visitante feito pelo porteiro
//Devolve { sucesso, mensagem } para a tela saber se pode navegar ou se
//precisa mostrar o erro da API (CPF repetido, morador inexistente, etc.)
export async function cadastrarVisitantePorteiro(nome, cpf, idMorador) {

    //Tenta executar a requisição
    try{

        //Chamando a função que realiza a requisição na API
        let response = await insertVisitantePorteiroAPI(nome, cpf, idMorador)

        //Convertendo o JSON para objetos no JS
        let json = await lerJson(response)

        //Verifica se houve algum erro na requisição
        if(!response.ok){

            return {
                sucesso: false,
                mensagem: montarMensagemErro(json, response.status, "Não foi possível cadastrar o visitante.")
            }
        }

        //Retorna o sucesso com a mensagem da API
        return { sucesso: true, mensagem: json.message }
    }
    //Caso aconteça algum erro na requisição, cai nesse bloco
    catch(erro){

        //Exibe o erro no console para depuração
        console.error("Erro ao cadastrar o visitante na API:", erro)

        //Devolve uma mensagem amigável para a tela exibir
        return {
            sucesso: false,
            mensagem: "Não foi possível conectar à API. Verifique se o servidor está no ar."
        }
    }
}
