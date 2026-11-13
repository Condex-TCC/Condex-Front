//Página de para selecionar o morador

//Importaçoes do arquivo
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { getMoradoresVisitasPortiero } from "../../../service/VisitasVisitantes"


//Função que cria a página
function PaginaSelecionaMoradorPorteiro(){

    //Hook que armazena os dados
    const [cards, setCards] = useState([])

    //Hook que realiza a navegação
    const navigate = useNavigate()

    //Hook que otem o state passage pela url
    const location = useLocation()

    //Pegando o ID do visitante
    const idVisitante = location.state.id_visitante
    const nomeVisitante = location.state.nome_visitante

    //Função que retonro para a tela de consulta visitante
    const back = () => {

        //Realiza a navegação
        navigate("/porteiro/visitante/consulta")
    }

    //Função que navega para a página de cadastar visita
    const cadastarVisita = (id, nome, idMorador) => {

        //Realiza a navegação
        navigate("/porteiro/visitas/create", {
            state: {
                id_visitante: id,
                nome_visitante: nome,
                id_morador: idMorador,
            }
        })
    }

    //Função que obtem os dados
    const obterDados = async () => {

        //Chamando a função de obter dadso
        const response = await getMoradoresVisitasPortiero()

        //Salvando os dados no state
        setCards(response)
    }

    //Função que é chamada quando a página é renderizada
    useEffect(() => {

        //Chama a função de obter os dados
        obterDados()
    }, [])

    //Retorna o componente
    return(
        <h1>Seleciona o morador</h1>
        //Na mesma linha, aliado á diretira um bottão de voltar que chama a função de back
        //Descrição : Selecione o morador que vai receber a visita

        //Div que renderiza os cards de morador do poreiro

    )
}

//Exportando o visitante
export default PaginaSelecionaMoradorPorteiro