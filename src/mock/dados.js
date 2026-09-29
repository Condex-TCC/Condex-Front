//Dados fictícios do módulo do porteiro, guardados em memória.
//
//Os registros abaixo seguem o formato que a API real devolve hoje, com
//alguns campos a mais que o banco ainda não tem, como bloco, apartamento
//e data de recebimento. São esses campos que aparecem nos cards e que a
//API ainda não tem onde guardar.

//Lista de encomendas, com as que já foram retiradas e as que ainda estão
//pendentes, misturadas de propósito para exercitar as duas seções da tela
const encomendasIniciais = [
    {
        id: 1,
        nome: 'Caixa Magazine Luiza',
        descricao: 'Caixa grande, não coube na caixa de correio.',
        bloco: 'A',
        apartamento: '101',
        recebida: '25/09/2026 às 14:30',
        porteiro: 1,
        data: null
    },
    {
        id: 2,
        nome: 'Caixa Amazon',
        descricao: 'Encomenda de eletrônico, marcada como frágil.',
        bloco: 'A',
        apartamento: '202',
        recebida: '26/09/2026 às 09:05',
        porteiro: 1,
        data: null
    },
    {
        id: 3,
        nome: 'Pacote Correios',
        descricao: 'Documento envelope com cobrança.',
        bloco: 'B',
        apartamento: '303',
        recebida: '27/09/2026 às 18:20',
        porteiro: 1,
        data: null
    },
    {
        id: 4,
        nome: 'Encomenda Shopee',
        descricao: 'Caixa pequena, deixou na portaria.',
        bloco: 'B',
        apartamento: '404',
        recebida: '28/09/2026 às 08:45',
        porteiro: 1,
        data: null
    },
    {
        id: 5,
        nome: 'Encomenda Mercado Livre',
        descricao: 'Caixa média, retirada autorizada pelo morador.',
        bloco: 'C',
        apartamento: '101',
        recebida: '20/09/2026 às 11:00',
        porteiro: 1,
        data: '21/09/2026 às 19:10',
        retirado_por: 'Norwood Rath'
    },
    {
        id: 6,
        nome: 'Cesta de Natal',
        descricao: 'Encomenda grande, retirada pelo próprio porteiro.',
        bloco: 'C',
        apartamento: '202',
        recebida: '18/09/2026 às 15:00',
        porteiro: 1,
        data: '19/09/2026 às 10:30',
        retirado_por: 'Claudia Kiehn'
    }
]

//Autorizações de visitantes que já estão liberadas e aguardam a entrada
const autorizacoesIniciais = [
    {
        id: 10,
        data: '28/09/2026 às 08:00',
        visitante: {
            nome: 'Matias Henrique',
            apartamento: '101'
        },
        morador: {
            nome: 'Norwood Rath'
        }
    },
    {
        id: 11,
        data: '28/09/2026 às 09:30',
        visitante: {
            nome: 'Camila Ferreira',
            apartamento: '303'
        },
        morador: {
            nome: 'Duane Heidenreich'
        }
    },
    {
        id: 12,
        data: '28/09/2026 às 10:15',
        visitante: {
            nome: 'Roberto Marques',
            apartamento: '404'
        },
        morador: {
            nome: 'Norwood Rath'
        }
    }
]

//Visitantes que já registraram entrada e estão dentro do condomínio
const ativosIniciais = [
    {
        id: 20,
        nome: 'Juliana Prado',
        bloco: 'A',
        apartamento: '202',
        morador: {
            nome: 'Claudia Kiehn'
        },
        entrada: '28/09/2026 às 07:45'
    },
    {
        id: 21,
        nome: 'Paulo Andrade',
        bloco: 'B',
        apartamento: '101',
        morador: {
            nome: 'Duane Heidenreich'
        },
        entrada: '28/09/2026 às 08:20'
    }
]

//Estado mutável do mock. Os arrays são clonados a cada leitura pública
//para que nenhuma tela consiga alterar os dados por engano
const estado = {
    encomendas: [...encomendasIniciais],
    autorizacoes: [...autorizacoesIniciais],
    ativos: [...ativosIniciais],
    proximoIdEncomenda: 100,
    proximoIdAtivo: 100
}

//Função que devolve a lista de encomendas
export function listarEncomendas() {

    return estado.encomendas.map((encomenda) => ({ ...encomenda }))
}

//Função que devolve a lista de autorizações que aguardam entrada
export function listarAutorizacoes() {

    return estado.autorizacoes.map((autorizacao) => ({ ...autorizacao }))
}

//Função que devolve a lista de visitantes dentro do condomínio
export function listarAtivos() {

    return estado.ativos.map((ativo) => ({ ...ativo }))
}

//Função que cadastra uma encomenda nova e devolve o registro criado
export function adicionarEncomenda(encomenda) {

    //Gera um id que não repete com o das encomendas iniciais
    const nova = { ...encomenda, id: estado.proximoIdEncomenda++ }

    estado.encomendas.unshift(nova)

    return { ...nova }
}

//Função que marca a data de retirada de uma encomenda
export function registrarRetirada(id, data, retiradoPor) {

    //Acha a encomenda pelo id
    const encomenda = estado.encomendas.find((item) => item.id === Number(id))

    //Não devolve nada quando o id não existe na lista
    if(!encomenda){

        return null
    }

    encomenda.data = data
    encomenda.retirado_por = retiradoPor

    return { ...encomenda }
}

//Função que remove a autorização depois que a entrada é registrada
export function removerAutorizacao(id) {

    //Acha a autorização pelo id
    const autorizacao = estado.autorizacoes.find((item) => item.id === Number(id))

    //Sai da função quando não existe a autorização informada
    if(!autorizacao){

        return null
    }

    //Tira da lista de quem está aguardando
    estado.autorizacoes = estado.autorizacoes.filter((item) => item.id !== Number(id))

    //Cria o registro de visitante dentro do condomínio
    const ativo = {
        id: estado.proximoIdAtivo++,
        nome: autorizacao.visitante.nome,
        bloco: null,
        apartamento: autorizacao.visitante.apartamento,
        morador: { nome: autorizacao.morador.nome },
        entrada: '28/09/2026 às 12:00'
    }

    estado.ativos.push(ativo)

    return { autorizacao: { ...autorizacao }, ativo: { ...ativo } }
}
