//Página de usuários

import CardUsusario from "../../components/sindico/cardUsuariosSindico"
import styles from "../../css/telaExibeUsuarios.module.css"
import { getMoradores } from "../../api/MoradoresApi"
import { useEffect } from "react"

//Função que cria os componentes
function PaginaExibeUsuarios(){

    const PegandoMoradores = async () => {

        let moradores = await getMoradores()

        console.log(moradores.json())
    }
    useEffect(() => {

      PegandoMoradores()
      
    }, [])

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
          
            <CardUsusario></CardUsusario>


        </tbody>
      </table>
    </div>
  )   
}

//Exportando o componente para ser utilizado em outro arquivo
export default PaginaExibeUsuarios