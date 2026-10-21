//Página onde os usuários irão editar os seus dados

import { useEffect, useState } from "react"
import { GetCookie } from "../service/cookie"
import { EditarPeril, getUser } from "../service/Login";
import { useNavigate } from "react-router-dom";
import styles from "../css/editarPerfil.module.css"

//Função que cria o componente
function PaginaEditarPerfil(){

    //Estado que ermazena o estado da aplicação
    const [usuarioCookie, setUsuario] = useState("")

    //State com os dados do usuário
    const [idUser, setId] = useState(0)
    const [nomeUser, setNome] = useState("")
    const [emailUser, setEmail] = useState("")
    const [telefoneUser, setTelefone] = useState("")
    const [cpfUser, setCpf] = useState("")

    //Hook responsavel por realizar a navegação de volta
    const navigate = useNavigate()

    //Função que recupera os dados do usário logado
    const obtendoUsuario = async () => {

        //Chamando a função que recupera os usuários logados
        let cookie = GetCookie();

        //Alterando o estado
        setUsuario(cookie.tipo)

        //Chama a função que busca os dados do usuário
        const response = await getUser(cookie.tipo)

        //Desestrutura os dados
        const { usuario } = await response

        //Desestruturando os usuários
        const { id, nome, email, telefone, cpf} = await usuario

        //Salvando no state
        setId(id)
        setNome(nome)
        setEmail(email)
        setTelefone(telefone)
        setCpf(cpf)
    }

    //Função que realiza o updade do usuário
    const EditandoPerfil = async () => {

        //Chama a função de editar perfil
        const response = await EditarPeril(usuarioCookie, nomeUser, emailUser, telefoneUser, cpfUser)

        //Exibindo a menssagem
        alert(response)

        //Redirecionando para a tela pricipal do usuário
        redirec()
    }

    //useEffect que é executado quando a página é renderizada
    useEffect(() => {

        //Chama a função que busca o usuário
        obtendoUsuario()
    }, [])

    //Função que realiza a navegação deacordo com o nivel de acesso
    const redirec = () => {

        //Verificao nivel de acesso
        switch(usuarioCookie){
            //Sindico
            case "Sindico":

                //Realiza a navegação
                navigate("/sindico")

                break;
            
            //Morador
            case "Morador":

                //Realiza a navegação
                navigate("/morador")

                break;

            //Porteiro
            case "Porteiro":

                //Realiza a navegação
                navigate("/porteiro")

                break;
        }
    }

    //Retona um objeto
    return (
        <div className={styles.container}>

            {/* Cabeçalho da página: título e botão de voltar */}
            <header className={styles.header}>
                <h1 className={styles.title}>Editar usuário</h1>

                {/* Botão para voltar conforme o nível de acesso */}
                <button 
                    type="button" 
                    className={styles.btnVoltar} 
                    onClick={redirec}
                >
                    ← Voltar
                </button>
            </header>

            {/* Div com os dados do usuário, agora editáveis e ligados aos states */}
            <div className={styles.dataContainer}>

                {/* Campo Nome */}
                <div className={styles.dataField}>
                    <label htmlFor="nome" className={styles.dataLabel}>Nome</label>
                    <input
                        id="nome"
                        type="text"
                        className={styles.dataInput}
                        value={nomeUser}
                        onChange={(e) => setNome(e.target.value)}
                    />
                </div>

                {/* Campo E-mail */}
                <div className={styles.dataField}>
                    <label htmlFor="email" className={styles.dataLabel}>E-mail</label>
                    <input
                        id="email"
                        type="email"
                        className={styles.dataInput}
                        value={emailUser}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                {/* Campo CPF */}
                <div className={styles.dataField}>
                    <label htmlFor="cpf" className={styles.dataLabel}>CPF</label>
                    <input
                        id="cpf"
                        type="text"
                        className={styles.dataInput}
                        value={cpfUser}
                        onChange={(e) => setCpf(e.target.value)}
                    />
                </div>

                {/* Campo Telefone */}
                <div className={styles.dataField}>
                    <label htmlFor="telefone" className={styles.dataLabel}>Telefone</label>
                    <input
                        id="telefone"
                        type="tel"
                        className={styles.dataInput}
                        value={telefoneUser}
                        onChange={(e) => setTelefone(e.target.value)}
                    />
                </div>

            </div>

            {/* Botão para editar o usuário */}
            <footer className={styles.footer}>
                <button 
                    type="button" 
                    className={styles.btnEditar} 
                    onClick={EditandoPerfil}
                >
                    Editar usuário
                </button>
            </footer>

        </div>
    )
}

//Exportar o componente
export default PaginaEditarPerfil