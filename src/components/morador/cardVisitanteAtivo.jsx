//Card que exibe um visitante com entrada ativa no condomínio

//Local das importações
import styles from '../../css/telaVisitantesMorador.module.css'
import { iniciais } from '../../utils/texto'

//Card reutilizável de visitante ativo
function CardVisitanteAtivo({ visitante }) {

    //Retorna o componente
    return (

        <div className={`${styles['vm-card']} ${styles['vm-card--ativo']}`}>

            {/* Avatar com as iniciais do visitante */}
            <div className={styles['vm-avatar']} aria-hidden="true">
                {iniciais(visitante.nome)}
            </div>

            {/* Bloco com o nome e os detalhes da visita */}
            <div className={styles['vm-info']}>
                <div className={styles['vm-name']}>{visitante.nome}</div>
                <div className={styles['vm-details']}>
                    Bloco {visitante.bloco} · Apartamento {visitante.apartamento}
                    <br />
                    Entrada {visitante.entrada} · Saída prevista {visitante.saidaPrevista}
                </div>
            </div>

            {/* Etiqueta que mostra que o visitante está dentro do condomínio
                (cx-badge compartilha o visual das outras telas) */}
            <span className={`cx-badge ${styles['vm-badge']} ${styles['vm-badge--ativo']}`}>
                {visitante.status || 'Em andamento'}
            </span>

        </div>
    )
}

//Exportando o componente para ser utilizado na tela de visitantes
export default CardVisitanteAtivo
