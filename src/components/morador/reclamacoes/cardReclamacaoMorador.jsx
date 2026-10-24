//Card que exibe uma reclamação do morador

//Local das importações
import styles from "../../../css/cardReclamacaoMorador.module.css"

//Card reutilizável de reclamação do morador
function CardReclamacaoMorador({ reclamacao }) {

    if (!reclamacao) {
        return null
    }

    //Retorna o componente
    return (
        <div className={styles['crm-card']}>
            {/* Cabeçalho com título da reclamação e status de visualização */}
            <div className={styles['crm-header']}>
                <div className={styles['crm-rotulo']}>Reclamação</div>
                {(reclamacao.visualizado === true || reclamacao.visualizado === false) && (
                    <span className={`${styles['crm-status']} ${reclamacao.visualizado ? styles['crm-status--visualizado'] : styles['crm-status--naoVisualizado']}`}>
                        {reclamacao.visualizado ? "Visualizada" : "Não visualizada"}
                    </span>
                )}
            </div>

            {/* Texto da reclamação */}
            <div className={styles['crm-valor']}>{reclamacao.reclamacao}</div>

            {/* Resposta do síndico */}
            {reclamacao.resposta !== null && reclamacao.resposta !== undefined && reclamacao.resposta !== "" ? (
                <div className={styles['crm-resposta']}>
                    <span className={styles['crm-resposta-rotulo']}>Resposta do síndico</span>
                    <div className={styles['crm-resposta-valor']}>{reclamacao.resposta}</div>
                </div>
            ) : null}
        </div>
    )
}

//Exportando o componente para ser utilizado na tela de reclamações
export default CardReclamacaoMorador
