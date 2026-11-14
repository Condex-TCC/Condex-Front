//Página que eixbe os detalhes da visita do porterio

import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { showVisitasPorterio, deleteVisitaPorterio, registraEntradaVisita, registraSaidaVisita} from "../../../service/VisitasVisitantes"

//Importações do arquivo
import styles from "../../../css/paginaDetalheVisitaPorteiro.module.css"


//Função que cria a página
function PaginaDetalhesVisitaPorteiro(){

    //Hook que armazena os dados da visita
    const [dados, setDados] = useState({})

    //Hook que realiza a navegação
    const navigate = useNavigate()

    //Hook que pega o ID da url
    const { id } = useParams()

    //Função que realiza a navegação para a tela de visita do porteiro
    const back = () => {

        //Realiza a navegação
        navigate("/porteiro")
    }

    //Função que obten os dados
    const obterDados = async () => {

        //Chamando a função que obtem os dados
        const response = await showVisitasPorterio(id)

        //Desestruturando os dados
        const { visita } = await response

        //Salvando os dados na state
        setDados(visita)
    }

    //Função que é chamada quando a página é renderizada
    useEffect(() => {

        //Chama a função que obtem os dados
        obterDados()
    }, [])

     //Função que exibe o aviso do botão de registrar entrada
        const entrada = async () => {
    
            //Chama a função que registra a entrada da visita
            const response = await registraEntradaVisita(id)
    
            //Exibe a menssagen
            alert(response)
    
            //Recarrega a página
            window.location.reload()
        }
    
        //Função que exibe o aviso do botão de registrar saída
        const saida = async () => {
    
            //Chama a função que registra a saida da visita
            const response = await registraSaidaVisita(id)
    
            //Exibe a menssagen
            alert(response)
    
            //Recarrega a página
            window.location.reload()
        }
    
        //Função que exibe o aviso do botão de deletar visita
        const deletar = async ()  => {
    
            //Chama a função que deleta a visita pendente
            const response = await deleteVisitaPorterio(id)
    
            //Exibe a menssagen
            alert(response)
    
            //Voltar para a página inicial
            back()
        }
    
        //Funções que vão chamar as funções assincronas
        const deletarVisita = (e)  => {
            //Impede a propagação do elemento filho para o elemento pai
            e.stopPropagation()
    
            //Chama a função assincrona
            deletar()
        }
        const registrarSaida = (e) => {
            //Impede a propagação do elemento filho para o elemento pai
            e.stopPropagation()
    
            //Chama a função assincrona
            saida()
        }
        const registrarEntrada = (e) => {
            //Impede a propagação do elemento filho para o elemento pai
            e.stopPropagation()
    
            //Chama a função assincrona
            entrada()
        }

    //Retonra o componente
    return (
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

            {/* Div que exibe os dados do morador visitado */}
            <div className={styles['cartao--detalhe']}>

                <h2 className={styles['titulo--cartao']}>Morador visitado</h2>

                <div className={styles['grade--informacoes']}>

                    {/* Nome do morador, exibido apenas quando existe */}
                    {dados?.morador?.nome && (
                        <div className={styles['linha--informacao']}>
                            <span className={styles['rotulo--informacao']}>Nome</span>
                            <span className={styles['valor--informacao']}>{dados?.morador?.nome}</span>
                        </div>
                    )}

                    {/* CPF do morador, exibido apenas quando existe */}
                    {dados?.morador?.cpf && (
                        <div className={styles['linha--informacao']}>
                            <span className={styles['rotulo--informacao']}>CPF</span>
                            <span className={styles['valor--informacao']}>{dados?.morador?.cpf}</span>
                        </div>
                    )}

                </div>

            </div>

            {/* Div que exibe a unidade do morador visitado */}
            <div className={styles['cartao--detalhe']}>

                <h2 className={styles['titulo--cartao']}>Unidade</h2>

                <div className={styles['grade--informacoes']}>

                    {/* Bloco da unidade, exibido apenas quando existe */}
                    {dados?.morador?.unidade?.bloco && (
                        <div className={styles['linha--informacao']}>
                            <span className={styles['rotulo--informacao']}>Bloco</span>
                            <span className={styles['valor--informacao']}>{dados?.morador?.unidade?.bloco}</span>
                        </div>
                    )}

                    {/* Número da unidade, exibido apenas quando existe */}
                    {dados?.morador?.unidade?.numero && (
                        <div className={styles['linha--informacao']}>
                            <span className={styles['rotulo--informacao']}>Número</span>
                            <span className={styles['valor--informacao']}>{dados?.morador?.unidade?.numero}</span>
                        </div>
                    )}

                </div>

            </div>

            {/* Div que exibe os dados da visita */}
            <div className={styles['cartao--detalhe']}>

                {/* Cabeçalho com o título à esquerda e o status da visita à direita */}
                <div className={styles['cabecalho--cartao']}>

                    <h2 className={styles['titulo--cartao']}>Dados da visita</h2>

                    {/* Selo com o status da visita, seguindo o padrão do card de visita do porteiro */}
                    {dados?.autorizacao === 0 || dados?.autorizacao === false ? (
                        <span className={`${styles['selo--status']} ${styles['selo--recusada']}`}>Recusada</span>
                    ) : dados?.autorizacao === null ? (
                        <span className={`${styles['selo--status']} ${styles['selo--aguardando']}`}>Aguardando autorização</span>
                    ) : dados?.saida_registro != null ? (
                        <span className={`${styles['selo--status']} ${styles['selo--finalizada']}`}>Finalizada</span>
                    ) : dados?.entrada_registro != null ? (
                        <span className={`${styles['selo--status']} ${styles['selo--andamento']}`}>Em andamento</span>
                    ) : dados?.autorizacao == 1 ? (
                        <span className={`${styles['selo--status']} ${styles['selo--autorizada']}`}>Autorizada</span>
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

            {/* Div que mostra a autorização da visita, apenas exibindo o valor */}
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

            {/* Ações disponíveis de acordo com o status da visita */}
            <div className={styles['acoes--visita']}>

                {dados?.autorizacao == 1 && dados?.entrada_registro === null && dados?.saida_registro === null && (
                    <button
                        type="button"
                        className={`${styles['botao--acao']} ${styles['botao--entrada']}`}
                        onClick={registrarEntrada}
                    >
                        Registrar entrada
                    </button>
                )}

                {dados?.autorizacao == 1 && dados?.entrada_registro != null && dados?.saida_registro === null && (
                    <button
                        type="button"
                        className={`${styles['botao--acao']} ${styles['botao--saida']}`}
                        onClick={registrarSaida}
                    >
                        Registrar saída
                    </button>
                )}

                {dados?.autorizacao === null && (
                    <button
                        type="button"
                        className={`${styles['botao--acao']} ${styles['botao--deletar']}`}
                        onClick={deletarVisita}
                    >
                        Deletar visita
                    </button>
                )}

            </div>

        </div>
    )
}

//Exporta o componente
export default PaginaDetalhesVisitaPorteiro
