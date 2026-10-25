//Página que exibe as reclamações já respondidas

//Importações do arquivo
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getReclamacoesHistorico } from "../../../service/Reclamacoes"

//Função que cria o componente
function PaginaExibeReclamacoesHistorico(){

    //Hook que armazena os dados dos cards que vão ser renderizados
    const [cards, setCards] = useState([])
    
    //Hook que armazena os cards que serão exibidos
    const navigate = useNavigate()
    
    //Função que realiza a navegação para a outra página (Página de não visualizados)
    const trocaPagina = () => {
    
        //Realiza a navegação
        navigate("/sindico/reclamacoes/exibir")
    }
    
    //Função que obtem os dados dos cards
    const obtemCards = async () => {
    
        //Chama a função que obtem os cards
        const response = await getReclamacoesHistorico()
    
        //otendo o array de objetos
        const arrayObjetos = await response[0]
        console.log(arrayObjetos)
        //Salvando o array de objetos no state
        setCards(arrayObjetos)
    }
    
    //useEffect que é executado quando a página é renderizada
    useEffect(() => {
    
        //Chama a função de obter as reclamações não visualizadas
        obtemCards()
    }, [])

    //Retona o componente
    return(
        <h1>histórico das reclamações</h1>

        //Div com um botão de não visualidos (que deve chamar a função de trocar página) e outro botão de historico 

        //Div que redenderiza o cads de reclamação para o sindico
    )
}

//Exporta o componente
export default PaginaExibeReclamacoesHistorico