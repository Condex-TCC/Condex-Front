// Importando o CSS Module. A variável "styles" conterá as classes CSS.
import { useLocation, useNavigate } from 'react-router-dom';
import styles from '../../css/paginaSucesso.module.css'

function PaginaMenssagem() {

    //Cmponente que realiza a nevegação automatica
    const navigate = useNavigate();

    //Hook utilizado para enviar dados durante o redirecionamento
    const location = useLocation();

    //Peganos os dados passados no location
    // Usamos || para definir um valor padrão caso a página seja acessada diretamente
    const menssagem = location.state?.menssagem || 'Operação concluída!';
    const redirecionamento = location.state?.redirecionamento || '/sindico';

   //Função que volta para a tela inicial
    const backPage = () => {

      //Chama a tela que deve ser retornada ao terminar uma ação
      navigate(redirecionamento);
    }

  return (
    <div className={styles.container}>
      
      {/* Caixa principal da mensagem */}
      <div className={styles.messageBox}>
        
        {/* Texto de confirmação */}
        <p className={styles.messageText}>{menssagem}</p>
      </div>

      {/* Botão para retornar à página anterior */}
      <button className={styles.btnVoltar} onClick={backPage}>
        {/* Usando o símbolo de flecha esquerda (&larr;) */}
        &larr; VOLTAR
      </button>

    </div>
  );
}

export default PaginaMenssagem;