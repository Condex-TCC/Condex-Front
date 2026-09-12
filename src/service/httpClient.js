// Arquivo responsável por centralizar a comunicação HTTP com a API
// Antes, cada arquivo em src/api/*.js repetia a URL base e os headers manualmente.
// Esse arquivo existe para eliminar essa duplicação, sem mudar o contrato usado
// pelo restante do projeto: as funções de src/api continuam retornando a Promise
// do fetch (um Response), exatamente como antes.

import { GetCookie } from './cookie'

// URL base da API. Vem da variável de ambiente VITE_API_URL (arquivo .env),
// com um valor padrão para não quebrar caso a variável não esteja definida.
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api'

/**
 * Função central que realiza as requisições para a API.
 *
 * @param {string} caminho - Caminho relativo do endpoint (ex: "/porteiro/visitante/create")
 * @param {object} opcoes - Opções da requisição
 * @param {string} [opcoes.method="GET"] - Método HTTP
 * @param {object|null} [opcoes.body=null] - Corpo da requisição (será convertido para JSON)
 * @param {boolean} [opcoes.auth=true] - Se true, envia o token de autorização salvo no cookie
 * @returns {Promise<Response>} - A Promise do fetch, igual ao comportamento anterior do projeto
 */
export function apiFetch(caminho, { method = 'GET', body = null, auth = true } = {}) {

    // Montando a URL final a partir da URL base + o caminho do endpoint
    const url = `${API_BASE_URL}${caminho}`

    // Headers padrão de toda requisição da API
    const headers = {
        'Content-Type': 'application/json', // Tipo de formatação
        'Accept': 'application/json', // Obriga o Laravel a retornar JSON mesmo em erros
    }

    // Caso a rota exija autenticação, recupera o token salvo no cookie e envia no header
    if (auth) {

        const cookie = GetCookie()

        if (cookie.token) {
            headers['Authorization'] = `Bearer ${cookie.token}`
        }
    }

    // Montando as opções finais da requisição
    const opcoesFetch = {
        method,
        headers,
    }

    // Só adiciona "body" quando ele existir (GET/DELETE normalmente não têm corpo)
    if (body !== null) {
        opcoesFetch.body = JSON.stringify(body)
    }

    // Retornando a Promise do fetch, para manter compatibilidade com o restante do projeto,
    // que já sabe fazer `await resposta.json()` e checar `resposta.ok` / `status`
    return fetch(url, opcoesFetch)
}
