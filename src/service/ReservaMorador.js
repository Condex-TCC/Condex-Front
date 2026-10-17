//Arquivo responsável por tratar as requisições de reservas e espaços do morador

import { cancelReservaMoradorAPI, createReservaMoradorAPI, getEspacosMoradorAPI, getReservasMoradorAPI } from "../api/ReservaMoradorApi"
import { dataHojeIso } from "./Reservas"

//Mensagem exibida quando a API não responde
const MENSAGEM_SEM_CONEXAO = "Não foi possível conectar à API. Verifique se o servidor está no ar."

//Função que lê o JSON da resposta sem quebrar caso o corpo venha vazio ou inválido
async function lerResposta(response){

    //Tenta converter o corpo da resposta
    try{

        return await response.json()
    }
    catch{

        //Sem corpo válido, devolve um objeto vazio
        return {}
    }
}

//Função que transforma os erros de validação da API em um texto legível
//A API devolve os erros no formato [ {campo: [mensagens]} ]
function juntaErros(errors){

    //Sem lista de erros, não há detalhes para mostrar
    if(!Array.isArray(errors)){

        return ""
    }

    //Abre cada item e junta todas as mensagens
    return errors
        .map((erro) => typeof erro === "object" && erro !== null
            ? Object.values(erro).flat().join(" ")
            : String(erro))
        .join(" ")
        .trim()
}

//Função que devolve a mensagem para os erros de autenticação e de servidor
function mensagemPorStatusHttp(status, mensagemApi){

    //Token expirado ou inválido
    if(status === 401){

        return "Sua sessão expirou. Faça login novamente."
    }

    //A API só libera estas rotas para token de morador | Acontece quando a sessão é de síndico ou porteiro
    if(status === 403){

        return "Sua sessão não tem permissão de morador. Saia e entre novamente com uma conta de morador."
    }

    //Erro interno ou qualquer outro status inesperado
    return mensagemApi || "Ocorreu um erro inesperado. Tente novamente."
}

//Função que obtem os espaços que o morador pode reservar
//Devolve { sucesso, dados, mensagem }
export async function getEspacosMorador() {

    //Tenta executar a requisição
    try{

        //Chamando a função que realiza a requisição na API
        let response = await getEspacosMoradorAPI()
        let json = await lerResposta(response)

        //Verifica se houve algum erro na requisição
        if(!response.ok){

            return { sucesso: false, dados: [], mensagem: mensagemPorStatusHttp(response.status, json.message) }
        }

        //Garante que a tela sempre receba uma lista
        return { sucesso: true, dados: Array.isArray(json.data) ? json.data : [], mensagem: json.message }
    }
    //Caso aconteça algum erro na requisição, cai nesse bloco
    catch(erro){

        console.error("Erro ao buscar os espaços na API:", erro)

        return { sucesso: false, dados: [], mensagem: MENSAGEM_SEM_CONEXAO }
    }
}

//Função que obtem todas as reservas do morador logado
//Devolve { sucesso, dados, mensagem }
export async function getReservasMorador() {

    //Tenta executar a requisição
    try{

        //Chamando a função que realiza a requisição na API
        let response = await getReservasMoradorAPI()
        let json = await lerResposta(response)

        //Verifica se houve algum erro na requisição
        if(!response.ok){

            return { sucesso: false, dados: [], mensagem: mensagemPorStatusHttp(response.status, json.message) }
        }

        //As reservas chegam dentro de data.reservas
        const reservas = json.data?.reservas

        //Garante que a tela sempre receba uma lista
        return { sucesso: true, dados: Array.isArray(reservas) ? reservas : [], mensagem: json.message }
    }
    //Caso aconteça algum erro na requisição, cai nesse bloco
    catch(erro){

        console.error("Erro ao buscar as reservas na API:", erro)

        return { sucesso: false, dados: [], mensagem: MENSAGEM_SEM_CONEXAO }
    }
}

//Função que solicita uma nova reserva
//Recebe { idEspaco, data (aaaa-mm-dd), inicio (hh:mm), fim (hh:mm) }
//Devolve { sucesso, tipo, mensagem, dados } | tipo: 'indisponivel', 'validacao' ou 'erro'
export async function solicitaReserva({ idEspaco, data, inicio, fim }) {

    //Tenta executar a requisição
    try{

        //A API espera a data como dd/mm/aaaa e os horários como hh:mm:ss
        const [ano, mes, dia] = data.split('-')
        const dataApi = `${dia}/${mes}/${ano}`
        const inicioApi = inicio.length === 5 ? `${inicio}:00` : inicio
        const fimApi = fim.length === 5 ? `${fim}:00` : fim

        //Chamando a função que realiza a requisição na API
        let response = await createReservaMoradorAPI(idEspaco, dataApi, inicioApi, fimApi)
        let json = await lerResposta(response)

        //Reserva criada com sucesso
        if(response.ok){

            return { sucesso: true, mensagem: json.message, dados: json.data }
        }

        //Erros de autenticação ou de servidor
        if(response.status !== 400 && response.status !== 422){

            return { sucesso: false, tipo: 'erro', mensagem: mensagemPorStatusHttp(response.status, json.message) }
        }

        //A API responde 400 sem lista de erros quando o horário já está ocupado
        const detalhes = juntaErros(json.errors)
        const conflito = detalhes === "" || /reservad/i.test(json.message || "")

        //Horário indisponível
        if(conflito){

            return {
                sucesso: false,
                tipo: 'indisponivel',
                mensagem: `${json.message || "Este espaço já está reservado neste horário."} Escolha outro horário ou outra data.`
            }
        }

        //Dados recusados pela validação da API
        return {
            sucesso: false,
            tipo: 'validacao',
            mensagem: `${json.message || "Os dados informados não estão corretos."} ${detalhes}`.trim()
        }
    }
    //Caso aconteça algum erro na requisição, cai nesse bloco
    catch(erro){

        console.error("Erro ao solicitar a reserva na API:", erro)

        return { sucesso: false, tipo: 'erro', mensagem: MENSAGEM_SEM_CONEXAO }
    }
}

