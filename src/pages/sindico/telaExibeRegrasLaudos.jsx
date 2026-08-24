//Tela que vai ser responsavel por exibir as regras e os laudos

import { useState } from "react"
import styles from "../../css/paginaExibeRegrasLaudos.module.css"
import { RegraCard } from "../../components/sindico/cardRegraSindico"
import { LaudoCard } from "../../components/sindico/cardLaudoSincico"

//Função que cria o componente
function PaginaExibeRegrasLaudos() {

    //Criando um estado para controlar qual das elementos deve ser redenrizado
    const [acao, setAcao] = useState("regras")

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
            <button className={styles.primaryButton}>

              {/* Verifica qual ação que é para exibir a menssagem */}
              { acao === "regras" ? "+ Cadastar nova Regra": "+ Cadastrar novo Laudo"}

            </button>
          </div>

          <div>
           
           {/* Exibindo os card dependendo da ação */}
           {
            acao === "regras" ?
            <RegraCard></RegraCard> :
            <LaudoCard></LaudoCard>
           }
          </div>

        </div>
      )
}

//Exportando o componente
export default PaginaExibeRegrasLaudos