//Importações do arquivo

import { useParams } from "react-router-dom";
import { getEnviosComunicados } from "../../../service/Comunicados";
import { useEffect, useState } from "react";

//Função que cria o componente
function PaginaExibeEnvios(){

    //Hook que pega o parametro passado na url
    const { id } = useParams()

    //Hook que irão salvar os dados que serão exibidos na tela
    const [comunicado, setComunicado] = useState({})
    const [cards, setCards] = useState([])

    //Função que recupera os dados do comunicado e do envio
    const obtendoEnvios = async () => {

        //Chamando a função que recupera os dados
        const dados = await getEnviosComunicados(id)

        //Desestrutura os dados
        const {comunicado, envios_moradores} = await dados

        //Salvando os dados nas variáveis de estado
        setComunicado(comunicado)
        setCards(envios_moradores)
    }

    //Hook que realiza uma ação sempre que a tela carregar
    useEffect(() => {

        //Chamando a função que obten os dados
        obtendoEnvios()
    }, [])

    //Retorna os envios
    return (
        // Fazer a interface grafica Aqui!
        <h1></h1>


        //Adicionar um header com um texto e o botão de voltar
        //Adicioar os dados do comunicado
        
        //Adicioar uma div com os cards de Reposta (que já existem)
    );
}

//Exportando o componente
export default PaginaExibeEnvios