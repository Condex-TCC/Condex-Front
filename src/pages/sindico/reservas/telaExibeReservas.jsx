// Reservas.jsx
import { useNavigate } from 'react-router-dom';
import styles from '../../../css/paginaExibeReserva.module.css';

//Tela inicial das reservas: cabeçalho de página + área do
//calendário à esquerda e o painel de solicitações/próximas
//reservas à direita. Os dados exibidos são os mesmos de
//sempre; o que muda é a hierarquia (overline/título/subtítulo),
//os status em pastilha e o comportamento em telas estreitas.
export default function PaginaExibeReserva() {

    //Hook para navegação
    const navigate = useNavigate()

    //Função que realiza o redirecionamento
    const redirecionaGerencia = () => {

        navigate("gerenciamento")
    }

  return (
    <div className={styles.container}>

      {/* Cabeçalho da página: contexto à esquerda, ação principal
          à direita. No celular o botão desce para a própria linha. */}
      <header className={styles.header}>
        <div>
          <p className="cx-overline">Áreas comuns</p>
          <h2 className="cx-page-title">Reservas de áreas comuns</h2>
          <p className="cx-page-subtitle">
            Acompanhe as solicitações pendentes e as próximas reservas do condomínio.
          </p>
        </div>

        {/* Botão que redireciona para outra tela */}
        <button type="button" className={styles.configButton} onClick={redirecionaGerencia}>configurar áreas</button>
      </header>

      <main className={styles.content}>

        {/* Espaço reservado para o calendário: a visão em calendário
            ainda não existe nesta versão, então a tela oferece um
            estado vazio honesto (ícone + título + explicação) em vez
            de texto de desenvolvedor. */}
        <div className={styles.calendarPlaceholder}>
          <div className={styles.calendarVazio}>
            <span className={styles.calendarVazio__icone} aria-hidden="true">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
            </span>
            <p className={styles.calendarVazio__titulo}>Calendário de reservas</p>
            <p className={styles.calendarVazio__texto}>
              A visão em calendário ainda não está disponível nesta versão.
            </p>
          </div>
        </div>

        <aside className={styles.sidebar}>

          {/* Bloco das solicitações aguardando decisão */}
          <section className={styles.bloco} aria-labelledby="titulo-solicitacoes">
            <h3 className={styles.sectionTitle} id="titulo-solicitacoes">Solicitações de reservas</h3>

            <article className={styles.card}>
              <div className={styles.cardContent}>
                <h4>Salão de eventos</h4>
                <p>dia 21/06</p>
              </div>

              {/* Status em pastilha: cor + borda + texto, sem depender só do tom */}
              <span className={styles.statusPending}>Pendente...</span>
            </article>
          </section>

          {/* Bloco das próximas reservas confirmadas */}
          <section className={styles.bloco} aria-labelledby="titulo-proximas">
            <h3 className={styles.sectionTitle} id="titulo-proximas">Proximas reservas...</h3>

            <article className={styles.card}>
              <div className={styles.cardContent}>
                <h4>Piscina</h4>
                <p>dia 18/06</p>
              </div>
              <span className={styles.statusAccepted}>Aceita ✓</span>
            </article>
          </section>
        </aside>
      </main>
    </div>
  );
}
