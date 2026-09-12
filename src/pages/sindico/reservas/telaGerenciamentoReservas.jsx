import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../../css/paginaExibeRegrasLaudos.module.css"
import { CardArea } from "../../../components/sindico/cardArea";
import { obtendoAreasComuns } from "../../../service/AreaComum";


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

  //Retorna um componente
      return (
          // Container principal que engloba tudo
          <div className={styles.container}>
            
            {/* Barra superior contendo as abas e o botão de ação principal */}
            <div className={styles.topBar}>
              <div className={styles.tabs}>
                {/* Botões de aba (ambos não selecionados por padrão) */}
                <button className={styles.tabButton} onClick={trocaArea}>Areas comuns</button>
                <button className={styles.tabButton} onClick={trocaAutrorizacao}>Autrorizar reservas</button>
              </div>
              
              {/* Exibe esse botão apenas se for area */}
              { acao === 'area' && <button className={styles.primaryButton} onClick={cadastraArea}>+ Cadastrar Area comum</button>}
            </div>
  
            <div>
             
             {/* Exibindo os card dependendo da ação */}
             {
                //Percorrendo o array com os cards que serão exibidos
                cards.map((elemento) => {
                  
                  //Verifica qual card deve ser redenrizado
                  if (acao === "area") {
  
                    //Retorna o card das regras
                    return <CardArea key={elemento.id} area={elemento} renderiza={setCards}></CardArea>
  
                  }else{
  
                    //Retorna o card de apartamentos
                    return alert("Autorização")
                    
                  }
                  
                })
             }
            </div>
  
          </div>
        )
}