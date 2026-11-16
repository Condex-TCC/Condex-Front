//Arquivo responsável por fazer a requisição para a API de moradores do porteiro

import { GetCookie } from "../service/cookie"
import { API_URL } from './config'

//Função que recupera todos os moradores que o porteiro pode consultar
//O endpoint do porteiro devolve a lista para vincular visitantes e encomendas
export async function getMoradoresPorteiroAPI(){

    //Recuperando o token de autorização
    let cookie = await GetCookie()
    let token = cookie.token

    //Endpoint
    let endPoint = `${API_URL}/api/porteiro/morador/get`

    //Criando a requisição
    const requisicao = fetch(
        endPoint,
        {
            method: "GET",

            //Passando os headers
            headers: {
                'Accept': 'application/json',
                "Authorization": `Bearer ${token}`
            },
        }
    )

    //Retornando uma promise com os dados da API
    return requisicao
}
