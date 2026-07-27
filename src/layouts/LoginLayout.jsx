//Layout do login

//Elemento que permite adicioar outros componentes dentro de si
import { Outlet } from 'react-router-dom';

import "../css/loginLayout.css"

//Função que cria o layout do login
function LoginLayout(){

    //Retorna um componente
    return(
        <div className='div-fundo-inicial'>
            {/* Permite renderizar outros componentes dentro desse layout */}
            <Outlet></Outlet>
        </div>

    )
}

//Exportando o layout
export default LoginLayout