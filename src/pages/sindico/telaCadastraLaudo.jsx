import { useNavigate } from 'react-router-dom';
import styles from '../../css/paginaLaudos.module.css';
import { insertLaudo } from '../../service/Laudos';
import { useState } from 'react';

export default function PaginaCadastraLaudos() {

  //Cmponente que realiza a nevegação automatica
  const navigate = useNavigate()

  // Estados para controlar os inputs
  const [nome, setNome] = useState("");
  const [arquivo, setArquivo] = useState(null);

  //Função responsavel por voltar para a tela que exibe os laudos
  const back = () => {

    //Navega para a tela que exibe os laudos
    navigate("/sindico/condominio/regrasLaudos")
  }

  // Função que envia o formulário para a API
    const handleSalvar = async () => {

        //Verifica se tudo foi preenchido
        if (!nome || !arquivo) {
            alert("Por favor, preencha o nome e selecione um arquivo.");
            return;
        }

        // Chama o service para enviar os dados
        const resultado = await insertLaudo(nome, arquivo);
        
        if(resultado){
            alert(resultado); // Exibe a mensagem de sucesso da API
            back(); // Volta de tela se der certo
        } else {
            alert("Erro ao tentar cadastrar o laudo.");
        }
    }

  return (
    <div className={styles.container}>
      {/* Cabeçalho */}
      <header className={styles.header}>

        <h2 className={styles.title}>Novo Laudo</h2>

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
            value={nome}
            onChange={(e) => setNome(e.target.value)} // Atualiza estado do nome
          />
        </div>

        <div className={styles.fieldGroup}>
          <span className={styles.labelText}>Adicionar arquivo</span>
          
          {/* O label atua como o botão clicável que aciona o input invisível */}
          <label className={styles.uploadBox}>
            <input 
              type="file" 
              className={styles.hiddenFileInput} 
              onChange={(e) => setArquivo(e.target.files[0])} // Captura o primeiro arquivo selecionado
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
           
            {/* Feedback visual básico para mostrar o nome do arquivo, se houver */}
            <span className={styles.uploadText}>
                {arquivo ? arquivo.name : "Upload"} 
            </span>

          </label>
        </div>
      </main>

      {/* Rodapé / Botão de Ação */}
      <footer className={styles.footer}>
        <button className={styles.btnSalvar} onClick={handleSalvar}>Salvar</button>
      </footer>
    </div>
  );
}