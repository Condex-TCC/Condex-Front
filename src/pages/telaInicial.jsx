import { Link } from 'react-router-dom';
import styles from "../css/loginLayout.module.css" //Importando o CSS para trabalhar com módulos

//Tela inicial

//Função que cria a página inical do programa
function PaginaInical(){

    //Retorna um componente
    return(
        
        <div className={styles["div-fundo-inicial"]}>

            {/* //Elemento que permite a navegação no entre rotas */}
            <Link to="/login" className={`${styles['btn-login']} ${styles['btn-inicial']}`}>Login</Link>
        </div>
    )
}

//Exportando a tela
export default PaginaInical