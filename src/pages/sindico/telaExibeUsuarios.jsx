//Página de usuários

import { CardMorador, CardPorteiro } from "../../components/sindico/cardUsuariosSindico"
import styles from "../../css/telaExibeUsuarios.module.css"
import { useEffect, useState } from "react"
import { LoadindUsers } from "../../service/CrudUsuarios"

//Função que cria os componentes
function PaginaExibeUsuarios(){

    //Criando uma variavel para se observa o seu estado
    const [tipoUsuario, setTipoUsuario] = useState("morador")

    //Criando uma variavel que será responsavel por armazenar os usuários que serão exibidos
    const [usuarios, setUsuarios] = useState([])

    //Função que obtem o value da opção selecionado na combo box
    const obterValor = (evento) => {

      //Obtendo o valor do objeto do evento
      setTipoUsuario(evento.target.value)

      setUsuarios([])
    }

    //Criando uma função que será executa sempre que a página carreger ou se alterar o estado
    useEffect(() => {
        const getUsuarios = async () => {
          // user vai receber [ [ {...} ] ] ou [] (em caso de erro)
          let user = await LoadindUsers(tipoUsuario)

          // Se user for indefinido ou nulo por algum motivo, garante um array vazio
          const dadosSeguros = user || []

          // Se o primeiro item do array for outro array (o array duplo do Insomnia), 
          // pegamos ele. Se não for, pegamos o array normal.
          const listaFinal = Array.isArray(dadosSeguros[0]) ? dadosSeguros[0] : dadosSeguros

          // Salvamos no estado
          setUsuarios(listaFinal)
        }

        getUsuarios()
      }, [tipoUsuario])

    //Retorna o componente
    return (
    <div className={styles.container}>

      <div className={styles.headerControls}>

        <select className={styles.selectBox} onChange={obterValor}>
          <option value="morador">Moradores</option>
          <option value="porteiro">Porteiros</option>
        </select>
        
        <button className={styles.addButton}>
          + Cadastrar novo usuário
        </button>
      </div>

      {/* Tabela que exite os usuários */}
      <table className={styles.table}>

        {/* Header da tabela */}
        <thead>
            {
              //Verifica qual é tipo de morador que está selecionado
              tipoUsuario === "morador" ?
              (
                <tr>
                  <th className={styles.th}>Nome</th>
                  <th className={styles.th}>Perfil</th>
                  <th className={styles.th}>CPF</th>
                  <th className={styles.th}>telefone</th>
                  <th className={styles.th}>Unidade</th>
                  <th className={styles.thCenter}>Editar</th>
                  <th className={styles.thCenter}>Apagar</th>
                </tr>
              ) :

              (
                <tr>
                  <th className={styles.th}>Nome</th>
                  <th className={styles.th}>Perfil</th>
                  <th className={styles.th}>E-mail</th>
                  <th className={styles.thCenter}>Editar</th>
                  <th className={styles.thCenter}>Apagar</th>
                </tr>
              )
            }
      
        </thead>

        {/* Elementos do corpo da tabela */}
        <tbody>
          
          {
            //Percorrendo o array de usuários
            usuarios.map((usuario) => {
              
              // Verifica qual tipo de usuário está selecionado
              if(tipoUsuario === "morador"){

                //Retorna o card do usuário
                return <CardMorador key={usuario.id} morador={usuario} />
              } else {

                //Retorna o card do usuário
                return <CardPorteiro key={usuario.id} porteiro={usuario} />
              }

            })
          }
            

        </tbody>
      </table>
    </div>
  )   
}

//Exportando o componente para ser utilizado em outro arquivo
export default PaginaExibeUsuarios