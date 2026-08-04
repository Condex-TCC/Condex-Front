//Local das importações
import "../../css/paginainicialPorteiro.css"

//Página inicial do porteiro

//Função que cria o componente do porteiro
function PaginainicialPorteiro(){
    
    //Retorna um componente
    return (
    <div className="dashboard--container">
      
      <div className="header--section">
        <div className="tabs--group">
          <button className="tab--active">Visitantes</button>
          <button className="tab--inactive">Encomendas</button>
        </div>
        <button className="btn--add">+ Registrar visitante</button>
      </div>

      <div className="list--section">
        <h2 className="section--title">Pre cadastrados</h2>
        
        <div className="card--item">
          <div className="card--top">
            <span className="text--name">Joaquim Almeida</span>
            <span className="text--date">Previsto para 05/06</span>
          </div>
          <div className="card--bottom">
            <span className="text--block">bloco A - 27</span>
            <span className="text--apt">Apartamento de Amanda Martins</span>
          </div>
        </div>
      </div>

      <div className="list--section">
        <h2 className="section--title">Visitantes ativos</h2>
        
        <div className="card--item card--active">
          <div className="info--group">
            <div className="card--top">
              <span className="text--name">Laura de Oliveira</span>
            </div>
            <div className="card--bottom">
              <span className="text--block">bloco A - 19</span>
              <span className="text--apt">Apartamento de Luana de Oliveira</span>
            </div>
          </div>
          
          <button className="btn--exit">registrar saida</button>
        </div>
      </div>

    </div>
  )
}

//Exportando o compomente para ser utilizado em outra página
export default PaginainicialPorteiro