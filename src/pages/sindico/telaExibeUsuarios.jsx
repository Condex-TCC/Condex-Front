//Página de usuários

import { CardMorador, CardPorteiro } from "../../components/sindico/cardUsuariosSindico"
import styles from "../../css/telaExibeUsuarios.module.css"
import { useEffect, useState } from "react"
import { LoadindUsers } from "../../service/CrudUsuarios"
import { useNavigate } from "react-router-dom"

//Função que cria os componentes
function PaginaExibeUsuarios(){

    //Cmponente que realiza a nevegação automatica
    const navigate = useNavigate();

    //Criando uma variavel para se observa o seu estado
    const [tipoUsuario, setTipoUsuario] = useState("morador")

    //Criando uma variavel que será responsavel por armazenar os usuários que serão exibidos
    const [usuarios, setUsuarios] = useState([])

    //Estado de apresentação: distingue "carregando" de "sem registros".
    //Sem ele, a tela mostraria um cabeçalho de tabela vazio a cada troca
    //de filtro enquanto a API responde (o usuário achava que nada existia).
    const [carregando, setCarregando] = useState(true)

    //Função que obtem o value da opção selecionado na combo box
    const obterValor = (evento) => {

      //Obtendo o valor do objeto do evento
      setTipoUsuario(evento.target.value)

      setUsuarios([])
    }

    //Criando uma função que será executa sempre que a página carreger ou se alterar o estado
    useEffect(() => {
        const getUsuarios = async () => {
          // user vai receber [ [ {...} ] ] ou [] (em caso de erro)
          let user = await LoadindUsers(tipoUsuario)

          // Se user for indefinido ou nulo por algum motivo, garante um array vazio
          const dadosSeguros = user || []

          // Se o primeiro item do array for outro array (o array duplo do Insomnia), 
          // pegamos ele. Se não for, pegamos o array normal.
          const listaFinal = Array.isArray(dadosSeguros[0]) ? dadosSeguros[0] : dadosSeguros

          // Salvamos no estado
          setUsuarios(listaFinal)
        }

        // O finally roda tanto no sucesso quanto na falha, então a
        // apresentação nunca fica presa no estado "carregando".
        getUsuarios().finally(() => setCarregando(false))
      }, [tipoUsuario])

      //Função que verifica qual o usuário selecionado e redireciona para a página de cadastro
      const redirecCadastro = () => {

        //Verifical qual a tipo de usuário está selecionado
        if(tipoUsuario === 'morador'){

          //Redireciona para a página para poder selecionar o apertamento
          navigate("morador/apertamento")

        }else{

          //Redireciona para a página de cadastro de porteiro
          navigate('porteiro')
        }
      }

    //Rótulo do filtro para textos acessíveis (mesmo valor das opções)
    const rotuloPerfil = tipoUsuario === 'morador' ? 'Moradores' : 'Porteiros'

    //Retorna o componente
    return (
    <div className={styles.container}>

      {/* Cabeçalho da página: título à esquerda, ação principal à direita.
          A ação mais importante da tela fica no canto superior direito,
          que é onde o olhar chega depois de ler o título. */}
      <header className={styles['cabecalho-pagina']}>
        <div>
          <p className="cx-overline">Gestão de pessoas</p>
          <h2 className="cx-page-title">Usuários</h2>
          <p className="cx-page-subtitle">Moradores e porteiros cadastrados no condomínio.</p>
        </div>

        <button type="button" className={styles.addButton} onClick={redirecCadastro}>
          + Cadastrar novo usuário
        </button>
      </header>

      {/* Barra de filtros: filtro à esquerda, contagem à direita.
          A contagem vem do próprio estado da tela — o síndico sabe
          de imediato se a lista está cheia, vazia ou ainda chegando. */}
      <div className={styles.toolbar}>
        <div className={styles.filtro}>
          <label className={styles.filtro__rotulo} htmlFor="filtro-perfil">Perfil exibido</label>
          <select id="filtro-perfil" className={styles.selectBox} onChange={obterValor} value={tipoUsuario}>
            <option value="morador">Moradores</option>
            <option value="porteiro">Porteiros</option>
          </select>
        </div>

        <span className={styles.contagem} aria-live="polite">
          {carregando
            ? 'Carregando…'
            : `${usuarios.length} ${usuarios.length === 1 ? 'registro' : 'registros'} · ${rotuloPerfil}`}
        </span>
      </div>

      {/* Carregando: spinner + texto, sem tabela pela metade */}
      {carregando && (
        <div className={styles.carregando} role="status">
          <span className={styles['carregando__anel']} aria-hidden="true"></span>
          <span>Carregando usuários…</span>
        </div>
      )}

      {/* Sem registros: estado vazio padrão do CONDEX, que explica
          o que fazer em seguida em vez de deixar só um cabeçalho. */}
      {!carregando && usuarios.length === 0 && (
        <div className="cx-empty">
          <span className="cx-empty__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </span>
          <p className="cx-empty__title">
            {tipoUsuario === 'morador' ? 'Nenhum morador cadastrado' : 'Nenhum porteiro cadastrado'}
          </p>
          <p className="cx-empty__text">
            Use o botão “Cadastrar novo usuário” acima para adicionar o primeiro registro.
          </p>
        </div>
      )}

      {/* Tabela que exibe os usuários */}
      {!carregando && usuarios.length > 0 && (
      <>
      <div className={styles['tabela-scroll']}>
      <table className={styles.table}>

        {/* Header da tabela */}
        <thead>
            {
              //Verifica qual é tipo de morador que está selecionado
              tipoUsuario === "morador" ?
              (
                <tr>
                  <th className={styles.th} scope="col">Nome</th>
                  <th className={styles.th} scope="col">Perfil</th>
                  <th className={styles.th} scope="col">CPF</th>
                  <th className={styles.th} scope="col">Telefone</th>
                  <th className={styles.th} scope="col">Unidade</th>
                  <th className={styles.thCenter} scope="col">Editar</th>
                  <th className={styles.thCenter} scope="col">Apagar</th>
                </tr>
              ) :

              (
                <tr>
                  <th className={styles.th} scope="col">Nome</th>
                  <th className={styles.th} scope="col">Perfil</th>
                  <th className={styles.th} scope="col">E-mail</th>
                  <th className={styles.thCenter} scope="col">Editar</th>
                  <th className={styles.thCenter} scope="col">Apagar</th>
                </tr>
              )
            }
      
        </thead>

        {/* Elementos do corpo da tabela */}
        <tbody>
          
          {
            //Percorrendo o array de usuários
            usuarios.map((usuario) => {
              
              // Verifica qual tipo de usuário está selecionado
              if(tipoUsuario === "morador"){

                //Retorna o card do usuário
                return <CardMorador key={usuario.id} morador={usuario} redenriza={setUsuarios}/>
              } else {

                //Retorna o card do usuário
                return <CardPorteiro key={usuario.id} porteiro={usuario}  redenriza={setUsuarios}/>
              }

            })
          }
            

        </tbody>
      </table>
      </div>

      {/* Dica de rolagem horizontal: só o celular tem a tabela mais larga
          que a tela; sem a dica, as colunas de EDITAR/APAGAR parecem sumir */}
      <p className={styles.dicaTabela}>
        Deslize a tabela para o lado para ver todas as colunas
      </p>
      </>
      )}
    </div>
  )   
}

//Exportando o componente para ser utilizado em outro arquivo
export default PaginaExibeUsuarios
