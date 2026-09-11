import React, { useState } from 'react';
import styles from '../../css/cardRegrasLaudosSindico.module.css';
import { deleteRegras } from '../../service/Regra';
import { useNavigate } from 'react-router-dom';

export function CardArea( {area, renderiza} ) {

  //Cmponente que realiza a nevegação automatica
  const navigate = useNavigate();

  //Função que deleta o card
  const deleteArea =  async() => {

    // //Chama a função que deleta a regra
    // let message = await deleteRegras(regra.id)

    // //Exibe a menssagem no front
    // alert(message)

    // //Chama o setCards para renderizar novamente a tela
    // renderiza((regrasAtuais) => regrasAtuais.filter((item) => item.id !== regra.id));
  }

  //Função que atualiza a regra
  const atualizaArea = async () => {

    //Realiza a navegação para a tela de updade de regra
    // navigate("/sindico/condominio/regras/update/" + regra.id)
  }


  return (
    <div className={styles.card}>

      <header className={styles.header}>

        <h3 className={styles.title}>{area.nome}</h3> 

        <div className={styles.actions}>

          <button className={styles.iconButton} aria-label="Editar" onClick={atualizaArea}>

            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />

            </svg>
          </button>

          <button className={`${styles.iconButton} ${styles.deleteBtn}`} aria-label="Excluir" onClick={atualizaArea}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              <line x1="10" y1="11" x2="10" y2="17" />
              <line x1="14" y1="11" x2="14" y2="17" />
            </svg>
          </button>
        </div>
      </header>

      <div className={styles.content}>
        <p className={styles.description}>
          {area.descricao}
        </p>
      </div>
    </div>
  );
}