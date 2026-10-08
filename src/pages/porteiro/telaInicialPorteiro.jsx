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
//tipo="erro" troca só o visual (mesma estrutura) para o aviso de API fora do ar
function EstadoVazio({ children, tipo = 'vazio' }){

    //Define se o bloco fala de "sem registros" ou de "falha ao carregar"
    const ehErro = tipo === 'erro'

    return (
        <div
            className={ehErro ? `${styles['empty--state']} ${styles['empty--state--erro']}` : styles['empty--state']}
            role={ehErro ? 'alert' : 'status'}
        >
            {/* Ícone decorativo: reforça a mensagem sem duplicar texto */}
            <span className={styles['empty--state__icone']} aria-hidden="true">
                {
                    ehErro ?
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
                            <path d="M12 9v4"></path>
                            <path d="M12 17h.01"></path>
                        </svg>
                    :
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 12h-6l-2 3h-4l-2-3H2"></path>
                            <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
                        </svg>
                }
            </span>

            <p className={styles['empty--state__texto']}>{children}</p>
        </div>
    )
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

      {/* Cabeçalho da página: contexto (overline), ação concreta
          (título) e a ação principal no canto — padrão
          cx-page-header usado em todo o sistema */}
      <header className={styles['header--section']}>
        <div className={styles['header--texto']}>
          <p className="cx-overline">{abaAtiva === "visitantes" ? "Visitantes" : "Encomendas"}</p>

          <h2 className="cx-page-title">
            {abaAtiva === "visitantes" ? "Registrar e acompanhar visitas" : "Receber e entregar encomendas"}
          </h2>

          <p className="cx-page-subtitle">
            {
              abaAtiva === "visitantes"
                ? "Veja quem foi cadastrado para entrar no condomínio e quem ainda está autorizado."
                : "Acompanhe o que está na portaria e o que já foi retirado pelos moradores."
            }
          </p>
        </div>

        {
          //Botão muda de acordo com a aba selecionada
          abaAtiva === "visitantes" ?
            <button
              type="button"
              className={styles['btn--add']}
              onClick={registrarVisitante}
              aria-label="Registrar visitante"
            >
              + Registrar visitante
            </button>
          :
            <button
              type="button"
              className={styles['btn--add']}
              onClick={abrirCadastroEncomenda}
              aria-label="Cadastrar encomenda"
            >
              + Cadastrar encomenda
            </button>
        }
      </header>

      {/* Abas em pílulas: escolhem o tipo de registro exibido
          abaixo (mesmo padrão das telas do Morador, que
          reaproveitam estas classes) */}
      <div className={styles['tabs--group']} role="tablist" aria-label="Tipo de registro">
        <button
          type="button"
          role="tab"
          aria-selected={abaAtiva === "visitantes"}
          className={abaAtiva === "visitantes" ? styles['tab--active'] : styles['tab--inactive']}
          onClick={() => setAbaAtiva("visitantes")}
        >
          Visitantes
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={abaAtiva === "encomendas"}
          className={abaAtiva === "encomendas" ? styles['tab--active'] : styles['tab--inactive']}
          onClick={() => setAbaAtiva("encomendas")}
        >
          Encomendas
        </button>
      </div>

      {
        //Aviso exibido quando alguma lista não pôde ser carregada da API.
        //Enquanto ele existir, os estados vazios das seções abaixo ficam
        //escondidos: "Nenhum visitante cadastrado" ao lado do aviso de
        //falha contradiz a própria mensagem de erro
        erroCarga &&
        <EstadoVazio tipo="erro">{erroCarga}</EstadoVazio>
      }

      {/* Conteúdo da aba: as seções do tipo de registro
          escolhido — o painel referencia a aba ativa */}
      <div
        className={styles['abas-conteudo']}
        role="tabpanel"
        aria-label={abaAtiva === "visitantes" ? "Visitantes" : "Encomendas"}
      >
        {/* Com erro de carga as seções somem por completo: deixar títulos
            como "Visitantes cadastrados" órfãos sobre o aviso de falha
            também parece uma listagem vazia quebrada */}
        {!erroCarga && (
          abaAtiva === "visitantes" ?
            <>
              <div className={styles['list--section']}>
                <h2 className={styles['section--title']}>Visitantes cadastrados</h2>

                {
                  //Os visitantes cadastrados pelo morador (sem porteiro) e pelo
                  //porteiro (com porteiro) são todos válidos e aparecem na lista
                  visitantes.length === 0 ?
                    (erroCarga ? null : <EstadoVazio>Nenhum visitante cadastrado</EstadoVazio>)
                  :
                    visitantes.map((visitante) => (
                      <CardVisitanteCadastrado key={visitante.id} visitante={visitante} />
                    ))
                }
              </div>

              <div className={styles['list--section']}>
                <h2 className={styles['section--title']}>Visitantes ativos</h2>

                {/* A API não possui endpoint de entrada, saída ou visitantes ativos,
                    então não há como listar quem está dentro do condomínio.
                    Também fica escondido enquanto houver erro de carga, para a
                    tela mostrar só o aviso de falha */}
                {
                  !erroCarga &&
                  <EstadoVazio>
                    O registro de entrada e saída ainda não está disponível na API,
                    por isso não é possível listar os visitantes ativos.
                  </EstadoVazio>
                }
              </div>
            </>
          :
            <>
              <div className={styles['list--section']}>
                <h2 className={styles['section--title']}>Pendentes</h2>

                {
                  encomendasPendentes.length === 0 ?
                    (erroCarga ? null : <EstadoVazio>Nenhuma encomenda pendente</EstadoVazio>)
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
                    (erroCarga ? null : <EstadoVazio>Nenhuma encomenda retirada</EstadoVazio>)
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
        )}
      </div>

    </div>
  )
}

//Exportando o compomente para ser utilizado em outra página
export default PaginainicialPorteiro
