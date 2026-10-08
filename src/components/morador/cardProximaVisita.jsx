//Card que exibe uma visita previamente cadastrada (agendada)

//Local das importações
import { formatarDataBrasileira } from '../../service/Visitante'
import { iniciais } from '../../utils/texto'
import styles from '../../css/telaVisitantesMorador.module.css'

//Card reutilizável de próxima visita
function CardProximaVisita({ visita }) {

    //Retorna o componente
    return (

        <div className={`${styles['vm-card']} ${styles['vm-card--agendada']}`}>

            {/* Avatar com as iniciais do visitante */}
            <div className={styles['vm-avatar']} aria-hidden="true">
                {iniciais(visita.nome)}
            </div>

            {/* Bloco com o nome, a data e o horário da visita */}
            <div className={styles['vm-info']}>
                <div className={styles['vm-name']}>{visita.nome}</div>
                <div className={styles['vm-details']}>
                    {
                        //Quando a API não devolve a data, mostra o documento
                        //cadastro no lugar, para o card não ficar com texto vazio
                        visita.data ?
                            `${formatarDataBrasileira(visita.data)}${visita.horario ? ` · ${visita.horario}` : ''}${visita.saidaPrevista ? ` até ${visita.saidaPrevista}` : ''}`
                        :
                            visita.documento ? `Documento: ${visita.documento}` : 'Dados da visita não informados'
                    }
                </div>
            </div>

            {/* Etiqueta que mostra que a visita ainda vai acontecer
                (cx-badge compartilha o visual das outras telas) */}
            <span className={`cx-badge ${styles['vm-badge']} ${styles['vm-badge--agendada']}`}>
                {visita.status || 'Cadastrado'}
            </span>

        </div>
    )
}

//Exportando o componente para ser utilizado na tela de visitantes
export default CardProximaVisita
