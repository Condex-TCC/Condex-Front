import { useNavigate } from 'react-router-dom';
import styles from '../../css/paginaLaudos.module.css';

export default function PaginaAtualizaLaudos() {

  //Cmponente que realiza a nevegação automatica
  const navigate = useNavigate()

  //Função responsavel por voltar para a tela que exibe os laudos
  const back = () => {

    //Navega para a tela que exibe os laudos
    navigate("/sindico/condominio/regrasLaudos")
  }

  return (
    <div className={styles.container}>
      {/* Cabeçalho */}
      <header className={styles.header}>

        <h2 className={styles.title}>Alterando o Laudo: nome do laudo</h2>

        <button className={styles.btnVoltar} onClick={back}>
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Voltar
        </button>

      </header>

      {/* Formulário Principal */}
      <main className={styles.content}>
        <div className={styles.fieldGroup}>
          <input 
            type="text" 
            className={styles.input} 
            placeholder="Nome" 
          />
        </div>

        <div className={styles.fieldGroup}>
          <span className={styles.labelText}>Adicionar arquivo</span>
          
          {/* O label atua como o botão clicável que aciona o input invisível */}
          <label className={styles.uploadBox}>
            <input 
              type="file" 
              className={styles.hiddenFileInput} 
            />
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="#a3a3a3" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="17 8 12 3 7 8"></polyline>
              <line x1="12" y1="3" x2="12" y2="15"></line>
            </svg>
            <span className={styles.uploadText}>Upload</span>
          </label>
        </div>
      </main>

      {/* Rodapé / Botão de Ação */}
      <footer className={styles.footer}>
        <button className={styles.btnSalvar}>Atualiza</button>
      </footer>
    </div>
  );
}