//Elemento que permite adicioar outros componentes dentro de si
import { Outlet } from 'react-router-dom';
import HeaderSindico from '../components/sindico/headerSindoc';
import { MenuLateralContext } from '../context/menuLateralContext';
import { useContext } from 'react';

//Layout do sindico

//Função que cria o componente principal da aplciação
function LayoutSindico(){

    //Pegando as ações adicionadas no provider
    const { menuLateral, setMenuLateral } = useContext(MenuLateralContext);

    //Retorna o componente
    return(
        <div id="div-root">
            
            {/* Menu superio do sindico */}
            <HeaderSindico></HeaderSindico>

            {/* Permite renderizar outros componentes dentro desse layout */}
            <Outlet></Outlet>
            <div>Login Sindico</div>
            <div>Menu: {menuLateral}</div>

        </div>
    )
}

//Exportando o componente
export default LayoutSindico