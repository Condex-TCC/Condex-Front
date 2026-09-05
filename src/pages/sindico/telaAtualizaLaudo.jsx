import { useNavigate, useParams } from 'react-router-dom';
import styles from '../../css/paginaLaudos.module.css';
import { showLaudo, updateLaudo } from '../../service/Laudos';
import { useEffect, useState } from 'react';

export default function PaginaAtualizaLaudos() {

  //Cmponente que realiza a nevegação automatica
  const navigate = useNavigate()

  // Captura o :id que foi passado na URL
  const { id } = useParams() 

  // Estados para armazenar os dados do laudo
  const [nome, setNome] = useState("");
  const [caminhoAtual, setCaminhoAtual] = useState(""); 
  const [novoArquivo, setNovoArquivo] = useState(null); // Caso o usuário queira subir um novo PDF
 
  // Hook que executa assim que a tela carrega
  // Hook que executa assim que a tela carrega
  useEffect(() => {
    async function carregarDados() {
      if (id) {
        // Chama a API passando o ID
        const dadosLaudo = await showLaudo(id);
        
        // Verifica se os dados existem e se tem algo no array
        if (dadosLaudo && dadosLaudo.length > 0) {
          // Preenche os estados acessando o índice [0] do array
          setNome(dadosLaudo[0].laudo); 
          setCaminhoAtual(dadosLaudo[0].caminho);
        }
      }
    }
    
    //Chama a função que carrega os dados
    carregarDados();
  }, [id]);

  //Função responsavel por voltar para a tela que exibe os laudos
  const back = () => {

    //Navega para a tela que exibe os laudos
    navigate("/sindico/condominio/regrasLaudos")
  }

  // NOVA FUNÇÃO: Disparada ao clicar em "Atualizar"
  const handleAtualizar = async () => {

    // Se o usuário selecionou um novo arquivo, enviamos ele. 
    // Se for null (não escolheu nada), enviamos o caminho que já estava salvo no banco.
    const documentoParaEnviar = novoArquivo ? novoArquivo : caminhoAtual;

    // Chama o serviço passando o id, o nome e o arquivo/caminho
    let message = await updateLaudo(id, nome, documentoParaEnviar);

    //Chama a tela de menssagem
    navigate('/sindico/mensagem', {
      //Realiza a passagem de valores para a página
      state: {
        menssagem: message ,
        redirecionamento: '/sindico/condominio/regrasLaudos'
      }
    });
  }

  return (
    <div className={styles.container}>
      {/* Cabeçalho */}
      <header className={styles.header}>

        <h2 className={styles.title}>Alterando o Laudo: {nome || "Carregando..."}</h2>

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
            value={nome} // Valor atrelado ao estado preenchido pela API
            onChange={(e) => setNome(e.target.value)} // Permite edição
          />
        </div>

        <div className={styles.fieldGroup}>
          <span className={styles.labelText}>Substituir arquivo (Opcional)</span>
          
          {/* O label atua como o botão clicável que aciona o input invisível */}
          <label className={styles.uploadBox}>
            <input 
              type="file" 
              className={styles.hiddenFileInput} 
              onChange={(e) => setNovoArquivo(e.target.files[0])}
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
        <button className={styles.btnSalvar} onClick={handleAtualizar}>Atualiza</button>
      </footer>
    </div>
  );
}