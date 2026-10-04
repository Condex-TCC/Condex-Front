//Tela principal do porteiro

//Local das importações
import styles from "../../css/paginainicialPorteiro.module.css"
import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getVisitantesPorteiro } from "../../service/VisitantePorteiro"
import { getEncomendas } from "../../service/Encomenda"
import CardVisitanteCadastrado from "../../components/porteiro/cardVisitanteCadastrado"
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

    //Estado que armazena os visitantes cadastrados na API (por moradores ou por porteiros)
    const [visitantes, setVisitantes] = useState([])

    //Estado que armazena as encomendas
    const [encomendas, setEncomendas] = useState([])

    //Estado que guarda o aviso quando alguma lista não pôde ser carregada
    const [erroCarga, setErroCarga] = useState("")

    //Função que trata a lista que veio da API
    //Trata o caso do dado vir dentro de um array extra, assim como em telaExibeUsuarios.jsx
    const normalizaLista = (resultado) => {

        //Garante um array vazio caso a requisição falhe
        const dadosSeguros = resultado || []

        //Desembrulha o array extra quando a API responder com lista de listas
        return Array.isArray(dadosSeguros[0]) ? dadosSeguros[0] : dadosSeguros
    }

    //Função que busca os visitantes cadastrados
    //Devolve null quando a API falha, para a tela avisar o porteiro
    const buscarVisitantes = useCallback(async () => {

        //Chama a service que busca os visitantes do porteiro
        return await getVisitantesPorteiro()
    }, [])

    //Função que busca as encomendas e devolve a lista pronta
    const buscarEncomendas = useCallback(async () => {

        //Chama a service que busca as encomendas
        const resultado = await getEncomendas()

        //Devolve null quando a API falha, para a tela avisar o porteiro
        if(resultado === null){

            return null
        }

        //Devolve a lista já normalizada
        return normalizaLista(resultado)
    }, [])

    //Função que recarrega a lista de encomendas depois de uma ação, para a tela
    //refletir o que foi realmente gravado no backend
    const recarregarEncomendas = useCallback(async () => {

        //Busca a lista no backend
        const lista = await buscarEncomendas()

        //Só atualiza a tela quando a busca funcionou
        if(lista !== null){

            setEncomendas(lista)
        }
    }, [buscarEncomendas])

    //Busca os dados assim que a página carrega
    useEffect(() => {

        //Variável que avisa se a tela foi fechada antes da requisição terminar
        let cancelado = false

        //Função que busca os dois blocos de dados ao mesmo tempo
        const carregarTela = async () => {

            //Espera as duas requisições terminarem juntas
            const [listaVisitantes, listaEncomendas] = await Promise.all([
                buscarVisitantes(),
                buscarEncomendas()
            ])

            //Se a tela já foi fechada, não tenta salvar o resultado
            if(cancelado){

                return
            }

            //Monta o aviso com o que não pôde ser carregado
            const falhas = []

            if(listaVisitantes === null){

                falhas.push("os visitantes")
            }

            if(listaEncomendas === null){

                falhas.push("as encomendas")
            }

            setErroCarga(falhas.length > 0 ? `Não foi possível carregar ${falhas.join(" e ")}. Verifique sua conexão e se o servidor está no ar.` : "")

            //Salva nos estados, mantendo lista vazia quando a busca falhou
            setVisitantes(listaVisitantes ?? [])
            setEncomendas(listaEncomendas ?? [])
        }

        //Dispara o carregamento
        carregarTela()

        //Limpeza executada quando a tela sair de cena
        return () => {

            cancelado = true
        }
    }, [buscarVisitantes, buscarEncomendas])

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

    //Função que abre a tela de cadastro de visitante
    const registrarVisitante = () => {

        //Navega para a tela de cadastro de visitante do porteiro
        navigate("/porteiro/visitante/create")
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
        //Aviso exibido quando alguma lista não pôde ser carregada da API
        erroCarga &&
        <p className={styles['empty--state']}>{erroCarga}</p>
      }

      {
        abaAtiva === "visitantes" ?
          <>
            <div className={styles['list--section']}>
              <h2 className={styles['section--title']}>Visitantes cadastrados</h2>

              {
                //Os visitantes cadastrados pelo morador (sem porteiro) e pelo
                //porteiro (com porteiro) são todos válidos e aparecem na lista
                visitantes.length === 0 ?
                  <EstadoVazio>Nenhum visitante cadastrado</EstadoVazio>
                :
                  visitantes.map((visitante) => (
                    <CardVisitanteCadastrado key={visitante.id} visitante={visitante} />
                  ))
              }
            </div>

            <div className={styles['list--section']}>
              <h2 className={styles['section--title']}>Visitantes ativos</h2>

              {/* A API não possui endpoint de entrada, saída ou visitantes ativos,
                  então não há como listar quem está dentro do condomínio */}
              <EstadoVazio>
                O registro de entrada e saída ainda não está disponível na API,
                por isso não é possível listar os visitantes ativos.
              </EstadoVazio>
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
