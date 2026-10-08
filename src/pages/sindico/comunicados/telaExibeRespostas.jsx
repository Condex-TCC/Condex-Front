//Tela que vai ser responsavel por exibir as respostas dos moradores

//Importando as dependencias
import { useNavigate } from "react-router-dom"
import styles from "../../../css/paginaExibeRegrasLaudos.module.css"
import cardStyles from "../../../css/cardRegrasLaudosSindico.module.css"
import { getRespostas } from "../../../service/Comunicados"
import { useEffect, useState } from "react"
import CardResposta from "../../../components/sindico/comunicados/cardResposta"
import stylesTitle from '../../../css/paginaCadastraRegra.module.css';

//Função que cria o componentes
function PaginaExibeResposta(){

    //Hook que irá controlar o estado das respostas
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

    //Função que recupera todas as respostas
    const obtendoRespostas = async () => {
    
        //Pegando as respostas
        let dados = await getRespostas()
    
        //Desestruturando os dados
        let { perguntas } = await dados
        console.log(perguntas)
        //Atualizando o estado
        setCards(perguntas)
    }
    
    //Função com useEffect para visualiar pegar as respostas
    useEffect(() => {
    
        //Chama a função para pegar as respostas
        obtendoRespostas()
    
    }, [])

    //Lista segura para renderizar (o serviço pode devolver
    //undefined quando a API falha — a tela não quebra por isso)
    const lista = Array.isArray(cards) ? cards : []

    //Retona o componente
    return(
        // Container principal que engloba tudo
        <div className={styles.container}>

            {/* Cabeçalho da página: contexto + ação concreta */}
            <header className={styles['cabecalho-pagina']}>
                <div>
                    <p className="cx-overline">Comunicação</p>
                    <h2 className="cx-page-title">Respostas</h2>
                    <p className="cx-page-subtitle">
                        Acompanhe as perguntas dos moradores e responda o que estiver pendente.
                    </p>
                </div>
            </header>

            {/* Barra superior contendo as abas da tela */}
            <div className={styles.topBar}>

                {/* Espaçamento entre os botões de abas */}
                <div className={styles.tabs} role="tablist" aria-label="Comunicação">

                    {/* Botão de aba que leva para os comunicados */}
                    <button type="button" role="tab" aria-selected={false} className={styles.tabButton} onClick={navegaComunicados}>Comunicados</button>

                    {/* Aba corrente desta tela (Respostas) destacada */}
                    <button type="button" role="tab" aria-selected={true} className={`${styles.tabButton} ${styles["tabButton--ativo"]}`} onClick={navegaRespostas}>Respostas</button>
                </div>
            </div>

            {/* Título da lista, rebaixado a rótulo de seção pelo módulo
                (o cabeçalho da página já carrega o título da tela).
                Ao lado vai a contagem discreta de registros, no mesmo
                padrão do "0 registros · Moradores" da tela de Usuários. */}
            <div className={styles.listaTituloLinha}>
                <h1 className={`${stylesTitle.title} ${stylesTitle['title--list']} ${styles.listaTitulo}`}>Perguntas dos moradores</h1>

                {/* Contagem do MESMO array renderizado abaixo —
                    nenhuma chamada extra de serviço */}
                <span className={styles.listaContagem} aria-live="polite">
                    {lista.length} {lista.length === 1 ? 'pergunta' : 'perguntas'}
                </span>
            </div>

            {/* Estado vazio: diz o que acontece quando ninguém perguntou ainda */}
            {lista.length === 0 && (
                <div className="cx-empty">
                    <span className="cx-empty__icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                        </svg>
                    </span>
                    <p className="cx-empty__title">Nenhuma pergunta recebida</p>
                    <p className="cx-empty__text">
                        As perguntas dos moradores sobre os comunicados aparecem nesta lista.
                    </p>
                </div>
            )}

            {/*Div com os cards */}
            <div className={styles.lista}>
                
                {/* Cards com as respostas */}
                {
                    // Interando e adicioando os cards
                    lista.map((resposta) => {
                        //Retorna o card de comunicado
                        return <CardResposta resposta={resposta} redirecionamento={"/sindico/comunicados/respostas"}></CardResposta>
                    } )
                }
            </div>
        </div>
    )
}

//Exportando a componente que via ser utilizado
export default PaginaExibeResposta;
