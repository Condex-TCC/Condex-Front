//Página que vai exibir os detalhes da viista

import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { showVisitaMorador } from "../../../service/VisitasVisitantes";

//Importações do arquivo


//Função que cria o componente
function PaginaDetalheVisitaMorador(){

    //Hook que salva os dados
    const [dados, setDados] = useState({})

    //Hook que obtem o parametro passado na url
    const { id } = useParams()

    //Hook que realiza a navegação
    const navigate = useNavigate()

    //Hook que pega os valores passados pelo state da url
    const location = useLocation()
    
    //Pegando o valor do redirecionamento
    const redireciona = location.state.redireciona

    //Função que realiza o redirecionamento
    const back = () => {

        //Função que realiza o redirecionamento
        navigate(redireciona)
    }

    //Função que obten os dados
    const obterDados = async () => {

        //Chama a função que obten os dados
        const response = await showVisitaMorador(id)

        //Desestruturnado os dados
        const { visitas } = await response
        
        //Salvando os dados
        setDados(visitas)
    }

    //Função que é exeucutada quando a página é renderizada
    useEffect(() => {

        //Chama a função que obtem os dados
        obterDados()
    }, [])

    //Retorna o componente
    return(
        <h1>detalhes da visita do: Fulano de tal</h1> //Titulo que exibe o nome do visitante
        //Na mesma linha, mas na direitra um botão que chama a função de back

        //Div que exibe os dados visitante

        //Div que exibe os dados da visita (Hora prevista de entrada e hora prevista de saída)

        //Div que mostra a autorização da reserva (aprovação dentente, aprovada ou recusada)
        //Pendente => autorizacao == null | Aprovada => autorização == 1 ou true | Recusada => autorizacao == 0 ou false
        //Quando a reseva for pendente, deve renderizar na mesma div um texto: Você deseja receber esse visita?
        //Em baixo um do lado do outro, dois botões, um verde (autorizo visita) e um vermelho (recuso visita), esse botão não fazem nada, pois serão implementedos mais tarde

        //Duas divs uma do lado da outra, onde a primeira irá exibir a hora exata que visitante entrou no condomicnio e o porteiro que liberou a entrada
        //e a outra div a hora exata que o visitante saiu do predio e o porteiro que registrou esses dados
    );
}

//Exporta o componente 
export default PaginaDetalheVisitaMorador
