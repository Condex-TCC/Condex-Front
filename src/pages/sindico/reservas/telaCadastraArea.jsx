import React, { useState } from 'react';
import styles from '../../../css/paginaCadastraRegra.module.css';
import { useNavigate } from 'react-router-dom';
import { insertAreaComun } from '../../../service/AreaComum';

export default function PaginaCadastraArea() {

  //Hook que realiza a navegação
  const navigate = useNavigate()

  //States para controlar o valor dos campos
  const [nome, setNome] = useState("")
  const [descricao, setDescricao] = useState("")
  const [autorizacao, setAutorizacao] = useState(false)

  //State com a mensagem de erro exibida no formulário
  const [erro, setErro] = useState("")

  //State que bloqueia o botão enquanto a área é cadastrada
  const [enviando, setEnviando] = useState(false)

  //Função que pega o valor e altera o estado
  const nomeState = (evento) => {

    //Troca o estado
    setNome(evento.target.value)
  }

  //Função que pega o valor e altera o estado
  const descricaoState = (evento) => {

    //Troca o estado
    setDescricao(evento.target.value)
  }

  //Função responsavel por voltar para a tela que exibe os laudos
  const back = () => {

    //Navega para a tela que exibe os laudos
    navigate("/sindico/reservas/gerenciamento")
  }

  const cadastraRegra = async () => {
    
    //A API exige nome e descrição | Impede o envio com campos vazios
    if(!nome.trim() || !descricao.trim()){

      setErro("Preencha o nome e a descrição da área comum.")

      return
    }

    //Limpa o erro anterior e bloqueia o botão
    setErro("")
    setEnviando(true)

    //Chama a função que cadastra as regras
    let message = await insertAreaComun(nome.trim(), descricao.trim(), autorizacao)

    //Libera o botão
    setEnviando(false)

    //O service devolve undefined quando a API recusa ou falha | Não pode exibir sucesso nesse caso
    if(!message){

      setErro("Não foi possível cadastrar a área comum. Verifique os dados, a conexão com a API e se você está logado como síndico.")

      return
    }

    //Chama a tela de menssagem
    navigate('/sindico/mensagem', {
      //Realiza a passagem de valores para a página
      state: {
        menssagem: message ,
        redirecionamento: '/sindico/reservas/gerenciamento'
      }
    });
  }

  return (
    <div className={styles.container}>

      {/* Cabeçalho da página: contexto (Áreas comuns), ação e apoio */}
      <header className={styles['cabecalho-pagina']}>
        <div>
          <p className="cx-overline">Áreas comuns</p>
          <h2 className="cx-page-title">Adicionar nova Área Comum</h2>
          <p className="cx-page-subtitle">
            Defina o local, a descrição e se a reserva exige aprovação.
          </p>
        </div>

        <button type="button" className={styles.backButton} onClick={back}>
          &larr; Voltar
        </button>
      </header>

      <form className={styles.form} onSubmit={(e) => { e.preventDefault(); cadastraRegra(); }}>

        <section className={styles['form-secao']} aria-labelledby="secao-area">
          <h3 className={styles['form-secao__titulo']} id="secao-area">
            Dados da área
          </h3>

          <div className={styles['form-grid']}>
            <div className={styles.campo}>
              <label className={styles['campo__label']} htmlFor="area-nome">Nome do local</label>
              <input
                id="area-nome"
                type="text"
                placeholder="Nome do local.."
                className={styles.inputTitle}
                value={nome}
                onChange={nomeState}
              />
            </div>

            {/* Campo longo: ocupa a linha inteira da grade */}
            <div className={`${styles.campo} ${styles['campo--full']}`}>
              <label className={styles['campo__label']} htmlFor="area-descricao">Descrição do local</label>
              <textarea
                id="area-descricao"
                placeholder="Descrição do local..."
                className={styles.inputDescription}
                value={descricao}
                onChange={descricaoState}
              />
            </div>
          </div>

          {/* Início dos Radio Buttons */}
          <div className={styles.radioGroup} role="group" aria-labelledby="rotulo-autorizacao">
            <span className={styles.radioTitle} id="rotulo-autorizacao">Requer autorização?</span>

            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="autorizacao"
                className={styles.radioInput}
                checked={autorizacao === true}
                onChange={() => setAutorizacao(true)}
              />
              Sim
            </label>

            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="autorizacao"
                className={styles.radioInput}
                checked={autorizacao === false}
                onChange={() => setAutorizacao(false)}
              />
              Não
            </label>
          </div>
          {/* Fim dos Radio Buttons */}

          {/* Explica o efeito da escolha, pois só reservas de áreas com autorização chegam ao síndico */}
          <p className={styles.formAjuda}>
            Escolhendo "Sim", as reservas dessa área ficam pendentes até a sua aprovação.
            Escolhendo "Não", elas são confirmadas automaticamente e não passam por você.
          </p>

          {/* Mensagem de erro do formulário */}
          {
            erro &&
            <p role="alert" className={styles.formErro}>
              {erro}
            </p>
          }
        </section>

        {/* Rodapé de ações: única primária da tela, à direita */}
        <div className={styles.submitContainer}>
          <button type="submit" className={styles.submitButton} disabled={enviando}>
            {enviando ? 'Adicionando...' : 'Adicionar'}
          </button>
        </div>
      </form>
    </div>
  );
}