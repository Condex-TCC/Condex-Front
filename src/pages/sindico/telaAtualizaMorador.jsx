//Tela responsavel por cadastrar o porteiro

import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styles from '../../css/paginaCadastraRegra.module.css';
import { useEffect, useState } from 'react';
import { showApertamento } from '../../service/Apartamentos';
import { insertMorador, showMorador, updateMorador } from '../../service/CrudUsuarios';

function PaginaAtualizaMorador(){

  //Hook que realiza a navegação
  const navigate = useNavigate()

  //Componente que recupera a informação da url
  const { id } = useParams();

  //Hook utilizado para enviar dados durante o redirecionamento
  const location = useLocation();

  //Pegando o novoApartamento
  const novoApertamento = location.state?.novoApertamento

  //States para controlar o valor dos campos
  const [nome, setNome] = useState('')
  const [cpf, setCpf] = useState('')
  const [email, setEmail] = useState('')
  const [telefone, setTelefone] = useState('')
  const [senha, setSenha] = useState('')

  //States para controlar os campos do condomio selecionado
  const [idApertamento, setIDApertamento] = useState('')
  const [bloco, setBloco] = useState('')
  const [numero, setNumero] = useState('')
  const [descricao, setDescricao] = useState('')

  //Stato para exibir um texto
  const [text, setText] = useState('')

  //Função responsavel por voltar para a tela que exibe os laudos
  const back = () => {

    //Navega para a tela que exibe os laudos
    navigate("/sindico/usuarios")
  }

  //Função responsavel por redirecionar o usuário para a tela que exibe os apertamentos
  const alteraApertamento = () => {
    
    navigate("/sindico/usuarios/morador/apertamento/update", {
        state: {
            idMorador: id
        }
    })
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

  //Função que carrega os dados do morador
  const obtendoMorador = async () => {

    console.log("id do novo apertamento: " + novoApertamento)

    //Chama a função que trata a API
    let dados = await showMorador(id)
        
    //Desestruturando os dados vindos da API
    const { nome, cpf, email, telefone, senha, unidade } = await dados[0]
    const {id_apertamento, bloco, numero, descricao} = await unidade
        
    //Atualizando os estados com os dados vindos do banco de dados
    setNome(nome)
    setCpf(cpf)
    setEmail(email)
    setTelefone(telefone)
    setSenha(senha)

    //Verifica se não há um novo apertamento selecionado
    if(novoApertamento != undefined){

        //Chamar a função que pega os dados do apertamento e alterar os states
        setText(" - Novo Apartamento selecionado")

        //Pega os dados do novo apertamento
        let dados = await showApertamento(novoApertamento)

        //Desestruturando os dados vindos da API
        const {id_apertamento, bloco, numero, descricao} = await dados[0]

        //Chama a função responsavel por obter os dados do apertamento
        setIDApertamento(id_apertamento)
        setBloco(bloco)
        setNumero(numero)
        setDescricao(descricao)

    }else{

        //Chama a função responsavel por obter os dados do apertamento
        setIDApertamento(id_apertamento)
        setBloco(bloco)
        setNumero(numero)
        setDescricao(descricao)

    }

  }

  //Sempre que a página for carreger irá adicionar os dados nos campos
  useEffect(() => {
            
    //Chamando a função que carrega os dados do morador
    obtendoMorador()
    
  }, [id]);

  //Função responsavel por atualizar o morador
  const atualizaMorador = async () => {

    //Chama a função responsavel por autualizar o morador
    const message = await updateMorador(id, nome, cpf, email, telefone,
        senha === undefined ? null : senha,
        novoApertamento === undefined ? idApertamento : novoApertamento)

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
           <h1 className={styles.title}>Atualiza morador</h1>
   
           <button className={styles.backButton} onClick={back}>
             &larr; Voltar
           </button>
   
         </header>
   
         <form className={styles.form} onSubmit={(e) => { e.preventDefault(); atualizaMorador(); }}>
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
             placeholder="Senha (opicional)" 
             className={styles.inputTitle}
             value={senha}
             onChange={senhaState}
           />

           {/* Dados do condominio */}
           <header className={styles.header}>
           <h3>Apertamento {text}</h3>
   
           <button className={styles.backButton} type='button' onClick={alteraApertamento}>
                Escolher outro apertamento
           </button>
   
            </header>

            <p>{bloco} - N° {numero}</p>
           <p>{descricao === null ? "Não há descrição" : descricao}</p>
           
           <div className={styles.submitContainer}>
             <button type='submit' className={styles.submitButton}>
               Atualizar
             </button>
           </div>
         </form>
       </div>
     );
}

export default PaginaAtualizaMorador