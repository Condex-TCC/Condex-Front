//Arquivo responsável por fazer a requisição para a API dos Visitantes (visão do porteiro)
//Esse arquivo não existia no projeto original: era chamado por RegistroVisitante.jsx
//através de "insertVisitanteAPI", mas essa função nunca tinha sido criada.

import { apiFetch } from '../service/httpClient'

//Função que recupera todos os visitantes cadastrados
export function getVisitantesAPI(){

    return apiFetch('/porteiro/visitante/get', { method: 'GET' })
}

//Função que recupera um visitante específico
export function showVisitanteAPI(id){

    return apiFetch(`/porteiro/visitante/get/${id}`, { method: 'GET' })
}

//Função que cria um novo visitante
//A API exige: nome, cpf e fk_morador (o morador que está recebendo o visitante)
export function insertVisitanteAPI(nome, cpf, fkMorador){

    let novoVisitante = {
        nome: nome,
        cpf: cpf,
        fk_morador: fkMorador,
    }

    return apiFetch('/porteiro/visitante/create', {
        method: 'POST',
        body: novoVisitante,
    })
}

//Função que atualiza um visitante
export function updateVisitanteAPI(id, nome, cpf, fkMorador){

    let visitanteAtualizado = {
        nome: nome,
        cpf: cpf,
        fk_morador: fkMorador,
    }

    return apiFetch(`/porteiro/visitante/update/${id}`, {
        method: 'PUT',
        body: visitanteAtualizado,
    })
}

//Função que deleta um visitante
export function deleteVisitanteAPI(id){

    return apiFetch(`/porteiro/visitante/delete/${id}`, { method: 'DELETE' })
}
