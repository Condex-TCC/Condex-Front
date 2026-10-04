//Importações do arquivo

import { useNavigate } from "react-router-dom"
import { getComunicadoHistorico } from "../../../service/Comunicados"
import { useEffect, useState } from "react"
import CardComunicadoMorador from "../../../components/morador/comunicados/cardComunicadoMorador"
import styles from "../../../css/telaVisitantesMorador.module.css"
import abasStyles from "../../../css/paginainicialPorteiro.module.css"
import listaStyles from "../../../css/paginaExibeEnvios.module.css"


//Função que cria o componente
function PaginaExibeComunicadosHistorico(){

    //REGRA DE NEGÓCIO: Nessa tela será exibida todos os comunicados do morador logado

    //Hook que irá salvar os comunicados do morador
    const [comunicados, setComunicados] = useState([])

    //Hook que realiza a navegação
    const navigate = useNavigate()

    //Função que carrega os dados dos comunicados
    const obtendoComunidados = async () => {
    
        //Pegando os dados
        const dados = await getComunicadoHistorico()
    
        //Desestruturando os dados
        const { envios } = await dados
    
        //Adicionando esses dados no estado
        setComunicados(envios)
    }
    
    //useEffect que é executado quando a página é renderizda
    useEffect(() => {
    
        //Chama a função que carrega os dados
        obtendoComunidados()
    
    }, [])

    //Função que realiza a navegação para a página de histórico de comunicados
    const navegaNaoVisualidados = () => {

        //Realiza a navegação
        navigate("/morador/comunicados/exibe")
    }

    //Retorna um componente
    return(

        // Container principal da tela
        <div className={styles['vm-container']}>

            {/* Cabeçalho da tela com o título do histórico de comunicados */}
            <div className={styles['vm-page-header']}>
                <h1 className={styles['vm-page-title']}>Histórico de comunicados</h1>
            </div>

            {/*Div com os botões de navegação entre as telas de comunicados*/}
            <div className={abasStyles['tabs--group']}>

                {/* Botão que leva para os comunicados não visualizados */}
                <button
                    type="button"
                    className={abasStyles['tab--inactive']}
                    onClick={navegaNaoVisualidados}
                >
                    Não visualizados
                </button>

                {/* Botão da tela atual, por isso não navega para lugar nenhum */}
                <button type="button" className={abasStyles['tab--active']}>
                    Histórico
                </button>
            </div>

            {/*Div que irá exibir os cards de todos os comunicados*/}
            <div className={listaStyles.listaEnvios}>

                {/* Cards com todos os comunicados do morador */}
                {
                    // Iterando e adicionando os cards
                    comunicados.map((envio) => {

                        //Retorna o card do comunicado
                        return <CardComunicadoMorador key={envio.id} envio={envio} back={"/morador/comunicados/historico"}></CardComunicadoMorador>
                    } )
                }
            </div>
        </div>
    );
}

//Exportando o componente
export default PaginaExibeComunicadosHistorico