//Componente que gera os card da tabela de usuários
//
//APRESENTAÇÃO: cada linha continua exibindo os mesmos dados e
//executando as mesmas ações (editar/apagar). As ações é que
//passam a ser <button> em vez de <svg> com onClick: mesmo
//comportamento no mouse, agora também alcançáveis por teclado
//e com rótulo lido por leitores de tela.

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

    //Função responsavel por recuperar os dados do porteiro
    const showMorador = () => {

      //Realiza o redirecionamento
      navigate("morador/updade/" + id)
    }


    //Retorna o componenete
    return(
        <tr>
            <td className={styles.td}>{morador.nome}</td>
            <td className={styles.td}>Morador</td>
            <td className={styles.td}>{morador.cpf}</td>
            <td className={styles.td}>{morador.telefone}</td>
            <td className={styles.td}>{morador.unidade.bloco} - {morador.unidade.numero}</td>
            
            {/* Botão que edita (ação secundária -> contorno neutro) */}
            <td className={styles.tdCenter}>
              <button
                type="button"
                className={styles.acaoBtn}
                onClick={showMorador}
                aria-label={`Editar ${morador.nome}`}
                title="Editar"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
              </button>
            </td>

            {/* Botão que deleta (ação destrutiva -> vermelho) */}
            <td className={styles.tdCenter}>
              <button
                type="button"
                className={`${styles.acaoBtn} ${styles['acaoBtn--perigo']}`}
                onClick={delMorador}
                aria-label={`Apagar ${morador.nome}`}
                title="Apagar"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  <line x1="10" y1="11" x2="10" y2="17"></line>
                  <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
              </button>
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

            {/* Botão que edita (ação secundária -> contorno neutro) */}
            <td className={styles.tdCenter}>
              <button
                type="button"
                className={styles.acaoBtn}
                onClick={showPorteiro}
                aria-label={`Editar ${porteiro.nome}`}
                title="Editar"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
              </button>
            </td>

            {/* Botão que deleta (ação destrutiva -> vermelho) */}
            <td className={styles.tdCenter}>
              <button
                type="button"
                className={`${styles.acaoBtn} ${styles['acaoBtn--perigo']}`}
                onClick={delPorteiro}
                aria-label={`Apagar ${porteiro.nome}`}
                title="Apagar"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  <line x1="10" y1="11" x2="10" y2="17"></line>
                  <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
              </button>
            </td>
        </tr>
    )
}

export { CardMorador, CardPorteiro}
