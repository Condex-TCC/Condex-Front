//Arquivo responsável por fazer a requisição para a API das regras

import { apiFetch } from '../service/httpClient'

//Função que recupera todas as regras do banco de dados
export function getRegras(){

    return apiFetch('/sindico/regras/get', { method: 'GET' })
}

//Função que deleta a regra
export function deleteRegraAPI(id){

    return apiFetch(`/sindico/regras/delete/${id}`, { method: 'DELETE' })
}

//Função que salva no banco de dados a nova regra
export function insertRegraAPI(nome, descricao){

    let novaRegra = {
        nome: nome,
	    descricao: descricao
    }

    return apiFetch('/sindico/regras/create', {
        method: 'POST',
        body: novaRegra,
    })
}

//Função que recupera apenas uma regra
export function showRegraAPI(id){

    return apiFetch(`/sindico/regras/show/${id}`, { method: 'GET' })
}

//Função que atualiza a regra
export function updateRegraAPI(nome, descricao, id){

    let regraAtualizada = {
        nome: nome,
	    descricao: descricao
    }

    return apiFetch(`/sindico/regras/update/${id}`, {
        method: 'PUT',
        body: regraAtualizada,
    })
}
