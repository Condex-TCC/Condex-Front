//Elemento que permite adicioar outros componentes dentro de si
import { Outlet } from 'react-router-dom';

//Layout do Porteiro

//Importando o CSS

//Função que cria o componente principal da aplciação
function PorteiroLayout(){

    //Retorna o componente
    return(
        <div id="div-root">
            
            {/* Permite renderizar outros componentes dentro desse layout */}
            <Outlet></Outlet>
            <div>Layout do Porteiro</div>

        </div>
    )
}

//Exportando o componente
export default PorteiroLayout