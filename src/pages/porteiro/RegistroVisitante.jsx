// Tela responsável por cadastrar o visitante

import { useState } from 'react';
import styles from '../../css/paginaCadastraVisitante.module.css';
import { criandoVisitante } from '../../service/CrudUsuarios';
import { useNavigate } from 'react-router-dom';

function RegistroVisitante() {

  const navigate = useNavigate();

  // Estados dos campos
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [chegada, setChegada] = useState('');
  const [saidaPrevista, setSaidaPrevista] = useState('');
  const [bloco, setBloco] = useState('');
  const [apartamento, setApartamento] = useState('');

  // Função responsável por voltar para a página inicial do porteiro
  const voltaVisitante = () => {
    navigate('/porteiro');
  };

  // Função responsável por cadastrar o visitante
  const cadastraVisitante = async () => {

    const visitante = {
      nome,
      cpf,
      chegada,
      saidaPrevista,
      bloco,
      apartamento
    };

    try {

      const mensagem = await criandoVisitante(visitante);

      alert(mensagem);

      // Depois de cadastrar, volta para a página do porteiro
      navigate('/porteiro');

    } catch (error) {

      console.error(error);

      alert('Erro ao cadastrar visitante.');
    }
  };

  return (
    <div className={styles.container}>

      {/* Cabeçalho */}
      <header className={styles.header}>

        <div className={styles.logo}>
          Cond<span>ex</span>
        </div>

        <div className={styles.pesquisa}>
          <span className={styles.iconePesquisa}>⌕</span>

          <input
            type="text"
            placeholder="Pesquisar..."
          />
        </div>

        <div className={styles.usuario}>
          MJ
        </div>

      </header>

      {/* Área principal */}
      <main className={styles.main}>

        {/* Botão voltar */}
        <button
          className={styles.btnVoltar}
          onClick={voltaVisitante}
        >
          <span>←</span>
          voltar
        </button>

        {/* Título */}
        <h1 className={styles.titulo}>
          Registrar visitante
        </h1>

        {/* Formulário */}
        <div className={styles.formulario}>

          {/* Nome */}
          <div className={`${styles.campo} ${styles.nome}`}>

            <label>Nome</label>

            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />

          </div>

          {/* Chegada */}
          <div className={`${styles.campo} ${styles.chegada}`}>

            <label>chegada</label>

            <input
              type="text"
              placeholder="DD   MM   YYYY"
              value={chegada}
              onChange={(e) => setChegada(e.target.value)}
            />

          </div>

          {/* Saída prevista */}
          <div className={`${styles.campo} ${styles.saida}`}>

            <label>saida prevista</label>

            <input
              type="text"
              placeholder="DD   MM   YYYY"
              value={saidaPrevista}
              onChange={(e) => setSaidaPrevista(e.target.value)}
            />

          </div>

          {/* CPF */}
          <div className={`${styles.campo} ${styles.cpf}`}>

            <label>CPF</label>

            <input
              type="text"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
            />

          </div>

          {/* Bloco */}
          <div className={`${styles.campo} ${styles.bloco}`}>

            <label>Bloco</label>

            <input
              type="text"
              value={bloco}
              onChange={(e) => setBloco(e.target.value)}
            />

          </div>

          {/* Apartamento */}
          <div className={`${styles.campo} ${styles.apartamento}`}>

            <label>Apartamento</label>

            <input
              type="text"
              value={apartamento}
              onChange={(e) => setApartamento(e.target.value)}
            />

          </div>

        </div>

        {/* Botão salvar */}
        <div className={styles.areaSalvar}>

          <button
            className={styles.btnSalvar}
            onClick={cadastraVisitante}
          >
            SALVAR
          </button>

        </div>

      </main>

    </div>
  );
}

export default RegistroVisitante;
