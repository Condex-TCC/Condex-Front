//Arquivo responsável por fazer a requisição para a API dos Porteiros (visão do síndico)

import { apiFetch } from '../service/httpClient'

//Função que recupera todos os porteiros do banco de dados
export function getPorteiro(){

    return apiFetch('/sindico/porteiro/get', { method: 'GET' })
}

//Função que deleta um porteiro do banco de dados
export function deletePorteirosAPI(id){

    return apiFetch(`/sindico/porteiro/delete/${id}`, { method: 'DELETE' })
}

//Função que cria um novo porteiro
export function insertPorteiroAPI(nome, email, password){

    let novoPorteiro = {
        nome: nome,
	    email: email,
	    password: password
    }

    return apiFetch('/sindico/porteiro/create', {
        method: 'POST',
        body: novoPorteiro,
    })
}

//Função que recupera um porteiro específico
export function showPorteiroAPI(id){

    return apiFetch(`/sindico/porteiro/show/${id}`, { method: 'GET' })
}

//Função que atualiza um porteiro
export function updatePorteiroAPI(nome, email, password, id){

    let porteiroAtualizado = {
        nome: nome,
	    email: email,
	    password: password
    }

    return apiFetch(`/sindico/porteiro/update/${id}`, {
        method: 'PUT',
        body: porteiroAtualizado,
    })
}
