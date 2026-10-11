import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../../css/paginaExibeRegrasLaudos.module.css"
import stylesTitle from '../../../css/paginaCadastraRegra.module.css';
import { CardArea } from "../../../components/sindico/cardArea";
import { obtendoAreasComuns } from "../../../service/AreaComum";
import  CardReservaAutorizacao from "../../../components/sindico/cardReserva";


export default function PaginaGerenciaReservas() {

    //Hook que realiza a navegação
    const navigate = useNavigate()

    //Criando um estado para controlar os card que serão exibidos
    const [cards, setCards] = useState([])

    //Função que chama a função para obter as areas comuns
    const exibeAreas = async () => {
    
        //Chama a função de regras e obtem os dados
        let areas = await obtendoAreasComuns()
    
        //Altera o estado da variável e recarrega a página
        setCards(areas)
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

  //Retorna um componente
      return (
          // Container principal que engloba tudo
          <div className={styles.container}>
            
            {/* Headar da página  */}
            <header className={stylesTitle.header}>

              {/* Titulo da página */}
              <h1 className={stylesTitle.title}>Áreas comuns</h1>

                {/* Botão de voltar */}
                <button className={stylesTitle.backButton} onClick={back}>
                  &larr; Voltar
                </button>
            
            </header>

            {/* Barra superior contendo as abas e o botão de ação principal */}
            <div className={styles.topBar}>
              
              {/* Botão de que redirecina para a tela de cadastro */}
              <button className={styles.primaryButton} onClick={cadastraArea}>+ Registrar Area comum</button>

            </div>

            {/* Div onde será carregada os cards com as areas comuns */}
            <div>
             
             {/* Exibindo os card dependendo da ação */}
             {
                //Percorrendo o array com os cards que serão exibidos
                cards.map((elemento) => {
                  
                  //Retorna o card das regras
                  return <CardArea key={elemento.id} area={elemento} renderiza={setCards}></CardArea>
                  
                })
             }
            </div>
  
          </div>
        )
}