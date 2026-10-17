//Card que exibe uma reserva de área comum do morador

//Local das importações
import { formatarDataReserva, formatarHoraReserva } from '../../service/Reservas'
import { reservaAtiva, reservaCancelada, reservaConfirmada, rotuloStatusReserva } from '../../service/ReservaMorador'
import styles from '../../css/telaReservasMorador.module.css'

//Card reutilizável de reserva
//Recebe a reserva, a função de cancelar e o id da reserva que está sendo cancelada
function CardReservaMorador({ reserva, aoCancelar, idCancelando }) {

    //Define a cor da etiqueta de acordo com o status
    let classeStatus = styles['rm-badge--pendente']

    if(reservaConfirmada(reserva.status)){

        classeStatus = styles['rm-badge--confirmada']
    }
    else if(reservaCancelada(reserva.status)){

        classeStatus = styles['rm-badge--cancelada']
    }

    //Somente reservas futuras e não canceladas podem ser canceladas
    const podeCancelar = reservaAtiva(reserva)

    //Retorna o componente
    return (

        <div className={styles['rm-card']}>

            {/* Nome do espaço e etiqueta de status */}
            <div className={styles['rm-card-top']}>
                <div className={styles['rm-name']}>{reserva.espaco?.nome || 'Área comum'}</div>
                <span className={`${styles['rm-badge']} ${classeStatus}`}>
                    {rotuloStatusReserva(reserva.status)}
                </span>
            </div>

            {/* Data e horário da reserva */}
            <div className={styles['rm-details']}>
                {formatarDataReserva(reserva.data)} · {formatarHoraReserva(reserva.inicio)} às {formatarHoraReserva(reserva.fim)}
            </div>

            {/* Botão de cancelar, exibido apenas quando a reserva ainda pode ser cancelada */}
            {
                podeCancelar &&
                <button
                    type="button"
                    className={styles['rm-btn-cancelar']}
                    disabled={idCancelando === reserva.id}
                    onClick={() => aoCancelar(reserva)}
                >
                    {idCancelando === reserva.id ? 'Cancelando...' : 'Cancelar reserva'}
                </button>
            }

        </div>
    )
}

//Exportando o componente para ser utilizado na tela de reservas
export default CardReservaMorador
