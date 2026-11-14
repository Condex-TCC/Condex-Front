//Card que exibe uma reclamação do morador

//Local das importações
import { useNavigate } from "react-router-dom"
import styles from "../../../css/cardReclamacaoMorador.module.css"
import { deleteReclamacao } from "../../../service/Reclamacoes"

//Card reutilizável de reclamação do morador
function CardReclamacaoMorador({ reclamacao, renderiza }) {

    //Função que realiza o delete da reclamacao
    const deletandoReclamacao = async () => {

        //Chama a função que deleta
        const menssage = await deleteReclamacao(reclamacao.id_reclamacao)

        //Exibe no console
        alert(menssage)
        
        //Chama o setCards para renderizar novamente a tela
        renderiza((reclamacoesAtuais) => reclamacoesAtuais.filter((item) => item.id_reclamacao !== reclamacao.id_reclamacao));
    }

    //Retorna o componente
    return (
        <div className={styles['crm-card']}>
            {/* Cabeçalho com título da reclamação e status de visualização */}
            <div className={styles['crm-header']}>
                <div className={styles['crm-headerEsquerda']}>
                    <div className={styles['crm-rotulo']}>Reclamação</div>
                    {(reclamacao.visualizado === true || reclamacao.visualizado === false) && (
                        <span className={`${styles['crm-status']} ${reclamacao.visualizado ? styles['crm-status--visualizado'] : styles['crm-status--naoVisualizado']}`}>
                            {reclamacao.visualizado ? "Visualizada" : "Não visualizada"}
                        </span>
                    )}
                </div>
                <button type="button" className={styles['crm-btnLixeira']} aria-label="Excluir reclamação" onClick={deletandoReclamacao}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 6H5H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M10 11V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M14 11V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
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
