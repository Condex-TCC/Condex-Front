//Página onde se cadastra a resposta da reclamação

//importações do arquivo
import { useLocation, useNavigate, useParams } from "react-router-dom"

//Função que cria a página
function PaginaRespondeReclamacao(){

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

    //Retona o componente
    return (
        <>
            <h1>responder reclamação</h1>
            <button onClick={back}>Voltar</button>
        </>
    )
}

//Exportar o componente
export default PaginaRespondeReclamacao