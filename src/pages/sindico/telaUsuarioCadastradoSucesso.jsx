// Importando o CSS Module. A variável "styles" conterá as classes CSS.
import styles from '../../css/paginaSucesso.module.css'

function SucessoCadastro() {
  
  return (
    <div className={styles.container}>
      
      {/* Caixa principal da mensagem */}
      <div className={styles.messageBox}>
        
        {/* Texto de confirmação */}
        <p className={styles.messageText}>Usuário cadastrado com sucesso!</p>
      </div>

      {/* Botão para retornar à página anterior */}
      <button className={styles.btnVoltar}>
        {/* Usando o símbolo de flecha esquerda (&larr;) */}
        &larr; VOLTAR
      </button>

    </div>
  );
}

export default SucessoCadastro;