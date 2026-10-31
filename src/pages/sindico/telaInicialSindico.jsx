//Local das importações
import { useEffect, useState } from "react"
import styles from "../../css/paginaInicialSindico.module.css"
import { getTelaIncialSindico } from "../../service/TelaInicial"

//Página inicial do sindico

//Função que cria o componente do sindico
function PaginainicialSindico(){
    
  //Hook que armazena os dados 
  const [dadosTelaInical, setDadosTelaInical] = useState([])

  //Função que obtem os dados para a tela inicial do sindico
  const obtendoDadosTelaInicial = async () => {

    //Obtendo os dados
    let dados = await getTelaIncialSindico()

    //Salvando os dados no state para poderem ser utilizados na página
    setDadosTelaInical(dados)
    console.log(dados)
  }

  //Hook que é executado quando a página é renderizada
  useEffect(() => {

    //Chamando a função que obtem os dados para a tela inicial
    obtendoDadosTelaInicial()
    
  }, [])

    //Retorna um componente
    return (
    <div className={styles['dashboard--principal']}>
      
      {/* Seção de Resumo */}
      <div className={styles['titulo--reclamacoes']}>Perguntas não respondidas</div>
      <div className={styles['container--resumo']}>
        <div className={styles['cartao--resumo']}>
          <div className={styles['titulo--cartao--resumo']}>PENDENTES</div>
          <div className={styles['conteudo--cartao--resumo']}>
            <span className={styles['valor--resumo']}>0</span>
            <span className={styles['icone--resumo']}>⚠️</span>
          </div>
        </div>
        <div className={styles['cartao--resumo']}>
          <div className={styles['titulo--cartao--resumo']}>EM ANDAMENTO</div>
          <div className={styles['conteudo--cartao--resumo']}>
            <span className={styles['valor--resumo']}>0</span>
            <span className={styles['icone--resumo']}>🔧</span>
          </div>
        </div>
      </div>

      {/* Seção Hoje */}
      <div className={styles['titulo--data']}>Ultimos comunicados</div>
      <div className={styles['nao-tem-comunicados']}>No momento não tem comunidacos!</div>
      

    </div>
  )
}

//Exportando o compomente para ser utilizado em outra página
export default PaginainicialSindico