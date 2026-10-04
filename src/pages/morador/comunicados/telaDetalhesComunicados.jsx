//Importações do arquivo

import { useParams } from "react-router-dom";
import { getDetalhesComunicado } from "../../../service/Comunicados";
import { useEffect, useState } from "react";


//Função que cria o componente
function PaginaDetalhesComunicados(){

    //Hook que vai guardar o comunicado e exibir seus dados
    const [evnio, setEnvio] = useState({})

    //Hook que vai receber o id vindo da url
    const { id } = useParams()

    //Função que recupera os comunicados
    const obtemComunicados = async () => {

        //Pegando os dados
        const dados = await getDetalhesComunicado(id)

        //Desestruturando os dados
        const { envio } = await dados

        //Salvando o estado
        setEnvio(envio)
    }

    //useEfect que será executado quando a págian renderizar
    useEffect(() => {

        //Chama a função que carrega os dados
        obtemComunicados()
    }, [])

    //Função que irá fazer o botão volta
    const back = () => {

        //TODO: Será implementado mais tarde
    }

    //Função que irá cadastrar a resposta do morador ao comunicado
    const cadastraResposta = async () => {

        //TODO: Será implementado mais tarde
    }

    //Retorna os componente
    return (
        <h1>Detalhes do comunicado</h1>
        //ao lado do titulo um botão de voltar

        //Div que vai exibir os dados do comunicado

        //Div onde o morador irá cadastrar a sua resposta, somente se a respotasta e contra resosta estiverem nulas

        //Div com os dados da resposta e contra resposta, que irão somente aparecer se a respota e contra respota não estivem nulas
    );
}

//Exportando o componente
export default PaginaDetalhesComunicados