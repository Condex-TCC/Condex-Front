//Elemento que permite adicioar outros componentes dentro de si
import { Outlet } from 'react-router-dom';

//Layout do Morador

//Importando o CSS

//Função que cria o componente principal da aplciação
function LayoutMorador(){

    //Retorna o componente
    return(
        <div id="div-root">
            
            {/* Permite renderizar outros componentes dentro desse layout */}
            <Outlet></Outlet>
            <div>Layout do morador</div>

        </div>
    )
}

//Exportando o componente
export default LayoutMorador