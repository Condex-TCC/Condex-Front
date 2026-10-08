// EventCard.jsx
import { useNavigate } from 'react-router-dom';
import styles from '../../css/cardReserva.module.css';


//Função que cria o componente
function CardReservaAutorizacao() {


  //Hook que realiza a navegação
  const navigate = useNavigate()

  //Função que realiza o redirecionamento para a tela e visualiar reserva
  const aprovarReserva = () => {

    //TODO: Adicionar navegação por parametro
    navigate("autorizacao/" + 1)
  }


  //Retorna o componente
  //
  //O card inteiro é o alvo da ação (abrir a autorização), por isso
  //é um <button type="button"> e não uma <div onClick>: ganha foco
  //visível, teclado e leitura de leitor de tela sem mudar o onClick.
  return (
    <button type="button" className={styles.card} onClick={aprovarReserva}>

      {/* Linha principal: área da reserva • evento reservado */}
      <span className={styles.header}>
        <span className={styles.title}>Salão de eventos</span>
        <span className={styles.separator} aria-hidden="true">•</span>
        <span className={styles.title}>Festa de aniversário</span>
      </span>

      <span className={styles.content}>

        {/* Datas e horários da reserva, com ícone decorativo */}
        <span className={styles.details}>
          <span className={styles.detailItem}>
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            21/06/2026
          </span>
          <span className={styles.detailItem}>
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            18:00 às 23:00
          </span>
        </span>

        {/* Quem solicitou: nome à esquerda, unidade em pastilha à direita */}
        <span className={styles.footer}>
          <span className={styles.solicitante}>João Carlos Ferreira</span>
          <span className={styles.unidade}>Bloco B - Apto 204</span>
        </span>
      </span>

    </button>
  );
}

//Exporta como elemento padrão desse arquivo
export default CardReservaAutorizacao
