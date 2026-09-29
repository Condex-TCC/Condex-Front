//Card que exibe uma visita previamente cadastrada (agendada)

//Local das importações
import { formatarDataBrasileira } from '../../service/Visitante'
import { iniciais } from '../../utils/texto'
import styles from '../../css/telaVisitantesMorador.module.css'

//Card reutilizável de próxima visita
function CardProximaVisita({ visita }) {

    //Retorna o componente
    return (

        <div className={styles['vm-card']}>

            {/* Avatar com as iniciais do visitante */}
            <div className={styles['vm-avatar']} aria-hidden="true">
                {iniciais(visita.nome)}
            </div>

            {/* Bloco com o nome, a data e o horário da visita */}
            <div className={styles['vm-info']}>
                <div className={styles['vm-name']}>{visita.nome}</div>
                <div className={styles['vm-details']}>
                    {formatarDataBrasileira(visita.data)} · {visita.horario}
                    {visita.saidaPrevista ? ` até ${visita.saidaPrevista}` : ''}
                </div>
            </div>

            {/* Etiqueta que mostra que a visita ainda vai acontecer */}
            <span className={`${styles['vm-badge']} ${styles['vm-badge--agendada']}`}>
                {visita.status || 'Agendada'}
            </span>

        </div>
    )
}

//Exportando o componente para ser utilizado na tela de visitantes
export default CardProximaVisita
