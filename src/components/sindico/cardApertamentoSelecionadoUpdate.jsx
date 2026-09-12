import React, { useState } from 'react';
import styles from '../../css/cardRegrasLaudosSindico.module.css';
import { useNavigate } from 'react-router-dom';
import { deleteApertamento } from '../../service/Apartamentos';
import { verifyMorador } from '../../service/CrudUsuarios';

export function ApertamentoCardSelecionadoUpdade( {apertamento, idMorador}) {

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

        //Realiza a navegação para a tela de updade do morador
        navigate("/sindico/usuarios/morador/updade/" + idMorador, {
            state: {
                novoApertamento: apertamento.id
            }
        })
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
    <div className={styles.card} onClick={hendleClick}>

      <header className={styles.header}>

        <h3 className={styles.title}>{apertamento.bloco} - N° {apertamento.numero}</h3> 

      </header>

      <div className={styles.content}>
        <p className={styles.description}>
          {apertamento.descricao == null ? "Sem descrição" : apertamento.descricao}
        </p>
      </div>
    </div>
  );
}