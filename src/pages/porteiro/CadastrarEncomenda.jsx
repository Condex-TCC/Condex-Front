// Tela responsável por cadastrar uma nova encomenda
//
// OBS: o protótipo pedia "Destinatário", "Bloco", "Apartamento" e "Recebida" (data/hora
// manual). A tabela de encomendas na API só tem "nome" e "descrição" — sem vínculo com
// morador/bloco/apartamento e sem campo de data manual (a data de recebimento é sempre
// o "created_at", gerado automaticamente pelo servidor). Por isso o formulário abaixo usa
// "Nome" como o destinatário e "Descrição" como campo livre (pode anotar bloco/apto ali).

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../css/paginaEncomenda.module.css';
import { criandoEncomenda } from '../../service/Encomenda';

function CadastrarEncomenda() {

  const navigate = useNavigate();

  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');

  const [enviando, setEnviando] = useState(false);
  const [erros, setErros] = useState({});

  const voltar = () => {
    navigate('/porteiro');
  };

  const validarFormulario = () => {

    const novosErros = {};

    if (!nome.trim()) novosErros.nome = 'Informe o destinatário da encomenda.';
    if (!descricao.trim()) novosErros.descricao = 'Informe uma descrição para a encomenda.';

    setErros(novosErros);

    return Object.keys(novosErros).length === 0;
  };

  const cadastrarEncomenda = async (evento) => {

    evento.preventDefault();

    if (!validarFormulario()) return;

    setEnviando(true);

    const resultado = await criandoEncomenda({ nome, descricao });

    setEnviando(false);

    if (resultado.sucesso) {

      alert(resultado.mensagem || 'Encomenda cadastrada com sucesso!');

      navigate('/porteiro');

    } else {

      alert(resultado.mensagem);
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
          <input type="text" placeholder="Pesquisar..." />
        </div>

        <div className={styles.usuario}>MJ</div>

      </header>

      {/* Área principal */}
      <main className={styles.main}>

        <button className={styles.btnVoltar} onClick={voltar} type="button">
          <span>←</span>
          voltar
        </button>

        <h1 className={styles.titulo}>
          Cadastrar encomenda
        </h1>

        <form className={styles.formulario} onSubmit={cadastrarEncomenda}>

          {/* Destinatário (mapeado para "nome" na API) */}
          <div className={styles.campo}>

            <label>Destinatário</label>

            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Nome de quem vai receber a encomenda"
            />

            {erros.nome && <span className={styles.mensagemErro}>{erros.nome}</span>}

          </div>

          {/* Descrição (mapeado para "descricao" na API — pode anotar bloco/apto aqui) */}
          <div className={styles.campo}>

            <label>Descrição</label>

            <textarea
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Ex: Bloco A, Apto 27 — caixa média, transportadora XPTO"
            />

            {erros.descricao && <span className={styles.mensagemErro}>{erros.descricao}</span>}

          </div>

          <div className={styles.areaSalvar}>

            <button className={styles.btnSalvar} type="submit" disabled={enviando}>
              {enviando ? 'SALVANDO...' : 'SALVAR'}
            </button>

          </div>

        </form>

      </main>

    </div>
  );
}

export default CadastrarEncomenda;
