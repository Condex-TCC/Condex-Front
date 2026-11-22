import { useNavigate } from 'react-router-dom';
import styles from '../../css/cardReservaMini.module.css';

function CardReservaPendenteMini({ id, espaco, inicio, fim, morador }) {
  const navigate = useNavigate();

  const formatHora = (hora) => {
    if (!hora) return '';
    return String(hora).slice(0, 5);
  };

  const abrirAutorizacao = () => {
    navigate('/sindico/reservas/gerenciamento/autorizacao/' + id);
  };

  return (
    <button type="button" className={`${styles.card} ${styles.cardButton}`} onClick={abrirAutorizacao}>
      <div className={styles.content}>
        <h4 className={styles.title}>{espaco?.nome}</h4>
        <p className={styles.info}>{formatHora(inicio)} às {formatHora(fim)}</p>
        <p className={styles.info}>
          {morador?.nome} · {morador?.unidade?.bloco} - Apto {morador?.unidade?.numero}
        </p>
      </div>
      <span className={`${styles.status} ${styles.statusPendente}`}>Pendente</span>
    </button>
  );
}

export default CardReservaPendenteMini;
