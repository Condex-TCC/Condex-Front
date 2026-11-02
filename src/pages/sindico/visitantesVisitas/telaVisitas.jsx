//Pagina responsável por exibir as visitas

//Importações do aquivo
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getVisitasSindico } from "../../../service/VisitasVisitantes"
import CardVisita from "../../../components/sindico/cardVisita"
import styles from "../../../css/paginaVisitasVisitantes.module.css"

//Função que cria o componente
function PaginaVisitasSindico(){

    //Hook que armazena os dados dos cards que vão ser renderizados
    const [cards, setCards] = useState([])

    //Hook que realiza a navegação entre as páginas
    const navigate = useNavigate()

    //Função que realiza a navegação para a tela de visitantes
    const trocaPagina = () => {

        //Realiza a navegação
        navigate("/sindico/visitantes")
    }

    //Função que obtem os dados dos cards
    const obtemCards = async () => {

        //Chama a função que obtem as visitas
        const response = await getVisitasSindico()

        //Salvando o array de visitas no state
        setCards(response)
    }

    //useEffect que é executado quando a página é renderizada
    useEffect(() => {

        //Chama a função de obter as visitas
        obtemCards()
    }, [])

    //Retorna o componente
    return (
        <div className={styles['pagina--visitas--visitantes']}>
            <h1 className={styles['titulo--pagina']}>Visitas</h1>
            <p className={styles['descricao--pagina']}>Acompanhe as visitas registradas no condomínio.</p>

            <div className={styles['abas--pagina']}>
                <button type="button" className={`${styles['aba--pagina']} ${styles['aba--pagina--ativa']}`}>
                    Visitas
                </button>
                <button type="button" className={styles['aba--pagina']} onClick={trocaPagina}>
                    Visitantes
                </button>
            </div>

            <div className={styles['lista--cards']}>
                {cards?.map((visita) => (
                    <CardVisita key={visita.id} visita={visita} />
                ))}
            </div>
        </div>
    )
}

//Exportando o componente
export default PaginaVisitasSindico
