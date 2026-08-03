//Local das importações
import "../../css/paginaInicialSindico.css"

//Página inicial do sindico

//Função que cria o componente do sindico
function PaginainicialSindico(){
    
    //Retorna um componente
    return (
    <div className="dashboard--principal">
      
      {/* Seção de Resumo */}
      <div className="titulo--reclamacoes">Perguntas não respondidas</div>
      <div className="container--resumo">
        <div className="cartao--resumo">
          <div className="titulo--cartao--resumo">PENDENTES</div>
          <div className="conteudo--cartao--resumo">
            <span className="valor--resumo">0</span>
            <span className="icone--resumo">⚠️</span>
          </div>
        </div>
        <div className="cartao--resumo">
          <div className="titulo--cartao--resumo">EM ANDAMENTO</div>
          <div className="conteudo--cartao--resumo">
            <span className="valor--resumo">0</span>
            <span className="icone--resumo">🔧</span>
          </div>
        </div>
      </div>

      {/* Seção Hoje */}
      <div className="titulo--data">Ultimos comunicados</div>
      <div className="nao-tem-comunicados">No momento não tem comunidacos!</div>
     

    </div>
  )
}

//Exportando o compomente para ser utilizado em outra página
export default PaginainicialSindico