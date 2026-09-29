//Arquivo responsável por fornecer os dados de visitantes do morador

import { getVisitantesMoradorAPI, insertVisitanteMoradorAPI } from "../api/VisitanteMoradorApi"

//ATENÇÃO: a tabela de visitantes da API guarda apenas nome, cpf e o morador
//responsável. Os campos de agendamento (data, horário de chegada e saída
//prevista) não possuem coluna no banco, por isso não são exibidos nas telas.
//Assim que o backend criar essas colunas, basta devolvê-las no mapeamento
//abaixo para que os cards voltem a mostrar a data e o horaário da visita.

//Função que desembrulha a lista que vem dentro de um array extra
//A API devolve { data: [ [visitantes] ], então o primeiro passo é
//sempre pegar o primeiro elemento quando ele for uma lista
function desembrulharLista(data){

    //Sem dado devolvido, a tela recebe uma lista vazia
    if(!Array.isArray(data)){

        return []
    }

    //Desembrulha o array extra quando a API responde com lista de listas
    return Array.isArray(data[0]) ? data[0] : data
}

//Função que converte o registro bruto da API no formato usado pelos cards
function paraVisita(visitante){

    return {
        id: visitante.pk_id_visitante,
        nome: visitante.nome_visitante,
        documento: visitante.cpf_visitante,
        data: null, //A API ainda não possui essa coluna
        horario: null, //A API ainda não possui essa coluna
        saidaPrevista: null, //A API ainda não possui essa coluna
        status: 'Cadastrado'
    }
}

//Função que obtem os visitantes que possuem entrada ativa
//PENDENTE: a API não expõe um endpoint com os visitantes que já entraram,
//então a lista devolve vazia e a tela mostra o estado vazio corretamente
export async function getVisitantesAtivos() {

    return []
}

//Função que obtem os visitantes previamente cadastrados pelo morador logado
export async function getProximasVisitas() {

    //Tenta executar a requisição
    try{

        //Chamando a função que realiza a requisição na API
        let response = await getVisitantesMoradorAPI()

        //Convertendo o JSON para objetos no JS
        let json = await response.json()

        //Desestrutura a promisse
        const { status, data } = json

        //Verifica se houve algum erro na requisição
        if(status != 200){

            //Para a execução do try e lança um erro para o catch
            throw("Erro na requisição " + status)
        }

        //Converte cada registro bruto no formato esperado pelos cards
        return desembrulharLista(data).map(paraVisita)
    }
    //Caso aconteça algum erro na requisição, cai nesse bloco
    catch(erro){

        //Exibe um alerta na tela
        console.error("Erro ao buscar os visitantes na API:", erro)

        //Devolve lista vazia para a tela não quebrar
        return []
    }
}

//Função que cadastra um novo visitante para o morador logado
//Recebe { nome, documento } e devolve { sucesso, mensagem } para a tela
//saber se pode navegar ou se precisa mostrar o erro da API
export async function criarVisitaPreCadastrada(visita) {

    //Tenta executar a requisição
    try{

        //A API espera o CPF no campo "cpf"
        let response = await insertVisitanteMoradorAPI(visita.nome, visita.documento)

        //Convertendo o JSON para objetos no JS
        let json = await response.json()

        //Desestrutura a promisse
        const { message, status, errors } = json

        //Verifica se houve algum erro na requisição
        if(status != 201 && status != 200){

            //A API devolve os erros no formato [ {campo: [mensagens]} ],
            //então cada item precisa ser aberto para virar texto legível
            let detalhes = ""

            if(Array.isArray(errors)){

                detalhes = errors

                    //Desembrulha cada item | Object.values pega as mensagens do campo
                    .map((erro) => typeof erro === "object" && erro !== null
                        ? Object.values(erro).flat().join(" ")
                        : String(erro))

                    .join(" ")
            }

            return {
                sucesso: false,
                mensagem: `${message || "Não foi possível cadastrar o visitante"} ${detalhes}`.trim()
            }
        }

        //Retorna o sucesso com a mensagem da API
        return {
            sucesso: true,
            mensagem: message
        }
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

//Função auxiliar que converte a data no padrão ISO (2026-10-05) para o padrão brasileiro (05/10/2026)
export function formatarDataBrasileira(dataIso) {

    //Se não existir data, não tenta formatar
    if(!dataIso){

        return ''
    }

    //Quebra a data do formato ISO e monta no padrão brasileiro
    const [ano, mes, dia] = dataIso.split('-')

    return `${dia}/${mes}/${ano}`
}
