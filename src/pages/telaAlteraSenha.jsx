//Tela que será ronsável por redefinir a senha

import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

//Importações do arquivo

//Função que cria o componente
function PaginaRedefineSenha(){

    //Hook que armazena a nova senha
    const [novaSenha, setNovaSenha] = useState("")

    //Hook que realiza a navegação
    const navigate = useNavigate()

    //Hook que otem os dados vindos pelas rotas
    const location = useLocation()

    //Otendo os dados passados pelas rotas
    const id = location.state.id
    const tipo = location.state.tipo
    const codigo = location.state.codigo

    //Função de volta para a página para validar informações
    const back = () => {

        //Realiza a navegação para a tela de login
        navigate("/consta/valida")
    }

    //Função que redefine a senha
    const implementacaoRedefineSenha = async () => {

        //TODO: Será implementado mais tarde
    }

    //Retorna o componente
    return (
        <h1>Redefine a senha</h1>
        //Na mesma linha no lado direito um botão de voltar que chama a função de back

        //Texto que diz para o usuário entrar com a nava senha, no minimo 8 caracteres campo obrigatório

        //Div com uma label onde será digitado a nova senha,  no minimo 8 caracteres campo obrigatório

        //Botão de alterar a nova senha
    )
}

//Exporta o componente
export default PaginaRedefineSenha