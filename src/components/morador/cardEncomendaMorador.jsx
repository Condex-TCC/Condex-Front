//Card que exibe uma encomenda do morador

//Local das importações
import styles from "../../css/cardEncomendaMorador.module.css"

//Card reutilizável de encomenda do morador
function CardEncomendaMorador({ encomenda }) {

    //Retorna o componente
    return (

        <div className={styles['card--encomenda']}>

            {/* Cabeçalho com o ícone, o nome da encomenda e o status */}
            <div className={styles['cabecalho--encomenda']}>

                {/* Ícone e nome da encomenda */}
                <div className={styles['identificacao--encomenda']}>
                    <span className={styles['icone--encomenda']}>📦</span>
                    <span className={styles['nome--encomenda']}>{encomenda.nome}</span>
                </div>

                {/* Selo de status da encomenda */}
                <span className={encomenda.data_retirada != null
                    ? `${styles['selo--status']} ${styles['selo--status--retirada']}`
                    : `${styles['selo--status']} ${styles['selo--status--aguardando']}`}>
                    {encomenda.data_retirada != null ? "Retirada" : "Aguardando retirada"}
                </span>

            </div>

            {/* Informações da encomenda */}
            <div className={styles['informacoes--encomenda']}>

                {/* Descrição da encomenda, exibida apenas quando existe */}
                {encomenda.descricao != null && (
                    <div className={styles['linha--informacao']}>
                        <span className={styles['rotulo--informacao']}>Descrição</span>
                        <span className={styles['valor--informacao']}>{encomenda.descricao}</span>
                    </div>
                )}

                {/* Data de retirada, exibida apenas quando a encomenda foi retirada */}
                {encomenda.data_retirada != null && (
                    <div className={styles['linha--informacao']}>
                        <span className={styles['rotulo--informacao']}>Retirada em</span>
                        <span className={styles['valor--informacao']}>
                            {new Date(encomenda.data_retirada).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" })}
                        </span>
                    </div>
                )}

            </div>

        </div>
    )
}

//Exportando o componente para ser utilizado na tela de encomendas do morador
export default CardEncomendaMorador
