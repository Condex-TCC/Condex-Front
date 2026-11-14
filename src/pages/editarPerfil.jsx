//Página onde os usuários irão editar os seus dados

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { GetCookie } from "../service/cookie"
import { atualizarPerfil, buscarPerfil } from "../service/Perfil"
import { apenasDigitos, mascaraCpf, mascaraTelefone } from "../utils/mascaras"
import styles from "../css/editarPerfil.module.css"

//Tela inicial de cada nível de acesso, usada para voltar depois de editar
const TELA_INICIAL = {
    Sindico: "/sindico",
    Morador: "/morador",
    Porteiro: "/porteiro"
}

//Função que valida o e-mail em um formato simples (texto@dominio.ext)
const emailValido = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

//Função que cria o componente
function PaginaEditarPerfil(){

    //Hook responsavel por realizar a navegação
    const navigate = useNavigate()

    //Nível de acesso do usuário logado, lido do cookie uma única vez
    const [tipoUsuario] = useState(() => GetCookie().tipo)

    //States com os dados do usuário
    const [nomeUser, setNome] = useState("")
    const [emailUser, setEmail] = useState("")
    const [telefoneUser, setTelefone] = useState("")
    const [cpfUser, setCpf] = useState("")

    //Estados que controlam o carregamento e o erro da busca dos dados
    const [carregando, setCarregando] = useState(true)
    const [erroCarga, setErroCarga] = useState("")

    //Estado que guarda o erro de cada campo
    const [erros, setErros] = useState({})

    //Estado que desabilita o botão enquanto a gravação acontece
    const [salvando, setSalvando] = useState(false)

    //Função que recupera os dados do usuário logado
    //Não mexe no estado antes do await para não causar renderização em cascata
    const obtendoUsuario = async () => {

        const resultado = await buscarPerfil(tipoUsuario)

        if(!resultado.sucesso){

            setErroCarga(resultado.mensagem)
            setCarregando(false)

            return
        }

        //Preenche o formulário já com as máscaras aplicadas
        const { nome, email, telefone, cpf } = resultado.usuario

        setNome(nome ?? "")
        setEmail(email ?? "")
        setTelefone(mascaraTelefone(telefone))
        setCpf(mascaraCpf(cpf))
        setCarregando(false)
    }

    //useEffect que é executado quando a página é renderizada
    useEffect(() => {

        //Sem nível de acesso no cookie não há perfil para editar, volta para o login
        if(!tipoUsuario){

            navigate("/login")

            return
        }

        Promise.resolve().then(() => obtendoUsuario())
    }, [])

    //Função que reinicia o carregamento pelo botão "tentar novamente"
    const tentarNovamente = () => {

        setCarregando(true)
        setErroCarga("")
        obtendoUsuario()
    }

    //Função que realiza a navegação de acordo com o nível de acesso
    const redirec = () => {

        navigate(TELA_INICIAL[tipoUsuario] ?? "/login")
    }

    //Função que verifica os campos exigidos pela API
    const validar = () => {

        const novosErros = {}

        if(!nomeUser.trim()){ novosErros.nome = "Informe o nome." }

        if(!emailValido(emailUser.trim())){ novosErros.email = "Informe um e-mail válido." }

        if(apenasDigitos(cpfUser).length !== 11){ novosErros.cpf = "Informe o CPF completo." }

        const tamanhoTelefone = apenasDigitos(telefoneUser).length

        if(tamanhoTelefone !== 10 && tamanhoTelefone !== 11){ novosErros.telefone = "Informe o telefone com DDD." }

        setErros(novosErros)

        return Object.keys(novosErros).length === 0
    }

    //Função que realiza o update do usuário
    const EditandoPerfil = async (evento) => {

        //Evita que a página recarregue ao enviar o formulário
        evento.preventDefault()

        //Interrompe o envio se algum campo estiver inválido
        if(!validar()){

            return
        }

        //Desabilita o botão para não enviar duas vezes
        setSalvando(true)

        try{

            //A API exige o telefone numérico, então telefone e CPF vão apenas com dígitos
            const resultado = await atualizarPerfil(
                tipoUsuario,
                nomeUser.trim(),
                emailUser.trim(),
                apenasDigitos(telefoneUser),
                apenasDigitos(cpfUser)
            )

            //Quando a API recusa, a tela fica como está, exibindo o motivo
            if(!resultado.sucesso){

                setErros({ submit: resultado.mensagem })

                return
            }

            //Volta para a tela principal do usuário
            redirec()

            //Exibe a mensagem retornada depois da navegação
            alert(resultado.mensagem)
        }
        finally{

            //Libera o botão tanto no sucesso quanto no erro
            setSalvando(false)
        }
    }

    //Enquanto os dados não chegam, o formulário não é exibido
    const formularioBloqueado = carregando || erroCarga !== ""

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

            {/* Aviso de carregamento e de erro ao buscar os dados */}
            {carregando && <p className={styles.aviso}>Carregando dados...</p>}

            {
                !carregando && erroCarga &&
                <p className={styles.erro}>
                    {erroCarga}{" "}
                    <button type="button" className={styles.btnRetry} onClick={tentarNovamente}>
                        Tentar novamente
                    </button>
                </p>
            }

            <form onSubmit={EditandoPerfil} noValidate>

                {/* Div com os dados do usuário, editáveis e ligados aos states */}
                <div className={styles.dataContainer}>

                    {/* Campo Nome */}
                    <div className={styles.dataField}>
                        <label htmlFor="nome" className={styles.dataLabel}>Nome</label>
                        <input
                            id="nome"
                            type="text"
                            className={styles.dataInput}
                            maxLength={100}
                            disabled={formularioBloqueado}
                            value={nomeUser}
                            onChange={(e) => setNome(e.target.value)}
                        />
                        {erros.nome && <span className={styles.erro}>{erros.nome}</span>}
                    </div>

                    {/* Campo E-mail */}
                    <div className={styles.dataField}>
                        <label htmlFor="email" className={styles.dataLabel}>E-mail</label>
                        <input
                            id="email"
                            type="email"
                            className={styles.dataInput}
                            disabled={formularioBloqueado}
                            value={emailUser}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {erros.email && <span className={styles.erro}>{erros.email}</span>}
                    </div>

                    {/* Campo CPF */}
                    <div className={styles.dataField}>
                        <label htmlFor="cpf" className={styles.dataLabel}>CPF</label>
                        <input
                            id="cpf"
                            type="text"
                            inputMode="numeric"
                            placeholder="000.000.000-00"
                            className={styles.dataInput}
                            disabled={formularioBloqueado}
                            value={cpfUser}
                            onChange={(e) => setCpf(mascaraCpf(e.target.value))}
                        />
                        {erros.cpf && <span className={styles.erro}>{erros.cpf}</span>}
                    </div>

                    {/* Campo Telefone */}
                    <div className={styles.dataField}>
                        <label htmlFor="telefone" className={styles.dataLabel}>Telefone</label>
                        <input
                            id="telefone"
                            type="tel"
                            inputMode="numeric"
                            placeholder="(00) 00000-0000"
                            className={styles.dataInput}
                            disabled={formularioBloqueado}
                            value={telefoneUser}
                            onChange={(e) => setTelefone(mascaraTelefone(e.target.value))}
                        />
                        {erros.telefone && <span className={styles.erro}>{erros.telefone}</span>}
                    </div>

                </div>

                {/* Erro devolvido pela API ao salvar */}
                {erros.submit && <p className={styles.erro}>{erros.submit}</p>}

                {/* Botão para editar o usuário */}
                <footer className={styles.footer}>
                    <button
                        type="submit"
                        className={styles.btnEditar}
                        disabled={salvando || formularioBloqueado}
                    >
                        {salvando ? "Salvando..." : "Editar usuário"}
                    </button>
                </footer>

            </form>

        </div>
    )
}

//Exportar o componente
export default PaginaEditarPerfil
