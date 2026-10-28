//Elemento que permite adicioar outros componentes dentro de si
import { Outlet } from 'react-router-dom';
import { useBuscaDoLayout } from '../hooks/useBuscaHeader';
import HeaderMorador from '../components/morador/headerMorador';
import SidebarMorador from '../components/morador/sidebarMorador';
import { MenuLateralContext } from '../context/menuLateralContext';
import { useContext } from 'react';

//Layout do Morador

//Importando o CSS

//Função que cria o componente principal da aplciação
function LayoutMorador(){

    //Texto da barra de pesquisa do header, compartilhado com as páginas
    const { busca, setBusca } = useBuscaDoLayout()

    //Pegando as ações adicionadas no provider
    const {menuLateral} = useContext(MenuLateralContext);

    //Retorna o componente
    return(
        <div id="div-root">
            
            {/* Container raiz ocupando 100% da tela em modo Flex */}
            <div style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden', backgroundColor: '#f8f9fa' }}>
                    
                {/* Renderiza a Sidebar lateral se estiver aberto */}
                {menuLateral === 'aberto' && <SidebarMorador></SidebarMorador>}

                {/* Container Principal (Header + Conteúdo) que assume o resto do espaço */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
                    
                    {/* Chama o menu do moarador */}
                    <HeaderMorador busca={busca} aoBuscar={setBusca} />

                    {/* Permite renderizar outros componentes dentro desse layout */}
                    {/* O flex: 1 empurra o menu inferior para a base da tela quando o conteúdo é curto */}
                    <main style={{ padding: '24px', flex: 1 }}>
                        
                        {/* Local onde será inserido outros elementos */}
                        <Outlet context={{ busca, setBusca }} />
                    </main>
                        
                </div>
            </div>


        </div>
    )
}

//Exportando o componente
export default LayoutMorador