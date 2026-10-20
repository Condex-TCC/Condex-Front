//Componente que gera os card da tabela de usuários

import { useState } from "react"
import styles from "../../css/telaExibeUsuarios.module.css"
import { deleteMorador, deletePorterio } from "../../service/CrudUsuarios"
import { useNavigate } from "react-router-dom"

//Função que cria o componente
function CardMorador({morador, redenriza}){

    //Cmponente que realiza a nevegação automatica
    const navigate = useNavigate();

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

    //Retorna o componenete
    return(
        <tr>
            <td className={styles.td}>{porteiro.nome}</td>
            <td className={styles.td}>Porteiro</td>
            <td className={styles.td}>{porteiro.email}</td>
            <td className={styles.td}>{porteiro.cpf}</td>
            <td className={styles.td}>{porteiro.telefone}</td>

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