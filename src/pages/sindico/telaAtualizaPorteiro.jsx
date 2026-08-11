//Tela responsavel por cadastrar o porteiro

import { useEffect, useState } from 'react';
import styles from '../../css/paginaCadastraUsario.module.css'
import { criandoPorteiro, obtendoPorteiro } from '../../service/CrudUsuarios';
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

   return (
    <div className={styles.container}>
      
      {/* Cabeçalho da página */}
      <div className={styles.header}>

        <h2 className={styles.title}>Atualizar o porteiro Porteiro</h2>

        {/* Usando o símbolo de flecha esquerda (&larr;) para o ícone de voltar */}
        <button className={styles.btnVoltar} onClick={voltaUsuario}>&larr; voltar</button>
      </div>

      {/* Corpo do formulário contendo as duas colunas */}
      <div className={styles.formContainer}>
        
        {/* Coluna da Esquerda: Campos de entrada de dados */}
        <div className={styles.inputsColumn}>
          <input 
            type="text" 
            placeholder="Nome completo" 
            className={styles.inputField} 
            value={name}
            onChange={toogleNome}
          />
          <input 
            type="email" 
            placeholder="E-mail"
            value={eamil}
            className={styles.inputField} 
            onChange={toogleEmail}
          />
          <input 
            type="text" 
            placeholder="Senha" 
            className={styles.inputField} 
            onChange={tooglePassword}
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
        <button className={styles.btnCadastrar}>
          Atualizar Porteiro
        </button>
      </div>

    </div>
  );
}

export default PaginaAtualizaPorteiro