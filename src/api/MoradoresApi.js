//Arquivo responsável por fazer a requisição para a API dos moradores (visão do síndico)

import { apiFetch } from '../service/httpClient'

//Função que recupera todos os moradores do banco de dados
export function getMoradores(){

    return apiFetch('/sindico/morador/get', { method: 'GET' })
}

//Função que apaga um morador do banco de dados
export function deleteMoradores(id){

    return apiFetch(`/sindico/morador/delete/${id}`, { method: 'DELETE' })
}
