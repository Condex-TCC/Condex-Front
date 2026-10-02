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

            <h1 className={stylesTitle.title} style={{marginBottom: "26px", marginTop: "36px"}}>Perguntas dos moradores</h1>

            {/*Div com os cards */}
            <div>
                
                {/* Cards com as respostas */}
                {
                    // Interando e adicioando os cards
                    cards.map((resposta) => {
                        //Retorna o card de comunicado
                        return <CardResposta resposta={resposta}></CardResposta>
                    } )
                }
            </div>
        </div>
    )
}

//Exportando a componente que via ser utilizado
export default PaginaExibeResposta;
