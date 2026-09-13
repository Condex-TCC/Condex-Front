import React, { useState } from 'react';
import styles from '../../css/paginaCadastraRegra.module.css';
import { useNavigate } from 'react-router-dom';
import { cadastrarEncomenda } from '../../service/Encomenda';

export default function PaginaCadastraEncomenda() {

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

  //Função responsavel por voltar para a tela inicial do porteiro
  const back = () => {

    //Navega para a tela inicial do porteiro
    navigate("/porteiro")
  }

  //Função que cadastra a encomenda
  const cadastraEncomenda = async () => {

    //Chama a função que cadastra a encomenda
    let message = await cadastrarEncomenda(nome, descricao)

    //Exibe a menssagem retornada
    alert(message)

    //Volta para a tela inicial do porteiro
    navigate("/porteiro")
  }

  return (
    <div className={styles.container}>

      <header className={styles.header}>
        <h1 className={styles.title}>Cadastrar encomenda</h1>

        <button className={styles.backButton} onClick={back}>
          &larr; Voltar
        </button>

      </header>

      <form className={styles.form} onSubmit={(e) => { e.preventDefault(); cadastraEncomenda(); }}>
        <input
          type="text"
          placeholder="Nome"
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
          <button type="submit" className={styles.submitButton}>
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}
