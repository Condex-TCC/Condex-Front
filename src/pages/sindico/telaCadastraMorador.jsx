//Tela responsavel por cadastrar o porteiro

import styles from '../../css/paginaCadastraUsario.module.css'

function PaginaCadastraMorador(){

   return (
    <div className={styles.container}>
      
      {/* Cabeçalho da página */}
      <div className={styles.header}>

        <h2 className={styles.title}>Cadastrar um novo Morador</h2>

        {/* Usando o símbolo de flecha esquerda (&larr;) para o ícone de voltar */}
        <button className={styles.btnVoltar}>&larr; voltar</button>
      </div>

      {/* Corpo do formulário contendo as duas colunas */}
      <div className={styles.formContainer}>
        
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

export default PaginaCadastraMorador