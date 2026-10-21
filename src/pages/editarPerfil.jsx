//Página onde os usuários irão editar os seus dados

import { useEffect, useState } from "react"
import { GetCookie } from "../service/cookie"
import { getUser } from "../service/Login";
import { useNavigate } from "react-router-dom";

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

        //TODO: Lógica que será implementada mais tarde
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
        <h1>editar perfil - ID: {idUser} - Nome: {nomeUser}</h1>

        //Irá exbir qual é o tipo de usuário (Sindico, Morador ou Porteiro) dado vindo do state usuário
        //na mesma div mas à direita um botão de voltar

        //Uma div onde será exibidos os dados do usuário salvos no state (nome, email, telefone e CPF)

        //Um botão de salvar
    )
}

//Exportar o componente
export default PaginaEditarPerfil