//Função que cancela uma reserva do morador
//Devolve { sucesso, mensagem }
export async function cancelaReservaMorador(id) {

    //Tenta executar a requisição
    try{

        //Chamando a função que realiza a requisição na API
        let response = await cancelReservaMoradorAPI(id)
        let json = await lerResposta(response)

        //Verifica se houve algum erro na requisição
        if(!response.ok){

            return { sucesso: false, mensagem: mensagemPorStatusHttp(response.status, json.message) }
        }

        //Retorna o sucesso com a mensagem da API
        return { sucesso: true, mensagem: json.message || "Reserva cancelada com sucesso." }
    }
    //Caso aconteça algum erro na requisição, cai nesse bloco
    catch(erro){

        console.error("Erro ao cancelar a reserva na API:", erro)

        return { sucesso: false, mensagem: MENSAGEM_SEM_CONEXAO }
    }
}

//Função que diz se o status representa uma reserva cancelada
export function reservaCancelada(status) {

    return status === 'cancelada'
}

//Função que diz se o status representa uma reserva confirmada
//ATENÇÃO: quando o síndico aprova, a API grava "confimada" (com erro de digitação),
//enquanto as reservas que não exigem aprovação são gravadas como "confirmada"
export function reservaConfirmada(status) {

    return status === 'confirmada' || status === 'confimada'
}

//Função que devolve o texto exibido para cada status da reserva
export function rotuloStatusReserva(status) {

    //Reserva aguardando a decisão do síndico
    if(status === 'pendente'){

        return 'Aguardando aprovação'
    }

    //Reserva aprovada
    if(reservaConfirmada(status)){

        return 'Confirmada'
    }

    //Reserva cancelada pelo morador ou recusada pelo síndico
    if(reservaCancelada(status)){

        return 'Cancelada'
    }

    //Qualquer outro valor é exibido como veio da API
    return status || 'Sem status'
}

//Função que diz se a reserva ainda vai acontecer e não está cancelada
//Somente essas reservas podem ser canceladas pelo morador
export function reservaAtiva(reserva) {

    //Reservas canceladas nunca são ativas
    if(reservaCancelada(reserva.status)){

        return false
    }

    //A reserva termina na data e no horário de fim | Compara com o momento atual
    const fim = `${String(reserva.data).slice(0, 10)}T${String(reserva.fim).slice(0, 5)}`
    const agora = new Date()
    const mes = String(agora.getMonth() + 1).padStart(2, '0')
    const dia = String(agora.getDate()).padStart(2, '0')
    const hora = String(agora.getHours()).padStart(2, '0')
    const minuto = String(agora.getMinutes()).padStart(2, '0')
    const momentoAtual = `${agora.getFullYear()}-${mes}-${dia}T${hora}:${minuto}`

    //Datas no formato aaaa-mm-ddThh:mm podem ser comparadas como texto
    return fim >= momentoAtual
}

//Função que diz se dois intervalos de horário (hh:mm) se sobrepõem
//Usa a mesma regra da API: o início de um é anterior ao fim do outro e vice-versa
export function horariosSeSobrepoem(inicioA, fimA, inicioB, fimB) {

    return inicioA.slice(0, 5) < fimB.slice(0, 5) && fimA.slice(0, 5) > inicioB.slice(0, 5)
}

//Função que devolve as reservas do próprio morador que ainda ocupam o espaço naquele dia
export function reservasDoMoradorNoDia(reservas, idEspaco, data) {

    return reservas.filter((reserva) =>
        String(reserva.espaco_id) === String(idEspaco)
        && String(reserva.data).slice(0, 10) === data
        && !reservaCancelada(reserva.status)
    )
}

//Função que valida o formulário de solicitação antes de enviar para a API
//Devolve o texto do erro ou uma string vazia quando os dados são válidos
export function validaSolicitacaoReserva({ idEspaco, data, inicio, fim }, reservasDoMorador) {

    //Todos os campos são obrigatórios na API
    if(!idEspaco){

        return "Selecione a área comum que deseja reservar."
    }

    if(!data){

        return "Informe a data da reserva."
    }

    if(!inicio || !fim){

        return "Informe o horário de início e de fim da reserva."
    }

    //Não permite reservar em datas que já passaram
    const hoje = dataHojeIso()

    if(data < hoje){

        return "A data da reserva não pode estar no passado."
    }

    //O fim precisa ser depois do início, dentro do mesmo dia
    if(fim <= inicio){

        return "O horário de fim precisa ser depois do horário de início."
    }

    //Se a reserva é para hoje, o início não pode já ter passado
    if(data === hoje){

        const agora = new Date()
        const hora = String(agora.getHours()).padStart(2, '0')
        const minuto = String(agora.getMinutes()).padStart(2, '0')

        if(inicio <= `${hora}:${minuto}`){

            return "O horário de início já passou. Escolha um horário futuro."
        }
    }

    //Impede a solicitação que conflita com outra reserva do próprio morador
    const conflito = reservasDoMoradorNoDia(reservasDoMorador, idEspaco, data)
        .find((reserva) => horariosSeSobrepoem(inicio, fim, reserva.inicio, reserva.fim))

    if(conflito){

        return `Você já possui uma reserva neste espaço das ${conflito.inicio.slice(0, 5)} às ${conflito.fim.slice(0, 5)} neste dia.`
    }

    //Dados válidos
    return ""
}
