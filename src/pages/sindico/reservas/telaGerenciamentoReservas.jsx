import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../../css/paginaExibeRegrasLaudos.module.css"
import { CardArea } from "../../../components/sindico/cardArea";
import { obtendoAreasComuns } from "../../../service/AreaComum";
import  CardReservaAutorizacao from "../../../components/sindico/cardReserva";


export default function PaginaGerenciaReservas() {

    //Hook que realiza a navegação
    const navigate = useNavigate()

    //Criando um estado para controlar qual das elementos deve ser redenrizado
    const [acao, setAcao] = useState("area")

    //Criando um estado para controlar os card que serão exibidos
    const [cards, setCards] = useState([])

    //Funções que trocam o a função
    const trocaArea = () => {

        //Troca a ação
        if(acao === 'autorizacao'){

            setAcao("area")
        }
    }
    const trocaAutrorizacao = () => {

        //Troca a ação
        if(acao === 'area'){

            setAcao("autorizacao")
        }
    }

    //Função que chama a função para obter as areas comuns
    const exibeAreas = async () => {
    
        //Chama a função de regras e obtem os dados
        let areas = await obtendoAreasComuns()
    
        //Altera o estado da variável e recarrega a página
        setCards(areas)
    }


    //Use effect que irá ser chamado sempre que o estado for alterado
    useEffect(() => {
          
        //Verifica qual é o estado e chama a função correspondente
        if(acao === "area"){
    
            //Chama a função para exibir as areas
            exibeAreas()

        }else {
          
          console.log("chama os cards de reservas pendentes")
            
        }
    }, [acao])


    //Função que redireciona para a tela de cadastro de areas comuns
    const cadastraArea = () =>{

      navigate("area/cadastro")
    }

    //Lista segura para renderizar (o serviço pode devolver
    //undefined quando a API falha — a tela não quebra por isso)
    const lista = Array.isArray(cards) ? cards : []

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
                  Cadastre as áreas do condomínio e acompanhe as reservas que aguardam aprovação.
                </p>
              </div>
            </header>

            {/* Barra superior contendo as abas e o botão de ação principal */}
            <div className={styles.topBar}>
              <div className={styles.tabs} role="tablist" aria-label="Áreas comuns">
                {/* Botões de aba: a aba da ação corrente recebe a classe ativa
                    e aria-selected, para o estado valer também fora da cor */}
                <button
                  type="button"
                  role="tab"
                  aria-selected={acao === "area"}
                  className={`${styles.tabButton} ${acao === "area" ? styles["tabButton--ativo"] : ""}`}
                  onClick={trocaArea}
                >
                  Áreas comuns
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={acao === "autorizacao"}
                  className={`${styles.tabButton} ${acao === "autorizacao" ? styles["tabButton--ativo"] : ""}`}
                  onClick={trocaAutrorizacao}
                >
                  Gerenciar reservas
                </button>
              </div>

              {/* Exibe esse botão apenas se for area */}
              { acao === 'area' && <button type="button" className={styles.primaryButton} onClick={cadastraArea}>+ Registrar Area comum</button>}
            </div>

            {/* Lista vazia: diz qual é o próximo passo em cada aba */}
            {lista.length === 0 && (
              <div className="cx-empty">
                <span className="cx-empty__icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                </span>
                <p className="cx-empty__title">
                  {acao === "area" ? "Nenhuma área comum cadastrada" : "Nenhuma reserva aguardando aprovação"}
                </p>
                <p className="cx-empty__text">
                  {acao === "area"
                    ? "Use o botão “+ Registrar Area comum” acima para cadastrar a primeira área."
                    : "As solicitações de reserva pendentes aparecem nesta aba para você decidir."}
                </p>
              </div>
            )}

            {/* Lista com os cards da aba corrente */}
            {lista.length > 0 && (
            <div className={styles.lista}>

             {/* Exibindo os card dependendo da ação */}
             {
                //Percorrendo o array com os cards que serão exibidos
                lista.map((elemento) => {

                  //Verifica qual card deve ser redenrizado
                  if (acao === "area") {

                    //Retorna o card das regras
                    return <CardArea key={elemento.id} area={elemento} renderiza={setCards}></CardArea>

                  }else{

                    return <CardReservaAutorizacao></CardReservaAutorizacao>

                  }

                })
             }
            </div>
            )}

          </div>
        )
}