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

      <header className={styles.header}>
        <h1 className={styles.title}>Adicionar nova Área Comum</h1>

        <button className={styles.backButton} onClick={back}>
          &larr; Voltar
        </button>

      </header>

      <form className={styles.form} onSubmit={(e) => { e.preventDefault(); cadastraRegra(); }}>
        <input 
          type="text" 
          placeholder="Nome do local.." 
          className={styles.inputTitle}
          value={nome}
          onChange={nomeState} 
        />
        
        <textarea 
          placeholder="Descrição do local..." 
          className={styles.inputDescription}
          value={descricao}
          onChange={descricaoState}
        />

        {/* Início dos Radio Buttons */}
        <div className={styles.radioGroup}>
          <span className={styles.radioTitle}>Requer autorização?</span>
          
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
        <p style={{ margin: 0, fontSize: 13, color: '#6b7280' }}>
          Escolhendo "Sim", as reservas dessa área ficam pendentes até a sua aprovação.
          Escolhendo "Não", elas são confirmadas automaticamente e não passam por você.
        </p>
        
        {/* Mensagem de erro do formulário */}
        {
          erro &&
          <p role="alert" style={{ border: '1px solid #f3c6c6', borderRadius: 12, backgroundColor: '#fdecec', color: '#a12626', padding: 16, fontSize: 14, margin: 0 }}>
            {erro}
          </p>
        }

        <div className={styles.submitContainer}>
          <button type="submit" className={styles.submitButton} disabled={enviando}>
            {enviando ? 'Adicionando...' : 'Adicionar'}
          </button>
        </div>
      </form>
    </div>
  );
}