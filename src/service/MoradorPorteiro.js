//Arquivo responsavel por fornecer a lista de moradores para o porteiro

import { getMoradoresPorteiroAPI } from "../api/MoradorPorteiroApi"
import { lerJson, montarMensagemErro } from "../utils/erroApi"

//Função que busca os moradores para o porteiro selecionar
//Devolve a lista quando a API responde com sucesso e null quando falha,
//para a tela diferenciar "nenhum morador" de "erro ao buscar"
export async function getMoradoresPorteiro() {

    try{

        const response = await getMoradoresPorteiroAPI()
        const json = await lerJson(response)

        if(!response.ok){

            throw(montarMensagemErro(json, response.status, "Não foi possível buscar os moradores."))
        }

        //A API devolve a lista aninhada em data[0] ou direta em data
        return Array.isArray(json.data?.[0])
            ? json.data[0]
            : (Array.isArray(json.data) ? json.data : [])
    }
    catch(erro){

        console.error("Erro ao buscar os moradores na API:", erro)

        return null
    }
}

//Função que monta o texto de cada opção do morador (nome + unidade)
export function rotuloMorador(morador) {

    //Sem unidade cadastrada, mostra apenas o nome
    if(!morador.unidade){

        return morador.nome
    }

    //Junta bloco e número quando existirem
    const partes = []

    if(morador.unidade.bloco){ partes.push(`Bloco ${morador.unidade.bloco}`) }

    if(morador.unidade.numero){ partes.push(`Apto ${morador.unidade.numero}`) }

    //Sem bloco nem número, fica só o nome
    if(partes.length === 0){

        return morador.nome
    }

    return `${morador.nome} - ${partes.join(' / ')}`
}
