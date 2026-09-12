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
  return (
    <div className={styles.card} onClick={aprovarReserva}>
      
      {/* Div com as informações principais */}
      <div className={styles.header}>
        <span className={styles.title}>Salão de eventos</span>
        <span className={styles.separator}>•</span>
        <span className={styles.title}>Festa de aniversário</span>
      </div>

      <div className={styles.content}>

        {/* Div com as informações da reserva */}
        <div className={styles.details}>
          <span>21/06/2026</span>
          <span>18:00 às 23:00</span>
        </div>

        {/* div com as imformações do morador que solicou a reserva */}
        <div className={styles.footer}>
          <span>João Carlos Ferreira</span>
          <span>Bloco B - Apto 204</span>
        </div>
      </div>
      
    </div>
  );
}

//Exporta como elemento padrão desse arquivo
export default CardReservaAutorizacao