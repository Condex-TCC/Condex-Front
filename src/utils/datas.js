//Funções de conversão entre Date e o formato aaaa-mm-dd usado pela API

//Converte um Date para aaaa-mm-dd usando o fuso horário do navegador
export function dataParaIso(data){

    //Sem data, não há o que converter
    if(!data){

        return ""
    }

    const mes = String(data.getMonth() + 1).padStart(2, "0")
    const dia = String(data.getDate()).padStart(2, "0")

    return `${data.getFullYear()}-${mes}-${dia}`
}

//Converte aaaa-mm-dd para um Date à meia-noite do fuso do navegador
export function isoParaData(iso){

    //Sem texto, devolve null para os componentes de data
    if(!iso){

        return null
    }

    const [ano, mes, dia] = String(iso).slice(0, 10).split("-").map(Number)

    return new Date(ano, mes - 1, dia)
}
