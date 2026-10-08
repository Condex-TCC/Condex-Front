//Elemento que permite adicioar outros componentes dentro de si
import { Outlet } from 'react-router-dom';
import HeaderSindico from '../components/sindico/headerSindoc';
import { MenuLateralContext } from '../context/menuLateralContext';
import { useContext } from 'react';
import SidebarSindico from '../components/sindico/sidebarSindico';
import styles from '../css/shellLayout.module.css'; // Layout comum aos perfis com menu lateral

//Layout do sindico

//Função que cria o componente principal da aplciação
function LayoutSindico(){

    //Pegando as ações adicionadas no provider
    //menuLateral = 'aberto' | 'fechado' (apresentação do menu, sem relação com regra de negócio)
    const {menuLateral, setMenuLateral} = useContext(MenuLateralContext);

    //Retorna o componente
    return(
        <div id="div-root">
             
            {/* Container raiz ocupando 100% da tela em modo Flex */}
            <div className={styles.shell}>

                {/* Fundo escurecido atrás do drawer.
                    Existe só enquanto o menu está aberto; no desktop
                    o CSS o esconde (o menu empurra o conteúdo lá).
                    Clicar fora fecha o menu — mesma ação do botão ≡. */}
                {menuLateral === 'aberto' && (
                    <div
                        className={styles.backdrop}
                        onClick={() => setMenuLateral('fechado')}
                        aria-hidden="true"
                    />
                )}

                {/* Renderiza a Sidebar lateral se estiver aberto */}
                {menuLateral === 'aberto' && <SidebarSindico />}

                {/* Container Principal (Header + Conteúdo) que assume o resto do espaço */}
                <div className={styles['shell__body']}>
                         
                    <HeaderSindico />

                    {/* Permite renderizar outros componentes dentro desse layout */}
                    <main className={styles['shell__main']}>
                         
                        {/* Local onde será inserido outros elementos */}
                        <Outlet />
                    </main>
                         
                </div>
            </div>


        </div>
    )
}

//Exportando o componente
export default LayoutSindico
