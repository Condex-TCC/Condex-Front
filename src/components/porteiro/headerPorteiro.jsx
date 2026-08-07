//Local das importações
import { useNavigate } from "react-router-dom";
import styles from "../../css/headerPorteiro.module.css"
import { useState } from "react"
import * as CookieService from '../../service/cookie'

//Header do porteiro

//Função que cria o componenete do reader
function HeaderPorteiro(){

    //Hook que realiza a nevegação automatica
    const navigate = useNavigate();

    //Criando um estado do botão do logout do Porteiro
    const [menuLogout, setMenuLogout] = useState(false)

    //Função que altera o estado do botão
    const AlteraMenu = () => {
    
        //Inverte o valor armazenado
        setMenuLogout(!menuLogout)
    }
    
    //Função que desloga o usuário
    const deslogar = () => {
    
        //Apaga todos os cookies
        CookieService.DeleteCookie()
    
        //Redireciona para a tela inicial
        navigate('/')
    }

    //Retorna um componenete
    return (

        // Div para armazenar todos o itens do header
        <header className={styles.header}>
            
            {/* Div com todos os itens da logo */}
            <div className={styles["logo-container"]}>
                {/* Inicia o container para agrupar o título e o subtítulo da marca */}
                    
                {/* Cria a tag de título de maior hierarquia para o nome principal */}
                <h1 className={styles["logo-title"]}>
                    {/* Escreve o texto com a letra 'x' isolada para destaque */}
                    Cond<span className={styles["logo-e"]}>e</span><span className={styles["logo-x"]}>x</span>
                </h1>

                {/* Insere o subtítulo que fica abaixo da logomarca */}
                <span className={styles["logo-subtitle"]}>Porteiro</span>
            </div>
            
            {/* Barra de busca */}
            <div className={styles["search-container"]}>
                <svg 
                className={styles["search-icon"]} 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <input 
                type="text" 
                className={styles["search-input"]} 
                placeholder="Pesquisar..." 
                />
            </div>

             {/* Abre a seção direita do cabeçalho, focada no usuário */}
            <div className={styles["right-section"]} onClick={AlteraMenu}>

                {/* Botão de deslogar */}
                <div className={styles.avatar} onClick={AlteraMenu}>
                
                {/* Desenha o boneco do botão do usuário para o SVG */}
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> 
                        <circle cx="12" cy="8" r="4" stroke="#7A87A7" strokeWidth="1.2" />
                        <path d="M5 20C5 16.5 7.5 14 12 14C16.5 14 19 16.5 19 20" stroke="#7A87A7" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>

                </div>

                {/* Verifica se o butão de menu lateral foi clicado */}
                {
                    //Verificando se o botão foi clicado
                    menuLogout ? 
                        <div className={styles["dropdown-menu"]}>
                            <button type="button" onClick={deslogar} className={styles["logout-button"]}>
                                Deslogar
                            </button>
                        </div>
                    :
                    console.log("O button está fechado")
                }
            </div>
        </header>
    )
}

//Exporta o header do porteiro
export default HeaderPorteiro