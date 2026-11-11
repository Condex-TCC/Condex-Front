//Página que irá exibir as visitas do morador

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getVisitasMorador } from "../../../service/VisitasVisitantes";

//Importações do arquivo


//Função que cria o componente
function PaginaExibeVisitasMorador(){

    //Hook que armazena os dados
    const [ativas, setAtivas] = useState([])
    const [pendentes, setPendentes] = useState([])
    const [futuras, setFuturas] = useState([])

    //Hook que realiza a navegação
    const navigate = useNavigate()

    //Função que realiza a navegação para a tela de historico
    const navegaHistorico = () => {

        //Realiza a navegação
        navigate("/morador/visitas/historico")
    }

    //Função que realiza a navegação para a tela de consultar visitante
    const navegaConstulsta = () => {

        //Realiza a navegação
        navigate("/morador/visitante/consulta")
    }

    //Função que obtem os dados que serão exibos na tela
    const obtemDados = async () => {

        //Função que chama os dados que serão exibidos
        let response = await getVisitasMorador()

        //Desestruturando os dados
        const {visitas_ativas, visitas_pendentes, visitas_futuras} = await response

        //Salvando no state os dados
        setAtivas(visitas_ativas)
        setPendentes(visitas_pendentes)
        setFuturas(visitas_futuras)
    }

    //Executa uma função quando a página é carregada
    useEffect(() => {

        //Chama a função que obtem os dados
        obtemDados()
    }, [])

    //Retorna o componente
    return (
        <h1>Página exibe os visitas</h1>
        //Menu de botãos: 1°) visitas (não faz nada) | 2°) histórico (chama a função de navegaHistorico)
        //Na direita a mesma linha chama função de navega para a consulta, chama função de navegaConstulsta

        //tiulo de visitas ativas
        //Div que renderiza as visitas ativas

        //titulo das visitas futuras
        //div que renderiza o card das visitas futuras

        //titulo das visitas pendentes de aprovação
        //descrição, clique na visita
        //div que renderiza o card das visitas pendentes
    );
}

//Exporta o componente
export default PaginaExibeVisitasMorador