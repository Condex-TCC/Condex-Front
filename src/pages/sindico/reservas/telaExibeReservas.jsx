// Reservas.jsx
import { useNavigate } from 'react-router-dom';
import styles from '../../../css/PaginaExibeReserva.module.css';

export default function PaginaExibeReserva() {

    //Hook para navegação
    const navigate = useNavigate()

    //Função que realiza o redirecionamento
    const redirecionaGerencia = () => {

        navigate("gerenciamento")
    }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Reservas de áreas comuns</h1>

        {/* Botão que redireciona para outra tela */}
        <button className={styles.configButton} onClick={redirecionaGerencia}>configurar áreas</button>
      </header>

      <main className={styles.content}>
        <div className={styles.calendarPlaceholder}>
          (unrendered component)
        </div>

        <aside className={styles.sidebar}>
          <div>
            <h3 className={styles.sectionTitle}>Solicitações de reservas</h3>
            <div className={styles.card}>
              <div className={styles.cardContent}>
                <h4>Salão de eventos</h4>
                <p>dia 21/06</p>
              </div>
              <span className={styles.statusPending}>Pendente...</span>
            </div>
          </div>

          <div>
            <h3 className={styles.sectionTitle}>Proximas reservas...</h3>
            <div className={styles.card}>
              <div className={styles.cardContent}>
                <h4>Piscina</h4>
                <p>dia 18/06</p>
              </div>
              <span className={styles.statusAccepted}>Aceita ✓</span>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}