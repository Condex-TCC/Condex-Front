//Layout da entrada do sistema (tela de apresentação + login)

//Elemento que permite adicioar outros componentes dentro de si
import { Outlet } from 'react-router-dom';

import styles from "../css/loginLayout.module.css" //Importando o CSS para trabalhar com módulos

//Função que cria o layout de entrada do CONDEX
//Este layout é pai das rotas "/" (apresentação) e "/login", garantindo que
//as duas telas partam exatamente do mesmo fundo e da mesma linguagem visual.
function LoginLayout(){

    //Retorna um componente
    return(
        <div className={styles["div-fundo-inicial"]}>

            {/* Camadas decorativas do fundo.
                São puramente visuais: ficem atrás do conteúdo (z-index menor),
                marcadas com aria-hidden para não poluir leitores de tela e com
                pointer-events none para nunca capturar cliques.
                Todo o desenho (textura de pontos, anéis e orbs) é feito em CSS,
                substituindo a imagem de fundo anterior. */}
            <div className={styles["camadas"]} aria-hidden="true">
                <div className={styles["textura-pontos"]}></div>
                <span className={`${styles["forma"]} ${styles["forma--anel-1"]}`}></span>
                <span className={`${styles["forma"]} ${styles["forma--anel-2"]}`}></span>
                <span className={`${styles["forma"]} ${styles["forma--orbe-1"]}`}></span>
                <span className={`${styles["forma"]} ${styles["forma--orbe-2"]}`}></span>
            </div>

            {/* Permite renderizar outros componentes dentro desse layout
                (tela inicial ou tela de login) */}
            <Outlet></Outlet>
        </div>

    )
}

//Exportando o layout
export default LoginLayout
