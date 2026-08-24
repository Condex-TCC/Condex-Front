//Componente que gera os card da tabela de usuários

import { useState } from "react"
import styles from "../../css/telaExibeUsuarios.module.css"
import { deleteMorador, deletePorterio } from "../../service/CrudUsuarios"
import { useNavigate } from "react-router-dom"

//Função que cria o componente
function CardMorador({morador, redenriza}){

    //Estado que vai salver o Id da variável
    const [id, SetId] = useState(morador.id)

    //Função responsavel por deletar o morador
    const delMorador = async () => {

      //Chama a função de delete
      let resultado = await deleteMorador(id)

      //Exibe uma alerte mostrnado a menssagem
      alert(resultado.mensagem)     

      //Altera o estado do componente pai forçando o recarregamento
     if(resultado.sucesso){                   // só some da tabela se realmente apagou
      redenriza((usuariosAtuais) => usuariosAtuais.filter((user) => user.id !== id))
    }

    }

    //Retorna o componenete
    return(
        <tr>
            <td className={styles.td}>{morador.nome}</td>
            <td className={styles.td}>Morador</td>
            <td className={styles.td}>{morador.cpf}</td>
            <td className={styles.td}>{morador.telefone}</td>
            <td className={styles.td}>{morador.unidade.bloco} - {morador.unidade.numero}</td>
            
            {/* Button que edita */}
            <td className={styles.tdCenter}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
            </td>

            {/* Button que deleta */}
            <td className={styles.tdCenter}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c0392b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                onClick={delMorador}
              >
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
function CardPorteiro({porteiro, redenriza}){

    //Cmponente que realiza a nevegação automatica
    const navigate = useNavigate();

    //Estado que vai salver o Id da variável
    const [id, SetId] = useState(porteiro.id)

    //Função responsavel por deletar o poreteiro
    const delPorteiro = async () => {

      //Chama a função de delete
      let resultado = await deletePorterio(id)

      //Exibe uma alerte mostrnado a menssagem
      alert(resultado.mensagem)

      //Altera o estado do componente pai forçando o recarregamento
      //Se passa fuma função de callback que filtra os usuários salvos no state
      if(resultado.sucesso){
        redenriza((usuariosAtuais) => usuariosAtuais.filter((user) => user.id !== id))
      }

    }

    //Função responsavel por recuperar os dados do porteiro
    const showPorteiro = async () => {

      //Realiza o redirecionamento
      navigate("/sindico/usuarios/porteiro/update/" + id)
    }

    //Retorna o componenete
    return(
        <tr>
            <td className={styles.td}>{porteiro.nome}</td>
            <td className={styles.td}>Porteiro</td>
            <td className={styles.td}>{porteiro.email}</td>

            {/* Updade */}
            <td className={styles.tdCenter}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                onClick={showPorteiro}
              >
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
            </td>

            {/* Delete */}
            <td className={styles.tdCenter}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c0392b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                onClick={delPorteiro}
              >
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