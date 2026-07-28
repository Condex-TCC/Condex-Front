import { Link } from 'react-router-dom';
import "../css/loginLayout.css"

//Tela inicial

//Função que cria a página inical do programa
function PaginaInical(){

    //Retorna um componente
    return(
        
        <div className="div-fundo-inicial">

            {/* //Elemento que permite a navegação no entre rotas */}
            <Link to="/login" className='btn-login btn-inicial'>Login</Link>
        </div>
    )
}

//Exportando a tela
export default PaginaInical