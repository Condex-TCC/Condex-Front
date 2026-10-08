import React, { use, useState } from 'react';
import styles from '../../css/paginaCadastraRegra.module.css';
import { useNavigate } from 'react-router-dom';
import { insertRegraAPI } from '../../api/RegrasAPI';

export default function PaginaCadastraRegra() {

  //Hook que realiza a navegação
  const navigate = useNavigate()

  //States para controlar o valor dos campos
  const [nome, setNome] = useState("")
  const [descricao, setDescricao] = useState("")

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
    navigate("/sindico/condominio/regrasLaudos")
  }

  const cadastraRegra = async () => {
    
    //Chama a função que cadastra as regras
    let message = await insertRegraAPI(nome, descricao)

    //Chama a tela de menssagem
    navigate('/sindico/mensagem', {
      //Realiza a passagem de valores para a página
      state: {
        menssagem: "Regra Criada com sucesso!" ,
        redirecionamento: '/sindico/condominio/regrasLaudos'
      }
    });
  }

  return (
    <div className={styles.container}>

      {/* Cabeçalho da página: contexto (Condomínio), ação concreta
          (título) e uma linha de apoio dizendo o que se faz aqui.
          O Voltar é a ação secundária e fica à direita, descendo
          para a própria linha quando a tela é estreita. */}
      <header className={styles['cabecalho-pagina']}>
        <div>
          <p className="cx-overline">Condomínio</p>
          <h2 className="cx-page-title">Adicionar nova regra</h2>
          <p className="cx-page-subtitle">
            Registre a norma que passará a valer para todo o condomínio.
          </p>
        </div>

        <button type="button" className={styles.backButton} onClick={back}>
          &larr; Voltar
        </button>
      </header>

      {/* Formulário em cartão branco, com seção interna e grade
          responsiva: cada campo tem rótulo associado por htmlFor. */}
      <form className={styles.form} onSubmit={(e) => { e.preventDefault(); cadastraRegra(); }}>

        <section className={styles['form-secao']} aria-labelledby="secao-regra">
          <h3 className={styles['form-secao__titulo']} id="secao-regra">
            Dados da regra
          </h3>

          <div className={styles['form-grid']}>
            <div className={styles.campo}>
              <label className={styles['campo__label']} htmlFor="regra-titulo">Título</label>
              <input
                id="regra-titulo"
                type="text"
                placeholder="Titulo.."
                className={styles.inputTitle}
                value={nome}
                onChange={nomeState}
              />
            </div>

            {/* Campo longo: ocupa a linha inteira da grade */}
            <div className={`${styles.campo} ${styles['campo--full']}`}>
              <label className={styles['campo__label']} htmlFor="regra-descricao">Descrição</label>
              <textarea
                id="regra-descricao"
                placeholder="Descrição..."
                className={styles.inputDescription}
                value={descricao}
                onChange={descricaoState}
              />
              <p className={styles['campo__hint']}>
                Este texto aparece na listagem de regras exibida para os moradores.
              </p>
            </div>
          </div>
        </section>

        {/* Rodapé de ações: única primária da tela, à direita */}
        <div className={styles.submitContainer}>
          <button type="submit" className={styles.submitButton}>
            Adicionar
          </button>
        </div>
      </form>
    </div>
  );
}