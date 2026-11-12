//Card que exibe uma visita do morador

//Local das importações
import { useNavigate } from "react-router-dom"
import styles from "../../css/cardVisitaMorador.module.css"
import { cancelaVisitamorador } from "../../service/VisitasVisitantes"

//Card reutilizável de visita do morador
function CardVisitaMorador({ visita, redireciona }) {

    //Hook que realiza a navegação
    const navigate = useNavigate()

    //Função que realiza o cancelamento
    const cancelaVisita = async () => {

        //Chama a função que cancela visita
        const resonse = await cancelaVisitamorador(visita.id_visita)

        //Exibe a menssagen
        alert(resonse)

        //Recarrega a página
        window.location.reload();
    }

    //Função que realiza a navegação para detalhes
    const exibeDetalhe = () => {

        //Realiza a navegação
        navigate("/morador/visita/detalhes/" + visita.id_visita, {
            //Passando uma valor pela url
            state: {
                redireciona: redireciona
            }
        })
    }

    //Retorna o componente
    return (

        <article className={styles['card--visita']} on onClick={exibeDetalhe}>

            {/* Cabeçalho com os dados do visitante e o status da visita */}
            <header className={styles['cabecalho--visita']}>

                {/* Avatar com as iniciais e identificação do visitante */}
                <div className={styles['identificacao--visita']}>
                    <span className={styles['avatar--visita']} aria-hidden="true">
                        {visita?.visitante?.name?.slice(0, 2).toUpperCase() ?? "?"}
                    </span>

                    <div className={styles['dados--visita']}>
                        <span className={styles['nome--visita']}>{visita?.visitante?.name}</span>

                        {/* CPF e RG do visitante em formato de etiquetas */}
                        <div className={styles['documentos--visita']}>
                            <span className={styles['documento--visita']}>
                                CPF {String(visita?.visitante?.cpf ?? "-").replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")}
                            </span>
                            <span className={styles['documento--visita']}>RG {visita?.visitante?.rg ?? "-"}</span>
                        </div>
                    </div>
                </div>

                {/* Selo de status da visita */}
                {visita?.saida_registro != null ? (
                    <span className={`${styles['selo--status']} ${styles['selo--finalizada']}`}>Finalizada</span>
                ) : visita?.entrada_registro != null ? (
                    <span className={`${styles['selo--status']} ${styles['selo--andamento']}`}>Em andamento</span>
                ) : visita?.autorizacao === 1 ? (
                    <span className={`${styles['selo--status']} ${styles['selo--autorizada']}`}>Autorizada</span>
                ) : visita?.autorizacao === null ? (
                    <span className={`${styles['selo--status']} ${styles['selo--aguardando']}`}>Aguardando autorização</span>
                ) : (
                    <span className={`${styles['selo--status']} ${styles['selo--negada']}`}>Negada</span>
                )}

            </header>

            {/* Horários previstos da visita */}
            <section className={styles['secao--visita']}>
                <h3 className={styles['titulo--secao']}>Agendamento</h3>

                <div className={styles['grade--informacao']}>

                    {/* Entrada prevista da visita */}
                    <div className={styles['linha--informacao']}>
                        <span className={styles['rotulo--informacao']}>Entrada prevista</span>
                        <span className={styles['valor--informacao']}>
                            {visita?.entrada_prevista
                                ? new Date(visita?.entrada_prevista).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" })
                                : "-"}
                        </span>
                    </div>

                    {/* Saída prevista da visita */}
                    <div className={styles['linha--informacao']}>
                        <span className={styles['rotulo--informacao']}>Saída prevista</span>
                        <span className={styles['valor--informacao']}>
                            {visita?.saida_prevista
                                ? new Date(visita?.saida_prevista).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" })
                                : "-"}
                        </span>
                    </div>

                </div>
            </section>

            {/* Registros de entrada e saída feitos pelos porteiros */}
            <section className={styles['secao--visita']}>
                <h3 className={styles['titulo--secao']}>Registros</h3>

                <div className={styles['grade--registros']}>

                    {/* Registro de entrada */}
                    <div className={styles['registro']}>
                        <span className={styles['registro--titulo']}>Entrada</span>
                        {visita?.entrada_registro != null ? (
                            <span className={styles['registro--data']}>
                                {new Date(visita?.entrada_registro).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" })}
                            </span>
                        ) : (
                            <span className={styles['registro--vazio']}>Ainda não registrada</span>
                        )}
                    </div>

                    {/* Registro de saída */}
                    <div className={styles['registro']}>
                        <span className={styles['registro--titulo']}>Saída</span>
                        {visita?.saida_registro != null ? (
                            <span className={styles['registro--data']}>
                                {new Date(visita?.saida_registro).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" })}
                            </span>
                        ) : (
                            <span className={styles['registro--vazio']}>Ainda não registrada</span>
                        )}
                    </div>

                </div>
            </section>

            {/* Ações da visita, exibidas apenas para visitas autorizadas */}
            {visita?.saida_registro == null && visita?.entrada_registro == null && visita?.autorizacao === 1 && (
                <footer className={styles['acoes--visita']}>

                    {/* Botão de cancelar visita, que será implementado mais tarde */}
                    <button type="button" className={styles['botao--cancelar']} onClick={cancelaVisita}>
                        Cancelar visita
                    </button>

                </footer>
            )}

        </article>
    )
}

//Exportando o componente para ser utilizado nas telas de visitas do morador
export default CardVisitaMorador
