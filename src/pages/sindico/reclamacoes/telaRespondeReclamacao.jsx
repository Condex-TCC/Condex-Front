//Página onde se cadastra a resposta da reclamação

//importações do arquivo
import { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { showReclamacao } from "../../../service/Reclamacoes"
import styles from "../../../css/telaRespondeReclamacao.module.css"

//Função que cria a página
function PaginaRespondeReclamacao(){

    //Hook que armazena o json com os dados que vão ser exibidos na tela
    const [reclamacao, setReclamacao] = useState({})

    //Hook que armazena as resposta do sindico
    const [resposta, setResposta] = useState("")
    
    //Hook que obtem os parametros passados pela URL
    const { id } = useParams()

    //Hook que realiza a navegação
    const navigate = useNavigate()

    //Hook que obtem os dados passados no state do react router don
    const location = useLocation()

    //Extraindo os dados passados
    const localBack = location.state?.redirecionamento || "/sindico";

    //Função que realiza o retorno
    const back = () => {

        //Realiza a navagação para a outra tela
        navigate(localBack)
    }

    //Função que obtem os dados do registro | Marca como visualizado
    const findReclamacao = async () => {

        //Chama a função que obtem o dados
        const request = await showReclamacao(id)

        //Desestruturando a resposta
        const { reclamacao } = await request

        //Salvando os dados no state
        setReclamacao(reclamacao)
    }

    //Função que cadastra a resposta
    const cadastraResposta = () => {

        //TODO: Será implementado mais tarde

        //Realiza o redirecionamento
        back()
    }

    //useEffect, que será executado quando a página é renderizado
    useEffect(() => {

        //Chama a função que busca os dados
        findReclamacao()
    }, [])

    //Retona o componente
    return (
        <div className={styles['trr-container']}>
            {/* Cabeçalho */}
            <div className={styles['trr-header']}>
                <h1 className={styles['trr-titulo']}>Responder reclamação</h1>
                <button type="button" className={styles['trr-btnVoltar']} onClick={back}>
                    Voltar
                </button>
            </div>

            {/* Div da reclamação com destaque */}
            <div className={styles['trr-destaque']}>
                <span className={styles['trr-destaqueRotulo']}>Reclamação</span>
                <div className={styles['trr-destaqueTexto']}>{reclamacao?.reclamacao}</div>
            </div>

            {/* Dados do morador */}
            <div className={styles['trr-morador']}>
                <span className={styles['trr-moradorRotulo']}>Morador</span>
                <div className={styles['trr-moradorValor']}>{reclamacao?.morador?.nome}</div>
                <div className={styles['trr-moradorValor']}>{reclamacao?.morador?.unidade?.bloco} - {reclamacao?.morador?.unidade?.numero}</div>
            </div>

            {reclamacao?.resposta ? (
                <div className={styles['trr-destaque']}>
                    <span className={styles['trr-destaqueRotulo']}>Resposta do síndico</span>
                    <div className={styles['trr-destaqueTexto']}>{reclamacao?.resposta}</div>
                </div>
            ) : (
                <div className={styles['trr-cadastro']}>
                    <textarea
                        className={styles['trr-textarea']}
                        placeholder="Digite a resposta para o morador..."
                        value={resposta}
                        onChange={(e) => setResposta(e.target.value)}
                    />
                    <button type="button" className={styles['trr-btnCadastrar']} onClick={cadastraResposta}>
                        Cadastrar resposta
                    </button>
                </div>
            )}
        </div>
    )
}

//Exportar o componente
export default PaginaRespondeReclamacao
