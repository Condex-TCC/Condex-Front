//Tela que vai ser responsavel por exibir as respostas dos moradores

//Importando as dependencias
import { useNavigate } from "react-router-dom"
import styles from "../../../css/paginaExibeRegrasLaudos.module.css"
import cardStyles from "../../../css/cardRegrasLaudosSindico.module.css"

//Função que cria o componentes
function PaginaExibeResposta(){

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

    //Retona o componente
    return(
        // Container principal que engloba tudo
        <div className={styles.container}>

            {/* Barra superior contendo as abas da tela */}
            <div className={styles.topBar}>

                {/* Espaçamento entre os botões de abas */}
                <div className={styles.tabs}>

                    {/* Botão de aba que leva para os comunicados */}
                    <button className={styles.tabButton} onClick={navegaComunicados}>Comunicados</button>

                    {/* Botão de aba que leva para as respostas dos moradores */}
                    <button className={styles.tabButton} onClick={navegaRespostas}>Respostas</button>
                </div>
            </div>

            <h1 className={styles.cardTitle}>Perguntas dos moradores</h1>

            {/*Div com os cards */}
            <div>

                {/* Card da pergunta do morador */}
                <div className={cardStyles.card}>

                    {/* Cabeçalho do card com o nome do morador e o apartamento */}
                    <header className={cardStyles.header}>

                        <h3 className={cardStyles.title}>Maria Souza</h3>

                        <div className={cardStyles.timeInfo}>Bloco B - Apto 204</div>
                    </header>

                    {/* Corpo do card com o texto da pergunta */}
                    <div className={cardStyles.horarioContent}>

                        <p className={cardStyles.description}>
                            Boa tarde, o petioporto continua fechada? Preciso receber uma entrega.
                        </p>
                    </div>
                </div>

                {/* Card da pergunta do morador */}
                <div className={cardStyles.card}>

                    {/* Cabeçalho do card com o nome do morador e o apartamento */}
                    <header className={cardStyles.header}>

                        <h3 className={cardStyles.title}>João Carlos Ferreira</h3>

                        <div className={cardStyles.timeInfo}>Bloco A - Apto 101</div>
                    </header>

                    {/* Corpo do card com o texto da pergunta */}
                    <div className={cardStyles.horarioContent}>

                        <p className={cardStyles.description}>
                            Qual a data da próxima reunião sobre a troca do portão eletrônico?
                        </p>
                    </div>
                </div>

                {/* Card da pergunta do morador */}
                <div className={cardStyles.card}>

                    {/* Cabeçalho do card com o nome do morador e o apartamento */}
                    <header className={cardStyles.header}>

                        <h3 className={cardStyles.title}>Ana Beatriz Lima</h3>

                        <div className={cardStyles.timeInfo}>Bloco C - Apto 302</div>
                    </header>

                    {/* Corpo do card com o texto da pergunta */}
                    <div className={cardStyles.horarioContent}>

                        <p className={cardStyles.description}>
                            É possível reservar o salão de eventos para o dia 21/06?
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

//Exportando a componente que via ser utilizado
export default PaginaExibeResposta;
