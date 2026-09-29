//Versões fictícias das funções da camada de api do módulo do porteiro.
//
//Cada função devolve exatamente o mesmo formato que a API real devolve,
//inclusive o mesmo formato de erro, para que nenhuma tela precise mudar.

import {
    adicionarEncomenda,
    listarAtivos,
    listarAutorizacoes,
    listarEncomendas,
    registrarRetirada,
    removerAutorizacao
} from './dados'
import { criarErro, criarResposta, esperar } from './resposta'

//Limite de caracteres da descrição, o mesmo exigido pelo backend
const LIMITE_DESCRICAO = 150

//Mensagem que aparece no cartão de encomenda quando o visitante não
//informou a data de recebimento
const SEM_DATA = '—'

//Função que monta o texto de quando a encomenda foi recebida, a partir
//dos campos separados do formulário
function montarRecebida({ dia, mes, ano, hora }) {

    //Sem dia, mês e ano completos não há data para mostrar
    if(!dia || !mes || !ano){

        return SEM_DATA
    }

    //Com a hora junto, mostra data e hora
    if(hora){

        return `${dia}/${mes}/${ano} às ${hora}`
    }

    //Sem a hora, mostra apenas a data
    return `${dia}/${mes}/${ano}`
}

//Função que devolve a data e a hora atuais no formato usado nos cartões
function agora() {

    //Pega a data do navegador
    const agora = new Date()

    //Junta os dois números com dois dígitos cada
    const doisDigitos = (numero) => String(numero).padStart(2, '0')

    return `${doisDigitos(agora.getDate())}/${doisDigitos(agora.getMonth() + 1)}/${agora.getFullYear()} às ${doisDigitos(agora.getHours())}:${doisDigitos(agora.getMinutes())}`
}

//Função fictícia que devolve todas as encomendas
export async function getEncomendasMock() {

    //Espera a latência configurada
    await esperar()

    //A API real devolve a lista dentro de um array extra, então o mock
    //mantém esse mesmo formato para não quebrar a normalização da tela
    return criarResposta({
        message: 'Encomendas recuperadas com sucesso!',
        data: [listarEncomendas()]
    })
}

//Função fictícia que cadastra uma encomenda nova
export async function insertEncomendaMock(nome, descricao, detalhes = {}) {

    //Espera a latência configurada
    await esperar()

    //O nome do destinatário é obrigatório
    if(!nome || !nome.trim()){

        return criarErro('Os dados passados não estão corretos!', 400)
    }

    //A descrição é obrigatória e tem limite de tamanho
    if(!descricao || !descricao.trim() || descricao.length > LIMITE_DESCRICAO){

        return criarErro('Os dados passados não estão corretos!', 400)
    }

    //Monta o registro com os campos que a API ainda não tem onde guardar,
    //como bloco, apartamento e data de recebimento
    const encomenda = adicionarEncomenda({
        nome: nome.trim(),
        descricao: descricao.trim(),
        bloco: detalhes.bloco || null,
        apartamento: detalhes.apartamento || null,
        recebida: montarRecebida(detalhes),
        porteiro: 1,
        data: null
    })

    return criarResposta({
        message: 'Encomenda cadastrada com sucesso!',
        data: [encomenda]
    }, 201)
}

//Função fictícia que registra a retirada de uma encomenda
export async function withdrawEncomendaMock(id) {

    //Espera a latência configurada
    await esperar()

    //Tenta marcar a data da retirada
    const encomenda = registrarRetirada(id, agora(), 'Porteiro do turno')

    //Quando o id não existe, devolve o mesmo erro do backend
    if(!encomenda){

        return criarErro('Encomenda não encontrada!', 404)
    }

    return criarResposta({
        message: 'Retirada da encomenda registrada com sucesso!',
        data: [encomenda]
    })
}

//Função fictícia que devolve os visitantes autorizados que aguardam entrada
export async function getAuthorizedVisitorsMock() {

    //Espera a latência configurada
    await esperar()

    return criarResposta({
        message: 'Visitantes autorizados recuperados com sucesso!',
        data: [listarAutorizacoes()]
    })
}

//Função fictícia que libera a entrada de um visitante autorizado
export async function allowEntryMock(id) {

    //Espera a latência configurada
    await esperar()

    //Tira da lista de espera e coloca na lista de ativos
    const resultado = removerAutorizacao(id)

    //Quando o id não existe, devolve o mesmo erro do backend
    if(!resultado){

        return criarErro('Autorização não encontrada!', 404)
    }

    return criarResposta({
        message: 'Entrada do visitante registrada com sucesso!',
        data: [resultado.ativo]
    })
}

//Função fictícia que devolve os visitantes que já estão dentro do condomínio.
//A API real ainda não tem um endpoint para essa lista, então enquanto o mock
//estiver ligado é ele quem fornece esses dados.
export async function getActiveVisitorsMock() {

    //Espera a latência configurada
    await esperar()

    return criarResposta({
        message: 'Visitantes ativos recuperados com sucesso!',
        data: [listarAtivos()]
    })
}
