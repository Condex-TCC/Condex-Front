//Página de para selecionar o morador

//Importaçoes do arquivo
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { getMoradoresVisitasPortiero } from "../../../service/VisitasVisitantes"

//Importações do arquivo
import CardMoradorPorteiro from "../../../components/porteiro/cardMoradorPorteiro"
import styles from "../../../css/paginaSelecionaMoradorPorteiro.module.css"


//Função que cria a página
function PaginaSelecionaMoradorPorteiro(){

    //Hook que armazena os dados
    const [cards, setCards] = useState([])

    //Hook que realiza a navegação
    const navigate = useNavigate()

    //Hook que otem o state passage pela url
    const location = useLocation()

    //Pegando o ID do visitante
    const idVisitante = location.state.id_visitante
    const nomeVisitante = location.state.nome_visitante

    //Função que retonro para a tela de consulta visitante
    const back = () => {

        //Realiza a navegação
        navigate("/porteiro/visitante/consulta")
    }

    //Função que obtem os dados
    const obterDados = async () => {

        //Chamando a função de obter dadso
        const response = await getMoradoresVisitasPortiero()

        //Salvando os dados no state
        setCards(response[0])
    }

    //Função que é chamada quando a página é renderizada
    useEffect(() => {

        //Chama a função de obter os dados
        obterDados()
    }, [])

    //Retorna o componente
    return(
        <div className={styles['pagina--seleciona-morador']}>

            {/* Cabeçalho com o título e o botão de voltar na mesma linha */}
            <div className={styles['cabecalho--pagina']}>

                <h1 className={styles['titulo--pagina']}>Seleciona o morador</h1>

                {/* Botão que retorna para a tela de consulta do visitante */}
                <button type="button" className={styles['botao--voltar']} onClick={back}>
                    &larr; Voltar
                </button>

            </div>

            {/* Descrição da tela */}
            <p className={styles['descricao--pagina']}>Selecione o morador que vai receber a visita.</p>

            {/* Div que renderiza os cards de morador do porteiro */}
            <div className={styles['lista--cards']}>
                {cards?.map((morador) => (
                    <CardMoradorPorteiro
                        key={morador.id}
                        morador={morador}
                        id={idVisitante}
                        nome={nomeVisitante}
                        idMorador={morador.id}
                    />
                ))}
            </div>

        </div>
    )
}

//Exportando o visitante
export default PaginaSelecionaMoradorPorteiro