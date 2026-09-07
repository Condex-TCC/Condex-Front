//Tela responsavel por cadastrar o porteiro

import { useNavigate, useParams } from 'react-router-dom';
import styles from '../../css/paginaCadastraRegra.module.css';
import { useEffect, useState } from 'react';
import { showApertamento } from '../../service/Apartamentos';
import { insertMorador } from '../../service/CrudUsuarios';

function PaginaCadastraMorador(){

  //Hook que realiza a navegação
  const navigate = useNavigate()

  //Componente que recupera a informação da url
  const { id } = useParams();

  //States para controlar o valor dos campos
  const [nome, setNome] = useState('')
  const [cpf, setCpf] = useState('')
  const [email, setEmail] = useState('')
  const [telefone, setTelefone] = useState('')
  const [senha, setSenha] = useState('')

  //States para controlar os campos do condomio selecionado
  const [bloco, setBloco] = useState('')
  const [numero, setNumero] = useState('')
  const [descricao, setDescricao] = useState('')

  //Função responsavel por voltar para a tela que exibe os laudos
  const back = () => {

    //Navega para a tela que exibe os laudos
    navigate("/sindico/usuarios/morador/apertamento")
  }

  //Funções de toogle para alterar o esdado das variáveis 
  const nomeState = (evento) => {

    //Troca o estado
    setNome(evento.target.value)
  }
  const cpfState = (evento) => {

    //Troca o estado
    setCpf(evento.target.value)
  }
  const emailState = (evento) => {

    //Troca o estado
    setEmail(evento.target.value)
  }
   const telefoneState = (evento) => {

    //Troca o estado
    setTelefone(evento.target.value)
  }
   const senhaState = (evento) => {

    //Troca o estado
    setSenha(evento.target.value)
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

  //Função responsavel por castrar o morador
  const cadastraMorador = async () => {

    //Chama a função responsavel cadastrar o morador
    const message = await insertMorador(nome, cpf, email, telefone, senha, id)

    //Realiza a mudança de tela para a tela de menssagem
    navigate("/sindico/mensagem", {
      state: {
        menssagem: message,
        redirecionamento: "/sindico/usuarios"
      }
    })
  }
    

   return (
       <div className={styles.container}>
   
         <header className={styles.header}>
           <h1 className={styles.title}>Cadastrar novo morador</h1>
   
           <button className={styles.backButton} onClick={back}>
             &larr; Voltar
           </button>
   
         </header>
   
         <form className={styles.form} onSubmit={(e) => { e.preventDefault(); cadastraMorador(); }}>
           <input 
             type="text" 
             placeholder="Nome" 
             className={styles.inputTitle} 
             value={nome}
             onChange={nomeState}
           />
   
           <input 
             type="text" 
             placeholder="CPF" 
             className={styles.inputTitle}
             value={cpf}
             onChange={cpfState}
           />

           <input 
             type="text" 
             placeholder="E-mail" 
             className={styles.inputTitle}
             value={email}
             onChange={emailState}
           />

           <input 
             type="text" 
             placeholder="Telefone" 
             className={styles.inputTitle}
             value={telefone}
             onChange={telefoneState}
           />

           <input 
             type="text" 
             placeholder="Senha" 
             className={styles.inputTitle}
             value={senha}
             onChange={senhaState}
           />

           {/* Dados do condominio */}
           <h3>Apertamento</h3>
           <p>{bloco} - N° {numero}</p>
           <p>{descricao === null ? "Não há descrição" : descricao}</p>
           
           <div className={styles.submitContainer}>
             <button type="submit" className={styles.submitButton}>
               Adicionar
             </button>
           </div>
         </form>
       </div>
     );
}

export default PaginaCadastraMorador