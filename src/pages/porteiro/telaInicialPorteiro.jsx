//Local das importações
import styles from "../../css/paginainicialPorteiro.module.css"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getVisitantesPreCadastrados } from "../../service/Autorizacao"
import { getEncomendas } from "../../service/Encomenda"
import CardVisitantePreCadastrado from "../../components/porteiro/cardVisitantePreCadastrado"
import CardEncomenda from "../../components/porteiro/cardEncomenda"

//Página inicial do porteiro

//Função que cria o componente do porteiro
function PaginainicialPorteiro(){

    //Hook que realiza a navegação
    const navigate = useNavigate()

    //Estado que controla qual aba está ativa
    const [abaAtiva, setAbaAtiva] = useState("visitantes")

    //Estado que armazena os visitantes pré cadastrados (autorizados, aguardando entrada)
    const [preCadastrados, setPreCadastrados] = useState([])

    //Estado que armazena as encomendas
    const [encomendas, setEncomendas] = useState([])

    //Busca os visitantes pré cadastrados assim que a página carrega
    useEffect(() => {
        const carregarVisitantes = async () => {

            //Chama a service que busca os visitantes autorizados
            let resultado = await getVisitantesPreCadastrados()

            //Garante um array vazio caso a requisição falhe
            const dadosSeguros = resultado || []

            //Trata o caso do dado vir dentro de um array extra, assim como em telaExibeUsuarios.jsx
            const listaFinal = Array.isArray(dadosSeguros[0]) ? dadosSeguros[0] : dadosSeguros

            //Salva no estado
            setPreCadastrados(listaFinal)
        }

        carregarVisitantes()
    }, [])

    //Busca as encomendas assim que a página carrega
    useEffect(() => {
        const carregarEncomendas = async () => {

            //Chama a service que busca as encomendas
            let resultado = await getEncomendas()

            //Garante um array vazio caso a requisição falhe
            const dadosSeguros = resultado || []

            //Trata o caso do dado vir dentro de um array extra, assim como em telaExibeUsuarios.jsx
            const listaFinal = Array.isArray(dadosSeguros[0]) ? dadosSeguros[0] : dadosSeguros

            //Salva no estado
            setEncomendas(listaFinal)
        }

        carregarEncomendas()
    }, [])

    //Separando as encomendas pendentes das já retiradas
    const encomendasPendentes = encomendas.filter((encomenda) => encomenda.data == null)
    const encomendasRetiradas = encomendas.filter((encomenda) => encomenda.data != null)

    //Função que abre a tela de cadastro de encomenda
    const abrirCadastroEncomenda = () => {

        //Navega para a tela de cadastro de encomenda
        navigate("encomenda/create")
    }

    //Retorna um componente
    return (
    <div className={styles['dashboard--container']}>
      
      <div className={styles['header--section']}>
        <div className={styles['tabs--group']}>
          <button
            className={abaAtiva === "visitantes" ? styles['tab--active'] : styles['tab--inactive']}
            onClick={() => setAbaAtiva("visitantes")}
          >
            Visitantes
          </button>
          <button
            className={abaAtiva === "encomendas" ? styles['tab--active'] : styles['tab--inactive']}
            onClick={() => setAbaAtiva("encomendas")}
          >
            Encomendas
          </button>
        </div>

        {
          //Botão muda de acordo com a aba selecionada
          abaAtiva === "visitantes" ?
            <button
              className={styles['btn--add']}
              onClick={() => alert("Cadastro de visitante ainda não disponível: aguardando suporte da API para busca de morador por bloco/apartamento.")}
            >
              + Registrar visitante
            </button>
          :
            <button className={styles['btn--add']} onClick={abrirCadastroEncomenda}>
              + Cadastrar encomenda
            </button>
        }
      </div>

      {
        abaAtiva === "visitantes" ?

          <>
            <div className={styles['list--section']}>
              <h2 className={styles['section--title']}>Pre cadastrados</h2>

              {
                preCadastrados.length === 0 ?
                  <h1>Não ha visitantes cadastrados</h1>
                :
                  preCadastrados.map((autorizacao) => (
                    <CardVisitantePreCadastrado
                      key={autorizacao.id}
                      autorizacao={autorizacao}
                      renderiza={setPreCadastrados}
                    />
                  ))
              }
            </div>

            <div className={styles['list--section']}>
              <h2 className={styles['section--title']}>Visitantes ativos</h2>

              <h1>Não ha visitantes ativos</h1>
            </div>
          </>

        :

          <>
            <div className={styles['list--section']}>
              <h2 className={styles['section--title']}>Pendentes</h2>

              {
                encomendasPendentes.length === 0 ?
                  <h1>Não ha encomendas pendentes</h1>
                :
                  encomendasPendentes.map((encomenda) => (
                    <CardEncomenda
                      key={encomenda.id}
                      encomenda={encomenda}
                      renderiza={setEncomendas}
                    />
                  ))
              }
            </div>

            <div className={styles['list--section']}>
              <h2 className={styles['section--title']}>Retiradas</h2>

              {
                encomendasRetiradas.length === 0 ?
                  <h1>Não ha encomendas retiradas</h1>
                :
                  encomendasRetiradas.map((encomenda) => (
                    <CardEncomenda
                      key={encomenda.id}
                      encomenda={encomenda}
                      renderiza={setEncomendas}
                    />
                  ))
              }
            </div>
          </>
      }

    </div>
  )
}

//Exportando o compomente para ser utilizado em outra página
export default PaginainicialPorteiro