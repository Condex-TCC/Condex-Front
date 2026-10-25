//Pagina que carrega as reclamacoes não visualizas do sindico

//Importações do arquivo
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getReclamacoes } from "../../../service/Reclamacoes"
import CardReclamacaoSindico from "../../../components/sindico/cardReclamacaoSindico"
import styles from "../../../css/paginaExibeReclamacoesSindico.module.css"

//Função que cria o componente
function PaginaExibeReclamacaoNaoVisualizada(){

    //Hook que armazena os dados dos cards que vão ser renderizados
    const [cards, setCards] = useState([])

    //Hook que armazena os cards que serão exibidos
    const navigate = useNavigate()

    //Função que realiza a navegação para a outra página (Página de histórico)
    const trocaPagina = () => {

        //Realiza a navegação
        navigate("/sindico/reclamacoes/historico")
    }

    //Função que obtem os dados dos cards
    const obtemCards = async () => {

        //Chama a função que obtem os cards
        const response = await getReclamacoes()

        //otendo o array de objetos
        const arrayObjetos = await response[0]

        //Salvando o array de objetos no state
        setCards(arrayObjetos)
    }

    //useEffect que é executado quando a página é renderizada
    useEffect(() => {

        //Chama a função de obter as reclamações não visualizadas
        obtemCards()
    }, [])

    //Retona o componente
    return (
        <div className={styles['prs-container']}>
            <h1 className={styles['prs-titulo']}>Reclamações</h1>

            <div className={styles['prs-abas']}>
                <button type="button" className={`${styles['prs-aba']} ${styles['prs-aba--ativa']}`}>
                    Não visualizadas
                </button>
                <button type="button" className={styles['prs-aba']} onClick={trocaPagina}>
                    Histórico
                </button>
            </div>

            <div className={styles['prs-lista']}>
                {Array.isArray(cards) && cards.map((reclamacao) => (
                    <CardReclamacaoSindico key={reclamacao.id_reclamacao} reclamacao={reclamacao}
                    redireciona={"/sindico/reclamacoes/exibir"} />
                ))}
            </div>
        </div>
    )
}

//Exportano o componente
export default PaginaExibeReclamacaoNaoVisualizada
