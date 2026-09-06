//Tela que vai ser responsavel por exibir as regras e os laudos

import { useEffect, useState } from "react"
import styles from "../../css/paginaExibeRegrasLaudos.module.css"
import { RegraCard } from "../../components/sindico/cardRegraSindico"
import { LaudoCard } from "../../components/sindico/cardLaudoSincico"
import { obtendoRegras } from "../../service/Regra"
import { useNavigate } from "react-router-dom"
import { obtendoLaudo } from "../../service/Laudos"
import { getApertamentos } from "../../service/Apartamentos"
import { ApertamentoCard } from "../../components/sindico/cardApertamento"

//Função que cria o componente
function PaginaExibeRegrasLaudos() {

    //Hook que realiza a navegação
    const navigate = useNavigate()

    //Criando um estado para controlar qual das elementos deve ser redenrizado
    const [acao, setAcao] = useState("regras")

    //Criando um estado para controlar os card que serão exibidos
    const [cards, setCards] = useState([])

    //Criando um estado para exibir o texto do botão para cadastrar
    const [text, setText] = useState("+ Cadastar nova Regra")

    //Função que troca as ações
    const trocaAcaoRegra = () => {

      //Troca a ação
      if(acao === "laudos" || acao === 'apartamentos'){

        //Realiza a ação
        setAcao("regras")
        setText("+ Cadastar nova Regra")
      }
    }
    const trocaAcaoLaudo = () => {

      //Troca a ação
      if(acao === "regras" || acao === 'apartamentos'){

        //Realiza a ação
        setAcao("laudos")
        setText("+ Cadastar novo Laudo")
      }
    }

    const trocaAcaoApartamento = () => {

      //Troca a ação
      if(acao === "regras" || acao === 'laudos'){

        //Realiza a ação
        setAcao("apartamentos")
        setText("+ Cadastar novo Apertamento")
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
      let laudos = await obtendoLaudo()

      //Altera o estado da variável e recarrega a página
      setCards(laudos[0])
    }

    //Função que chama a função para obter os apertamentos
    const exibeApertamentos = async () => {

      //Chama a função de regras e obtem os dados
      let apertamento = await getApertamentos()

      //Altera o estado da variável e recarrega a página
      setCards(apertamento[0])
    }

    //Use effect que irá ser chamado sempre que o estado for alterado
    useEffect(() => {
      
      //Verifica qual é o estado e chama a função correspondente
      if(acao === "regras"){

        //Chama a função para exibir as regras
        exibeRegras()

      }else if(acao === "laudos"){

        //Chama a função para exibir os laudos
        exibeLaudos()

      }else{

        //Chama a função para exibir os apertamentos
        exibeApertamentos()
      }

    }, [acao])

    //Função que realiza a mudança de rota para cadastrar as regras
    const cadastraRegra = () => {

      //Realiza a mudança de tela
      navigate("/sindico/condominio/regras/create")
    }

    //Função que realiza a mudança de rota para cadastrar os laudos
    const cadastraLaudos = () => {

      //Realiza a mudança de tela
      navigate("/sindico/condominio/laudos/create")
    }

    //Função que realiza a mudança de rota para cadastrar as regras
    const cadastraApartamentos = () => {

      //Realiza a mudança de tela
      navigate("/sindico/apertamentos/laudos/create")
    }
    
    //Função responsavel por lidar e verificar qual deve ser a tela de cadastro
    const henbleCadastro = () => {
      //Verifica qual ação é para realizar a ação
      if(acao === 'regras'){

        cadastraRegra() //Função de cadastro de regra
      }else if(acao === 'laudos'){

        cadastraLaudos() //Função de cadastro de laudos
      }else{
                  
        cadastraApartamentos() //Função de cadastro de apertamentos
      }
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
              <button className={styles.tabButton} onClick={trocaAcaoApartamento}>Apartamentos</button>
            </div>
            
            {/* Botão para criar novo elementos (regra, laudo ou apartamento) */}
            <button className={styles.primaryButton} 
            // Adiciona uma ação ao click
            onClick={henbleCadastro}
            >

              {/* Exibe o text opara o cadastro do button */}
              {text}

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

                } else if (acao === "laudos"){

                  //Retorna os cards dos laudso
                  return <LaudoCard key={elemento.id} laudo={elemento} renderiza={setCards}/>

                }else{

                  //Retorna o card de apartamentos
                  return <ApertamentoCard key={elemento.id} apertamento={elemento} renderiza={setCards}/>
                  
                }
                
              })
           }
              
          </div>

        </div>
      )
}

//Exportando o componente
export default PaginaExibeRegrasLaudos