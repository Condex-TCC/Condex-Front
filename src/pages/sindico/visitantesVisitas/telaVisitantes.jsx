//Pagina responsável por exibir os visitantes

//Importações do aquivo
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getVisitantesSindico } from "../../../service/VisitasVisitantes"
import CardVisitante from "../../../components/sindico/cardVisitante"
import styles from "../../../css/paginaVisitasVisitantes.module.css"

//Função que cria o componente
function PaginaVisitantesSindico(){

    //Hook que armazena os dados dos cards que vão ser renderizados
    const [cards, setCards] = useState([])

    //Hook que realiza a navegação entre as páginas
    const navigate = useNavigate()

    //Função que realiza a navegação para a tela de visitas
    const trocaPagina = () => {

        //Realiza a navegação
        navigate("/sindico/visitas")
    }

    //Função que obtem os dados dos cards
    const obtemCards = async () => {

        //Chama a função que obtem os visitantes
        const response = await getVisitantesSindico()

        //Salvando o array de visitantes no state
        setCards(response?.visitantes)
    }

    //useEffect que é executado quando a página é renderizada
    useEffect(() => {

        //Chama a função de obter os visitantes
        obtemCards()
    }, [])

    //Retorna o componente
    return (
        <div className={styles['pagina--visitas--visitantes']}>
            <h1 className={styles['titulo--pagina']}>Visitantes</h1>
            <p className={styles['descricao--pagina']}>Consulte os visitantes cadastrados no condomínio.</p>

            <div className={styles['abas--pagina']}>
                <button type="button" className={styles['aba--pagina']} onClick={trocaPagina}>
                    Visitas
                </button>
                <button type="button" className={`${styles['aba--pagina']} ${styles['aba--pagina--ativa']}`}>
                    Visitantes
                </button>
            </div>

            <div className={styles['lista--cards']}>
                {cards?.map((visitante) => (
                    <CardVisitante key={visitante.id} visitante={visitante} />
                ))}
            </div>
        </div>
    )
}

//Exportando o componente
export default PaginaVisitantesSindico
