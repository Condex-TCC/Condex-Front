//Arquivo com funções usadas pela busca das listas do porteiro

//Função que transforma o texto digitado em filtros aceitos pela API de visitantes e visitas
//Texto só com números, pontos e traços é tratado como CPF | qualquer outro texto como nome
export function interpretarBuscaVisitante(termo){

    const texto = String(termo ?? '').trim()

    //Sem texto, não há filtro
    if(!texto){

        return {}
    }

    //Só dígitos, ponto, traço e espaço: o porteiro está procurando por CPF
    if(/^[\d.\-\s]+$/.test(texto) && /\d/.test(texto)){

        return { cpf: texto }
    }

    return { nome: texto }
}

//Função que transforma o texto digitado em filtros aceitos pela API de encomendas
export function interpretarBuscaEncomenda(termo){

    const texto = String(termo ?? '').trim()

    return texto ? { nome: texto } : {}
}

//Função que monta a query string (?nome=x&cpf=y) ignorando os filtros vazios
export function montarQuery(filtros = {}){

    const params = new URLSearchParams()

    Object.entries(filtros).forEach(([chave, valor]) => {

        if(valor !== undefined && valor !== null && String(valor).trim() !== ''){

            params.append(chave, String(valor).trim())
        }
    })

    const texto = params.toString()

    return texto ? `?${texto}` : ''
}

//Campos que nunca entram na busca de texto: ids, chaves estrangeiras, tokens, senhas e datas internas
const CAMPOS_IGNORADOS = /^(id|.*_id|id_.*|fk.*|pk.*|.*token.*|.*senha.*|.*password.*|created_at|updated_at)$/i

//Função que tira acentos e deixa o texto em minúsculas, para "joao" achar "João"
function normalizarTexto(valor){

    return String(valor).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
}

//Função que junta em um só texto todos os valores simples de um item (inclusive de objetos aninhados)
function textoDoItem(item, profundidade = 0){

    //Valores simples entram direto | datas ISO também entram no formato brasileiro (dd/mm/aaaa)
    if(typeof item === 'string' || typeof item === 'number'){

        const texto = String(item)
        const iso = texto.match(/^(\d{4})-(\d{2})-(\d{2})/)

        return iso ? `${texto} ${iso[3]}/${iso[2]}/${iso[1]}` : texto
    }

    //Evita percorrer estruturas muito profundas
    if(!item || typeof item !== 'object' || profundidade > 3){

        return ''
    }

    //Percorre listas e objetos, pulando os campos ignorados
    return Object.entries(item)
        .filter(([chave]) => Array.isArray(item) || !CAMPOS_IGNORADOS.test(chave))
        .map(([, valor]) => textoDoItem(valor, profundidade + 1))
        .join(' ')
}

//Função que filtra uma lista pelo texto digitado na barra de pesquisa do header
//Todas as palavras digitadas precisam aparecer em algum campo do item, sem diferenciar
//maiúsculas, minúsculas e acentos. Sem texto, devolve a lista original
export function filtrarPorTexto(lista, termo){

    //Lista inválida (ex.: a API falhou) vira lista vazia em vez de quebrar a tela
    if(!Array.isArray(lista)){

        return []
    }

    const palavras = normalizarTexto(termo ?? '').split(/\s+/).filter(Boolean)

    if(palavras.length === 0){

        return lista
    }

    return lista.filter((item) => {

        const texto = normalizarTexto(textoDoItem(item))

        return palavras.every((palavra) => texto.includes(palavra))
    })
}
