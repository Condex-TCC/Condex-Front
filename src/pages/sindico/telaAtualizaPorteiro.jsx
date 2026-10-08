//Tela responsavel por cadastrar o porteiro

import { useEffect, useState } from 'react';
import styles from '../../css/paginaCadastraUsario.module.css'
import { atualizaPorteiro, criandoPorteiro, obtendoPorteiro } from '../../service/CrudUsuarios';
import { useNavigate, useParams } from 'react-router-dom';

function PaginaAtualizaPorteiro(){

    //Cmponente que realiza a nevegação automatica
    const navigate = useNavigate();

    //Componente que recupera a informação da url
    const { id } = useParams();

    //Criando estado para controlar as variáveis das inputs
    const [name, setName] = useState("")
    const [eamil, setEmail] = useState("")
    const [password, setPassword] = useState("")

    //Função que carrega os dados da API
    const showPorteiro = async () => {

        //Chama a função que trata a API
        let dados = await obtendoPorteiro(id)

        //Desestruturando os dados vindos da API
        const { email, nome } = await dados[0]

        //Atualizando os estados com os dados vindos do banco de dados
        setName(nome)
        setEmail(email)
    }

    //Sempre que a página for carreger irá adicionar os dados nos campos
    useEffect(() => {
      
      //Chamando a função que carrega os dados do porteiro
      showPorteiro()

      //Envia uma menssagem ao usuário
      alert("Será nessecário atualizar a senha do porteiro!")

    }, [id]);

    //Função que obtem os evento realizam a troca dos valores
    const toogleNome = (evento) => {

      //Realizando a troca do estado pelo nome
      setName(evento.target.value)
    }

    const toogleEmail = (evento) => {

      //Realizando a troca do estado pelo email
      setEmail(evento.target.value)
    }

    const tooglePassword = (evento) => {

      //Realizando a troca do estado pela senha
      setPassword(evento.target.value)
    }

    //Função que volta para a tela inicial
    const voltaUsuario = () => {

      //Chama a tela de carregamento
      navigate('/sindico/usuarios');
    }

    //Função que realiza o update do porteiro
    const updatePorteiro = async () => {

      //Chama a API
      let message = await atualizaPorteiro(id, name, eamil, password)

      //Chama a tela de menssagem
      navigate('/sindico/mensagem', {
        //Realiza a passagem de valores para a página
        state: {
          menssagem: message ,
          redirecionamento: '/sindico/usuarios'
        }
      });
    }

   return (
    <div className={styles.container}>

      {/* Cabeçalho da página: contexto (Usuários), ação concreta
          e uma linha de apoio. O "voltar" é a ação secundária. */}
      <header className={styles['cabecalho-pagina']}>

        <div>
          <p className="cx-overline">Usuários</p>
          <h2 className="cx-page-title">Atualizar o porteiro Porteiro</h2>
          <p className="cx-page-subtitle">
            Revise os dados e defina a nova senha de acesso.
          </p>
        </div>

        {/* Usando o símbolo de flecha esquerda (&larr;) para o ícone de voltar */}
        <button type="button" className={styles.btnVoltar} onClick={voltaUsuario}>&larr; voltar</button>
      </header>

      {/* Corpo do formulário contendo as duas colunas */}
      <div className={styles.formContainer}>

        {/* Coluna da Esquerda: Campos de entrada de dados.
            Nome abre a linha inteira (é o identificador do
            cadastro); e-mail e senha dividem a linha seguinte. */}
        <div className={styles.inputsColumn}>
          <div className={`${styles.campo} ${styles['campo--full']}`}>
            <label className={styles['campo__label']} htmlFor="porteiro-nome">Nome completo</label>
            <input
              id="porteiro-nome"
              type="text"
              placeholder="Nome completo"
              className={styles.inputField}
              value={name}
              onChange={toogleNome}
            />
          </div>

          <div className={styles.campo}>
            <label className={styles['campo__label']} htmlFor="porteiro-email">E-mail</label>
            <input
              id="porteiro-email"
              type="email"
              placeholder="E-mail"
              value={eamil}
              className={styles.inputField}
              onChange={toogleEmail}
            />
          </div>

          <div className={styles.campo}>
            <label className={styles['campo__label']} htmlFor="porteiro-senha">Senha</label>
            <input
              id="porteiro-senha"
              type="text"
              placeholder="Senha"
              className={styles.inputField}
              onChange={tooglePassword}
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
          <button type="button" className={styles.btnCadastrar} onClick={updatePorteiro}>
            Atualizar Porteiro
          </button>
        </div>

      </div>

    </div>
  );
}

export default PaginaAtualizaPorteiro