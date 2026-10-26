//Página exibida no primeiro login, onde o usuário completa os dados e define a sua senha

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { DeleteCookie, GetCookie, SetPrimeiroAcessoPendente } from "../service/cookie"
import { buscarPerfil, concluirPrimeiroAcesso } from "../service/Perfil"
import { apenasDigitos, mascaraCpf, mascaraTelefone } from "../utils/mascaras"
import styles from "../css/editarPerfil.module.css"

//Tamanho mínimo da senha
const TAMANHO_MINIMO_SENHA = 8

//Tela inicial de cada nível de acesso, usada depois de concluir o primeiro acesso
const TELA_INICIAL = {
    Sindico: "/sindico",
    Morador: "/morador",
    Porteiro: "/porteiro"
}

//Função que valida o e-mail em um formato simples (texto@dominio.ext)
const emailValido = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

//Função que cria o componente
function PaginaPrimeiroAcesso(){

    //Hook responsavel por realizar a navegação
    const navigate = useNavigate()

    //Nível de acesso do usuário logado, lido do cookie uma única vez
    const [tipoUsuario] = useState(() => GetCookie().tipo)

    //States com os dados do usuário
    const [nomeUser, setNome] = useState("")
    const [emailUser, setEmail] = useState("")
    const [telefoneUser, setTelefone] = useState("")
    const [cpfUser, setCpf] = useState("")
    const [senha, setSenha] = useState("")
    const [confirmaSenha, setConfirmaSenha] = useState("")

    //Estados que controlam o carregamento e o erro da busca dos dados
    const [carregando, setCarregando] = useState(true)
    const [erroCarga, setErroCarga] = useState("")

    //Estado que guarda o erro de cada campo
    const [erros, setErros] = useState({})

    //Estado que desabilita o botão enquanto a gravação acontece
    const [salvando, setSalvando] = useState(false)

    //Função que recupera os dados que já existem no cadastro do usuário
    //Não mexe no estado antes do await para não causar renderização em cascata
    const obtendoUsuario = async () => {

        const resultado = await buscarPerfil(tipoUsuario)

        if(!resultado.sucesso){

            setErroCarga(resultado.mensagem)
            setCarregando(false)

            return
        }

        //Preenche o formulário com o que já foi cadastrado, já com as máscaras
        const { nome, email, telefone, cpf } = resultado.usuario

        setNome(nome ?? "")
        setEmail(email ?? "")
        setTelefone(mascaraTelefone(telefone))
        setCpf(mascaraCpf(cpf))
        setCarregando(false)
    }

    //useEffect que é executado quando a página é renderizada
    useEffect(() => {

        //Sem nível de acesso no cookie não há usuário logado, volta para o login
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

    //Função que encerra a sessão e volta para o login
    const sair = () => {

        DeleteCookie()

        navigate("/login")
    }

    //Função que verifica os campos exigidos pela API
    const validar = () => {

        const novosErros = {}

        if(!nomeUser.trim()){ novosErros.nome = "Informe o nome." }

        if(!emailValido(emailUser.trim())){ novosErros.email = "Informe um e-mail válido." }

        if(apenasDigitos(cpfUser).length !== 11){ novosErros.cpf = "Informe o CPF completo." }

        const tamanhoTelefone = apenasDigitos(telefoneUser).length

        if(tamanhoTelefone !== 10 && tamanhoTelefone !== 11){ novosErros.telefone = "Informe o telefone com DDD." }

        if(senha.length < TAMANHO_MINIMO_SENHA){ novosErros.senha = `A senha deve ter pelo menos ${TAMANHO_MINIMO_SENHA} caracteres.` }

        if(confirmaSenha !== senha){ novosErros.confirmaSenha = "As senhas não são iguais." }

        setErros(novosErros)

        return Object.keys(novosErros).length === 0
    }

    //Função que conclui o primeiro acesso
    const concluir = async (evento) => {

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
            const resultado = await concluirPrimeiroAcesso(
                tipoUsuario,
                nomeUser.trim(),
                emailUser.trim(),
                apenasDigitos(telefoneUser),
                apenasDigitos(cpfUser),
                senha
            )

            //Quando a API recusa, a tela fica como está, exibindo o motivo
            if(!resultado.sucesso){

                setErros({ submit: resultado.mensagem })

                return
            }

            //O primeiro acesso foi concluído, então a marca de pendência é removida
            SetPrimeiroAcessoPendente(false)

            //Segue para a tela principal do usuário
            navigate(TELA_INICIAL[tipoUsuario] ?? "/login")

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

            {/* Cabeçalho da página: título e botão de sair */}
            <header className={styles.header}>
                <h1 className={styles.title}>Primeiro acesso</h1>

                <button type="button" className={styles.btnVoltar} onClick={sair}>
                    Sair
                </button>
            </header>

            <p className={styles.aviso}>
                Confirme os seus dados e defina uma senha para continuar.
            </p>

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

            <form onSubmit={concluir} noValidate>

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

                    {/* Campo Nova senha */}
                    <div className={styles.dataField}>
                        <label htmlFor="senha" className={styles.dataLabel}>Nova senha</label>
                        <input
                            id="senha"
                            type="password"
                            autoComplete="new-password"
                            className={styles.dataInput}
                            disabled={formularioBloqueado}
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                        />
                        {erros.senha && <span className={styles.erro}>{erros.senha}</span>}
                    </div>

                    {/* Campo Confirmar senha */}
                    <div className={styles.dataField}>
                        <label htmlFor="confirmaSenha" className={styles.dataLabel}>Confirmar senha</label>
                        <input
                            id="confirmaSenha"
                            type="password"
                            autoComplete="new-password"
                            className={styles.dataInput}
                            disabled={formularioBloqueado}
                            value={confirmaSenha}
                            onChange={(e) => setConfirmaSenha(e.target.value)}
                        />
                        {erros.confirmaSenha && <span className={styles.erro}>{erros.confirmaSenha}</span>}
                    </div>

                </div>

                {/* Erro devolvido pela API ao salvar */}
                {erros.submit && <p className={styles.erro}>{erros.submit}</p>}

                {/* Botão para concluir o primeiro acesso */}
                <footer className={styles.footer}>
                    <button
                        type="submit"
                        className={styles.btnEditar}
                        disabled={salvando || formularioBloqueado}
                    >
                        {salvando ? "Salvando..." : "Concluir"}
                    </button>
                </footer>

            </form>

        </div>
    )
}

//Exportar o componente
export default PaginaPrimeiroAcesso
