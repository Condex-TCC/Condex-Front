//Elemento que permite adicioar outros componentes dentro de si
import { Outlet } from 'react-router-dom';
import HeaderMorador from '../components/morador/headerMorador';
import SidebarMorador from '../components/morador/sidebarMorador';
import { MenuLateralContext } from '../context/menuLateralContext';
import { useContext } from 'react';
import styles from '../css/shellLayout.module.css'; // Layout comum aos perfis com menu lateral

//Layout do Morador

//Função que cria o componente principal da aplciação
function LayoutMorador(){

    //Pegando as ações adicionadas no provider
    //menuLateral = 'aberto' | 'fechado' (apresentação do menu, sem relação com regra de negócio)
    const {menuLateral, setMenuLateral} = useContext(MenuLateralContext);

    //Retorna o componente
    return(
        <div id="div-root">
             
            {/* Container raiz ocupando 100% da tela em modo Flex */}
            <div className={styles.shell}>

                {/* Fundo escurecido atrás do drawer (só no mobile; escondido no desktop).
                    Clicar fora fecha o menu — mesma ação do botão ≡. */}
                {menuLateral === 'aberto' && (
                    <div
                        className={styles.backdrop}
                        onClick={() => setMenuLateral('fechado')}
                        aria-hidden="true"
                    />
                )}

                {/* Renderiza a Sidebar lateral se estiver aberto */}
                {menuLateral === 'aberto' && <SidebarMorador></SidebarMorador>}

                {/* Container Principal (Header + Conteúdo) que assume o resto do espaço */}
                <div className={styles['shell__body']}>
                         
                    {/* Chama o menu do moarador */}
                    <HeaderMorador></HeaderMorador>

                    {/* Permite renderizar outros componentes dentro desse layout */}
                    {/* O flex: 1 empurra o menu inferior para a base da tela quando o conteúdo é curto */}
                    <main className={`${styles['shell__main']}`}>
                         
                        {/* Local onde será inserido outros elementos */}
                        <Outlet />
                    </main>
                         
                </div>
            </div>


        </div>
    )
}

//Exportando o componente
export default LayoutMorador
