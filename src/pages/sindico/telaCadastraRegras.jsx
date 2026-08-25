import React, { use, useState } from 'react';
import styles from '../../css/paginaCadastraRegra.module.css';
import { useNavigate } from 'react-router-dom';
import { insertRegraAPI } from '../../api/RegrasAPI';

export default function PaginaCadastraRegra() {

  //Hook que realiza a navegação
  const navigate = useNavigate()

  //States para controlar o valor dos campos
  const [nome, setNome] = useState("")
  const [descricao, setDescricao] = useState("")

  //Função que pega o valor e altera o estado
  const nomeState = (evento) => {

    //Troca o estado
    setNome(evento.target.value)
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
    
    //Chama a função que cadastra as regras
    let message = await insertRegraAPI(nome, descricao)
    
    //Exibe a menssagem no front
    alert("Regra Criada com sucesso!")

    //Realiza a navegação para a tela inicial
    back()
  }

  return (
    <div className={styles.container}>

      <header className={styles.header}>
        <h1 className={styles.title}>Adicionar nova regra</h1>

        <button className={styles.backButton} onClick={back}>
          &larr; Voltar
        </button>

      </header>

      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        <input 
          type="text" 
          placeholder="Titulo.." 
          className={styles.inputTitle}
          value={nome}
          onChange={nomeState} 
        />
        
        <textarea 
          placeholder="Descrição..." 
          className={styles.inputDescription}
          value={descricao}
          onChange={descricaoState}
        />
        
        <div className={styles.submitContainer}>
          <button type="submit" className={styles.submitButton} onClick={cadastraRegra}>
            Adicionar
          </button>
        </div>
      </form>
    </div>
  );
}