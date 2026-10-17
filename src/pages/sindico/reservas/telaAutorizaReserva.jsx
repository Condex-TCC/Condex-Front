import styles from '../../../css/paginaCadastraRegra.module.css';
import stylesDados from '../../../css/paginaAutorizaReserva.module.css';

import React, { use, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CardReservaAutorizacao from '../../../components/sindico/cardReserva';
import { aprovaReserva, showReserva } from '../../../service/Reservas';

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
    
    //Chama a função que autoriza a reserva
    let resposta = await aprovaReserva(id, true)

    //O service devolve undefined quando a API falha | Permanece na tela para tentar de novo
    if(!resposta){

      alert("Não foi possível aprovar a reserva. Tente novamente.")

      return
    }

    //Exibe a mensagem própria da tela, pois a API responde "cancelada" também ao aprovar
    alert("Reserva aprovada com sucesso.")

    //Chama a função que realiza o redirecionamento
    back()

  }

   //Função que será chamada para negar a reserva
  const NegarRerva = async () => {
    
    //Chama a função que reprova a reserva
    let resposta = await aprovaReserva(id, false)

    //O service devolve undefined quando a API falha | Permanece na tela para tentar de novo
    if(!resposta){

      alert("Não foi possível recusar a reserva. Tente novamente.")

      return
    }

    //Exibe a mensagem de sucesso
    alert("Reserva recusada com sucesso.")

    //Chama a função que realiza o redirecionamento
    back()

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
        
        {/* Div com os dados da reserva */}
        <div className={stylesDados.dadosBloco}>

          {/* Título do bloco */}
          <h3 className={stylesDados.blocoTitle}>Dados da reserva</h3>

          {/* Linha com rótulo e valor */}
          <div className={stylesDados.campo}>
            <span className={stylesDados.rotulo}>Espaço:</span>
            <span className={stylesDados.valor}>{dadosReserva.espaco?.nome}</span>
          </div>

          {/* Linha com rótulo e valor */}
          <div className={stylesDados.campo}>
            <span className={stylesDados.rotulo}>Descrição:</span>
            <span className={stylesDados.valor}>{dadosReserva.espaco?.descricao}</span>
          </div>

          {/* Linha com rótulo e valor */}
          <div className={stylesDados.campo}>
            <span className={stylesDados.rotulo}>Data:</span>
            <span className={stylesDados.valor}>{dadosReserva.data?.split("-").reverse().join("/")}</span>
          </div>

          {/* Linha com rótulo e valor */}
          <div className={stylesDados.campo}>
            <span className={stylesDados.rotulo}>Início:</span>
            <span className={stylesDados.valor}>{dadosReserva.inicio?.split(":").slice(0, 2).join(":")}</span>
          </div>

          {/* Linha com rótulo e valor */}
          <div className={stylesDados.campo}>
            <span className={stylesDados.rotulo}>Fim:</span>
            <span className={stylesDados.valor}>{dadosReserva.fim?.split(":").slice(0, 2).join(":")}</span>
          </div>

          {/* Linha com rótulo e valor */}
          <div className={stylesDados.campo}>
            <span className={stylesDados.rotulo}>Status:</span>
            <span className={stylesDados.valor}>{dadosReserva.status}</span>
          </div>

        </div>

        {/* Div com os dados do morador */}
        <div className={stylesDados.dadosBloco}>

          {/* Título do bloco */}
          <h3 className={stylesDados.blocoTitle}>Dados do morador</h3>

          {/* Linha com rótulo e valor */}
          <div className={stylesDados.campo}>
            <span className={stylesDados.rotulo}>Nome:</span>
            <span className={stylesDados.valor}>{dadosReserva.morador?.nome}</span>
          </div>

          {/* Linha com rótulo e valor */}
          <div className={stylesDados.campo}>
            <span className={stylesDados.rotulo}>CPF:</span>
            <span className={stylesDados.valor}>{dadosReserva.morador?.cpf}</span>
          </div>

          {/* Linha com rótulo e valor */}
          <div className={stylesDados.campo}>
            <span className={stylesDados.rotulo}>E-mail:</span>
            <span className={stylesDados.valor}>{dadosReserva.morador?.email}</span>
          </div>

          {/* Linha com rótulo e valor */}
          <div className={stylesDados.campo}>
            <span className={stylesDados.rotulo}>Telefone:</span>
            <span className={stylesDados.valor}>{dadosReserva.morador?.telefone}</span>
          </div>

          {/* Linha com rótulo e valor */}
          <div className={stylesDados.campo}>
            <span className={stylesDados.rotulo}>Unidade:</span>
            <span className={stylesDados.valor}>{dadosReserva.morador?.unidade?.bloco} - Apto {dadosReserva.morador?.unidade?.numero}</span>
          </div>

        </div>

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