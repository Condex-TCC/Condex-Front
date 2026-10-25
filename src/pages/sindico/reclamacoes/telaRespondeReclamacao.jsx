//Página onde se cadastra a resposta da reclamação

//importações do arquivo
import { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { showReclamacao } from "../../../service/Reclamacoes"

//Função que cria a página
function PaginaRespondeReclamacao(){

    //Hook que armazena o json com os dados que vão ser exibidos na tela
    const [reclamacao, setReclamacao] = useState({})

    //Hook que armazena as resposta do sindico
    const [resposta, setResposta] = useState("")
    
    //Hook que obtem os parametros passados pela URL
    const { id } = useParams()

    //Hook que realiza a navegação
    const navigate = useNavigate()

    //Hook que obtem os dados passados no state do react router don
    const location = useLocation()

    //Extraindo os dados passados
    const localBack = location.state?.redirecionamento || "/sindico";

    //Função que realiza o retorno
    const back = () => {

        //Realiza a navagação para a outra tela
        navigate(localBack)
    }

    //Função que obtem os dados do registro | Marca como visualizado
    const findReclamacao = async () => {

        //Chama a função que obtem o dados
        const request = await showReclamacao(id)

        //Desestruturando a resposta
        const { reclamacao } = await request

        //Salvando os dados no state
        setReclamacao(reclamacao)
    }

    //Função que cadastra a resposta
    const cadastraResposta = () => {

        //TODO: Será implementado mais tarde

        //Realiza o redirecionamento
        back()
    }

    //useEffect, que será executado quando a página é renderizado
    useEffect(() => {

        //Chama a função que busca os dados
        findReclamacao()
    }, [])

    //Retona o componente
    return (
        <h1>responder reclamação</h1>
        //Na mesma linha mas na direita um botão de voltar que chama a função de back

        //Div que exibe a reclamação, esse campo deve tar bastante enfase

        //Div com os dados do morador

        //Div com uma textarea ligada ao state de reclamação e embaixo um botão de cadastro de resposta
        //Caso a resposta do sindico venha na requisição, deve-se exibi-lá e ocultar a div de cadastro de resposta
    )
}

//Exportar o componente
export default PaginaRespondeReclamacao