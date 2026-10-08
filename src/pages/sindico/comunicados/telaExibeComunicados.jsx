//Tela que vai ser responsavel por exibir os comunicados

//Importando as dependencias
import { useNavigate } from "react-router-dom"
import styles from "../../../css/paginaExibeRegrasLaudos.module.css"
import cardStyles from "../../../css/cardRegrasLaudosSindico.module.css"
import { getComunicados } from "../../../service/Comunicados"
import { useEffect, useState } from "react"
import CardComunicado from "../../../components/sindico/comunicados/cardComunicado"
import stylesTitle from '../../../css/paginaCadastraRegra.module.css';

//Função que cria o componentes
function PaginaExibeComunicados(){

    //Hook que irá controlar o estado dos comunicados
    const [cards, setCards] = useState([])

    //Hook que realiza a navegação
    const navigate = useNavigate()

    //Função que leva para a tela dos comunicados
    const navegaComunicados = () => {

        //Realiza a mudança de tela
        navigate("/sindico/comunicados")
    }

    //Função que leva para a tela das respostas dos moradores
    const navegaRespostas = () => {

        //Realiza a mudança de tela
        navigate("/sindico/comunicados/respostas")
    }

    //Função que leva para a tela para cadastar comunicados
    const navegaEnvio = () => {

        //Realiza a navegação
        navigate("/sindico/comunicados/cadastrar")
    }

    //Função que recupera todos os comunicados
    const obtendoComunicados = async () => {

        //Pegando os comunicados
        let dados = await getComunicados()

        //Desestruturando os dados
        let {comunicados} = await dados

        //Atualizando o estado
        setCards(comunicados)
    }

    //Função com useEffect para visualiar pegar os comunicados
    useEffect(() => {

        //Chama a função para pegar os comunicados
        obtendoComunicados()

    }, [])

    //Lista segura para renderizar (o serviço pode devolver
    //undefined quando a API falha — a tela não quebra por isso)
    const lista = Array.isArray(cards) ? cards : []

    //Retona o componente
    return(
        // Container principal que engloba tudo
        <div className={styles.container}>

            {/* Cabeçalho da página: contexto + ação concreta + ação principal */}
            <header className={styles['cabecalho-pagina']}>
                <div>
                    <p className="cx-overline">Comunicação</p>
                    <h2 className="cx-page-title">Comunicados</h2>
                    <p className="cx-page-subtitle">
                        Publique avisos para os moradores e acompanhe o que eles respondem.
                    </p>
                </div>

                {/* Botão para cadastrar um novo comunicado */}
                <button type="button" className={styles.primaryButton} onClick={navegaEnvio}>+ Cadastrar comunicado</button>
            </header>

            {/* Barra com as abas de Comunicação */}
            <div className={styles.topBar}>

                {/* Espaçamento entre os botões de abas */}
                <div className={styles.tabs} role="tablist" aria-label="Comunicação">

                    {/* Aba corrente desta tela (Comunicados) destacada */}
                    <button type="button" role="tab" aria-selected={true} className={`${styles.tabButton} ${styles["tabButton--ativo"]}`} onClick={navegaComunicados}>Comunicados</button>

                    {/* Botão de aba que leva para as respostas dos moradores */}
                    <button type="button" role="tab" aria-selected={false} className={styles.tabButton} onClick={navegaRespostas}>Respostas</button>
                </div>
            </div>

            {/* Título da lista, rebaixado a rótulo de seção pelo módulo
                (o cabeçalho da página já carrega o título da tela) */}
            <h1 className={`${stylesTitle.title} ${stylesTitle['title--list']} ${styles.listaTitulo}`}>Página exibe os comunicados</h1>

            {/* Estado vazio: explica como publicar o primeiro comunicado */}
            {lista.length === 0 && (
                <div className="cx-empty">
                    <span className="cx-empty__icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                        </svg>
                    </span>
                    <p className="cx-empty__title">Nenhum comunicado publicado</p>
                    <p className="cx-empty__text">
                        Use o botão “+ Cadastrar comunicado” acima para enviar o primeiro aviso aos moradores.
                    </p>
                </div>
            )}

            {/*div com os cards */}
            <div className={styles.lista}>

                {/* Cards com os comunicados */}
                {
                    // Interando e adicioando os cards
                    lista.map((comunicado) => {
                        //Retorna o card de comunicado
                        return <CardComunicado comunicado={comunicado}></CardComunicado>
                    } )
                }

            </div>
        </div>
    )
}

//Exportando a componente que via ser utilizado
export default PaginaExibeComunicados;
