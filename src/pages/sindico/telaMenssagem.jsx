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

      {/* Cabeçalho padrão das telas internas: overline (contexto) +
          título (o que a tela entrega). Era a única tela da área
          interna sem essa hierarquia; o par entra no topo do conteúdo
          e o alinhamento central preserva a composição da página. */}
      <header className={styles.cabecalho}>
        <p className="cx-overline">Confirmação</p>
        <h2 className="cx-page-title">Mensagem de confirmação</h2>
      </header>

      {/* Cartão de confirmação: ícone de status, a mensagem
          recebida da tela anterior e o texto dizendo o passo
          seguinte. role=status anuncia a conclusão para os
          leitores de tela assim que a página abre. */}
      <section className={styles.messageBox} role="status" aria-live="polite">

        {/* Ícone decorativo: verde = operação confirmada */}
        <span className={styles.messageIcone} aria-hidden="true">
          <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </span>

        {/* Texto de confirmação (título da tela) */}
        <p className={styles.messageText}>{menssagem}</p>

        {/* Apoio: orienta o usuário sem competir com a mensagem */}
        <p className={styles.messageApoio}>
          Use o botão abaixo para seguir para a próxima tela.
        </p>
      </section>

      {/* Botão para retornar à página anterior: ação secundária */}
      <button type="button" className={styles.btnVoltar} onClick={backPage}>
        {/* Usando o símbolo de flecha esquerda (&larr;) */}
        &larr; VOLTAR
      </button>

    </div>
  );
}

export default PaginaMenssagem;