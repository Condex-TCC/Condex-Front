//Página que vai exibir os detalhes da viista

import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { showVisitaMorador } from "../../../service/VisitasVisitantes";

//Importações do arquivo
import styles from "../../../css/paginaDetalheVisitaMorador.module.css";


//Função que cria o componente
function PaginaDetalheVisitaMorador(){

    //Hook que salva os dados
    const [dados, setDados] = useState({})

    //Hook que obtem o parametro passado na url
    const { id } = useParams()

    //Hook que realiza a navegação
    const navigate = useNavigate()

    //Hook que pega os valores passados pelo state da url
    const location = useLocation()
    
    //Pegando o valor do redirecionamento
    const redireciona = location.state.redireciona

    //Função que realiza o redirecionamento
    const back = () => {

        //Função que realiza o redirecionamento
        navigate(redireciona)
    }

    //Função que obten os dados
    const obterDados = async () => {

        //Chama a função que obten os dados
        const response = await showVisitaMorador(id)

        //Desestruturnado os dados
        const { visitas } = await response
        console.log(response)
        //Salvando os dados
        setDados(visitas)
    }

    //Função que é exeucutada quando a página é renderizada
    useEffect(() => {

        //Chama a função que obtem os dados
        obterDados()
    }, [])

    //Retorna o componente
    return(
        <div className={styles['pagina--detalhe-visita']}>

            {/* Cabeçalho com o título e o botão de voltar */}
            <div className={styles['cabecalho--pagina']}>

                <h1 className={styles['titulo--pagina']}>
                    Detalhes da visita do: {dados?.visitante?.name}
                </h1>

                {/* Botão que retorna para a tela anterior */}
                <button type="button" className={styles['botao--voltar']} onClick={back}>
                    &larr; Voltar
                </button>

            </div>

            {/* Div que exibe os dados do visitante */}
            <div className={styles['cartao--detalhe']}>

                <h2 className={styles['titulo--cartao']}>Dados do visitante</h2>

                <div className={styles['grade--informacoes']}>

                    {/* Nome do visitante */}
                    <div className={`${styles['linha--informacao']} ${styles['linha--informacao--total']}`}>
                        <span className={styles['rotulo--informacao']}>Nome</span>
                        <span className={styles['valor--informacao']}>{dados?.visitante?.name}</span>
                    </div>

                    {/* CPF do visitante */}
                    <div className={styles['linha--informacao']}>
                        <span className={styles['rotulo--informacao']}>CPF</span>
                        <span className={styles['valor--informacao']}>{dados?.visitante?.cpf}</span>
                    </div>

                    {/* RG do visitante */}
                    <div className={styles['linha--informacao']}>
                        <span className={styles['rotulo--informacao']}>RG</span>
                        <span className={styles['valor--informacao']}>{dados?.visitante?.rg}</span>
                    </div>

                </div>

            </div>

            {/* Div que exibe os dados da visita */}
            <div className={styles['cartao--detalhe']}>

                {/* Cabeçalho com o título à esquerda e o status da visita à direita */}
                <div className={styles['cabecalho--cartao']}>

                    <h2 className={styles['titulo--cartao']}>Dados da visita</h2>

                    {/* Selo com o status da visita, seguindo o padrão do card de visita do morador */}
                    {dados?.saida_registro != null ? (
                        <span className={`${styles['selo--status']} ${styles['selo--finalizada']}`}>Finalizada</span>
                    ) : dados?.entrada_registro != null ? (
                        <span className={`${styles['selo--status']} ${styles['selo--andamento']}`}>Em andamento</span>
                    ) : dados?.autorizacao === 1 ? (
                        <span className={`${styles['selo--status']} ${styles['selo--autorizada']}`}>Autorizada</span>
                    ) : dados?.autorizacao === null ? (
                        <span className={`${styles['selo--status']} ${styles['selo--aguardando']}`}>Aguardando autorização</span>
                    ) : dados?.autorizacao === 0 ? (
                        <span className={`${styles['selo--status']} ${styles['selo--negada']}`}>Negada</span>
                    ) : null}

                </div>

                <div className={styles['grade--informacoes']}>

                    {/* Entrada prevista, exibida apenas quando existe */}
                    {dados?.entrada_prevista && (
                        <div className={styles['linha--informacao']}>
                            <span className={styles['rotulo--informacao']}>Entrada prevista</span>
                            <span className={styles['valor--informacao']}>
                                {new Date(dados?.entrada_prevista).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" })}
                            </span>
                        </div>
                    )}

                    {/* Saída prevista, exibida apenas quando existe */}
                    {dados?.saida_prevista && (
                        <div className={styles['linha--informacao']}>
                            <span className={styles['rotulo--informacao']}>Saída prevista</span>
                            <span className={styles['valor--informacao']}>
                                {new Date(dados?.saida_prevista).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" })}
                            </span>
                        </div>
                    )}

                </div>

            </div>

            {/* Div que mostra a autorização da visita */}
            <div className={styles['cartao--detalhe']}>

                {/* Cabeçalho com o título à esquerda e o status à direita */}
                <div className={styles['cabecalho--cartao']}>

                    <h2 className={styles['titulo--cartao']}>Autorização</h2>

                    {dados?.autorizacao === null ? (
                        <span className={`${styles['selo--status']} ${styles['selo--pendente']}`}>Pendente</span>
                    ) : dados?.autorizacao == 1 ? (
                        <span className={`${styles['selo--status']} ${styles['selo--aprovada']}`}>Aprovada</span>
                    ) : dados?.autorizacao == 0 ? (
                        <span className={`${styles['selo--status']} ${styles['selo--recusada']}`}>Recusada</span>
                    ) : null}

                </div>

                {/* Pergunta e botões centralizados, exibidos apenas quando a visita está pendente */}
                {dados?.autorizacao === null && (
                    <div className={styles['autorizacao--conteudo']}>

                        <p className={styles['texto--autorizacao']}>Você deseja receber essa visita?</p>

                        {/* Botões sem ação por enquanto, serão implementados mais tarde */}
                        <div className={styles['acoes--autorizacao']}>

                            <button type="button" className={styles['botao--autorizar']}>
                                Autorizo a visita
                            </button>

                            <button type="button" className={styles['botao--recusar']}>
                                Recuso a visita
                            </button>

                        </div>

                    </div>
                )}

            </div>

            {/* Divs com os registros de entrada e saída */}
            <div className={styles['grade--registros']}>

                {/* Div com a entrada registrada */}
                <div className={styles['cartao--registro']}>

                    <h2 className={styles['titulo--cartao']}>Entrada registrada</h2>

                    {dados?.entrada_registro ? (
                        <span className={styles['data--registro']}>
                            {new Date(dados?.entrada_registro).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" })}
                        </span>
                    ) : dados?.entrada_registro === null ? (
                        <span className={styles['aviso--registro']}>Entrada ainda não registrada</span>
                    ) : null}

                    {dados?.porteiro_entrada?.nome && (
                        <div className={styles['linha--informacao']}>
                            <span className={styles['rotulo--informacao']}>Porteiro</span>
                            <span className={styles['valor--informacao']}>{dados?.porteiro_entrada?.nome}</span>
                        </div>
                    )}

                </div>

                {/* Div com a saída registrada */}
                <div className={styles['cartao--registro']}>

                    <h2 className={styles['titulo--cartao']}>Saída registrada</h2>

                    {dados?.saida_registro ? (
                        <span className={styles['data--registro']}>
                            {new Date(dados?.saida_registro).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" })}
                        </span>
                    ) : dados?.saida_registro === null ? (
                        <span className={styles['aviso--registro']}>Saída ainda não registrada</span>
                    ) : null}

                    {dados?.porteiro_saida?.nome && (
                        <div className={styles['linha--informacao']}>
                            <span className={styles['rotulo--informacao']}>Porteiro</span>
                            <span className={styles['valor--informacao']}>{dados?.porteiro_saida?.nome}</span>
                        </div>
                    )}

                </div>

            </div>

        </div>
    );
}

//Exporta o componente 
export default PaginaDetalheVisitaMorador
