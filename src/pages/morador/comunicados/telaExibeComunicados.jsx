//Importações do arquivo

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getComunicadoMorador } from "../../../service/Comunicados";


//Função que cria o componente
function PaginaExibeComunicadosMorador(){

    //REGRA DE NEGÓCIO: Nessa tela será exibida apenas os comunicados não visualizados

    //Hook que irá salvar os comunicados do morador
    const [comunicados, setComunicados] = useState([])

    //Hook que realiza a navegação
    const navigate = useNavigate()

    //Função que carrega os dados dos comunicados
    const obtendoComunidados = async () => {

        //Pegando os dados
        const dados = await getComunicadoMorador()

        //Desestruturando os dados
        const { envios } = await dados

        //Adicionando esses dados no estado
        await setComunicados(envios)
    }

    //useEffect que é executado quando a página é renderizda
    useEffect(() => {

        //Chama a função que carrega os dados
        obtendoComunidados()

    }, [])

    //Função que realiza a navegação para a página de histórico de comunicados
    const navegaHistorico = () => {

        //Realiza a navegação
        navigate("/morador/comunicados/historico")
    }

    //Retorna um componente
    return(
        <h1>Não visualidados</h1>

        //Fazer o titulo de comunicados não visualidaos

        //Fazer um div com dois botões um para comunicadoo não visualizados e outro para o histórico de comunicados

        //Div que irá exibir os cards do comunicados não visualizados, puxando os dados de state comuinicados
    );
}

//Exportando o componente
export default PaginaExibeComunicadosMorador