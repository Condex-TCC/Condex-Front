import { Link } from 'react-router-dom';
import "../css/loginLayout.css"

//Tela inicial

//Função que cria a página inical do programa
function PaginaInical(){

    //Retorna um componente
    return(
        
        //Elemento que permite a navegação no entre rotas
        <Link to="/login" className='btn-login'>Login</Link>
    )
}

//Exportando a tela
export default PaginaInical