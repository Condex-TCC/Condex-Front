//Componente que gera os card da tabela de usuários
//
//APRESENTAÇÃO: cada linha continua exibindo os mesmos dados e
//executando a mesma ação (apagar). As ações é que
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

    //Retorna o componenete
    return(
        <tr>
            <td className={styles.td}>{morador.nome == null ? "Não foi realido o primeiro acesso" : morador.nome}</td>
            <td className={styles.td}>{morador.cpf == null ? "Vazio" : morador.cpf}</td>
            <td className={styles.td}>{morador.telefone == null ? "Vazio" : morador.telefone}</td>
            <td className={styles.td}>{morador.unidade.bloco} - {morador.unidade.numero}</td>

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

    //Retorna o componenete
    return(
        <tr>
            <td className={styles.td}>{porteiro.nome == null ? "Não foi realido o primeiro acesso" : porteiro.nome}</td>
            <td className={styles.td}>{porteiro.email}</td>
            <td className={styles.td}>{porteiro.cpf == null ? "Vázio" : porteiro.cpf}</td>
            <td className={styles.td}>{porteiro.telefone == null ? "Vazio" : porteiro.telefone}</td>

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
