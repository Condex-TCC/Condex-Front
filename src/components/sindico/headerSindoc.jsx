//Importando os elementos que serão utilizados dentro o componente
import { useContext, useState } from "react"
import "../../css/headerSindico.css"
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
    <header className="header">
      
      {/* Abre a seção esquerda, que agrupa o botão e a logomarca */}
      <div className="left-section" onClick={toogleMenuLarateral}>

        {/*  Cria o botão que contém o ícone do menu sanduíche */}
        <button className="menu-btn">

            {/* Inicia o SVG do menu */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> 

                {/* Desenha as linhas do SVG */}
                <path d="M4 6H20" stroke="#001C3F" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M4 12H20" stroke="#001C3F" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M4 18H20" stroke="#001C3F" strokeWidth="1.5" strokeLinecap="round" />
            </svg> 
        </button>

        {/* Realiza uma renderização condicional para apagar a logomarca */}
        {menuLateral === 'fechado' && (
            <div className="logo-container">
                {/* Inicia o container para agrupar o título e o subtítulo da marca */}
                
                {/* Cria a tag de título de maior hierarquia para o nome principal */}
                <h1 className="logo-title">
                    {/* Escreve o texto com a letra 'x' isolada para destaque */}
                    Cond<span className="logo-e">e</span><span className="logo-x">x</span>
                </h1>

                {/* Insere o subtítulo que fica abaixo da logomarca */}
                <span className="logo-subtitle">Síndico</span>
            </div>
        )}
        </div>

        {/* Abre a seção central do cabeçalho dedicada à área de pesquisa */}
        <div className="center-section">

            {/* Inicia o container que constrói a caixa visual da barra de busca */}
            <div className="search-container">

                {/* Inicia o SVG do ícone da lupa */}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="search-icon">

                    {/* Desenha a lupa */}
                    <circle cx="11" cy="11" r="7" stroke="#A0AABF" strokeWidth="1.5" />
                    <path d="M20 20L16 16" stroke="#A0AABF" strokeWidth="1.5" strokeLinecap="round" />
                </svg>

                {/* Renderiza o campo interativo onde o usuário digita */}
                <input type="text" placeholder="Pesquisar..." className="search-input" />
            </div>
        </div>

        {/* Abre a seção direita do cabeçalho, focada no usuário */}
        <div className="right-section" onClick={AlteraMenu}>

            {/* Cria o botão circular que representa o perfil */}
            <button className="profile-btn">

                {/* Desenha o boneco do botão do usuário para o SVG */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> 
                    <circle cx="12" cy="8" r="4" stroke="#7A87A7" strokeWidth="1.2" />
                    <path d="M5 20C5 16.5 7.5 14 12 14C16.5 14 19 16.5 19 20" stroke="#7A87A7" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
            </button>

            {/* Verifica se o butão de menu lateral foi clicado */}
            {
                //Verificando se o botão foi clicado
                menuLogout ? 
                    <div className="dropdown-menu">
                        <button type="button" onClick={deslogar} className="logout-button">
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