//Arquivo responsável por fazer a requisição para a API de Autorização de Visitantes
//É essa entidade que representa, de fato, os status "pré-cadastrado" (autorizado)
//e "ativo" (entrada_realizada) mostrados na tela inicial do porteiro.

import { apiFetch } from '../service/httpClient'

//Função que recupera os visitantes que estão com autorização válida (status "autorizado")
//Esses são os que aparecem em "Pré-cadastrados" na tela do porteiro
export function getAutorizadosAPI(){

    return apiFetch('/porteiro/autorizacao/authorized', { method: 'GET' })
}

//Função que libera a entrada de um visitante autorizado
//Muda o status da autorização de "autorizado" para "entrada_realizada"
export function allowEntryAPI(idAutorizacao){

    return apiFetch(`/porteiro/autorizacao/entry/${idAutorizacao}`, { method: 'PUT' })
}

//Função que registra a saída de um visitante que já teve a entrada liberada
//Muda o status da autorização de "entrada_realizada" para "saida_realizada"
export function registerExitAPI(idAutorizacao){

    return apiFetch(`/porteiro/autorizacao/exit/${idAutorizacao}`, { method: 'PUT' })
}
