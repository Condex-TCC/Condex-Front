import styles from '../../css/cardReservaMini.module.css';

function CardReservaCanceladaMini({ espaco, inicio, fim, morador }) {
  const formatHora = (hora) => {
    if (!hora) return '';
    return String(hora).slice(0, 5);
  };

  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <h4 className={styles.title}>{espaco?.nome}</h4>
        <p className={styles.info}>{formatHora(inicio)} às {formatHora(fim)}</p>
        <p className={styles.info}>
          {morador?.nome} · {morador?.unidade?.bloco} - Apto {morador?.unidade?.numero}
        </p>
      </div>
      <span className={`${styles.status} ${styles.statusCancelada}`}>Cancelada</span>
    </div>
  );
}

export default CardReservaCanceladaMini;
