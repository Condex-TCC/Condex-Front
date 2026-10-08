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

            {/* Cabeçalho da página: contexto, título concreto e linha de apoio.
                Usa as classes globais para manter a mesma hierarquia de toda
                a área interna do CONDEX (overline > título > subtítulo). */}
            <header className="cx-page-header">
                <div>
                    <p className="cx-overline">Comunicação</p>
                    <h2 className="cx-page-title">Histórico</h2>
                    <p className="cx-page-subtitle">Todos os comunicados enviados para você, inclusive os já visualizados.</p>
                </div>
            </header>

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

                {/* Botão da tela atual, por isso não navega para lugar nenhum.
                    aria-current marca para leitores de tela qual aba está ativa. */}
                <button type="button" className={abasStyles['tab--active']} aria-current="page">
                    Histórico
                </button>
            </div>

            {/*Div que irá exibir os cards de todos os comunicados*/}
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
                        <p className="cx-empty__title">Nenhum comunicado no histórico</p>
                        <p className="cx-empty__text">
                            Quando o condomínio enviar um comunicado para você, ele fica guardado aqui.
                        </p>
                    </div>
                )}

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