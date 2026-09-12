// Tela responsável por cadastrar o visitante
//
// OBS: o protótipo original pedia os campos "chegada", "saída prevista", "bloco" e
// "apartamento". Nenhum desses campos existe na tabela de visitantes da API — ela só
// aceita nome, CPF e o morador (fk_morador) que está recebendo a visita. Por isso:
//  - "chegada" e "saída prevista" foram removidos (não há onde guardar essa informação);
//  - "bloco" e "apartamento" viraram um único campo de seleção do morador, já que é
//    a partir do morador que o bloco/apartamento são conhecidos pelo sistema.

import { useEffect, useState } from 'react';
import styles from '../../css/paginaCadastraVisitante.module.css';
import { criandoVisitante } from '../../service/Visitante';
import { obtendoMoradoresParaPorteiro } from '../../service/MoradorPorteiro';
import { useNavigate } from 'react-router-dom';

function RegistroVisitante() {

  const navigate = useNavigate();

  // Estados dos campos do formulário
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [fkMorador, setFkMorador] = useState('');

  // Lista de moradores para preencher o campo de seleção
  const [moradores, setMoradores] = useState([]);
  const [carregandoMoradores, setCarregandoMoradores] = useState(true);

  // Estado de envio do formulário (evita cliques duplicados e mostra feedback no botão)
  const [enviando, setEnviando] = useState(false);

  // Mensagens de validação exibidas embaixo de cada campo
  const [erros, setErros] = useState({});

  // Busca a lista de moradores assim que a tela carrega
  useEffect(() => {

    const carregarMoradores = async () => {

      setCarregandoMoradores(true);

      const lista = await obtendoMoradoresParaPorteiro();

      setMoradores(lista);

      setCarregandoMoradores(false);
    };

    carregarMoradores();

  }, []);

  // Função responsável por voltar para a página inicial do porteiro
  const voltaVisitante = () => {
    navigate('/porteiro');
  };

  // Valida os campos obrigatórios do formulário antes de enviar
  const validarFormulario = () => {

    const novosErros = {};

    if (!nome.trim()) novosErros.nome = 'Informe o nome do visitante.';
    if (!cpf.trim()) novosErros.cpf = 'Informe o CPF do visitante.';
    if (!fkMorador) novosErros.fkMorador = 'Selecione o morador que está recebendo a visita.';

    setErros(novosErros);

    // Formulário válido quando não há nenhuma mensagem de erro
    return Object.keys(novosErros).length === 0;
  };

  // Função responsável por cadastrar o visitante
  const cadastraVisitante = async (evento) => {

    evento.preventDefault();

    if (!validarFormulario()) return;

    setEnviando(true);

    const resultado = await criandoVisitante({ nome, cpf, fkMorador });

    setEnviando(false);

    if (resultado.sucesso) {

      alert(resultado.mensagem || 'Visitante cadastrado com sucesso!');

      // Depois de cadastrar, volta para a página do porteiro
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
          type="button"
        >
          <span>←</span>
          voltar
        </button>

        {/* Título */}
        <h1 className={styles.titulo}>
          Registrar visitante
        </h1>

        {/* Formulário */}
        <form className={styles.formulario} onSubmit={cadastraVisitante}>

          {/* Nome */}
          <div className={`${styles.campo} ${styles.nome}`}>

            <label>Nome</label>

            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />

            {erros.nome && <span className={styles.mensagemErro}>{erros.nome}</span>}

          </div>

          {/* CPF */}
          <div className={`${styles.campo} ${styles.cpf}`}>

            <label>CPF</label>

            <input
              type="text"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              placeholder="000.000.000-00"
            />

            {erros.cpf && <span className={styles.mensagemErro}>{erros.cpf}</span>}

          </div>

          {/* Morador (substitui os campos "Bloco" e "Apartamento" do protótipo, que a API
              não aceita como texto livre — o bloco/apto vêm da unidade do morador escolhido) */}
          <div className={`${styles.campo} ${styles.morador}`}>

            <label>Morador visitado</label>

            <select
              value={fkMorador}
              onChange={(e) => setFkMorador(e.target.value)}
              disabled={carregandoMoradores}
            >
              <option value="">
                {carregandoMoradores ? 'Carregando moradores...' : 'Selecione o morador'}
              </option>

              {moradores.map((morador) => (
                <option key={morador.id} value={morador.id}>
                  Bloco {morador.unidade?.bloco} - Apto {morador.unidade?.numero} · {morador.nome}
                </option>
              ))}
            </select>

            {erros.fkMorador && <span className={styles.mensagemErro}>{erros.fkMorador}</span>}

          </div>

          {/* Botão salvar (fica dentro do <form> para que o Enter também envie o formulário,
              seguindo o mesmo padrão usado na tela de login) */}
          <div className={styles.areaSalvar}>

            <button
              className={styles.btnSalvar}
              disabled={enviando}
              type="submit"
            >
              {enviando ? 'SALVANDO...' : 'SALVAR'}
            </button>

          </div>

        </form>

      </main>

    </div>
  );
}

export default RegistroVisitante;
