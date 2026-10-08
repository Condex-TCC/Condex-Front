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

         {/* Cabeçalho da página: contexto (Usuários), ação concreta e apoio */}
         <header className={styles['cabecalho-pagina']}>
           <div>
             <p className="cx-overline">Usuários</p>
             <h2 className="cx-page-title">Cadastrar novo morador</h2>
             <p className="cx-page-subtitle">
               Vincule o morador à unidade selecionada no passo anterior.
             </p>
           </div>

           <button type="button" className={styles.backButton} onClick={back}>
             &larr; Voltar
           </button>
         </header>

         <form className={styles.form} onSubmit={(e) => { e.preventDefault(); cadastraMorador(); }}>

           <section className={styles['form-secao']} aria-labelledby="secao-dados-pessoais">
             <h3 className={styles['form-secao__titulo']} id="secao-dados-pessoais">
               Dados pessoais
             </h3>

             <div className={styles['form-grid']}>
               {/* Nome abre a linha inteira: é o identificador do cadastro */}
               <div className={`${styles.campo} ${styles['campo--full']}`}>
                 <label className={styles['campo__label']} htmlFor="morador-nome">Nome</label>
                 <input
                   id="morador-nome"
                   type="text"
                   placeholder="Nome"
                   className={styles.inputTitle}
                   value={nome}
                   onChange={nomeState}
                 />
               </div>

               <div className={styles.campo}>
                 <label className={styles['campo__label']} htmlFor="morador-cpf">CPF</label>
                 <input
                   id="morador-cpf"
                   type="text"
                   placeholder="CPF"
                   className={styles.inputTitle}
                   value={cpf}
                   onChange={cpfState}
                 />
               </div>

               <div className={styles.campo}>
                 <label className={styles['campo__label']} htmlFor="morador-email">E-mail</label>
                 <input
                   id="morador-email"
                   type="text"
                   placeholder="E-mail"
                   className={styles.inputTitle}
                   value={email}
                   onChange={emailState}
                 />
               </div>

               <div className={styles.campo}>
                 <label className={styles['campo__label']} htmlFor="morador-telefone">Telefone</label>
                 <input
                   id="morador-telefone"
                   type="text"
                   placeholder="Telefone"
                   className={styles.inputTitle}
                   value={telefone}
                   onChange={telefoneState}
                 />
               </div>

               <div className={styles.campo}>
                 <label className={styles['campo__label']} htmlFor="morador-senha">Senha</label>
                 <input
                   id="morador-senha"
                   type="text"
                   placeholder="Senha"
                   className={styles.inputTitle}
                   value={senha}
                   onChange={senhaState}
                 />
               </div>
             </div>
           </section>

           {/* Dados do condominio: informação vinda da API, exibida
               em caixa rebaixada para não parecer campo editável */}
           <section className={styles['form-secao']} aria-labelledby="secao-apertamento">
             <h3 className={styles['form-secao__titulo']} id="secao-apertamento">Apertamento</h3>

             <div className={styles.infoBox}>
               <p>{bloco} - N° {numero}</p>
               <p>{descricao === null ? "Não há descrição" : descricao}</p>
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

export default PaginaCadastraMorador