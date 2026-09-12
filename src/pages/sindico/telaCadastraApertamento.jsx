import React, { use, useState } from 'react';
import styles from '../../css/paginaCadastraRegra.module.css';
import { useNavigate } from 'react-router-dom';
import { insertRegraAPI } from '../../api/RegrasAPI';
import { insertApertamentos } from '../../service/Apartamentos';

export default function PaginaCadastraApertamento() {

  //Hook que realiza a navegação
  const navigate = useNavigate()

  //States para controlar o valor dos campos
  const [bloco, setBloco] = useState("")
  const [numero, setNumero] = useState("")
  const [descricao, setDescricao] = useState("")

  //Função que pega o valor e altera o estado
  const blocoState = (evento) => {

    //Troca o estado
    setBloco(evento.target.value)
  }

  //Função que pega o valor e altera o estado
  const numeroState = (evento) => {

    //Troca o estado
    setNumero(evento.target.value)
  }

  //Função que pega o valor e altera o estado
  const descricaoState = (evento) => {

    //Troca o estado
    setDescricao(evento.target.value)
  }

  //Função responsavel por voltar para a tela que exibe os laudos
  const back = () => {

    //Navega para a tela que exibe os laudos
    navigate("/sindico/condominio/regrasLaudos")
  }

  const cadastraRegra = async () => {
    
    //Chama a função que cadastra os apertamentos
    let message = await insertApertamentos(bloco, numero, descricao)

    //Chama a tela de menssagem
    navigate('/sindico/mensagem', {
      //Realiza a passagem de valores para a página
      state: {
        menssagem: message,
        redirecionamento: '/sindico/condominio/regrasLaudos'
      }
    });
  }

  return (
    <div className={styles.container}>

      <header className={styles.header}>
        <h1 className={styles.title}>Adicionar novo apertamento</h1>

        <button className={styles.backButton} onClick={back}>
          &larr; Voltar
        </button>

      </header>

      <form className={styles.form} onSubmit={(e) => { e.preventDefault(); cadastraRegra(); }}>
        <input 
          type="text" 
          placeholder="Bloco" 
          className={styles.inputTitle}
          value={bloco}
          onChange={blocoState} 
        />

        <input 
          type="text" 
          placeholder="Número" 
          className={styles.inputTitle}
          value={numero}
          onChange={numeroState} 
        />
        
        <textarea 
          placeholder="Descrição..." 
          className={styles.inputDescription}
          value={descricao}
          onChange={descricaoState}
        />
        
        <div className={styles.submitContainer}>
          <button type="submit" className={styles.submitButton}>
            Adicionar
          </button>
        </div>
      </form>
    </div>
  );
}