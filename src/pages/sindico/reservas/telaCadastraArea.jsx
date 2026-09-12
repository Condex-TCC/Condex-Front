import React, { useState } from 'react';
import styles from '../../../css/paginaCadastraRegra.module.css';
import { useNavigate } from 'react-router-dom';
import { insertAreaComun } from '../../../service/AreaComum';

export default function PaginaCadastraArea() {

  //Hook que realiza a navegação
  const navigate = useNavigate()

  //States para controlar o valor dos campos
  const [nome, setNome] = useState("")
  const [descricao, setDescricao] = useState("")
  const [autorizacao, setAutorizacao] = useState(false)

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
    navigate("/sindico/reservas/gerenciamento")
  }

  const cadastraRegra = async () => {
    
    //Chama a função que cadastra as regras
    let message = await insertAreaComun(nome, descricao, autorizacao)

    //Chama a tela de menssagem
    navigate('/sindico/mensagem', {
      //Realiza a passagem de valores para a página
      state: {
        menssagem: message ,
        redirecionamento: '/sindico/reservas/gerenciamento'
      }
    });
  }

  return (
    <div className={styles.container}>

      <header className={styles.header}>
        <h1 className={styles.title}>Adicionar nova Área Comum</h1>

        <button className={styles.backButton} onClick={back}>
          &larr; Voltar
        </button>

      </header>

      <form className={styles.form} onSubmit={(e) => { e.preventDefault(); cadastraRegra(); }}>
        <input 
          type="text" 
          placeholder="Nome do local.." 
          className={styles.inputTitle}
          value={nome}
          onChange={nomeState} 
        />
        
        <textarea 
          placeholder="Descrição do local..." 
          className={styles.inputDescription}
          value={descricao}
          onChange={descricaoState}
        />

        {/* Início dos Radio Buttons */}
        <div className={styles.radioGroup}>
          <span className={styles.radioTitle}>Requer autorização?</span>
          
          <label className={styles.radioLabel}>
            <input 
              type="radio" 
              name="autorizacao"
              className={styles.radioInput}
              checked={autorizacao === true}
              onChange={() => setAutorizacao(true)}
            />
            Sim
          </label>
          
          <label className={styles.radioLabel}>
            <input 
              type="radio" 
              name="autorizacao"
              className={styles.radioInput}
              checked={autorizacao === false}
              onChange={() => setAutorizacao(false)}
            />
            Não
          </label>
        </div>
        {/* Fim dos Radio Buttons */}
        
        <div className={styles.submitContainer}>
          <button type="submit" className={styles.submitButton}>
            Adicionar
          </button>
        </div>
      </form>
    </div>
  );
}