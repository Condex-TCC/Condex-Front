//Página responsável por validar os dados da conta

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import styles from "../css/telaValidaInformacoes.module.css"
import { validaContaUsuario } from "../service/Login"
import { apenasDigitos, mascaraCpf } from "../utils/mascaras"
import { validarCpf } from "../utils/validacoes"

//Importações do arquivo

//Função que cria o componente
function PaginaValdiaInformacoes(){

    //Hook que armazenam os informações que vão ser enviadas para a API
    const [email, setEmail] = useState("")
    const [cpf, setCpf] = useState("")
    const [telefone, setTelefone] = useState("")
    const [erro, setErro] = useState("")

    //Hook que realiza a navegação
    const navigate = useNavigate()

    //Função de volta para a página para validar informações
    const back = () => {

        //Realiza a navegação para a tela de login
        navigate("/login")
    }

    //Função que pega os dados 
    const validaConta = async () => {

        //Não envia a requisição enquanto o CPF estiver inválido
        if(!validarCpf(cpf)){

            setErro("Informe um CPF válido.")

            return
        }

        setErro("")

        //A API compara o CPF gravado apenas com dígitos
        const request = await validaContaUsuario(email, apenasDigitos(cpf), telefone)

        //Desestrutrando os dados
        const { usuario } = await request

        //Realiando a navegação
        navigate("/consta/codigo", {
            state: {
                id: usuario.id,
                tipo: usuario.tipo,
            }
        })

    }

    //Retorna o componente
    return (
        <div className={styles.container}>

            {/* Cabeçalho da página: título e botão de voltar */}
            <header className={styles.header}>
                <h1 className={styles.title}>Validar conta</h1>

                <button type="button" className={styles.btnVoltar} onClick={back}>
                    Voltar
                </button>
            </header>

            {/* Formulário com os dados para validação */}
            <div className={styles.formContainer}>

                {/* Campo E-mail */}
                <div className={styles.dataField}>
                    <label htmlFor="email" className={styles.dataLabel}>E-mail</label>
                    <input
                        id="email"
                        type="email"
                        className={styles.dataInput}
                        placeholder="Digite seu e-mail"
                        value={email}
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
                        placeholder="000.000.000-00"
                        inputMode="numeric"
                        maxLength={14}
                        value={cpf}
                        onChange={(e) => setCpf(mascaraCpf(e.target.value))}
                    />
                </div>

                {/* Campo Telefone */}
                <div className={styles.dataField}>
                    <label htmlFor="telefone" className={styles.dataLabel}>Telefone</label>
                    <input
                        id="telefone"
                        type="tel"
                        className={styles.dataInput}
                        placeholder="Digite seu telefone"
                        value={telefone}
                        onChange={(e) => setTelefone(e.target.value)}
                    />
                </div>

            </div>

            {/* Erro de validação do CPF */}
            {erro && <p className={styles.erro} role="alert">{erro}</p>}

            {/* Botão para enviar os dados */}
            <footer className={styles.footer}>
                <button type="button" className={styles.btnEnviar} onClick={validaConta}>
                    Enviar
                </button>
            </footer>

        </div>
    )
}

//Exporta o componente
export default PaginaValdiaInformacoes