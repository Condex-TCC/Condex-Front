//Tela principal do porteiro

//Local das importações
import styles from "../../css/paginainicialPorteiro.module.css"
import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getVisitantesAtivos, getVisitantesPreCadastrados } from "../../service/Autorizacao"
import { getEncomendas } from "../../service/Encomenda"
import CardVisitantePreCadastrado from "../../components/porteiro/cardVisitantePreCadastrado"
import CardVisitanteAtivo from "../../components/porteiro/cardVisitanteAtivo"
import CardEncomenda from "../../components/porteiro/cardEncomenda"

//Componente de estado vazio, reaproveitado por todas as seções da tela
function EstadoVazio({ children }){

    return <p className={styles['empty--state']}>{children}</p>
}

//Página inicial do porteiro
function PaginainicialPorteiro(){

    //Hook que realiza a navegação
    const navigate = useNavigate()

    //Estado que controla qual aba está ativa
    const [abaAtiva, setAbaAtiva] = useState("visitantes")

    //Estado que armazena os visitantes pré cadastrados (autorizados, aguardando entrada)
    const [preCadastrados, setPreCadastrados] = useState([])

    //Estado que armazena os visitantes que já registraram entrada
    const [ativos, setAtivos] = useState([])

    //Estado que armazena as encomendas
    const [encomendas, setEncomendas] = useState([])

    //Função que trata a lista que veio da API
    //Trata o caso do dado vir dentro de um array extra, assim como em telaExibeUsuarios.jsx
    const normalizaLista = (resultado) => {

        //Garante um array vazio caso a requisição falhe
        const dadosSeguros = resultado || []

        //Desembrulha o array extra quando a API responder com lista de listas
        return Array.isArray(dadosSeguros[0]) ? dadosSeguros[0] : dadosSeguros
    }

    //Função que busca os visitantes pré cadastrados e devolve a lista pronta
    const buscarPreCadastrados = useCallback(async () => {

        //Chama a service que busca os visitantes autorizados
        const resultado = await getVisitantesPreCadastrados()

        //Devolve a lista já normalizada
        return normalizaLista(resultado)
    }, [])

    //Função que busca os visitantes que já estão dentro do condomínio
    const buscarAtivos = useCallback(async () => {

        //Chama a service que busca os visitantes ativos
        const resultado = await getVisitantesAtivos()

        //Devolve a lista já normalizada
        return normalizaLista(resultado)
    }, [])

    //Função que busca as encomendas e devolve a lista pronta
    const buscarEncomendas = useCallback(async () => {

        //Chama a service que busca as encomendas
        const resultado = await getEncomendas()

        //Devolve a lista já normalizada
        return normalizaLista(resultado)
    }, [])

    //Função que recarrega a lista de encomendas depois de uma ação, para a tela
    //refletir o que foi realmente gravado no backend
    const recarregarEncomendas = useCallback(async () => {

        //Busca a lista no backend
        const lista = await buscarEncomendas()

        //Salva no estado
        setEncomendas(lista)
    }, [buscarEncomendas])

    //Busca os dados assim que a página carrega
    useEffect(() => {

        //Variável que avisa se a tela foi fechada antes da requisição terminar
        let cancelado = false

        //Função que busca os três blocos de dados ao mesmo tempo
        const carregarTela = async () => {

            //Espera as três requisições terminarem juntas
            const [listaPreCadastrados, listaAtivos, listaEncomendas] = await Promise.all([
                buscarPreCadastrados(),
                buscarAtivos(),
                buscarEncomendas()
            ])

            //Se a tela já foi fechada, não tenta salvar o resultado
            if(cancelado){

                return
            }

            //Salva tudo nos estados
            setPreCadastrados(listaPreCadastrados)
            setAtivos(listaAtivos)
            setEncomendas(listaEncomendas)
        }

        //Dispara o carregamento
        carregarTela()

        //Limpeza executada quando a tela sair de cena
        return () => {

            cancelado = true
        }
    }, [buscarPreCadastrados, buscarAtivos, buscarEncomendas])

    //Separando as encomendas pendentes das já retiradas
    //A API trata o campo "data" como a data da retirada, então a encomenda é
    //pendente enquanto esse campo for nulo
    const encomendasPendentes = encomendas.filter((encomenda) => encomenda.data == null)
    const encomendasRetiradas = encomendas.filter((encomenda) => encomenda.data != null)

    //Função que abre a tela de cadastro de encomenda
    const abrirCadastroEncomenda = () => {

        //Navega para a tela de cadastro de encomenda
        navigate("/porteiro/encomenda/create")
    }

    //Função que avisa que o cadastro de visitante ainda não pode ser usado
    //A API tem o endpoint de criação, mas ele exige o id do morador
    //responsável, e o porteiro não tem nenhuma rota para consultar moradores
    const registrarVisitante = () => {

        alert("Cadastro de visitante indisponível: a API exige o id do morador responsável e o porteiro não possui um endpoint para consultar os moradores.")
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
              onClick={registrarVisitante}
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
              <h2 className={styles['section--title']}>Por cadastrar</h2>

              {
                preCadastrados.length === 0 ?
                  <EstadoVazio>Nenhum visitante aguardando entrada</EstadoVazio>
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

              {
                ativos.length === 0 ?
                  <EstadoVazio>Nenhum visitante ativo</EstadoVazio>
                :
                  ativos.map((visitante) => (
                    <CardVisitanteAtivo key={visitante.id} visitante={visitante} />
                  ))
              }
            </div>
          </>
        :
          <>
            <div className={styles['list--section']}>
              <h2 className={styles['section--title']}>Pendentes</h2>

              {
                encomendasPendentes.length === 0 ?
                  <EstadoVazio>Nenhuma encomenda pendente</EstadoVazio>
                :
                  encomendasPendentes.map((encomenda) => (
                    <CardEncomenda
                      key={encomenda.id}
                      encomenda={encomenda}
                      atualizaLista={recarregarEncomendas}
                    />
                  ))
              }
            </div>

            <div className={styles['list--section']}>
              <h2 className={styles['section--title']}>Retiradas</h2>

              {
                encomendasRetiradas.length === 0 ?
                  <EstadoVazio>Nenhuma encomenda retirada</EstadoVazio>
                :
                  encomendasRetiradas.map((encomenda) => (
                    <CardEncomenda
                      key={encomenda.id}
                      encomenda={encomenda}
                      atualizaLista={recarregarEncomendas}
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
