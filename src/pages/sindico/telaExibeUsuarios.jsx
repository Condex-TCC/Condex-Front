//Página de usuários

import styles from "../../css/telaExibeUsuarios.module.css"

//Função que cria os componentes
function PaginaExibeUsuarios(){

    //Retorna o componente
    return (
    <div className={styles.container}>
      <div className={styles.headerControls}>
        <select className={styles.selectBox}>
          <option value="moradores">Moradores</option>
          <option value="funcionarios">Funcionários</option>
        </select>
        
        <button className={styles.addButton}>
          + Cadastrar novo usuário
        </button>
      </div>

      {/* Tabela que exite os usuários */}
      <table className={styles.table}>

        {/* Header da tabela */}
        <thead>
          <tr>
            <th className={styles.th}>Nome</th>
            <th className={styles.th}>Perfil</th>
            <th className={styles.th}>CPF</th>
            <th className={styles.th}>telefone</th>
            <th className={styles.th}>Unidade</th>
            <th className={styles.thCenter}>Editar</th>
            <th className={styles.thCenter}>Apagar</th>
          </tr>
        </thead>

        {/* Elementos do corpo da tabela */}
        <tbody>
          <tr>
            <td className={styles.td}>Ana Beatriz Rocha</td>
            <td className={styles.td}>Morador</td>
            <td className={styles.td}>48377563898</td>
            <td className={styles.td}>(23) 637884452</td>
            <td className={styles.td}>Bloco A - 101</td>
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
        </tbody>
      </table>
    </div>
  )   
}

//Exportando o componente para ser utilizado em outro arquivo
export default PaginaExibeUsuarios