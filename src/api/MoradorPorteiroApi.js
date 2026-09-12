//Arquivo responsável por fazer a requisição de moradores pela visão do porteiro.
//Existe separado de src/api/MoradoresApi.js porque aquele arquivo usa o endpoint
//de gerenciamento do SÍNDICO (/sindico/morador/get, que exige a habilidade "sindico").
//O porteiro tem seu próprio endpoint de leitura (/porteiro/morador/get, habilidade "porteiro"),
//usado aqui só para preencher a lista de moradores no formulário de "Registrar visitante".

import { apiFetch } from '../service/httpClient'

//Função que recupera todos os moradores (visão do porteiro)
export function getMoradoresPorteiroAPI(){

    return apiFetch('/porteiro/morador/get', { method: 'GET' })
}
