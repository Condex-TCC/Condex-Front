//Elemento que permite adicioar outros componentes dentro de si
import { Outlet } from 'react-router-dom';
import HeaderSindico from '../components/sindico/headerSindoc';
import { MenuLateralContext } from '../context/menuLateralContext';
import { useContext } from 'react';
import SidebarSindico from '../components/sindico/sidebarSindico';

//Layout do sindico

//Função que cria o componente principal da aplciação
function LayoutSindico(){

    //Pegando as ações adicionadas no provider
    const {menuLateral, setMenuLateral} = useContext(MenuLateralContext);

    //Retorna o componente
    return(
        <div id="div-root">
            
            {/* Container raiz ocupando 100% da tela em modo Flex */}
            <div id="div-root" style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden', backgroundColor: '#f8f9fa' }}>
                    
                {/* Renderiza a Sidebar lateral se estiver aberto */}
                {menuLateral === 'aberto' && <SidebarSindico />}

                {/* Container Principal (Header + Conteúdo) que assume o resto do espaço */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
                        
                    <HeaderSindico />

                    {/* Permite renderizar outros componentes dentro desse layout */}
                    <main style={{ padding: '24px' }}>
                        <h1>Sindico layout</h1>
                        <h2>Menu: {menuLateral}</h2>
                        <Outlet />
                    </main>
                        
                </div>
            </div>


        </div>
    )
}

//Exportando o componente
export default LayoutSindico