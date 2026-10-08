//Importando do arquivo

import { getLaudosMorador } from "../../../service/Laudos"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CardLaudoMorador from "../../../components/morador/registros/cardLaudoMorador";
import styles from "../../../css/telaVisitantesMorador.module.css";
import abasStyles from "../../../css/paginainicialPorteiro.module.css";
import listaStyles from "../../../css/paginaExibeEnvios.module.css";



//Função que cria o componente
function PaginaExibeLaudosMorador(){

    //Hook que irá armazenar os laudos
    const [laudos, setLaudos] = useState([])

    //Hook que irá realizar a navegação
    const navigate = useNavigate()

    //Função que realiza a navegação para a tala de regras
    const navegaRegra = () => {

        //Realiza a navagação
        navigate("/morador/registros/regra")
    }

    //Função que obtem os laudos
    const obtemLaudos = async () => {

        //Obtendo os laudos
        const dados = await getLaudosMorador()

        //Salvando os dados no state
        setLaudos(dados[0])
    }

    //useEffect que irá chamar a função que carrega os dados dos laudos
    useEffect(() => {

        //Função que chama os dados
        obtemLaudos()
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
                    <h2 className="cx-page-title">Laudos</h2>
                    <p className="cx-page-subtitle">Laudos técnicos do condomínio disponíveis para consulta.</p>
                </div>
            </header>

            {/*Div com os botões de navegação entre as telas de laudos e regras*/}
            <div className={abasStyles['tabs--group']}>

                {/* Botão da tela atual, por isso não navega para lugar nenhum.
                    aria-current marca para leitores de tela qual aba está ativa. */}
                <button type="button" className={abasStyles['tab--active']} aria-current="page">
                    Laudos
                </button>

                {/* Botão que leva para as regras do condomínio */}
                <button
                    type="button"
                    className={abasStyles['tab--inactive']}
                    onClick={navegaRegra}
                >
                    Regras
                </button>
            </div>

            {/*Div que irá exibir os cards dos laudos*/}
            <div className={listaStyles.listaEnvios}>

                {/* Estado vazio padrão do CONDEX: sem registros a tela explica
                    o que esperar em vez de deixar só o cabeçalho. O wrapper da
                    lista é mantido porque é ele que reserva o espaço acima. */}
                {laudos.length === 0 && (

                    <div className="cx-empty">
                        <span className="cx-empty__icon" aria-hidden="true">
                            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"></path>
                                <path d="M14 3v5h5"></path>
                                <path d="M9 14l2 2 4-4"></path>
                            </svg>
                        </span>
                        <p className="cx-empty__title">Nenhum laudo publicado</p>
                        <p className="cx-empty__text">
                            Os laudos técnicos enviados pela administração aparecerão nesta lista.
                        </p>
                    </div>
                )}

                {/* Cards com os laudos do condomínio */}
                {
                    // Iterando e adicionando os cards
                    laudos.map((laudo) => {

                        //Retorna o card do laudo
                        return <CardLaudoMorador key={laudo.id} laudo={laudo}></CardLaudoMorador>
                    } )
                }
            </div>
        </div>
    );
}

//Exportando o arquivo
export default PaginaExibeLaudosMorador