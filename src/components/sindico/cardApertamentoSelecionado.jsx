import React, { useState } from 'react';
import styles from '../../css/cardRegrasLaudosSindico.module.css';
import { useNavigate } from 'react-router-dom';
import { deleteApertamento } from '../../service/Apartamentos';
import { verifyMorador } from '../../service/CrudUsuarios';

export function ApertamentoCardSelecionado( {apertamento}) {

  //Cmponente que realiza a nevegação automatica
  const navigate = useNavigate();

  //Função que verifica se o apertamento está livre
  const verificaMorador = async () => {

    //Chama o service que realiza ação
    const resultado = await verifyMorador(apertamento.id)

    //Desestruturando o objeto
    const {message, data} = resultado

    //Verificando se o apertamento está livre
    if(data.exite == true){

        alert(message)

    }else{

        alert(message)

        //Realiza a navegação para a tela de cadastro do morador
        navigate("/sindico/usuarios/morador/create/" + apertamento.id)
    }
  }

  //Função responsavel por intermediar a ação de click com a requisição
  const hendleClick = (e) => {

    //Pega o elemento PAI, o card
    // console.log(e.currentTarget)

    //Chamando a função que verifica o morador
    verificaMorador()
   
  }


  return (
    // O card inteiro é um <button>: a escolha do apartamento
    // passa a ser alcançável pelo teclado e anunciada por
    // leitor de tela, com exatamente o mesmo onClick de antes.
    <button
      type="button"
      className={`${styles.card} ${styles['card--botao']}`}
      onClick={hendleClick}
    >

      {/* Título do card: identificação da unidade */}
      <span className={styles['card__titulo']}>
        {apertamento.bloco} - N° {apertamento.numero}
      </span>

      {/* Metadado: descrição da unidade, em cinza secundário */}
      <span className={styles['card__resumo']}>
        {apertamento.descricao == null ? "Sem descrição" : apertamento.descricao}
      </span>

    </button>
  );
}