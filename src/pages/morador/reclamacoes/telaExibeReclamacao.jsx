//Tela do menu do morador

//Importações do arquivo
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getReclamacoes, getReclamacoesMorador } from "../../../service/Reclamacoes"


//Função que cria o componente
function PaginaExibeReclamacaoMorador(){

    //Hook que armazena os dados do json 
    const [cards, setCards] = useState([])

    //Hook que realiza a navegação 
    const navigate = useNavigate()

    //Função que realiza o redirecionamento para a página de cadastro da reclamação
    const cadastraReclamacao = () => {

        //Realiza navegação
        navigate("reclamacoes/cadastra")
    }

    //Função que obtem os dados 
    const obtemReclamacoesMorador = async () => {

        //Chama a função que obtem os dados
        const response = await getReclamacoesMorador()
        console.log(response)
        //salvando no state os dados
        setCards(response)
    }

    //useState que executa uma função quando a página é renderizada
    useEffect(() => {

        //Chama a função que obtem os dados
        obtemReclamacoesMorador()
    }, [])

    //Retona o componente
    return(
        <h1>reclamacao</h1>
        //Mais ao lado o botão que redireciona para a página onde se cadastra as reclamação

        //div onde as cards da reclmação serão renderizados
    )
}

//Exportando o componente o componente
export default PaginaExibeReclamacaoMorador