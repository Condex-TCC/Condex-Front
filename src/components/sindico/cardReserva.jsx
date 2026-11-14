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
  //
  //O card inteiro é o alvo da ação (abrir a autorização), por isso
  //é um <button type="button"> e não uma <div onClick>: ganha foco
  //visível, teclado e leitura de leitor de tela sem mudar o onClick.
  return (
    <button type="button" className={styles.card} onClick={aprovarReserva}>

      {/* Linha principal: nome da área reservada */}
      <span className={styles.header}>
        <span className={styles.title}>{espaco.nome}</span>
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
            {formatData(data)}
          </span>
          <span className={styles.detailItem}>
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            {formatHora(inicio)} às {formatHora(fim)}
          </span>
        </span>

        {/* Quem solicitou: nome à esquerda, unidade em pastilha à direita */}
        <span className={styles.footer}>
          <span className={styles.solicitante}>{morador.nome}</span>
          <span className={styles.unidade}>{morador.unidade.bloco} - Apto {morador.unidade.numero}</span>
        </span>
      </span>

    </button>
  );
}

//Exporta como elemento padrão desse arquivo
export default CardReservaAutorizacao
