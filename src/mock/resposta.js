//Arquivo que monta as respostas do mock com o mesmo formato de uma
//requisição real, para que a camada de service continue funcionando
//sem perceber que os dados são fictícios

import { ATRASO_MOCK } from './ativo'

//Função que espera o tempo configurado, simulando a latência de uma
//requisição de verdade
export function esperar() {

    return new Promise((resolve) => setTimeout(resolve, ATRASO_MOCK))
}

//Função que devolve um Response de verdade, o mesmo objeto que o fetch
//devolve, com o JSON pronto para ser lido pelo response.json()
export function criarResposta(payload, status = 200) {

    //Monta o corpo no mesmo formato usado pelo backend, que sempre
    //devolve o status junto dos dados
    return new Response(
        JSON.stringify({ status, ...payload }),
        {
            status,
            headers: { 'Content-Type': 'application/json' }
        }
    )
}

//Função que monta a resposta de erro no formato que o backend usa
export function criarErro(mensagem, status = 400) {

    return criarResposta({ message: mensagem }, status)
}
