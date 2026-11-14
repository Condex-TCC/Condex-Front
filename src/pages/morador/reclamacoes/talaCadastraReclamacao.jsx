//Pagina onde o morador cadastra a reclamação

//Importações do arquivo
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { insertReclamacao } from "../../../service/Reclamacoes"
import styles from "../../../css/talaCadastaReclamacao.module.css"

//Função que cria o componnete
function PaginaCadastraReclamacao(){

    //Hook que armazena a reclamacao digitada
    const [reclamacao, setReclamacao] = useState("")

    //Hook que realiza a navegação
    const navigate = useNavigate()

    //Função que realiza a navegação de voltar
    const back = () => {

        //Realiza a navegação para a tela anterio
        navigate("/morador/reclamacoes/exibe")
    }

    //Função que realiza o cadastro
    const cadastraReclamacao = async () => {

        //Chama a função que realiza o cadastro
        let menssagem = await insertReclamacao(reclamacao)

        //Exibe a menssagem
        alert(menssagem)

        //Chama a função de back
        back()
    }

    //Retorna o componente
    return(
        <div className={styles['tcr-container']}>
            {/* Cabeçalho da tela */}
            <div className={styles['tcr-header']}>
                <button type="button" className={styles['tcr-btnVoltar']} onClick={back}>
                    Voltar
                </button>
            </div>

            <h1 className={styles['tcr-titulo']}>Cadastrar reclamação</h1>

            {/* Formulário de cadastro */}
            <div className={styles['tcr-form']}>
                <div className={styles['tcr-field']}>
                    <label className={styles['tcr-label']} htmlFor="reclamacao">Reclamação</label>
                    <textarea
                        id="reclamacao"
                        className={styles['tcr-textarea']}
                        placeholder="Digite sua reclamação..."
                        value={reclamacao}
                        onChange={(e) => setReclamacao(e.target.value)}
                    />
                </div>

                <div className={styles['tcr-action']}>
                    <button type="button" className={styles['tcr-btnCadastrar']} onClick={cadastraReclamacao}>
                        Cadastrar
                    </button>
                </div>
            </div>
        </div>
    )
}

//Exporta o componente
export default PaginaCadastraReclamacao
