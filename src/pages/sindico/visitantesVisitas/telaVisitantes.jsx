//Pagina responsável por exibir os visitantes

//Importações do aquivo
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useBuscaHeader } from "../../../hooks/useBuscaHeader"
import { getVisitantesSindico } from "../../../service/VisitasVisitantes"
import CardVisitante from "../../../components/sindico/cardVisitante"
import styles from "../../../css/paginaVisitasVisitantes.module.css"

//Função que cria o componente
function PaginaVisitantesSindico(){

    //Texto da barra de pesquisa do header, já com atraso depois da digitação
    const { termo } = useBuscaHeader()

    //Hook que armazena os dados dos cards que vão ser renderizados
    //Guarda também o termo usado na busca, para saber quando a lista ainda está carregando
    const [resultado, setResultado] = useState({ termo: null, lista: [] })

    //Hook que realiza a navegação entre as páginas
    const navigate = useNavigate()

    //Indica que a lista do termo atual ainda está sendo buscada
    const carregando = resultado.termo !== termo

    //Lista de visitantes exibida na tela
    const cards = resultado.lista

    //Função que realiza a navegação para a tela de visitas
    const trocaPagina = () => {

        //Realiza a navegação
        navigate("/sindico/visitas")
    }

    //useEffect que busca os visitantes sempre que o texto da busca muda
    useEffect(() => {

        //Evita atualizar o estado quando a página já saiu de cena ou o termo mudou
        let cancelado = false

        //Função que obtem os dados dos cards
        const obtemCards = async () => {

            //Envia o filtro para a API apenas quando existe texto digitado
            const nome = termo.trim()
            const response = await getVisitantesSindico(nome ? { nome } : {})

            //Se a busca foi cancelada, não atualiza a tela
            if(cancelado){

                return
            }

            //Salvando o array de visitantes no state
            setResultado({ termo, lista: response?.visitantes ?? [] })
        }

        //Chama a função de obter os visitantes
        obtemCards()

        //Limpeza executada quando o termo muda ou a tela sai de cena
        return () => {

            cancelado = true
        }
    }, [termo])

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
                {carregando ?
                    <p className={styles['aviso--vazio']}>Carregando visitantes...</p>
                : cards.length === 0 ?
                    <p className={styles['aviso--vazio']}>
                        {termo.trim() !== ""
                            ? "Nenhum visitante encontrado para a busca."
                            : "Nenhum visitante cadastrado."}
                    </p>
                :
                    cards.map((visitante) => (
                        <CardVisitante key={visitante.id} visitante={visitante} />
                    ))
                }
            </div>
        </div>
    )
}

//Exportando o componente
export default PaginaVisitantesSindico
