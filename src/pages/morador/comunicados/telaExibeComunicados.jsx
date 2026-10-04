//Importações do arquivo

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getComunicadoMorador } from "../../../service/Comunicados";
import CardComunicadoMorador from "../../../components/morador/comunicados/cardComunicadoMorador";
import styles from "../../../css/telaVisitantesMorador.module.css";
import abasStyles from "../../../css/paginainicialPorteiro.module.css";
import listaStyles from "../../../css/paginaExibeEnvios.module.css";


//Função que cria o componente
function PaginaExibeComunicadosMorador(){

    //REGRA DE NEGÓCIO: Nessa tela será exibida apenas os comunicados não visualizados

    //Hook que irá salvar os comunicados do morador
    const [comunicados, setComunicados] = useState([])

    //Hook que realiza a navegação
    const navigate = useNavigate()

    //Função que carrega os dados dos comunicados
    const obtendoComunidados = async () => {

        //Pegando os dados
        const dados = await getComunicadoMorador()

        //Desestruturando os dados
        const { envios } = await dados

        //Adicionando esses dados no estado
        await setComunicados(envios)
    }

    //useEffect que é executado quando a página é renderizda
    useEffect(() => {

        //Chama a função que carrega os dados
        obtendoComunidados()

    }, [])

    //Função que realiza a navegação para a página de histórico de comunicados
    const navegaHistorico = () => {

        //Realiza a navegação
        navigate("/morador/comunicados/historico")
    }

    //Retorna um componente
    return(

        // Container principal da tela
        <div className={styles['vm-container']}>

            {/* Cabeçalho da tela com o título dos comunicados não visualizados */}
            <div className={styles['vm-page-header']}>
                <h1 className={styles['vm-page-title']}>Comunicados não visualizados</h1>
            </div>

            {/*Div com os botões de navegação entre as telas de comunicados*/}
            <div className={abasStyles['tabs--group']}>

                {/* Botão da tela atual, por isso não navega para lugar nenhum */}
                <button type="button" className={abasStyles['tab--active']}>
                    Não visualizados
                </button>

                {/* Botão que leva para o histórico de comunicados */}
                <button
                    type="button"
                    className={abasStyles['tab--inactive']}
                    onClick={navegaHistorico}
                >
                    Histórico
                </button>
            </div>

            {/*Div que irá exibir os cards dos comunicados não visualizados*/}
            <div className={listaStyles.listaEnvios}>

                {/* Cards com os comunicados que o morador ainda não visualizou */}
                {
                    // Iterando e adicionando os cards
                    comunicados.map((envio) => {

                        //Retorna o card do comunicado
                        return <CardComunicadoMorador key={envio.id} envio={envio} back={"/morador/comunicados/exibe"}></CardComunicadoMorador>
                    } )
                }
            </div>
        </div>
    );
}

//Exportando o componente
export default PaginaExibeComunicadosMorador