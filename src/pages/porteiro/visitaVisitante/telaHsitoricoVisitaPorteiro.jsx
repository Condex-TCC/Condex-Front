//Página que exibe o histórico das visitas do porteiro

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getHistoricoVisitasPorterio } from "../../../service/VisitasVisitantes";

//Importações do arquivos
import CardVisitaPorteiro from "../../../components/porteiro/cardVisitaPorteiro";
import styles from "../../../css/paginaHistoricoVisitaPorteiro.module.css";


//Funão que cria o componente
function PaginaHistoricoVisitaPorteiro(){

    //Hook que armazena os cards
    const [cards, setCards] = useState([])

    //Hook que realiza a navegação
    const navigate = useNavigate()

    //Função que retorna para a tela principal do porteiro
    const back = () => {

        //Realiza a navegação
        navigate("/porteiro")
    }

    //Função que obtem os dados da API
    const obterDados = async () => {

        //Chama a função de obter dados
        const response = await getHistoricoVisitasPorterio()

        //Desestruturando o json
        const { visitas } = await response

        //Salvando os dados no state
        setCards(visitas)
    }

    //Função que é executada quando a página é renderizada
    useEffect(() => {

        //Chama a função que obtem os dados
        obterDados()
    }, [])

    //Retorna um componente
    return(
        <div className={styles['pagina--historico']}>

            {/* Cabeçalho com o título e o botão de voltar na mesma linha */}
            <div className={styles['cabecalho--historico']}>
                <h1 className={styles['titulo--historico']}>Histórico de visitas</h1>

                <button type="button" className={styles['botao--voltar']} onClick={back}>
                    &larr; voltar
                </button>
            </div>

            {/* Div que renderiza os cards presentes no state */}
            <div className={styles['lista--cards']}>
                {cards?.map((visita) => (
                    <CardVisitaPorteiro key={visita?.id_visita} visita={visita} />
                ))}
            </div>
        </div>
    );
}

//Exporta o compente
export default PaginaHistoricoVisitaPorteiro