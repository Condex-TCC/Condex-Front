//Página que eixbe os detalhes da visita do porterio

import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { showVisitasPorterio } from "../../../service/VisitasVisitantes"

//Importações do arquivo


//Função que cria a página
function PaginaDetalhesVisitaPorteiro(){

    //Hook que armazena os dados da visita
    const [dados, setDados] = useState({})

    //Hook que realiza a navegação
    const navigate = useNavigate()

    //Hook que pega o ID da url
    const { id } = useParams()

    //Função que realiza a navegação para a tela de visita do porteiro
    const back = () => {

        //Realiza a navegação
        navigate("/porteiro")
    }

    //Função que obten os dados
    const obterDados = async () => {

        //Chamando a função que obtem os dados
        const response = await showVisitasPorterio(id)

        //Desestruturando os dados
        const { visita } = await response

        //Salvando os dados na state
        setDados(visita)
    }

    //Função que é chamada quando a página é renderizada
    useEffect(() => {

        //Chama a função que obtem os dados
        obterDados()
    }, [])

    //Retonra o componente
    return (
        <h1>Detalhes da visita: fulano de tal</h1>
        //Na mesma linha, alinhado á direitra, um botão de voltar que chama a função de back

        //Local onde vai exibir os dados, diposição igual ao do morador
        //A parte de autorização, deve apenas exibir o valor, sem os botões

        //Dentro do arquivo deve ter os botões de registrar entrada, registrar saida e deletar, igual ao do card do porteiro
    )
}

//Exporta o componente
export default PaginaDetalhesVisitaPorteiro