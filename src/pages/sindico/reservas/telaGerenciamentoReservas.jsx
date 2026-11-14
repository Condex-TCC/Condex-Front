import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../../css/paginaExibeRegrasLaudos.module.css"
import stylesTitle from '../../../css/paginaCadastraRegra.module.css';
import { CardArea } from "../../../components/sindico/cardArea";
import { obtendoAreasComuns } from "../../../service/AreaComum";
import { useBuscaHeader } from '../../../hooks/useBuscaHeader'
import { filtrarPorTexto } from '../../../utils/busca'


export default function PaginaGerenciaReservas() {

    //Texto da barra de pesquisa do header, usado para filtrar a lista desta página
    const { termo } = useBuscaHeader()

    //Hook que realiza a navegação
    const navigate = useNavigate()

    //Criando um estado para controlar os card que serão exibidos
    const [cards, setCards] = useState([])

    //Estado que indica que a API não devolveu as áreas comuns
    const [erro, setErro] = useState(false)

    //Função que chama a função para obter as areas comuns
    const exibeAreas = async () => {
    
        //Chama a função de regras e obtem os dados
        let areas = await obtendoAreasComuns()
    
        //O service devolve undefined quando a API falha | Evita quebrar a tela com a lista indefinida
        setErro(!Array.isArray(areas))

        //Altera o estado da variável e recarrega a página
        setCards(Array.isArray(areas) ? areas : [])
    }


    //Use effect que irá ser chamado sempre que o estado for alterado
    useEffect(() => {
          
      //Chama a função para exibir as areas
      exibeAreas()

    }, [])


    //Função que redireciona para a tela de cadastro de areas comuns
    const cadastraArea = () =>{

      navigate("area/cadastro")
    }

    //Função que redireciona para a tela e gerenciamento de reservas
    const back = () => {

      //Navega para a tela de acesso rápido para as reservas
      navigate("/sindico/reservas")
    }

    //Áreas que passam pelo filtro da barra de pesquisa do header
    const areasVisiveis = filtrarPorTexto(cards, termo)

  //Retorna um componente
      return (
          // Container principal que engloba tudo
          <div className={styles.container}>

            {/* Cabeçalho da página: contexto + ação concreta */}
            <header className={styles['cabecalho-pagina']}>
              <div>
                <p className="cx-overline">Áreas comuns</p>
                <h2 className="cx-page-title">Gerenciamento de áreas</h2>
                <p className="cx-page-subtitle">
                  Cadastre e mantenha as áreas do condomínio disponíveis para reserva.
                </p>
              </div>

              {/* Botão de voltar */}
              <button type="button" className={styles.backButton} onClick={back}>
                &larr; Voltar
              </button>
            </header>

            {/* Barra superior com a ação principal */}
            <div className={styles.topBar}>

              {/* Botão de que redirecina para a tela de cadastro */}
              <button type="button" className={styles.primaryButton} onClick={cadastraArea}>+ Registrar Area comum</button>

            </div>

            {/* Aviso exibido quando não foi possível carregar as áreas comuns */}
            {
              erro &&
              <p role="alert" className={stylesTitle.formErro}>
                Não foi possível carregar as áreas comuns. Verifique a conexão com a API e se você está logado como síndico.
              </p>
            }

            {/* Lista vazia: diz qual é o próximo passo */}
            {!erro && cards.length === 0 && (
              <div className="cx-empty">
                <span className="cx-empty__icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                </span>
                <p className="cx-empty__title">Nenhuma área comum cadastrada</p>
                <p className="cx-empty__text">
                  Use o botão “+ Registrar Area comum” acima para cadastrar a primeira área.
                </p>
              </div>
            )}

            {/* Lista com os cards das áreas comuns */}
            {areasVisiveis.length > 0 && (
              <div className={styles.lista}>
                {
                  //Percorrendo o array com os cards que serão exibidos
                  areasVisiveis.map((elemento) => (
                    <CardArea key={elemento.id} area={elemento} renderiza={setCards}></CardArea>
                  ))
                }
              </div>
            )}

          </div>
        )
}
