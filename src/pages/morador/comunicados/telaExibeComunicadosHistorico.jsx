//Importações do arquivo

import { useNavigate } from "react-router-dom"
import { getComunicadoHistorico } from "../../../service/Comunicados"
import { useEffect, useState } from "react"


//Função que cria o componente
function PaginaExibeComunicadosHistorico(){

    //REGRA DE NEGÓCIO: Nessa tela será exibida todos os comunicados do morador logado

    //Hook que irá salvar os comunicados do morador
    const [comunicados, setComunicados] = useState([])

    //Hook que realiza a navegação
    const navigate = useNavigate()

    //Função que carrega os dados dos comunicados
    const obtendoComunidados = async () => {
    
        //Pegando os dados
        const dados = await getComunicadoHistorico()
    
        //Desestruturando os dados
        const { envios } = await dados
    
        //Adicionando esses dados no estado
        setComunicados(envios)
    }
    
    //useEffect que é executado quando a página é renderizda
    useEffect(() => {
    
        //Chama a função que carrega os dados
        obtendoComunidados()
    
    }, [])

    //Função que realiza a navegação para a página de histórico de comunicados
    const navegaNaoVisualidados = () => {

        //Realiza a navegação
        navigate("/morador/comunicados/exibe")
    }

    //Retorna um componente
    return(
        <h1>Históricos</h1>
        
        //Fazer o titulo de comunicados não visualidaos

        //Fazer um div com dois botões um para comunicadoo não visualizados e outro para o histórico de comunicados

        //Div que irá exibir os cards de todos comunicados , puxando os dados de state comuinicados
    );
}

//Exportando o componente
export default PaginaExibeComunicadosHistorico