import React, { use, useEffect, useState } from 'react';
import styles from '../../css/paginaCadastraRegra.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { insertRegraAPI } from '../../api/RegrasAPI';
import { insertApertamentos, showApertamento } from '../../service/Apartamentos';

export default function PaginaAtualizaApertamento() {

  //Hook que realiza a navegação
  const navigate = useNavigate()

  //Componente que recupera a informação da url
  const { id } = useParams();

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

  //Função que carrega os dados da API
    const obtendoApertamento = async () => {
  
      //Chama a função que trata a API
      let dados = await showApertamento(id)
      
      //Desestruturando os dados vindos da API
      const { bloco, numero, descricao } = await dados[0]
      
      //Atualizando os estados com os dados vindos do banco de dados
      setBloco(bloco)
      setNumero(numero)
      setDescricao(descricao)
    }
  
    //Sempre que a página for carreger irá adicionar os dados nos campos
    useEffect(() => {
          
        //Chamando a função que carrega os dados do apartamento
        obtendoApertamento()
  
    }, [id]);
  
//     //Função que realiza o updadte da regra
//     const atualizaRegra = async () => {
    
//       //Chama a API
//       let message = await updateRegra(id, nome, descricao)
    
//       //Exibe a menssagem ao usuário
//       alert(message)
    
//       //Chama a tela de menssagem
//       navigate('/sindico/mensagem', {
//         //Realiza a passagem de valores para a página
//         state: {
//           menssagem: message ,
//           redirecionamento: '/sindico/condominio/regrasLaudos'
//         }
//       });
//     }

  return (
    <div className={styles.container}>

      <header className={styles.header}>
        <h1 className={styles.title}>Atualiza apertamento</h1>

        <button className={styles.backButton} onClick={back}>
          &larr; Voltar
        </button>

      </header>

      <form className={styles.form} onSubmit={(e) => { e.preventDefault();}}>
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