import React from 'react';
import styles from '../../css/paginaCadastraRegra.module.css';

export default function PaginaCadastraRegra() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Adicionar nova regra</h1>
        <button className={styles.backButton}>
          &larr; Voltar
        </button>
      </header>

      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        <input 
          type="text" 
          placeholder="Titulo.." 
          className={styles.inputTitle} 
        />
        
        <textarea 
          placeholder="Descrição..." 
          className={styles.inputDescription} 
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