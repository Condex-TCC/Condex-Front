//Local das importações
import styles from "../../css/paginaInicialSindico.module.css"

//Página inicial do sindico
//
//APRESENTAÇÃO: os dados exibidos são os mesmos de sempre
//(pendentes, em andamento e últimos comunicados). O que muda
//é a composição — cabeçalho de página, grade de dois painéis
//e estados vazios com hierarquia — para que a tela use bem a
//largura disponível em vez de deixar um bloco solto no meio.

//Função que cria o componente do sindico
function PaginainicialSindico(){
    
    //Retorna um componente
    return (
    <div className={styles.pagina}>

      {/* Cabeçalho da página: diz ao síndico onde ele está e o que
          vai encontrar abaixo. Padrão de toda a área interna. */}
      <header className={styles['cabecalho-pagina']}>
        <div>
          <p className="cx-overline">Painel do condomínio</p>
          <h2 className="cx-page-title">Início</h2>
          <p className="cx-page-subtitle">
            Resumo rápido do que precisa da sua atenção.
          </p>
        </div>
      </header>

      {/* Grade de dois painéis: indicadores à esquerda,
          comunicação à direita. Em telas estreitas eles empilham. */}
      <div className={styles['grade-painel']}>

        {/* Painel 1 — indicadores de perguntas */}
        <section className={styles.painel} aria-labelledby="titulo-perguntas">
          <div className={styles['painel__cabecalho']}>
            <h3 className={styles['painel__titulo']} id="titulo-perguntas">
              Perguntas não respondidas
            </h3>
          </div>

          <div className={styles['container--resumo']}>

            {/* Indicador 1: pendentes (atenção -> âmbar) */}
            <article className={styles['cartao--resumo']}>
              <div className={styles['cartao--resumo__topo']}>
                <span className={styles['cartao--resumo__rotulo']}>Pendentes</span>
                <span className={`${styles['cartao--resumo__icone']} ${styles['cartao--resumo__icone--alerta']}`} aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                    <line x1="12" y1="9" x2="12" y2="13"></line>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                </span>
              </div>
              <strong className={styles['cartao--resumo__valor']}>0</strong>
              <span className={styles['cartao--resumo__nota']}>aguardando resposta</span>
            </article>

            {/* Indicador 2: em andamento (informação -> azul) */}
            <article className={styles['cartao--resumo']}>
              <div className={styles['cartao--resumo__topo']}>
                <span className={styles['cartao--resumo__rotulo']}>Em andamento</span>
                <span className={`${styles['cartao--resumo__icone']} ${styles['cartao--resumo__icone--info']}`} aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                  </svg>
                </span>
              </div>
              <strong className={styles['cartao--resumo__valor']}>0</strong>
              <span className={styles['cartao--resumo__nota']}>em análise</span>
            </article>

          </div>
        </section>

        {/* Painel 2 — últimos comunicados */}
        <section className={styles.painel} aria-labelledby="titulo-comunicados">
          <div className={styles['painel__cabecalho']}>
            <h3 className={styles['painel__titulo']} id="titulo-comunicados">
              Últimos comunicados
            </h3>
          </div>

          {/* Estado vazio do padrão CONDEX: ícone + frase + explicação.
              Informa que está vazio e o que acontecerá aqui. */}
          <div className="cx-empty">
            <span className="cx-empty__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
            </span>
            <p className="cx-empty__title">No momento não há comunicados!</p>
            <p className="cx-empty__text">
              Os comunicados publicados para os moradores aparecem neste painel.
            </p>
          </div>
        </section>

      </div>

    </div>
  )
}

//Exportando o compomente para ser utilizado em outra página
export default PaginainicialSindico
