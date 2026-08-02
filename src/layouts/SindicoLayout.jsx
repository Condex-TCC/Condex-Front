//Elemento que permite adicioar outros componentes dentro de si
import { Outlet } from 'react-router-dom';
import HeaderSindico from '../components/sindico/headerSindoc';

//Layout do sindico

//Importando o CSS

//Função que cria o componente principal da aplciação
function LayoutSindico(){

    //Retorna o componente
    return(
        <div id="div-root">
            
            {/* Menu superio do sindico */}
            <HeaderSindico></HeaderSindico>

            {/* Permite renderizar outros componentes dentro desse layout */}
            <Outlet></Outlet>
            <div>Login Sindico</div>

        </div>
    )
}

//Exportando o componente
export default LayoutSindico