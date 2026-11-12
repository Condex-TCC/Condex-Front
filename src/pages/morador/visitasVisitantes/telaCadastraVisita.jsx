//Página que o morador vai cadastrar o resto dos dados da visita

import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { cadastraVisitaMorador } from "../../../service/VisitasVisitantes"

//Importações do arquivo


//Função que cria o componente
function PaginaCadastraVisitaMorador(){

    //Hook que armazena os dados que vão ser utilizados para salvar os dados
    const [entrada, setEntrada] = useState("")
    const [saida, setSaida] = useState("")

    //Hook que realiza a navegação
    const navigate = useNavigate()

    //Hook que obtem os dados passados pelo state
    const location = useLocation()

    //Pegando o ID e nome do visitante
    const id = location.state.id_visitante
    const nome = location.state.nome_visitante

    //Função que realiza a navegação para a tela de consulta
    const back = () => {

        //Realiza a navegação
        navigate("/morador/visitante/consulta")
    }

    //Função que realiza a navegação para a tela inicial de visitas
    const backVisitaInicial = () => {

        //Realiza a navegação
        navigate("/morador/visitas")
    }

    //Função que cadastra a visita
    const createVisita = async () => {

        //Chama a funçao que cadastrar a visita
        const response = await cadastraVisitaMorador(id, entrada, saida)

        //Desestruturando o retorno 
        const { message, status} = await response

        //Exibe a menssagen do usuário
        alert(message)

        //Verifica se o cadastro foi um sucesso
        if(status == 200){

            //Realiza o redirecionamentio
            backVisitaInicial()
        }
    }

    //Função que chama a função assincrona
    const cadastra = () => {

        //Chama a função assincronoa
        createVisita()
    }

    //Retorna o componente
    return(
        <h1>agenda visita para: {nome}</h1>
        //Na mesma linha alinhado á direita um botão de voltar que chama a função de back
        //Em baixo um breve descrição: Preencha o dia e a hora da entrada e da sadia para a visita

        //Uma div com dois inputs de datatime-local, eles devem estar na mesma linha e centralizados
        //o da esquerda deve ter de descrição: Hora prevista da entrda e deve estar ligado ao state de entrda
        //o da direira deve ter de descrição: Hora prevista da saida e deve estar ligado ao stae de saida

        //Em baixo um botão verde: escrito cadastrar que chama a função de cadastra
    )
}

//Exportando o componente
export default PaginaCadastraVisitaMorador