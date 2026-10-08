import React, { useEffect, useState } from 'react';
import styles from '../../css/paginaCadastraRegra.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { showRegra, updateRegra } from '../../service/Regra';
import { updateRegraAPI } from '../../api/RegrasAPI';

export default function PaginaAtualizaRegra() {

  //Cmponente que realiza a nevegação automatica
  const navigate = useNavigate();

  //Componente que recupera a informação da url
  const { id } = useParams();

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

  //Função que carrega os dados da API
  const obtendoRegra = async () => {

    //Chama a função que trata a API
    let dados = await showRegra(id)
    
    //Desestruturando os dados vindos da API
    const { regra, descricao } = await dados[0]
    
    //Atualizando os estados com os dados vindos do banco de dados
    setNome(regra)
    setDescricao(descricao)
  }

  //Sempre que a página for carreger irá adicionar os dados nos campos
    useEffect(() => {
        
      //Chamando a função que carrega os dados da regra
      obtendoRegra()

  }, [id]);

  //Função que realiza o updadte da regra
  const atualizaRegra = async () => {
  
    //Chama a API
    let message = await updateRegra(id, nome, descricao)
  
    //Exibe a menssagem ao usuário
    alert(message)
  
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

      {/* Cabeçalho da página: contexto, ação concreta e apoio.
          Mesmo padrão das demais telas internas do CONDEX. */}
      <header className={styles['cabecalho-pagina']}>
        <div>
          <p className="cx-overline">Condomínio</p>
          <h2 className="cx-page-title">Atualizar a regra: Nome da regra</h2>
          <p className="cx-page-subtitle">
            Ajuste o título e a descrição da regra salva.
          </p>
        </div>

        <button type="button" className={styles.backButton} onClick={back}>
          &larr; Voltar
        </button>
      </header>

      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>

        <section className={styles['form-secao']} aria-labelledby="secao-regra-editar">
          <h3 className={styles['form-secao__titulo']} id="secao-regra-editar">
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
          <button type="submit" className={styles.submitButton} onClick={atualizaRegra}>
            Atualizar
          </button>
        </div>
      </form>
    </div>
  );
}