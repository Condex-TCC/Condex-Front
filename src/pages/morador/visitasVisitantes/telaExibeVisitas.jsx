//Página que irá exibir as visitas do morador

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getVisitasMorador } from "../../../service/VisitasVisitantes";
import CardVisitaMorador from "../../../components/morador/cardVisitaMorador";
import styles from "../../../css/paginaVisitasMorador.module.css";

//Importações do arquivo


//Função que cria o componente
function PaginaExibeVisitasMorador(){

    //Hook que armazena os dados
    const [ativas, setAtivas] = useState([])
    const [pendentes, setPendentes] = useState([])
    const [futuras, setFuturas] = useState([])

    //Hook que realiza a navegação
    const navigate = useNavigate()

    //Função que realiza a navegação para a tela de historico
    const navegaHistorico = () => {

        //Realiza a navegação
        navigate("/morador/visitas/historico")
    }

    //Função que realiza a navegação para a tela de consultar visitante
    const navegaConstulsta = () => {

        //Realiza a navegação
        navigate("/morador/visitante/consulta")
    }

    //Função que obtem os dados que serão exibos na tela
    const obtemDados = async () => {

        //Função que chama os dados que serão exibidos
        let response = await getVisitasMorador()

        //Desestruturando os dados
        const {visitas_ativas, visitas_pendentes, visitas_futuras} = await response

        //Salvando no state os dados
        setAtivas(visitas_ativas)
        setPendentes(visitas_pendentes)
        setFuturas(visitas_futuras)
    }

    //Executa uma função quando a página é carregada
    useEffect(() => {

        //Chama a função que obtem os dados
        obtemDados()
    }, [])

    //Retorna o componente
    return (
        <div className={styles['pagina--visitas']}>

            {/* Cabeçalho com o título e a descrição da página */}
            <div className={styles['cabecalho--pagina']}>
                <h1 className={styles['titulo--pagina']}>Visitas do apartamento</h1>
                <p className={styles['descricao--pagina']}>Acompanhe as visitas em andamento, autorize solicitações pendentes e veja os próximos agendamentos.</p>
            </div>

            {/* Barra com o menu de abas e o botão de consulta */}
            <div className={styles['barra--pagina']}>

                {/* Menu de botões entre as telas de visitas e histórico */}
                <div className={styles['menu--pagina']}>
                    <button type="button" className={`${styles['botao--menu']} ${styles['botao--menu--ativo']}`}>
                        Visitas
                    </button>
                    <button type="button" className={`${styles['botao--menu']} ${styles['botao--menu--inativo']}`} onClick={navegaHistorico}>
                        Histórico
                    </button>
                </div>

                {/* Botão que leva para a consulta de visitante */}
                <button type="button" className={styles['botao--consulta']} onClick={navegaConstulsta}>
                    Consultar visitante
                </button>

            </div>

            {/* Seção com as visitas que estão acontecendo agora */}
            <section className={styles['secao--visitas']}>

                <h2 className={styles['subtitulo--secao']}>Visitas em andamento</h2>
                <p className={styles['descricao--secao']}>Visitantes que já entraram e estão no condomínio neste momento.</p>

                {/* Lista com os cards das visitas ativas */}
                <div className={styles['lista--cards']}>
                    {ativas?.map((visita) => (
                        <CardVisitaMorador key={visita?.id_visita} visita={visita} />
                    ))}
                </div>

            </section>

            {/* Seção com as visitas que aguardam a autorização do morador */}
            <section className={styles['secao--visitas']}>

                <h2 className={styles['subtitulo--secao']}>Aguardando autorização</h2>
                <p className={styles['descricao--secao']}>Solicitações de visita que precisam da sua aprovação.</p>

                {/* Lista com os cards das visitas pendentes */}
                <div className={styles['lista--cards']}>
                    {pendentes?.map((visita) => (
                        <CardVisitaMorador key={visita?.id_visita} visita={visita} />
                    ))}
                </div>

            </section>

            {/* Seção com as visitas autorizadas que ainda vão acontecer */}
            <section className={styles['secao--visitas']}>

                <h2 className={styles['subtitulo--secao']}>Próximas visitas</h2>
                <p className={styles['descricao--secao']}>Visitas autorizadas com entrada prevista para os próximos dias.</p>

                {/* Lista com os cards das visitas futuras */}
                <div className={styles['lista--cards']}>
                    {futuras?.map((visita) => (
                        <CardVisitaMorador key={visita?.id_visita} visita={visita} />
                    ))}
                </div>

            </section>

        </div>
    );
}

//Exporta o componente
export default PaginaExibeVisitasMorador