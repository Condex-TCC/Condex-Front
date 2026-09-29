//Arquivo responsável por fornecer os dados de visitantes do morador

//ATENÇÃO: hoje a aplicação está usando MOCK data porque ainda não existe
//uma API de visitantes para o morador (a única existente é a do porteiro em
//api/AutorizacaoApi.js). A estrutura dos objetos já segue o formato que a API
//deverá devolver, então, quando os endpoints ficarem prontos, basta trocar o
//retorno das funções abaixo pela requisição, seguindo o mesmo padrão de
//tratamento usado nos outros arquivos da pasta service.

//ESTRUTURA DE DADOS ESPERADA DA API

//Visitante com entrada liberada e dentro do condomínio
//{ id, nome, documento, bloco, apartamento, entrada, saidaPrevista, status }

//Visita previamente cadastrada/agendada pelo morador
//{ id, nome, documento, data, horario, saidaPrevista, status }

//Lista de visitantes que estão dentro do condomínio no momento
const visitantesAtivos = [
    {
        id: 1,
        nome: 'Maria de Souza Oliveira',
        documento: '123.456.789-00',
        bloco: 'A',
        apartamento: '102',
        entrada: '14:20',
        saidaPrevista: '18:00',
        status: 'Em andamento'
    },
    {
        id: 2,
        nome: 'Carlos Eduardo Ramos',
        documento: '987.654.321-00',
        bloco: 'B',
        apartamento: '351',
        entrada: '16:45',
        saidaPrevista: '20:00',
        status: 'Em andamento'
    }
]

//Lista de visitantes previamente cadastrados que ainda vão chegar
const proximasVisitas = [
    {
        id: 1,
        nome: 'Ana Paula Ferreira',
        documento: '456.789.123-00',
        data: '2026-10-05',
        horario: '09:00',
        saidaPrevista: '12:00',
        status: 'Agendada'
    },
    {
        id: 2,
        nome: 'Roberto Alves Lima',
        documento: '321.987.654-00',
        data: '2026-10-08',
        horario: '15:30',
        saidaPrevista: '19:00',
        status: 'Agendada'
    },
    {
        id: 3,
        nome: 'Juliana Martins Costa',
        documento: '789.123.456-00',
        data: '2026-10-12',
        horario: '11:15',
        saidaPrevista: '14:00',
        status: 'Agendada'
    }
]

//Função que obtem os visitantes que possuem entrada ativa
export async function getVisitantesAtivos() {

    //Devolve uma cópia da lista para que a tela não altere a fonte dos dados
    return visitantesAtivos.map((visitante) => ({ ...visitante }))
}

//Função que obtem as visitas previamente cadastradas, da mais próxima para a mais distante
export async function getProximasVisitas() {

    //Copia a lista para poder ordenar sem alterar a fonte dos dados
    const copia = proximasVisitas.map((visita) => ({ ...visita }))

    //Ordena pela data e, dentro do mesmo dia, pelo horário
    copia.sort((a, b) => {

        //Junta data e horário para comparar as visitas como um único momento
        const momentoA = `${a.data}T${a.horario}`
        const momentoB = `${b.data}T${b.horario}`

        //string no formato ISO pode ser comparada diretamente
        return momentoA.localeCompare(momentoB)
    })

    return copia
}

//Função que cadastra um visitante previamente, deixando ele agendado para uma próxima visita
export async function criarVisitaPreCadastrada(visita) {

    //Gera um identificador único para o novo registro
    const novoId = proximasVisitas.length > 0
        ? Math.max(...proximasVisitas.map((item) => item.id)) + 1
        : 1

    //Monta o registro no mesmo formato devolvido pela API
    const novoRegistro = {
        id: novoId,
        nome: visita.nome,
        documento: visita.documento,
        data: visita.data,
        horario: visita.horario,
        saidaPrevista: visita.saidaPrevista,
        status: 'Agendada'
    }

    //Guarda o registro na lista
    proximasVisitas.push(novoRegistro)

    //Devolve a mensagem para a tela exibir
    return `Visita de ${novoRegistro.nome} cadastrada com sucesso!`
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
