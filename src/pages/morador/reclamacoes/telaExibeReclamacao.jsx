//Tela do menu do morador

//Importações do arquivo
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getReclamacoesMorador } from "../../../service/Reclamacoes"
import CardReclamacaoMorador from "../../../components/morador/reclamacoes/cardReclamacaoMorador"
import styles from "../../../css/telaExibeReclamacaoMorador.module.css"

//Função que cria o componente
function PaginaExibeReclamacaoMorador(){

    //Hook que armazena os dados do json 
    const [cards, setCards] = useState([])

    //Hook que realiza a navegação 
    const navigate = useNavigate()

    //Função que realiza o redirecionamento para a página de cadastro da reclamação
    const cadastraReclamacao = () => {

        //Realiza navegação
        navigate("/morador/reclamacoes/cadastra")
    }

    //Função que obtem os dados 
    const obtemReclamacoesMorador = async () => {

        //Chama a função que obtem os dados
        const response = await getReclamacoesMorador()
        //salvando no state os dados
    
        setCards(response[0])
    }

    //useEffect que executa uma função quando a página é renderizada
    useEffect(() => {

        //Chama a função que obtem os dados
        obtemReclamacoesMorador()
    }, [])

    //Retona o componente
    return(
        <div className={styles['ter-container']}>
            {/* Cabeçalho da tela */}
            <div className={styles['ter-header']}>
                <h1 className={styles['ter-titulo']}>Reclamações</h1>
                <button type="button" className={styles['ter-btnCadastrar']} onClick={cadastraReclamacao}>
                    Cadastrar reclamação
                </button>
            </div>

            {/* Div onde as cards da reclamação serão renderizados */}
            <div className={styles['ter-lista']}>
                {cards.map((reclamacao) => (
                    <CardReclamacaoMorador key={reclamacao.id_reclamacao} reclamacao={reclamacao} renderiza={setCards}/>
                ))}
            </div>
        </div>
    )
}

//Exportando o componente
export default PaginaExibeReclamacaoMorador
