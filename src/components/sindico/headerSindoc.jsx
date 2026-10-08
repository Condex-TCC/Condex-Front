//Importando os elementos que serão utilizados dentro o componente
import { useContext, useState } from "react"
import styles from "../../css/headerSindico.module.css"
import MarcaCondex from "../marca/marcaCondex"
import * as CookieService from '../../service/cookie'
import { useNavigate } from 'react-router-dom';
import { MenuLateralContext } from "../../context/menuLateralContext";

//Header principal da página

//Função que cria o componente
function HeaderSindico(propos){
    
    //Hook que realiza a nevegação automatica
    const navigate = useNavigate();

    //Pegando as ações adicionadas no provider para manipular o contexto
    const {menuLateral, setMenuLateral} = useContext(MenuLateralContext);

    //Criando um estado do botão do logout do sindico
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

    //Função que altera o estado do hook useConstext para alterar o menu lateral
    const toogleMenuLarateral = () => {

        //Altera a o valor da variável do estado
        setMenuLateral( menuLateral === 'fechado' ? "aberto" : 'fechado')
    }

    //Retorna o componente
    return ( 
    <header className={styles.header}>
      
      {/* Abre a seção esquerda, que agrupa o botão e a logomarca */}
      <div className={styles["left-section"]}>

        {/* Botão que abre/fecha o menu lateral.
            Sempre visível: quando o menu está aberto ele vira o
            controle de recolher (a marca fica na própria sidebar,
            evitando logotipo duplicado lado a lado). */}
        <button
            type="button"
            className={styles["menu-btn"]}
            onClick={toogleMenuLarateral}
            aria-label={menuLateral === 'aberto' ? 'Recolher menu lateral' : 'Abrir menu lateral'}
            aria-expanded={menuLateral === 'aberto'}
        >

            {/* Ícone sanduíche */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"> 

                {/* Desenha as linhas do SVG */}
                <path d="M4 6H20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M4 12H20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M4 18H20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg> 
        </button>

        {/* A marca só ocupa o header quando a sidebar está fechada */}
        {menuLateral === 'fechado' && (
            <div className={styles["logo-container"]}>
                {/* Marca do CONDEX: ícone + nome + selo com o papel do
                    usuário. O componente é compartilhado por todos os
                    cabeçalhos, sidebars e telas de entrada. */}
                <h1 className={styles["logo-title"]}>
                    <MarcaCondex papel="Síndico" />
                </h1>
            </div>
        )}
        </div>

        {/* Abre a seção central do cabeçalho dedicada à área de pesquisa */}
        <div className={styles["center-section"]}>

            {/* Inicia o container que constrói a caixa visual da barra de busca */}
            <div className={styles["search-container"]}>

                {/* Inicia o SVG do ícone da lupa (cor herdada do CSS) */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles["search-icon"]} aria-hidden="true">

                    {/* Desenha a lupa */}
                    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
                    <path d="M20 20L16 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>

                {/* Renderiza o campo interativo onde o usuário digita */}
                <input type="text" placeholder="Pesquisar..." aria-label="Pesquisar" className={styles["search-input"]} />
            </div>
        </div>

        {/* Abre a seção direita do cabeçalho, focada no usuário */}
        <div className={styles["right-section"]} onClick={AlteraMenu}>

            {/* Cria o botão circular que representa o perfil */}
            <button className={styles["profile-btn"]} aria-label="Menu do perfil" aria-expanded={menuLogout}>

                {/* Desenha o boneco do botão do usuário (cor herdada do CSS) */}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"> 
                    <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.6" />
                    <path d="M5 20C5 16.5 7.5 14 12 14C16.5 14 19 16.5 19 20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
            </button>

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

//Exporta o compoenete
export default HeaderSindico