//Importando do arquivo

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRegrasMorador } from "../../../service/Regra";
import CardRegraMorador from "../../../components/morador/registros/cardRegraMorador";
import styles from "../../../css/telaVisitantesMorador.module.css";
import abasStyles from "../../../css/paginainicialPorteiro.module.css";
import listaStyles from "../../../css/paginaExibeEnvios.module.css";



//Função que cria o componente
function PaginaExibeRegrasMorador(){

    //Hook que irá armazenar as regras
    const [regras, setRegras] = useState([])

    //Hook que irá realizar a navegação
    const navigate = useNavigate()

    //Função que realiza a navegação para a tala de laudos
    const navegaLaudo = () => {

        //Realiza a navagação
        navigate("/morador/registros/laudos")
    }

    //Função que obtem as regras
    const obtemRegras = async () => {

        //Obtendo as regras
        const dados = await getRegrasMorador()

        //Salvando os dados no state
        setRegras(dados[0])
    }

    //useEffect que irá chamar a função que carrega os dados das regras
    useEffect(() => {

        //Função que chama os dados
        obtemRegras()
    }, [])

    //Retorna o componente
    return (

        // Container principal da tela
        <div className={styles['vm-container']}>

            {/* Cabeçalho da página: contexto, título concreto e linha de apoio.
                Usa as classes globais para manter a mesma hierarquia de toda
                a área interna do CONDEX (overline > título > subtítulo). */}
            <header className="cx-page-header">
                <div>
                    <p className="cx-overline">Condomínio</p>
                    <h2 className="cx-page-title">Regras</h2>
                    <p className="cx-page-subtitle">Regras de convivência e uso das áreas comuns do condomínio.</p>
                </div>
            </header>

            {/*Div com os botões de navegação entre as telas de laudos e regras*/}
            <div className={abasStyles['tabs--group']}>

                {/* Botão que leva para os laudos do condomínio */}
                <button
                    type="button"
                    className={abasStyles['tab--inactive']}
                    onClick={navegaLaudo}
                >
                    Laudos
                </button>

                {/* Botão da tela atual, por isso não navega para lugar nenhum.
                    aria-current marca para leitores de tela qual aba está ativa. */}
                <button type="button" className={abasStyles['tab--active']} aria-current="page">
                    Regras
                </button>
            </div>

            {/*Div que irá exibir os cards das regras*/}
            <div className={listaStyles.listaEnvios}>

                {/* Estado vazio padrão do CONDEX: sem registros a tela explica
                    o que esperar em vez de deixar só o cabeçalho. O wrapper da
                    lista é mantido porque é ele que reserva o espaço acima. */}
                {regras.length === 0 && (

                    <div className="cx-empty">
                        <span className="cx-empty__icon" aria-hidden="true">
                            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M4 4h16v16H4z"></path>
                                <path d="M8 9h8"></path>
                                <path d="M8 13h8"></path>
                                <path d="M8 17h5"></path>
                            </svg>
                        </span>
                        <p className="cx-empty__title">Nenhuma regra publicada</p>
                        <p className="cx-empty__text">
                            As regras de convivência definidas pela administração aparecerão nesta lista.
                        </p>
                    </div>
                )}

                {/* Cards com as regras do condomínio */}
                {
                    // Iterando e adicionando os cards
                    regras.map((regra) => {

                        //Retorna o card da regra
                        return <CardRegraMorador key={regra.id} regra={regra}></CardRegraMorador>
                    } )
                }
            </div>
        </div>
    );
}

//Exportando o arquivo
export default PaginaExibeRegrasMorador