import React, { use, useEffect, useState } from 'react';
import styles from '../../css/paginaCadastraRegra.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { insertRegraAPI } from '../../api/RegrasAPI';
import { insertApertamentos, showApertamento, updateApertamento } from '../../service/Apartamentos';
import { updateLaudo } from '../../service/Laudos';

export default function PaginaAtualizaApertamento() {

  //Hook que realiza a navegação
  const navigate = useNavigate()

  //Componente que recupera a informação da url
  const { id } = useParams();

  //States para controlar o valor dos campos
  const [bloco, setBloco] = useState("")
  const [numero, setNumero] = useState("")
  const [descricao, setDescricao] = useState("")

  //Função que pega o valor e altera o estado
  const blocoState = (evento) => {

    //Troca o estado
    setBloco(evento.target.value)
  }

  //Função que pega o valor e altera o estado
  const numeroState = (evento) => {

    //Troca o estado
    setNumero(evento.target.value)
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

  //Função que carrega os dados da API
    const obtendoApertamento = async () => {
  
      //Chama a função que trata a API
      let dados = await showApertamento(id)
      
      //Desestruturando os dados vindos da API
      const { bloco, numero, descricao } = await dados[0]
      
      //Atualizando os estados com os dados vindos do banco de dados
      setBloco(bloco)
      setNumero(numero)
      setDescricao(descricao)
    }
  
    //Sempre que a página for carreger irá adicionar os dados nos campos
    useEffect(() => {
          
        //Chamando a função que carrega os dados do apartamento
        obtendoApertamento()
  
    }, [id]);
  
    //Função que realiza o updadte da regra
    const atualizaApertamento = async () => {
    
      //Chama a API
      let message = await updateApertamento(id, bloco, numero, descricao)
    
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

      {/* Cabeçalho da página: contexto, ação concreta e apoio */}
      <header className={styles['cabecalho-pagina']}>
        <div>
          <p className="cx-overline">Condomínio</p>
          <h2 className="cx-page-title">Atualiza apertamento</h2>
          <p className="cx-page-subtitle">
            Revise os dados da unidade antes de salvar.
          </p>
        </div>

        <button type="button" className={styles.backButton} onClick={back}>
          &larr; Voltar
        </button>
      </header>

      <form className={styles.form} onSubmit={(e) => { e.preventDefault(); atualizaApertamento();}}>

        <section className={styles['form-secao']} aria-labelledby="secao-apertamento">
          <h3 className={styles['form-secao__titulo']} id="secao-apertamento">
            Dados da unidade
          </h3>

          <div className={styles['form-grid']}>
            <div className={styles.campo}>
              <label className={styles['campo__label']} htmlFor="apertamento-bloco">Bloco</label>
              <input
                id="apertamento-bloco"
                type="text"
                placeholder="Bloco"
                className={styles.inputTitle}
                value={bloco}
                onChange={blocoState}
              />
            </div>

            <div className={styles.campo}>
              <label className={styles['campo__label']} htmlFor="apertamento-numero">Número</label>
              <input
                id="apertamento-numero"
                type="text"
                placeholder="Número"
                className={styles.inputTitle}
                value={numero}
                onChange={numeroState}
              />
            </div>

            {/* Campo longo: ocupa a linha inteira da grade */}
            <div className={`${styles.campo} ${styles['campo--full']}`}>
              <label className={styles['campo__label']} htmlFor="apertamento-descricao">Descrição</label>
              <textarea
                id="apertamento-descricao"
                placeholder="Descrição..."
                className={styles.inputDescription}
                value={descricao}
                onChange={descricaoState}
              />
            </div>
          </div>
        </section>

        {/* Rodapé de ações: única primária da tela, à direita */}
        <div className={styles.submitContainer}>
          <button type="submit" className={styles.submitButton}>
            Atualizar
          </button>
        </div>
      </form>
    </div>
  );
}