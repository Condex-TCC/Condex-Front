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
        navigate("/sindico/usuario")
    }

    //Retorna um componente
    return (
            // Container principal que engloba tudo
            <div className={styles.container}>
              
              {/* Barra superior contendo as abas e o botão de ação principal */}
              <div className={styles.topBar}>
                
              </div>
    
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