//Arquivo responsável por requisições de visitas (entrada/saída/histórico) para porteiro

import { GetCookie } from "../service/cookie"
import { montarQuery } from "../utils/busca"

export async function getVisitasAPI(filtros = {}){

    let cookie = await GetCookie()
    let token = cookie.token

    //A API aceita os filtros ?nome= e ?cpf= (do visitante)
    let endPoint = "/api/porteiro/visita/get" + montarQuery(filtros)

    const requisicao = fetch(
        endPoint,
        {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                "Authorization": `Bearer ${token}`
            },
        }
    )

    return requisicao
}

//Função que registra a entrada de um visitante
//A API espera PUT /visita/entry com o porteiro, o morador e o visitante no corpo da requisição
export async function allowEntryAPI(idPorteiro, idMorador, idVisitante){

    //Receperando o token de outorização
    let cookie = await GetCookie()
    let token = cookie.token

    //Endpoint
    let endPoint = "/api/porteiro/visita/entry"

    //Objeto com os dados exigidos pela API
    let dadosEntrada = {
        fk_porteiro: Number(idPorteiro),
        fk_morador: Number(idMorador),
        fk_visitante: Number(idVisitante)
    }

    //Criando a requisição
    const requisicao = fetch(
        endPoint,
        {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(dadosEntrada)
        }
    )

    //Retornado uma promise com os dados da API
    return requisicao
}

export async function registerExitAPI(id){

    let cookie = await GetCookie()
    let token = cookie.token

    let endPoint = "/api/porteiro/visita/exit/" + id

    const requisicao = fetch(
        endPoint,
        {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                "Authorization": `Bearer ${token}`
            },
        }
    )

    return requisicao
}
