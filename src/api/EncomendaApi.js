//Arquivo responsável por fazer a requisição para a API das Encomendas (visão do porteiro)

import { apiFetch } from '../service/httpClient'

//Função que recupera todas as encomendas cadastradas
export function getEncomendasAPI(){

    return apiFetch('/porteiro/encomenda/get', { method: 'GET' })
}

//Função que cria uma nova encomenda
//A API só aceita "nome" e "descricao" (não existe campo de destinatário/bloco/apto
//nem data de recebimento manual — a data de recebimento é sempre o "created_at" automático)
export function insertEncomendaAPI(nome, descricao){

    let novaEncomenda = {
        nome: nome,
        descricao: descricao,
    }

    return apiFetch('/porteiro/encomenda/create', {
        method: 'POST',
        body: novaEncomenda,
    })
}

//Função que atualiza uma encomenda existente
export function updateEncomendaAPI(id, nome, descricao){

    let encomendaAtualizada = {
        nome: nome,
        descricao: descricao,
    }

    return apiFetch(`/porteiro/encomenda/update/${id}`, {
        method: 'PUT',
        body: encomendaAtualizada,
    })
}

//Função que registra a retirada de uma encomenda
//A API grava a data/hora da retirada automaticamente no servidor (não aceita data manual
//nem o nome de quem retirou, por isso essa informação deve ser controlada em outra tela/campo
//caso o back-end passe a suportar isso no futuro)
export function withdrawEncomendaAPI(id){

    return apiFetch(`/porteiro/encomenda/withdraw/${id}`, { method: 'PUT' })
}

//Função que deleta uma encomenda
export function deleteEncomendaAPI(id){

    return apiFetch(`/porteiro/encomenda/delete/${id}`, { method: 'DELETE' })
}
