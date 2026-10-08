//Card que exibe um visitante com entrada registrada (que está dentro do condomínio)

//Local das importações
import styles from "../../css/paginainicialPorteiro.module.css"

//Função que devolve o texto quando o dado ainda não é devolvido pela API
const ouSimbolo = (valor) => valor ?? '—'

//Card reutilizável de visitante ativo
function CardVisitanteAtivo({ visitante, aoRegistrarSaida }){

    //Separa os campos que a API de visitantes ativos deverá devolver
    const nome = visitante.nome ?? visitante.visitante?.nome
    const bloco = visitante.bloco ?? visitante.visitante?.bloco
    const apartamento = visitante.apartamento ?? visitante.visitante?.apartamento
    const morador = visitante.morador?.nome
    const entrada = visitante.entrada ?? visitante.entrada_em

    //Retorna o componente
    return (
        <article className={styles["card--item"]}>

            {/* Linha superior: nome + pastilha de quem está dentro */}
            <div className={styles["card--top"]}>
                <span className={styles["text--name"]}>{ouSimbolo(nome)}</span>
                <span className={`cx-badge cx-badge--success ${styles["badge--origem"]}`}>Dentro do condomínio</span>
            </div>

            {/* Linha de informações: apartamento e morador responsável */}
            <div className={styles["card--info"]}>
                <span className={styles["text--block"]}>
                    {bloco ? `Bloco ${bloco} · ` : ''}Apartamento: {ouSimbolo(apartamento)}
                </span>
                <span className={styles["text--date"]}>Morador: {ouSimbolo(morador)}</span>
            </div>

            {/* Linha de ação: horário de entrada e botão de saída */}
            <div className={styles["card--active"]}>
                <div className={styles["info--group"]}>
                    <span className={styles["text--block"]}>Entrada: {ouSimbolo(entrada)}</span>
                </div>

                {
                    //A API ainda não expõe o registro de saída, então o botão só
                    //aparece quando a tela tiver o método de saída disponível
                    aoRegistrarSaida &&
                    <button
                        type="button"
                        className={styles["btn--exit"]}
                        onClick={() => aoRegistrarSaida(visitante)}
                        aria-label={`Registrar saída de ${nome ?? 'visitante'}`}
                    >
                        Registrar saída
                    </button>
                }
            </div>

        </article>
    )
}

//Exportando o compomente para ser utilizado em outra página
export default CardVisitanteAtivo
