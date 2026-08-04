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
        
        <h1>Não visitantes cadastrados</h1>
      </div>

      <div className="list--section">
        <h2 className="section--title">Visitantes ativos</h2>
        
        <h1>Não ha visitantes ativos</h1>
      </div>
      

    </div>
  )
}

//Exportando o compomente para ser utilizado em outra página
export default PaginainicialPorteiro