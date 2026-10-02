// Importações para o arquivo
import cardStyles from "../../../css/cardRegrasLaudosSindico.module.css";

// Criando a função
function CardResposta({ resposta }) {

    // Função que pega o id da resposta e do comunicado
    const responderPerunta = () => {
        alert("ID da interação: " + resposta.id + "\nID do comunicado: " + resposta.comunicado.id);
    }

    // Desestruturação para facilitar a leitura
    const { morador, comunicado, resposta: perguntaMorador, contra_resposta, visualizado } = resposta;

    // Retorna o componente | Card
    return (
        <div className={cardStyles.card}>
        
            {/* Cabeçalho do card com o nome do morador e a unidade */}
            <header className={cardStyles.header}>
                <h3 className={cardStyles.title}>{morador.nome}</h3>
                <div className={cardStyles.timeInfo}>
                    {morador.unidade.bloco} - Apto {morador.unidade.numero}
                </div>
            </header>
        
            {/* Dados adicionais do morador e contexto do comunicado */}
            <div className={cardStyles.laudoContent}>
                <p><strong>Contato:</strong> {morador.telefone} | {morador.email}</p>
                <p><strong>Referente ao Comunicado:</strong> {comunicado.titulo} ({comunicado.descricao})</p>
            </div>

            {/* Corpo do card com o texto da pergunta e a respectiva contra-resposta */}
            <div className={cardStyles.horarioContent} style={{ marginBottom: '16px' }}>
                <p className={cardStyles.description}>
                    <strong>Pergunta:</strong> {perguntaMorador}
                </p>
                
                {/* Exibe a contra-resposta apenas se ela não for nula */}
                {contra_resposta && (
                    <p className={cardStyles.description}>
                        <strong>Resposta do Síndico:</strong> {contra_resposta}
                    </p>
                )}
            </div>

            {/* Rodapé exibindo o status de visualização e botão de ação */}
            <div className={cardStyles.footer}>
                <div className={cardStyles.statusContainer}>
                    <span className={cardStyles.statusLabel}>Status:</span>
                    <span 
                        className={cardStyles.statusValue} 
                        style={{ color: visualizado ? '#2e7d32' : '#a72828' }}
                    >
                        {visualizado ? "Visualizado" : "Pendente"}
                    </span>
                </div>

                {/* Exibe o botão de respota apenas se a contra_resposta for nula */}
                {contra_resposta == null && 
                    <div className={cardStyles.actionGroup}>
                        <button className={cardStyles.actionButton} onClick={responderPerunta}>
                            Responder
                        </button>
                    </div>
                }
            </div>
            
        </div>
    );
}

// Exportando os comunicados
export default CardResposta;