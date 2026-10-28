//Tela onde será inserido o código de validação para redefinir a senha

//Importações do aquivo
import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import styles from "../css/telaInsereCodigo.module.css"
import { validaCodigo } from "../service/Login"


//Função que cria o componente
function PaginaInsereCodigo(){

    //Hook que armazena o código digitado
    const [codigo, setCodigo] = useState("")

    //Hook que recebe os dados vindos de outra página
    const location = useLocation()

    //Hook que realiza a navegação
    const navigate = useNavigate()

    //Pegando os dados passados via state das rotas
    const id = location.state.id
    const tipo = location.state.tipo

    //Função de volta para a página para validar informações
    const back = () => {

        //Realiza a navegação para a tela de login
        navigate("/consta/valida")
    }

    //Função que realiza a validação do código
    const implementaValidaCodigo = async () => {

        //Função que chama função que valida o código
        const request = await validaCodigo(id, tipo, codigo)

        //Desestruturando o objeto
        const { acesso } = await request
        console.log(request)
        //Verifica se o acesso foi concedido
        if(acesso == true){

            //Realiza a navegação 
            navigate("/consta/senha", {
                state: {
                    id: id,
                    tipo: tipo,
                    codigo: codigo
                }
            })
            
        }else{

            //Exibe uma menssagem ao usuário
            alert("O código não está correto! O seu acesso está negado")
        }
    }

    //Retorna o componente
    return (
        <div className={styles.container}>

            {/* Cabeçalho da página: título e botão de voltar */}
            <header className={styles.header}>
                <h1 className={styles.title}>Validar código</h1>

                {/* Botão de voltar que chama a função de back */}
                <button type="button" className={styles.btnVoltar} onClick={back}>
                    Voltar
                </button>
            </header>

            {/* Texto que orienta o usuário sobre o código recebido */}
            <p className={styles.aviso}>
                Entre com o seu código. Ele foi enviado para o seu telefone via SMS.
            </p>

            {/* Campo do código de validação, com no mínimo e no máximo seis números */}
            <div className={styles.formContainer}>
                <div className={styles.dataField}>
                    <label htmlFor="codigo" className={styles.dataLabel}>Código</label>
                    <input
                        id="codigo"
                        type="text"
                        inputMode="numeric"
                        maxLength={6}
                        minLength={6}
                        required
                        className={styles.dataInput}
                        placeholder="Digite o código de 6 dígitos"
                        value={codigo}
                        onChange={(e) => setCodigo(e.target.value.replace(/\D/g, ""))}
                    />
                </div>
            </div>

            {/* Botão de verificar que chama a função de validação do código */}
            <footer className={styles.footer}>
                <button
                    type="button"
                    className={styles.btnVerificar}
                    onClick={implementaValidaCodigo}
                    disabled={codigo.length !== 6}
                >
                    Verificar
                </button>
            </footer>

        </div>
    )
}

//Exporta o componente
export default PaginaInsereCodigo