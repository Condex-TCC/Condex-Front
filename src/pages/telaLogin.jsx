import { Link } from 'react-router-dom';
import "../css/loginLayout.css"

//Tela de Login

//Função que cria a página inical do programa
function TelaDeLogin(){

    //Retorna um componente
    return(
        
        //Div com os formulário
        <div className='div-login-formulario'>
            
            

                <div className="cabecalho-login">
                    <p className="texto-boas-vindas">Bem-vindo ao condex</p>
                    <h1 className="titulo-login">Acesse sua conta</h1>
                </div>

                <form className="formulario">
                    {/* Campo de Usuário */}
                    <div className="grupo-input">
                        <label>Usuário</label>
                        <div className="container-input">
                            {/* Ícone de Usuário */}
                            <svg className="icone-esquerda" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                            <input type="text" placeholder="" />
                        </div>
                    </div>

                    {/* Campo de Senha */}
                    <div className="grupo-input">
                        <label>Senha</label>
                        <div className="container-input">
                            {/* Ícone de Cadeado */}
                            <svg className="icone-esquerda" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                            </svg>
                            <input type="password" placeholder="••••••" />
                            {/* Ícone de Olho (Visualizar Senha) */}
                            <svg className="icone-direita" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                        </div>
                    </div>

                    {/* Botão de Entrar */}
                    <div className="container-botao">
                        <button type="submit" className="btn-login">
                            Entrar 
                            <span className="seta-botao">→</span>
                        </button>
                    </div>
                </form>
        </div>
    )
}

//Exportando a tela
export default TelaDeLogin