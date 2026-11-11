//Página que irá exibir o histórico de visitas do morador

//Importações do arquivo
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getVisitasHisoticoMorador } from "../../../service/VisitasVisitantes"


//Função que cria o componente
function PaginaExibeHistoricoVisitasMorador(){

    //Hook que armazena os dados
    const [historico, setHistorico] = useState([])

    //Hook que realiza a navegação
    const navigate = useNavigate()

    //Função que realiza a navegação para a tela de historico
    const navegaVisitas = () => {

        //Realiza a navegação
        navigate("/morador/visitas")
    }

    //Função que obtem os dados que serão exibos na tela
    const obtemDados = async () => {

        //Função que chama os dados que serão exibidos
        let response = await getVisitasHisoticoMorador()

        //Desestruturando os dados
        const {visitas} = await response

        //Salvando no state os dados
        setHistorico(visitas)
    }

    //Executa uma função quando a página é carregada
    useEffect(() => {

        //Chama a função que obtem os dados
        obtemDados()
    }, [])

    //Retorna o componente
    return (
        <h1>Página exibe historico de visitas</h1>
        //Menu de botãos: 1°) visitas (chama a função de navegaVisitas) | 2°) histórico (não faz nada)
        //Na direita a mesma linha chama função de navega para a consulta, chama função de navegaConstulsta

        //Div que renderiza o cards com o valor salvo no state
    );
}

//Exporta o componente
export default PaginaExibeHistoricoVisitasMorador