import React from 'react';
import styles from '../../css/paginaCadastraRegra.module.css';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { registrarRetiradaEncomenda } from '../../service/Encomenda';

export default function PaginaDetalheEncomenda() {

  //Hook que realiza a navegação
  const navigate = useNavigate()

  //Hook que pega os parametros da url
  const { id } = useParams()

  //Hook que pega o estado passado na navegação
  const { state } = useLocation()

  //Pegando a encomenda recebida pelo estado da navegação
  const encomenda = state?.encomenda

  //Função responsavel por voltar para a tela inicial do porteiro
  const back = () => {

    //Navega para a tela inicial do porteiro
    navigate("/porteiro")
  }

  //Função que registra a retirada da encomenda
  const retirar = async () => {

    //Chama a função que registra a retirada na API
    let message = await registrarRetiradaEncomenda(id)

    //Exibe a menssagem retornada
    alert(message)

    //Volta para a tela inicial do porteiro
    navigate("/porteiro")
  }

  //Caso a tela seja acessada diretamente, sem vir da lista, não há dados para exibir
  if (!encomenda) {
    return (
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Encomenda</h1>
          <button className={styles.backButton} onClick={back}>
            &larr; Voltar
          </button>
        </header>
        <p>Não foi possível carregar os dados dessa encomenda. Volte para a lista e tente novamente.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>

      <header className={styles.header}>
        <h1 className={styles.title}>{encomenda.nome}</h1>

        <button className={styles.backButton} onClick={back}>
          &larr; Voltar
        </button>

      </header>

      <p>{encomenda.descricao}</p>

      {
        encomenda.data == null ?
          <div className={styles.submitContainer}>
            <button className={styles.submitButton} onClick={retirar}>
              Registrar retirada
            </button>
          </div>
        :
          <p>Retirada em: {encomenda.data}</p>
      }

    </div>
  );
}
