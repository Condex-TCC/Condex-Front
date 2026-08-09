//Componente que gera os card da tabela de usuários

import styles from "../../css/telaExibeUsuarios.module.css"

//Função que cria o componente
function CardMorador({morador}, key){

    //Retorna o componenete
    return(
        <tr>
            <td className={styles.td}>{morador.nome}</td>
            <td className={styles.td}>Morador</td>
            <td className={styles.td}>{morador.cpf}</td>
            <td className={styles.td}>{morador.telefone}</td>
            <td className={styles.td}>{morador.unidade.bloco} - {morador.unidade.numero}</td>
            <td className={styles.tdCenter}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
            </td>
            <td className={styles.tdCenter}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c0392b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                <line x1="10" y1="11" x2="10" y2="17"></line>
                <line x1="14" y1="11" x2="14" y2="17"></line>
              </svg>
            </td>
        </tr>
    )
}

//Função que cria o componente
function CardPorteiro({porteiro}, key){

    //Retorna o componenete
    return(
        <tr>
            <td className={styles.td}>{porteiro.nome}</td>
            <td className={styles.td}>Porteiro</td>
            <td className={styles.td}>{porteiro.email}</td>
            <td className={styles.tdCenter}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
            </td>
            <td className={styles.tdCenter}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c0392b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                <line x1="10" y1="11" x2="10" y2="17"></line>
                <line x1="14" y1="11" x2="14" y2="17"></line>
              </svg>
            </td>
        </tr>
    )
}

export { CardMorador, CardPorteiro}