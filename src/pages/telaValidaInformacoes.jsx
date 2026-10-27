//Página responsável por validar os dados da conta

import { useState } from "react"
import { useNavigate } from "react-router-dom"

//Importações do arquivo

//Função que cria o componente
function PaginaValdiaInformacoes(){

    //Hook que armazenam os informações que vão ser enviadas para a API
    const [email, setEmail] = useState("")
    const [cpf, setCpf] = useState("")
    const [telefone, setTelefone] = useState("")

    //Hook que realiza a navegação
    const navigate = useNavigate()

    //Função de volta para a página para validar informações
    const back = () => {

        //Realiza a navegação para a tela de login
        navigate("/")
    }

    //Função que pega os dados 
    const validaConta = async () => {

        //TODO: Será implementada mais tarde
    }

    //Retorna o componente
    return (
        <h1>Página valida informações</h1>
        //Na mesma linha na direita um botão de voltar que chama a função de back

        //uma div com tres labels que se conentam com os states (email, cpf, telefone)

        //Um botão de validar conta que chama a função de valida conta
    )
}

//Exporta o componente
export default PaginaValdiaInformacoes