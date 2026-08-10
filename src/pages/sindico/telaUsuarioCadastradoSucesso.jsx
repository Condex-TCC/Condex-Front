// Importando o CSS Module. A variável "styles" conterá as classes CSS.
import { useNavigate } from 'react-router-dom';
import styles from '../../css/paginaSucesso.module.css'

function SucessoCadastro() {

    //Cmponente que realiza a nevegação automatica
    const navigate = useNavigate();

   //Função que volta para a tela inicial
    const voltaUsuario = () => {

      //Chama a tela de carregamento
      navigate('/sindico/usuarios');
    }

  return (
    <div className={styles.container}>
      
      {/* Caixa principal da mensagem */}
      <div className={styles.messageBox}>
        
        {/* Texto de confirmação */}
        <p className={styles.messageText}>Usuário cadastrado com sucesso!</p>
      </div>

      {/* Botão para retornar à página anterior */}
      <button className={styles.btnVoltar} onClick={voltaUsuario}>
        {/* Usando o símbolo de flecha esquerda (&larr;) */}
        &larr; VOLTAR
      </button>

    </div>
  );
}

export default SucessoCadastro;