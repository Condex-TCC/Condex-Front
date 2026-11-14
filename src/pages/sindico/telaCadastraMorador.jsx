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
  const [email, setEmail] = useState('')

  //States para controlar os campos do condomio selecionado
  const [bloco, setBloco] = useState('')
  const [numero, setNumero] = useState('')
  const [descricao, setDescricao] = useState('')

  //Função responsavel por voltar para a tela que exibe os laudos
  const back = () => {

    //Navega para a tela que exibe os laudos
    navigate("/sindico/usuarios/morador/apertamento")
  }

  //Função que realiza a troca do valor do state
  const emailState = (evento) => {

    //Troca o estado
    setEmail(evento.target.value)
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
    const message = await insertMorador(email, id)

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

           <section className={styles['form-secao']} aria-labelledby="secao-dados-acesso">
             <h3 className={styles['form-secao__titulo']} id="secao-dados-acesso">
               Dados de acesso
             </h3>

             <div className={styles['form-grid']}>
               {/* O morador completa os demais dados no primeiro acesso */}
               <div className={`${styles.campo} ${styles['campo--full']}`}>
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