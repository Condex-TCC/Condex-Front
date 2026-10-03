// Importações para o arquivo
import { useNavigate } from "react-router-dom";
import cardStyles from "../../../css/cardResposta.module.css";

// Criando a função
function CardResposta({ resposta, redirecionamento }) {

    //Hook que realiza a navegação
    const navigate = useNavigate()

    // Função que pega o id da resposta e do comunicado
    const responderPerunta = () => {
        alert("ID da interação: " + resposta.id + "\nID do comunicado: " + resposta.comunicado.id);

        //Realiza a navegação | Passando a ultima tela que o usuário acessou
        navigate("/sindico/comunicados/responder/" + resposta.id, {
            state: {
                redirecionamento: redirecionamento
            }
        })
    }

    // Desestruturação para facilitar a leitura
    const { morador, comunicado, resposta: perguntaMorador, contra_resposta, visualizado } = resposta;

    // Retorna o componente | Card
    return (
        <div className={cardStyles.card}>
        
            {/* Cabeçalho do card com o nome do morador e a unidade */}
            <header className={cardStyles.header}>
                <h3 className={cardStyles.titulo}>{morador.nome}</h3>
                <span className={cardStyles.unidade}>
                    {morador.unidade.bloco} - Apto {morador.unidade.numero}
                </span>
            </header>
        
            {/* Dados adicionais do morador e contexto do comunicado */}
            <div className={cardStyles.contexto}>
                <p className={cardStyles.contextoItem}><strong>Contato:</strong> {morador.telefone} | {morador.email}</p>
                <p className={cardStyles.contextoItem}><strong>Referente ao Comunicado:</strong> {comunicado.titulo} ({comunicado.descricao})</p>
            </div>

            {/* Corpo do card com o texto da pergunta e a respectiva contra-resposta */}
            <div className={cardStyles.conversa}>

                {/* Exibe a pergunta se o morador se ele não for nula */}
                {perguntaMorador &&
                    <p className={cardStyles.pergunta}>
                        <strong>Pergunta:</strong> {perguntaMorador}
                    </p>
                }
                
                {/* Exibe a contra-resposta apenas se ela não for nula */}
                {contra_resposta != null && (
                    <p className={cardStyles.resposta}>
                        <strong>Resposta do Síndico:</strong> {contra_resposta}
                    </p>
                )}
            </div>

            {/* Rodapé exibindo o status de visualização e botão de ação */}
            <div className={cardStyles.footer}>
                <div className={cardStyles.statusContainer}>
                    <span className={cardStyles.statusLabel}>Status:</span>
                    <span 
                        className={visualizado ? cardStyles.statusVisualizado : cardStyles.statusPendente}
                    >
                        {visualizado ? "Visualizado" : "Pendente"}
                    </span>
                </div>

                {/* Exibe o botão de respota apenas se existir resposta e a contra resposta for nula */}
                {(perguntaMorador != null && contra_resposta == null) && 
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