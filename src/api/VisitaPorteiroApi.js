//Arquivo responsável por requisições de visitas (entrada/saída/histórico) para porteiro

import { GetCookie } from "../service/cookie"

export async function getVisitasAPI(){

    let cookie = await GetCookie()
    let token = cookie.token

    let endPoint = "/api/porteiro/visita/get"

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

export async function allowEntryAPI(id){

    let cookie = await GetCookie()
    let token = cookie.token

    let endPoint = "/api/porteiro/visita/entry/" + id

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
