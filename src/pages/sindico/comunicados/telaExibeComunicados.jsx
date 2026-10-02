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

    //Retona o componente
    return(
        // Container principal que engloba tudo
        <div className={styles.container}>

            {/* Barra superior contendo as abas e o botão de ação principal */}
            <div className={styles.topBar}>

                {/* Espaçamento entre os botões de abas */}
                <div className={styles.tabs}>

                    {/* Botão de aba que leva para os comunicados */}
                    <button className={styles.tabButton} onClick={navegaComunicados}>Comunicados</button>

                    {/* Botão de aba que leva para as respostas dos moradores */}
                    <button className={styles.tabButton} onClick={navegaRespostas}>Respostas</button>
                </div>

                {/* Botão para cadastrar um novo comunicado */}
                <button className={styles.primaryButton}>+ Cadastrar comunicado</button>
            </div>

            <h1 className={stylesTitle.title} style={{ marginBottom: "26px", marginTop: "36px" }}>Página exibe os comunicados</h1>

            {/*div com os cards */}
            <div>

                {/* Cards com os comunicados */}
                {
                    // Interando e adicioando os cards
                    cards.map((comunicado) => {
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
