//Chave única que liga e desliga os dados fictícios do módulo do porteiro.
//Com USE_MOCK em false, todas as telas voltam a chamar a API real
//normalmente, sem precisar desfazer nenhuma outra alteração.

export const USE_MOCK = true

//Atraso simulado, em milissegundos, para as telas não carregarem de
//repente. Serve para conferir os estados de carregamento e os botões
//desabilitados durante o salvamento.
export const ATRASO_MOCK = 350
