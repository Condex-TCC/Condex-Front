import styles from '../../../css/paginaCadastraRegra.module.css';

import React, { use, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CardReservaAutorizacao from '../../../components/sindico/cardReserva';
import { showReserva } from '../../../service/Reservas';

export default function PaginaAutorizaRerva() {

  //Hook que irá armazenar o objeto da reserva
  const [dadosReserva, setDadosReserva] = useState({})

  //Hook que realiza a navegação
  const navigate = useNavigate()

  //Hook que pega os parametros da url
  const { id } = useParams()

  //Função responsavel por voltar para a tela que exibe os laudos
  const back = () => {

    //Navega para a tela que exibe os laudos
    navigate("/sindico/reservas/exibe/aprovadas")
  }

  //Função que obtem uma reserva especifica
  const obtemReserva = async () => {

    //Chamando a reserva
    const response = await showReserva(id)

    //Desestruturando o objeto do Json
    const { reserva } = await response

    //Alterando o estado da reserva
    setDadosReserva(reserva)
  }

  //useEffect que é executado uma vez quando a página é renderizda
  useEffect(() => {

    //Chama a função que obtem os dados
    obtemReserva()
  }, [])

  //Função que será chamada para autorizar a reserva
  const AutorizarRerva = async () => {
    
    //TODO: Fazer aqui lógica aqui, mas tarde
    console.log(true)

  }

   //Função que será chamada para negar a reserva
  const NegarRerva = async () => {
    
    //TODO: Fazer aqui lógica aqui, mais tarde
    console.log(false)

  }


  return (
    <div className={styles.container}>

      <header className={styles.header}>
        <h1 className={styles.title}>Autorizar reserva</h1>

        <button className={styles.backButton} onClick={back}>
          &larr; Voltar
        </button>

      </header>

      <form className={styles.form} onSubmit={(e) => { e.preventDefault();}}>
        
        {/* Adicionar aqui um div que irá exibir os dados da reserva e do morador */}
        
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
            onClick={NegarRerva}
          >
            Recusar
          </button>
        </div>
      </form>
    </div>
  );
}