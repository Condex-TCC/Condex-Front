//Página que exibe as reclamações já respondidas

//Importações do arquivo
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getReclamacoesHistorico } from "../../../service/Reclamacoes"
import CardReclamacaoSindico from "../../../components/sindico/cardReclamacaoSindico"
import styles from "../../../css/paginaExibeReclamacoesSindico.module.css"
import { useBuscaHeader } from '../../../hooks/useBuscaHeader'
import { filtrarPorTexto } from '../../../utils/busca'

//Função que cria o componente
function PaginaExibeReclamacoesHistorico(){

    //Texto da barra de pesquisa do header, usado para filtrar a lista desta página
    const { termo } = useBuscaHeader()

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
        <div className={styles['prs-container']}>
            <h1 className={styles['prs-titulo']}>Reclamações</h1>

            <div className={styles['prs-abas']}>
                <button type="button" className={styles['prs-aba']} onClick={trocaPagina}>
                    Não visualizadas
                </button>
                <button type="button" className={`${styles['prs-aba']} ${styles['prs-aba--ativa']}`}>
                    Histórico
                </button>
            </div>

            <div className={styles['prs-lista']}>
                {Array.isArray(cards) && filtrarPorTexto(cards, termo).map((reclamacao) => (
                    <CardReclamacaoSindico key={reclamacao.id_reclamacao} reclamacao={reclamacao}
                        redireciona={"/sindico/reclamacoes/historico"} />
                ))}
            </div>
        </div>
    )
}

//Exporta o componente
export default PaginaExibeReclamacoesHistorico
