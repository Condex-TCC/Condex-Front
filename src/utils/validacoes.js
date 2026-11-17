//Funções de validação de documentos usadas nos formulários

import { apenasDigitos } from "./mascaras"

//Valida um CPF de 11 dígitos, incluindo os dois dígitos verificadores
export function validarCpf(valor) {

    //Mantém apenas os dígitos, para aceitar o CPF com ou sem máscara
    const cpf = apenasDigitos(valor)

    //CPF inválido quando não tem 11 dígitos ou quando todos os dígitos são iguais
    if(cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)){

        return false
    }

    //Calcula um dígito verificador a partir da base informada
    const calcularDigito = (base) => {

        let soma = 0

        //Os pesos vão de (base.length + 1) até 2
        for(let indice = 0; indice < base.length; indice++){

            soma += Number(base[indice]) * (base.length + 1 - indice)
        }

        const resto = soma % 11

        return resto < 2 ? 0 : 11 - resto
    }

    //Confere o primeiro e o segundo dígitos verificadores
    return calcularDigito(cpf.slice(0, 9)) === Number(cpf[9])
        && calcularDigito(cpf.slice(0, 10)) === Number(cpf[10])
}

//Valida um RG com 7 a 9 dígitos, aceitando o valor com ou sem máscara
//Os formatos mais comuns no Brasil usam 7, 8 ou 9 dígitos (00.000.000-0)
export function validarRg(valor) {

    const digitos = apenasDigitos(valor)

    return /^\d{7,9}$/.test(digitos)
}
