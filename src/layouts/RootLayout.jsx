//Elemento que permite adicioar outros componentes dentro de si
import { Outlet } from 'react-router-dom';

//Layout princpal dá página, será utilizado por todas as divs
//Será a base, onde todos ou outros layous serão criados apartir desse

//Importando o CSS
import "../css/rootlayout.css"

//Função que cria o componente principal da aplciação
function RootLayout(){

    //Retorna o componente
    return(
        <div id="div-root">
            
            {/* Permite renderizar outros componentes dentro desse layout */}
            <Outlet></Outlet>

        </div>
    )
}

//Exportando o componente
export default RootLayout