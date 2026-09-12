//Arquivo responsavel por intermediar a lógica entre o formulário de visitante e a
//lista de moradores (usada para o porteiro escolher para quem o visitante está indo)

import { getMoradoresPorteiroAPI } from "../api/MoradorPorteiroApi"
import { desembrulharLista } from "./utils"

//Função que recupera todos os moradores (visão do porteiro)
export async function obtendoMoradoresParaPorteiro() {

    //Tentando executar a requisição
    try {

        let response = await getMoradoresPorteiroAPI()

        let json = await response.json()

        const { message, status, data } = json

        if (!response.ok || status !== 200) {

            throw (message || ("Erro na requisição " + status))
        }

        //Normaliza a lista (a API pode devolver um array "duplo")
        return desembrulharLista(data)
    }
    catch (erro) {

        console.error("Erro ao buscar moradores:", erro)

        //Devolve uma lista vazia para a tela não quebrar
        return []
    }
}
