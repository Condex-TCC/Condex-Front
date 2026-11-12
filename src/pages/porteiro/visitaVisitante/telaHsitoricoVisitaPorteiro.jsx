//Página que exibe o histórico das visitas do porteiro

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getHistoricoVisitasPorterio } from "../../../service/VisitasVisitantes";

//Importações do arquivos


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
        <h1>histórico de visitas</h1>
        //Na mesma linha, alinhado à direita, um botão de voltar que chama a função de back

        //Div que renderiza os cards predentes no state, os cards são os cardVisitaPorteiro.jsx
    );
}

//Exporta o compente
export default PaginaHistoricoVisitaPorteiro