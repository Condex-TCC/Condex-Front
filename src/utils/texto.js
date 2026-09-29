//Pequenos utilitários de texto reaproveitados por várias telas

//Função que extrai as iniciais de um nome para usar dentro de avatares
export function iniciais(nome = '') {

    //Quebra o nome em partes, ignorando espaços vazios no começo e no fim
    const partes = nome.trim().split(/\s+/).filter(Boolean)

    //Se não houver nome, devolve um traço para o avatar não ficar vazio
    if(partes.length === 0){

        return '–'
    }

    //Se houver apenas um nome, mostra a primeira letra
    if(partes.length === 1){

        return partes[0].charAt(0).toUpperCase()
    }

    //Com nome e sobrenome, mostra a inicial dos dois
    return (partes[0].charAt(0) + partes[partes.length - 1].charAt(0)).toUpperCase()
}
