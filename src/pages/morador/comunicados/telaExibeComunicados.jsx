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

            {/* Cabeçalho da página: contexto, título concreto e linha de apoio.
                Usa as classes globais para manter a mesma hierarquia de toda
                a área interna do CONDEX (overline > título > subtítulo). */}
            <header className="cx-page-header">
                <div>
                    <p className="cx-overline">Comunicação</p>
                    <h2 className="cx-page-title">Comunicados</h2>
                    <p className="cx-page-subtitle">Comunicados que você ainda não visualizou.</p>
                </div>
            </header>

            {/*Div com os botões de navegação entre as telas de comunicados*/}
            <div className={abasStyles['tabs--group']}>

                {/* Botão da tela atual, por isso não navega para lugar nenhum.
                    aria-current marca para leitores de tela qual aba está ativa. */}
                <button type="button" className={abasStyles['tab--active']} aria-current="page">
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

                {/* Estado vazio padrão do CONDEX: sem registros a tela explica
                    o que esperar em vez de deixar só o cabeçalho. O wrapper da
                    lista é mantido porque é ele que reserva o espaço acima. */}
                {comunicados.length === 0 && (

                    <div className="cx-empty">
                        <span className="cx-empty__icon" aria-hidden="true">
                            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3 11l18-5v12L3 14v-3z"></path>
                                <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"></path>
                            </svg>
                        </span>
                        <p className="cx-empty__title">Nenhum comunicado pendente</p>
                        <p className="cx-empty__text">
                            Você está em dia: os novos comunicados do condomínio aparecem aqui assim que forem enviados.
                        </p>
                    </div>
                )}

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