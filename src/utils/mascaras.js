//Arquivo com as máscaras de entrada usadas nos formulários

//Função que mantém apenas os dígitos de um texto
export function apenasDigitos(valor){

    return String(valor ?? '').replace(/\D/g, '')
}

//Função que aplica a máscara 000.000.000-00 enquanto o CPF é digitado
export function mascaraCpf(valor){

    //Mantém apenas os dígitos, limitados a 11
    const d = apenasDigitos(valor).slice(0, 11)

    if(d.length > 9){ return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9)}` }
    if(d.length > 6){ return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6)}` }
    if(d.length > 3){ return `${d.slice(0, 3)}.${d.slice(3)}` }

    return d
}

//Função que aplica a máscara (00) 00000-0000 enquanto o telefone é digitado
//Aceita fixo (10 dígitos) e celular (11 dígitos)
export function mascaraTelefone(valor){

    //Mantém apenas os dígitos, limitados a 11
    const d = apenasDigitos(valor).slice(0, 11)

    if(d.length > 10){ return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}` }
    if(d.length > 6){ return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}` }
    if(d.length > 2){ return `(${d.slice(0, 2)}) ${d.slice(2)}` }
    if(d.length > 0){ return `(${d}` }

    return d
}
