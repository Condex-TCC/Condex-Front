//Tela que vai ser responsavel por exibir as regras e os laudos

import { useEffect, useState } from "react"
import styles from "../../css/paginaExibeRegrasLaudos.module.css"
import { RegraCard } from "../../components/sindico/cardRegraSindico"
import { LaudoCard } from "../../components/sindico/cardLaudoSincico"
import { obtendoRegras } from "../../service/Regra"
import { useNavigate } from "react-router-dom"

//Função que cria o componente
function PaginaExibeRegrasLaudos() {

    //Hook que realiza a navegação
    const navigate = useNavigate()

    //Criando um estado para controlar qual das elementos deve ser redenrizado
    const [acao, setAcao] = useState("regras")

    //Criando um estado para controlar os card que serão exibidos
    const [cards, setCards] = useState([])

    //Função que troca as ações
    const trocaAcaoRegra = () => {

      //Troca a ação
      if(acao === "laudos"){

        //Realiza a ação
        setAcao("regras")
      }
    }
    const trocaAcaoLaudo = () => {

      //Troca a ação
      if(acao === "regras"){

        //Realiza a ação
        setAcao("laudos")
      }
    }

    //Função que chama a função para obter as regras
    const exibeRegras = async () => {

      //Chama a função de regras e obtem os dados
      let regras = await obtendoRegras()

      //Altera o estado da variável e recarrega a página
      setCards(regras[0])
    }

    //Função que chama a função para obter as regras
    const exibeLaudos = async () => {

      //Chama a função de regras e obtem os dados
      // let regras = await obtendoRegras()

      //Altera o estado da variável e recarrega a página
      // setCards(regras)
      alert("Laudos, A fazer!")
    }

    //Use effect que irá ser chamado sempre que o dado for alterado
    useEffect(() => {

      //Verifica qual é o estado e chama a função correspondente
      if(acao === "regras"){

        //Chama a função para exibir as regras
        exibeRegras()

      }else{

        //Chama a função para exibir os laudos
        exibeLaudos()

      }

    }, [acao])

    //Função que realiza a mudança de rota para cadastrar as regras
    const cadastraRegra = () => {

      //Realiza a mudança de tela
      navigate("/sindico/condominio/regras/create")
    }

    //Função que realiza a mudança de rota para cadastrar as regras
    const cadastraLaudos = () => {

      alert("Fazer depois!")
    }


    //Retorna um componente
    return (
        // Container principal que engloba tudo
        <div className={styles.container}>
          
          {/* Barra superior contendo as abas e o botão de ação principal */}
          <div className={styles.topBar}>
            <div className={styles.tabs}>
              {/* Botões de aba (ambos não selecionados por padrão) */}
              <button className={styles.tabButton} onClick={trocaAcaoRegra}>Regras do condominio</button>
              <button className={styles.tabButton} onClick={trocaAcaoLaudo}>Laudos</button>
            </div>
            
            {/* Botão para criar nova regra */}
            <button className={styles.primaryButton} 
            onClick={
              acao === "regras"? cadastraRegra : cadastraLaudos
            }
            >

              {/* Verifica qual ação que é para exibir a menssagem */}
              { acao === "regras" ? "+ Cadastar nova Regra": "+ Cadastrar novo Laudo"}

            </button>
          </div>

          <div>
           
           {/* Exibindo os card dependendo da ação */}
           {
              //Percorrendo o array com os cards que serão exibidos
              cards.map((elemento) => {
                
                //Verifica qual card deve ser redenrizado
                if (acao === "regras") {

                  //Retorna o card das regras
                  return <RegraCard key={elemento.id} regra={elemento} renderiza={setCards} />
                } else {

                  //Retorna os cards dos laudso
                  return <LaudoCard key={elemento.id} />
                }
                
              })
           }
              
          </div>

        </div>
      )
}

//Exportando o componente
export default PaginaExibeRegrasLaudos