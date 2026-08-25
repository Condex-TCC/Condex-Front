import React, { useEffect, useState } from 'react';
import styles from '../../css/paginaCadastraRegra.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { showRegra } from '../../service/Regra';

export default function PaginaAtualizaRegra() {

  //Cmponente que realiza a nevegação automatica
  const navigate = useNavigate();

  //Componente que recupera a informação da url
  const { id } = useParams();

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

  //Função que carrega os dados da API
  const obtendoRegra = async () => {

    //Chama a função que trata a API
    let dados = await showRegra(id)
    
    //Desestruturando os dados vindos da API
    const { regra, descricao } = await dados[0]
    
    //Atualizando os estados com os dados vindos do banco de dados
    setNome(regra)
    setDescricao(descricao)
  }

  //Sempre que a página for carreger irá adicionar os dados nos campos
    useEffect(() => {
        
      //Chamando a função que carrega os dados da regra
      obtendoRegra()

  }, [id]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Atualizar a regra: Nome da regra</h1>
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
          <button type="submit" className={styles.submitButton}>
            Atualizar
          </button>
        </div>
      </form>
    </div>
  );
}