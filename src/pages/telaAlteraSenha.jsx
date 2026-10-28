//Tela que será ronsável por redefinir a senha

import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import styles from "../css/telaAlteraSenha.module.css"
import { redefinirSenha } from "../service/Login"

//Importações do arquivo

//Função que cria o componente
function PaginaRedefineSenha(){

    //Hook que armazena a nova senha
    const [novaSenha, setNovaSenha] = useState("")

    //Hook que realiza a navegação
    const navigate = useNavigate()

    //Hook que otem os dados vindos pelas rotas
    const location = useLocation()

    //Otendo os dados passados pelas rotas
    const id = location.state.id
    const tipo = location.state.tipo
    const codigo = location.state.codigo

    //Função de volta para a página para validar informações
    const back = () => {

        //Realiza a navegação para a tela de login
        navigate("/consta/valida")
    }

    //Função que redefine a senha
    const implementacaoRedefineSenha = async () => {

        //Chama a função de alterar a senha
        const response = await redefinirSenha(id, tipo, codigo, novaSenha)

        //Desestrutura a resposta
        const { alterado } = await response

        //Verifica se o acesso foi concedido
        if(alterado == true){

            //Menssagem para o usuário
            alert("Sua senha foi alterada com sucesso!")

            //Realiza a navegação para a tela de login
            navigate("/login")
            
        }else{

            //Exibe uma menssagem ao usuário
            alert("Hove um erro para alterar a senha! Tente novamente mais tarde")
        }
    }

    //Retorna o componente
    return (
        <div className={styles.container}>

            {/* Cabeçalho da página: título e botão de voltar */}
            <header className={styles.header}>
                <h1 className={styles.title}>Redefinir senha</h1>

                {/* Botão de voltar que chama a função de back */}
                <button type="button" className={styles.btnVoltar} onClick={back}>
                    Voltar
                </button>
            </header>

            {/* Texto que orienta o usuário sobre a nova senha */}
            <p className={styles.aviso}>
                Entre com a sua nova senha. Mínimo de 8 caracteres, campo obrigatório.
            </p>

            {/* Campo da nova senha, com no mínimo oito caracteres */}
            <div className={styles.formContainer}>
                <div className={styles.dataField}>
                    <label htmlFor="novaSenha" className={styles.dataLabel}>Nova senha</label>
                    <input
                        id="novaSenha"
                        type="password"
                        minLength={8}
                        required
                        autoComplete="new-password"
                        className={styles.dataInput}
                        placeholder="Digite a sua nova senha"
                        value={novaSenha}
                        onChange={(e) => setNovaSenha(e.target.value)}
                    />
                </div>
            </div>

            {/* Botão que chama a função de redefinir a senha */}
            <footer className={styles.footer}>
                <button
                    type="button"
                    className={styles.btnSalvar}
                    onClick={implementacaoRedefineSenha}
                    disabled={novaSenha.length < 8}
                >
                    Salvar nova senha
                </button>
            </footer>

        </div>
    )
}

//Exporta o componente
export default PaginaRedefineSenha