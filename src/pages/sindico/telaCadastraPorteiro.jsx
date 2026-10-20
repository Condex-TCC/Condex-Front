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
      
      {/* Cabeçalho da página */}
      <div className={styles.header}>

        <h2 className={styles.title}>Cadastrar um novo Porteiro</h2>

        {/* Usando o símbolo de flecha esquerda (&larr;) para o ícone de voltar */}
        <button className={styles.btnVoltar} onClick={voltaUsuario}>&larr; voltar</button>
      </div>

      {/* Corpo do formulário contendo as duas colunas */}
      <div className={styles.formContainer}>
        
        {/* Coluna da Esquerda: Campos de entrada de dados */}
        <div className={styles.inputsColumn}>
          <input 
            type="email" 
            placeholder="E-mail" 
            className={styles.inputField} 
            onChange={toogleEmail}
          />
        </div>

        {/* Coluna da Direita: Perfil estático conforme solicitado */}
        <div className={styles.profileColumn}>
          <span className={styles.profileLabel}>Perfil</span>
          <div className={styles.profileText}>Porteiro</div>
        </div>
        
      </div>

      {/* Rodapé com o botão principal de envio */}
      <div className={styles.footer}>
        <button className={styles.btnCadastrar} onClick={cadastraPorteiro}>
          Cadastrar Porteiro
        </button>
      </div>

    </div>
  );
}

export default PaginaCadastraPorteiro