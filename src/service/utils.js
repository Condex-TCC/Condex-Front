// Arquivo com pequenas funções utilitárias compartilhadas entre os serviços.
//
// A API tem uma inconsistência conhecida: em algumas rotas de listagem (index),
// o array de resultados vem envolvido em uma camada extra de array
// (ex: data = [ [ {...}, {...} ] ] em vez de data = [ {...}, {...} ]),
// enquanto as rotas de item único (show/store/update) retornam o objeto
// direto dentro de um array de 1 posição (data = [ {...} ]).
// Essas funções existem para lidar com os dois formatos sem espalhar
// esse tratamento por todos os arquivos de serviço.

//Recebe o "data" retornado por uma rota de LISTAGEM e sempre devolve um array plano
export function desembrulharLista(data) {

    //Garante que sempre trabalhamos com um array, mesmo se a API não retornar nada
    const dadosSeguros = data || []

    //Se o primeiro item do array for outro array (o "array duplo"), usamos ele.
    //Caso contrário, o array já veio no formato esperado.
    return Array.isArray(dadosSeguros[0]) ? dadosSeguros[0] : dadosSeguros
}

//Recebe o "data" retornado por uma rota de ITEM ÚNICO (show/store/update) e devolve o objeto
export function desembrulharItem(data) {

    //Garante que sempre trabalhamos com um array, mesmo se a API não retornar nada
    const dadosSeguros = data || []

    //O item único sempre vem na primeira posição do array
    return dadosSeguros[0] ?? null
}
