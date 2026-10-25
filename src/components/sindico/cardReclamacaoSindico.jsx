//Card que exibe uma reclamação para o síndico

//Local das importações
import styles from "../../css/cardReclamacaoSindico.module.css"

//Card reutilizável de reclamação para o síndico
function CardReclamacaoSindico({ reclamacao }) {

    //Retorna o componente
    return (
        <div className={styles['crs-card']}>
            {/* Cabeçalho com título da reclamação e status de visualização */}
            <div className={styles['crs-header']}>
                <div className={styles['crs-rotulo']}>Reclamação</div>
                {reclamacao.visualizado === true || reclamacao.visualizado === false ? (
                    <span className={`${styles['crs-status']} ${reclamacao.visualizado ? styles['crs-status--visualizado'] : styles['crs-status--naoVisualizado']}`}>
                        {reclamacao.visualizado ? "Visualizada" : "Não visualizada"}
                    </span>
                ) : null}
            </div>
            {/* Texto da reclamação */}
            <div className={styles['crs-valor']}>{reclamacao.reclamacao}</div>

            {/* Resposta do síndico */}
            {reclamacao.resposta !== null && reclamacao.resposta !== undefined && reclamacao.resposta !== "" ? (
                <div className={styles['crs-resposta']}>
                    <span className={styles['crs-resposta-rotulo']}>Resposta do síndico</span>
                    <div className={styles['crs-resposta-valor']}>{reclamacao.resposta}</div>
                </div>
            ) : null}
        </div>
    )
}

//Exportando o componente para ser utilizado nas telas de reclamações do síndico
export default CardReclamacaoSindico
