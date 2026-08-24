//Tela que vai ser responsavel por exibir as regras e os laudos

import styles from "../../css/paginaExibeRegrasLaudos.module.css"

//Função que cria o componente
function PaginaExibeRegrasLaudos() {

    //Retorna um componente
    return (
        // Container principal que engloba tudo
    <div className={styles.container}>
      
      {/* Barra superior contendo as abas e o botão de ação principal */}
      <div className={styles.topBar}>
        <div className={styles.tabs}>
          {/* Botões de aba (ambos não selecionados por padrão) */}
          <button className={styles.tabButton}>Regras do condominio</button>
          <button className={styles.tabButton}>Laudos</button>
        </div>
        
        {/* Botão para criar nova regra */}
        <button className={styles.primaryButton}>+ Nova Regra</button>
      </div>

      {/* Título da listagem */}
      <h2 className={styles.sectionTitle}>Regras do condomínio (12)</h2>

      {/* Card único solicitado que poderá ser componentizado no futuro */}
      <div className={styles.card}>
        
        {/* Cabeçalho do Card (Título e Ícones de Ação) */}
        <div className={styles.cardHeader}>
          <h3 className={styles.cardTitle}>Horário de silêncio</h3>
          
          <div className={styles.cardActions}>
            {/* Botão de Editar com ícone SVG */}
            <button className={styles.iconButton}>
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                 <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                 <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
               </svg>
            </button>
            
            {/* Botão de Excluir com ícone SVG vermelho */}
            <button className={styles.iconButton}>
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#b91c1c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                 <polyline points="3 6 5 6 21 6"></polyline>
                 <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
               </svg>
            </button>
          </div>
        </div>

        {/* Corpo do Card (Horário e Descrição) */}
        <div className={styles.cardBody}> 
          <p className={styles.description}>
            Evitar som alto, obras e festas nesse período.
          </p>
        </div>

      </div>
    </div>
    )
}

//Exportando o componente
export default PaginaExibeRegrasLaudos