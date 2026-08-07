import { Link, useNavigate } from 'react-router-dom';
import styles from "../css/loginLayout.module.css" //Importando o CSS para trabalhar com módulos
import { useState } from 'react';
import LoginLayout from '../layouts/LoginLayout';
import { HendleLogin } from '../service/Login';
import * as CookieService from '../service/cookie'
import { useEffect } from 'react';

//Tela de Login

//Função que cria a página inical do programa
function TelaDeLogin(){

    //Cmponente que realiza a nevegação automatica
    const navigate = useNavigate();

    //Capturando o estado dos inputs
    const [usuario, setUsuario] = useState("") //Monitora o usuário
    const [password, setPassword] = useState("") //Monitora a senha

    //Adicionando o efeito para que toda vez o usuário entre, verifique se já tem o cookie cadastrado
    //Esse hook será executado apenas quando a página carregar
    useEffect(() => {

        //Recuperando as credenciais do usuário
        let credenciais = CookieService.GetCookie()

        //Vericando se esse usuário já está logado
        if(credenciais.token != undefined && credenciais.tipo != undefined){
            
            //Caso o usuário já esteja logado, realiza o redirecionamento
            if(credenciais.tipo == "Sindico"){
                
                //Rediciona para a rote do sindico
                navigate("/sindico")

            }else if(credenciais.tipo == "Morador"){

                //Rediciona para a rote do morador
                navigate("/morador")

            }else if(credenciais.tipo == "Porteiro"){

                //Rediciona para a rote do porteiro
                navigate("/porteiro")
            }

        }

    }, [])

    //Função que cuida dos cookies
    const tokenCookie = (token, tipoUsuario) => {

        //Recuperando o token
        let tokenAntigo = CookieService.GetCookie()

        //Verificando de o token existe
        if(tokenAntigo != undefined){

            //Apagando o token antigo
            CookieService.DeleteCookie()

            //Criando o novo cookie
            CookieService.SetCookie(token, tipoUsuario)
        }else{

            //Crinado o cookei
            CookieService.SetCookie(token, tipoUsuario)

        }
    }

    //Usuários de teste do banco de dados do Trida
    //aspencer@gmail.com | password
    //chris62@kessler.com | password


    //Função que envia os dados para a API
    const realizarLogin = async (evento) => {

        //Evtira que a página recarrege
        evento.preventDefault();

        //Aguarda a operação de login
        let data = await HendleLogin(usuario, password)

        //Chamando a função do cookie
        tokenCookie(data.token, data.tipo_usuario)        

        //Verificando o usuário e realizando a mudança de tela
        if(data.tipo_usuario == "Sindico"){
            
            //Rediciona para a rote do sindico
            navigate("/sindico")

        }else if(data.tipo_usuario == "Morador"){

            //Rediciona para a rote do morador
            navigate("/morador")

        }else if(data.tipo_usuario == "Porteiro"){

            //Rediciona para a rote do porteiro
            navigate("/porteiro")
        }
    }
    
    //Retorna um componente
    return(
        
        //Div com os formulário
        <div className={styles['div-login-formulario']}>

                <div className={styles['cabecalho-login']}>
                    <p className={styles['texto-boas-vindas']}>Bem-vindo ao condex</p>
                    <h1 className={styles['titulo-login']}>Acesse sua conta</h1>
                </div>

                <form className={styles['formulario']} onSubmit={realizarLogin}>
                    {/* Campo de Usuário */}
                    <div className={styles['grupo-input']}>
                        <label>Usuário</label>
                        <div className={styles['container-input']}>
                            {/* Ícone de Usuário */}
                            <svg className={styles['icone-esquerda']} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </svg>

                            {/* Capturando o estado da variável | Passando uma função anonima que recebe um evento */}
                            {/* Esse evento pega o valor da input e atualiza o a variável, além de recarregar o componente */}
                            <input type="text" placeholder="" onChange={(evento) => {setUsuario(evento.target.value)}}/>
                        </div>
                    </div>

                    {/* Campo de Senha */}
                    <div className={styles['grupo-input']}>
                        <label>Senha</label>
                        <div className={styles['container-input']}>
                            {/* Ícone de Cadeado */}
                            <svg className={styles['icone-esquerda']} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                            </svg>

                            {/* Capturando o estado da variável | Passando uma função anonima que recebe um evento */}
                            {/* Esse evento pega o valor da input e atualiza o a variável, além de recarregar o componente */}
                            <input type="password" placeholder="••••••" onChange={(evento) => {setPassword(evento.target.value)}} />
                            
                            {/* Ícone de Olho (Visualizar Senha) */}
                            <svg className={styles['icone-direita']} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                        </div>
                    </div>

                    {/* Botão de Entrar */}
                    <div className={styles['container-botao']}>
                        <button type="submit" className={styles['btn-login']}>
                            Entrar 
                            <span className={styles['seta-botao']}>→</span>
                        </button>
                    </div>
                </form>
        </div>
    )
}

//Exportando a tela
export default TelaDeLogin