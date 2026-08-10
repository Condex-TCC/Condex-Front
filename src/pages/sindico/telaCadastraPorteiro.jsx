//Tela responsavel por cadastrar o porteiro

import styles from '../../css/paginaCadastraUsario.module.css'

function PaginaCadastraPorteiro(){

   return (
    <div className={styles.container}>
      
      {/* Cabeçalho da página */}
      <div className={styles.header}>

        <h2 className={styles.title}>Cadastrar um novo Porteiro</h2>

        {/* Usando o símbolo de flecha esquerda (&larr;) para o ícone de voltar */}
        <button className={styles.btnVoltar}>&larr; voltar</button>
      </div>

      {/* Corpo do formulário contendo as duas colunas */}
      <div className={styles.formContainer}>
        
        {/* Coluna da Esquerda: Campos de entrada de dados */}
        <div className={styles.inputsColumn}>
          <input 
            type="text" 
            placeholder="Nome completo" 
            className={styles.inputField} 
          />
          <input 
            type="email" 
            placeholder="E-mail" 
            className={styles.inputField} 
          />
          <input 
            type="text" 
            placeholder="Senha" 
            className={styles.inputField} 
          />
        </div>

        {/* Coluna da Direita: Perfil estático conforme solicitado */}
        <div className={styles.profileColumn}>
          <span className={styles.profileLabel}>Perfil</span>
          <div className={styles.profileText}>Porteiro</div>
        </div>
        
      </div>

      {/* Rodapé com o botão principal de envio */}
      <div className={styles.footer}>
        <button className={styles.btnCadastrar}>
          Cadastrar Porteiro
        </button>
      </div>

    </div>
  );
}

export default PaginaCadastraPorteiro