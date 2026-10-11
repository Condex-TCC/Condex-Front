// EventCard.jsx
import { useNavigate } from 'react-router-dom';
import styles from '../../css/cardReservaAutorizacao.module.css';


//Função que cria o componente
function CardReservaAutorizacao({ id, espaco, data, inicio, fim, morador }) {

  //Hook que realiza a navegação
  const navigate = useNavigate()

  //Função que realiza o redirecionamento para a tela e visualiar reserva
  const aprovarReserva = () => {

    //Realizando a navegação para a págian de reservas
    navigate("/sindico/reservas/gerenciamento/autorizacao/" + id)
  }

  //Função que formata a data para o padrão brasileiro
  const formatData = (dataReserva) => {

    //Divide a data para obter ano, mês e dia
    const [ano, mes, dia] = dataReserva.split("-")

    //Retorna a data no formato dd/mm/aaaa
    return `${dia}/${mes}/${ano}`
  }

  //Função que formata o horário removendo os segundos
  const formatHora = (hora) => {

    //Divide o horário para obter horas e minutos
    const [horas, minutos] = hora.split(":")

    //Retorna o horário no formato hh:mm
    return `${horas}:${minutos}`
  }


  //Retorna o componente
  return (
    <div className={styles.card} onClick={aprovarReserva}>
      
      {/* Div com as informações principais */}
      <div className={styles.header}>
        <span className={styles.title}>{espaco.nome}</span>
      </div>

      <div className={styles.content}>

        {/* Div com as informações da reserva */}
        <div className={styles.details}>
          <span>{formatData(data)}</span>
          <span>{formatHora(inicio)} às {formatHora(fim)}</span>
        </div>

        {/* div com as imformações do morador que solicou a reserva */}
        <div className={styles.footer}>
          <span>{morador.nome}</span>
          <span>{morador.unidade.bloco} - Apto {morador.unidade.numero}</span>
        </div>
      </div>
      
    </div>
  );
}

//Exporta como elemento padrão desse arquivo
export default CardReservaAutorizacao