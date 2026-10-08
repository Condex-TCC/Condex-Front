import { useNavigate } from "react-router-dom"
import styles from "../../css/paginaExibeRegrasLaudos.module.css"
import { useEffect, useState } from "react"
import { getApertamentos } from "../../service/Apartamentos"
import { ApertamentoCard } from "../../components/sindico/cardApertamento"
import { ApertamentoCardSelecionado } from "../../components/sindico/cardApertamentoSelecionado"

//Função que cria o componente
function PaginaSelecionaApertamento(){

    //Hook que realiza a navegação
    const navigate = useNavigate()

    //Criando um estado para controlar os card que serão exibidos
    const [cards, setCards] = useState([])

    //Função que chama a função para obter os apertamentos
    const exibeApertamentos = async () => {
    
        //Chama a função de regras e obtem os dados
      let apertamento = await getApertamentos()
    
        //Altera o estado da variável e recarrega a página
      setCards(apertamento[0])
    }

    //Use effect que irá ser chamado sempre que a página carregar
    useEffect(() => {
    
        //Chama a função para exibir os apertamentos
        exibeApertamentos()
    
    }, [])

    //Funçao que realiza a navegação para a página que exibe os usuários
    const back = () => {

        //Realiza a navegação da página
        navigate("/sindico/usuarios")
    }

    //Retorna um componente
    return (
            // Container principal que engloba tudo
            <div className={styles.container}>

              {/* Cabeçalho da página: contexto (Usuários), ação concreta
                  e uma linha dizendo o que escolher. O botão de retorno
                  é a ação secundária e usa o padrão do módulo de listagem. */}
              <header className="cx-page-header">

                <div>
                  <p className="cx-overline">Usuários</p>
                  <h2 className="cx-page-title">Selecione o apertamento</h2>
                  <p className="cx-page-subtitle">
                    Escolha a unidade onde o novo morador será vinculado.
                  </p>
                </div>

                <button type="button" className={styles.backButton} onClick={back}>
                          &larr; Voltar
                </button>

              </header>

              {/* Enquanto a API não devolve unidades, o estado vazio
                  padrão do CONDEX explica o que vai aparecer aqui. */}
              {cards.length === 0 && (
                <div className="cx-empty">
                  <span className="cx-empty__icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 21h18"></path>
                      <path d="M5 21V7l7-4 7 4v14"></path>
                      <path d="M9 21v-6h6v6"></path>
                    </svg>
                  </span>
                  <p className="cx-empty__title">Nenhum apertamento disponível</p>
                  <p className="cx-empty__text">
                    Assim que as unidades forem cadastradas, elas aparecem aqui para escolha.
                  </p>
                </div>
              )}

              <div>

               {/* Exibindo os card do apertamento */}
               {
                  //Percorrendo o array com os cards que serão exibidos
                  cards.map((elemento) => {

                    //Retorna o card de apartamentos
                    return <ApertamentoCardSelecionado key={elemento.id} apertamento={elemento}></ApertamentoCardSelecionado>
                  })
               }

              </div>

            </div>
          )
}

//Exporta a página para poder ser utilizado em outros locais
export default PaginaSelecionaApertamento