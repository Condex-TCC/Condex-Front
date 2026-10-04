//Arquivo responsável por transformar as respostas da API em texto legível

//Função que lê o corpo da resposta como JSON sem estourar quando o corpo não é JSON
//Isso acontece, por exemplo, quando o servidor está fora do ar ou devolve uma página de erro
export async function lerJson(response){

    try{

        return await response.json()
    }
    catch{

        return {}
    }
}

//Função que monta a mensagem de erro a partir da resposta da API
//A API devolve os erros de validação no formato { message, errors: [ { campo: [mensagens] } ] }
//Já os erros do próprio Laravel (401, 403, 404, 500) vêm apenas com { message }
//O parâmetro mensagemServidor permite explicar melhor um erro 500 em cada tela
export function montarMensagemErro(json, statusHttp, mensagemPadrao, mensagemServidor){

    //Guarda as mensagens de cada campo que não passou na validação
    let detalhes = ""

    if(Array.isArray(json?.errors)){

        detalhes = json.errors

            //Abre cada item | Object.values pega as mensagens do campo
            .map((erro) => typeof erro === "object" && erro !== null
                ? Object.values(erro).flat().join(" ")
                : String(erro))

            .join(" ")
    }

    //Sessão expirada ou token inválido
    if(statusHttp === 401){

        return "Sua sessão expirou. Faça login novamente."
    }

    //Usuário logado sem permissão para essa ação
    if(statusHttp === 403){

        return "Você não tem permissão para realizar essa ação."
    }

    //Registro que não existe mais na API
    if(statusHttp === 404){

        return `${mensagemPadrao} Registro não encontrado.`
    }

    //Erro interno do servidor, como a violação de uma chave estrangeira no banco
    //O texto do Laravel é técnico e pode expor o SQL, então nunca é exibido na tela
    if(statusHttp >= 500){

        return mensagemServidor || `${mensagemPadrao} O servidor recusou os dados enviados.`
    }

    //Demais casos, usa a mensagem da API e os detalhes dos campos
    return `${json?.message || mensagemPadrao} ${detalhes}`.trim()
}
