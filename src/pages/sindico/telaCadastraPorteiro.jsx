//Tela responsavel por cadastrar o porteiro

import { useState } from 'react';
import styles from '../../css/paginaCadastraUsario.module.css'
import { criandoPorteiro } from '../../service/CrudUsuarios';
import { useNavigate } from 'react-router-dom';

function PaginaCadastraPorteiro(){

    //Cmponente que realiza a nevegação automatica
    const navigate = useNavigate();

    //Criando estado para controlar as variáveis das inputs
    const [email, setEmail] = useState("")

    //Função que obtem os evento realizam a troca dos valores
    const toogleEmail = (evento) => {

      //Realizando a troca do estado pelo email
      setEmail(evento.target.value)
    }

    //Função que realiza o cadastro
    const cadastraPorteiro = async () => {

      //Chama a função que realiza o login
      let messagePorteiro = await criandoPorteiro(email)


      //Chama a tela de menssagem
      navigate('/sindico/mensagem', {
        //Realiza a passagem de valores para a página
        state: {
          menssagem: messagePorteiro ,
          redirecionamento: '/sindico/usuarios'
        }
      });
    }

    //Função que volta para a tela inicial
    const voltaUsuario = () => {

      //Chama a tela de carregamento
      navigate('/sindico/usuarios');
    }

   return (
    <div className={styles.container}>

      {/* Cabeçalho da página: contexto (Usuários), ação concreta
          e uma linha de apoio. O "voltar" é a ação secundária. */}
      <header className={styles['cabecalho-pagina']}>

        <div>
          <p className="cx-overline">Usuários</p>
          <h2 className="cx-page-title">Cadastrar um novo Porteiro</h2>
          <p className="cx-page-subtitle">
            Informe o e-mail do porteiro; os demais dados são preenchidos no primeiro acesso.
          </p>
        </div>

        {/* Usando o símbolo de flecha esquerda (&larr;) para o ícone de voltar */}
        <button type="button" className={styles.btnVoltar} onClick={voltaUsuario}>&larr; voltar</button>
      </header>

      {/* Corpo do formulário contendo as duas colunas */}
      <div className={styles.formContainer}>

        {/* Título de seção + filete no topo do cartão, no mesmo
            padrão do .form-secao da tela de regra. Ocupa as duas
            colunas, para o filete fechar o cabeçalho inteiro. */}
        <h3 className={styles['form-secao__titulo']}>
          Dados do porteiro
        </h3>

        {/* Coluna da Esquerda: campo de entrada de dados.
            O e-mail ocupa a linha inteira: é o único dado
            informado no cadastro (o resto vem no primeiro acesso). */}
        <div className={styles.inputsColumn}>
          <div className={`${styles.campo} ${styles['campo--full']}`}>
            <label className={styles['campo__label']} htmlFor="porteiro-email">E-mail</label>
            <input
              id="porteiro-email"
              type="email"
              placeholder="E-mail"
              className={styles.inputField}
              onChange={toogleEmail}
            />
          </div>
        </div>

        {/* Coluna da Direita: Perfil estático conforme solicitado */}
        <div className={styles.profileColumn}>
          <span className={styles.profileLabel}>Perfil</span>
          <div className={styles.profileText}>Porteiro</div>
        </div>

        {/* Rodapé dentro do cartão: única ação primária, à direita */}
        <div className={styles.footer}>
          <button type="button" className={styles.btnCadastrar} onClick={cadastraPorteiro}>
            Cadastrar Porteiro
          </button>
        </div>

      </div>

    </div>
  );
}

export default PaginaCadastraPorteiro