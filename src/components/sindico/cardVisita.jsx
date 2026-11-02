//Card que exibe uma visita para o síndico

//Local das importações
import styles from "../../css/cardVisita.module.css"

//Card reutilizável de visita para o síndico
function CardVisita({ visita }) {

    //Retorna o componente
    return (
        <div className={styles['card--visita']}>

            {/* Cabeçalho com o nome do visitante e o status da visita */}
            <div className={styles['cabecalho--visita']}>

                {/* Nome e CPF do visitante */}
                <div className={styles['identificacao--visitante']}>
                    <span className={styles['nome--visitante']}>{visita.visitante?.name}</span>
                    <span className={styles['cpf--visitante']}>
                        {visita.visitante?.cpf?.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")}
                    </span>
                </div>

                {/* Selo de status da visita */}
                <span className={visita.saida === null
                    ? `${styles['selo--status']} ${styles['selo--status--andamento']}`
                    : `${styles['selo--status']} ${styles['selo--status--finalizada']}`}>
                    {visita.saida === null ? "Em andamento" : "Finalizada"}
                </span>

            </div>

            {/* Informações da visita */}
            <div className={styles['informacoes--visita']}>

                {/* Morador visitado */}
                <div className={styles['linha--informacao']}>
                    <span className={styles['rotulo--informacao']}>Morador visitado</span>
                    <span className={styles['valor--informacao']}>{visita.morador?.nome}</span>
                </div>

                {/* Unidade do morador visitado, exibida apenas quando bloco e número existem */}
                {visita.morador?.unidade?.bloco != null && visita.morador?.unidade?.numero != null ? (
                    <div className={styles['linha--informacao']}>
                        <span className={styles['rotulo--informacao']}>Unidade</span>
                        <span className={styles['valor--informacao']}>
                            {visita.morador?.unidade?.bloco}, {visita.morador?.unidade?.numero}
                        </span>
                    </div>
                ) : null}

                {/* Porteiro que registrou a visita, exibido apenas quando o nome existe */}
                {visita.porteiro?.nome != null ? (
                    <div className={styles['linha--informacao']}>
                        <span className={styles['rotulo--informacao']}>Porteiro</span>
                        <span className={styles['valor--informacao']}>{visita.porteiro?.nome}</span>
                    </div>
                ) : null}

                {/* Entrada */}
                <div className={styles['linha--informacao']}>
                    <span className={styles['rotulo--informacao']}>Entrada</span>
                    <span className={styles['valor--informacao']}>
                        {new Date(visita.entrada).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" })}
                    </span>
                </div>

                {/* Saída, exibida apenas quando a visita foi finalizada */}
                {visita.saida != null ? (
                    <div className={styles['linha--informacao']}>
                        <span className={styles['rotulo--informacao']}>Saída</span>
                        <span className={styles['valor--informacao']}>
                            {new Date(visita.saida).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" })}
                        </span>
                    </div>
                ) : null}

            </div>

        </div>
    )
}

//Exportando o componente para ser utilizado nas telas de visitas do síndico
export default CardVisita
