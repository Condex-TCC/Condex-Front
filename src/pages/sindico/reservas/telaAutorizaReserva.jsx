import styles from '../../../css/paginaCadastraRegra.module.css';

import React, { use, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CardReservaAutorizacao from '../../../components/sindico/cardReserva';

export default function PaginaAutorizaRerva() {

  //Hook que realiza a navegação
  const navigate = useNavigate()

  //Hook que pega os parametros da url
  const { id } = useParams()

  //Função responsavel por voltar para a tela que exibe os laudos
  const back = () => {

    //Navega para a tela que exibe os laudos
    navigate("/sindico/reservas/gerenciamento")
  }

  //Função que será chamada para autorizar a reserva
  const AutorizarRerva = async () => {
    
    // //Chama a função que cadastra as regras
    // let message = await insertRegraAPI(nome, descricao)

    // //Chama a tela de menssagem
    // navigate('/sindico/mensagem', {
    //   //Realiza a passagem de valores para a página
    //   state: {
    //     menssagem: "Regra Criada com sucesso!" ,
    //     redirecionamento: '/sindico/condominio/regrasLaudos'
    //   }
    // });
    alert("Fazer aqui a lógica para autroizar reserva")
  }

  //Função que será chamada para recuser a reserva
  const recusarReserva= async () => {
    
    // //Chama a função que cadastra as regras
    // let message = await insertRegraAPI(nome, descricao)

    // //Chama a tela de menssagem
    // navigate('/sindico/mensagem', {
    //   //Realiza a passagem de valores para a página
    //   state: {
    //     menssagem: "Regra Criada com sucesso!" ,
    //     redirecionamento: '/sindico/condominio/regrasLaudos'
    //   }
    // });
    alert("Fazer aqui a lógica para autroizar reserva")
  }

  //TODO: Fazer uma função que recupera os dados da reserva especifica 
  //TODO: Use effect para carregar os dados da reserva

  return (
    <div className={styles.container}>

      <header className={styles.header}>
        <h1 className={styles.title}>Autorizar reserva</h1>

        <button className={styles.backButton} onClick={back}>
          &larr; Voltar
        </button>

      </header>

      <form className={styles.form} onSubmit={(e) => { e.preventDefault();}}>
        
        {/* Passar os dados aqui */}
        <CardReservaAutorizacao></CardReservaAutorizacao>
        
        {/* NOVO CONTAINER COM OS BOTÕES LADO A LADO */}
        <div className={styles.actionsContainer}>
          <button 
            type="button" 
            className={styles.buttonAprovar} 
            onClick={AutorizarRerva}
          >
            Aprovar
          </button>
          
          <button 
            type="button" 
            className={styles.buttonRecusar} 
            onClick={recusarReserva}
          >
            Recusar
          </button>
        </div>
      </form>
    </div>
  );
}