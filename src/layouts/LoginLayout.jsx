//Layout do login

//Elemento que permite adicioar outros componentes dentro de si
import { Outlet } from 'react-router-dom';

import styles from "../css/loginLayout.module.css" //Importando o CSS para trabalhar com módulos

//Função que cria o layout do login
function LoginLayout(){

    //Retorna um componente
    return(
        <div className={styles["div-fundo-inicial"]}>
            {/* Permite renderizar outros componentes dentro desse layout */}
            <Outlet></Outlet>
        </div>

    )
}

//Exportando o layout
export default LoginLayout