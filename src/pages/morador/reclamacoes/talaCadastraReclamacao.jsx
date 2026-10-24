//Pagina onde o morador cadastra a reclamação

//Importações do arquivo
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { insertReclamacao } from "../../../service/Reclamacoes"


//Função que cria o componnete
function PaginaCadastraReclamacao(){

    //Hook que armazena a reclamacao digitada
    const [reclamacao, setReclamacao] = useState("")

    //Hook que realiza a navegação
    const navigate = useNavigate()

    //Função que realiza a navegação de voltar
    const back = () => {

        //Realiza a navegação para a tela anterio
        navigate("/morador/reclamacoes/exibe")
    }

    //Função que realiza o cadastro
    const cadastraReclamacao = async () => {

        //Chama a função que realiza o cadastro
        let menssagem = await insertReclamacao(reclamacao)

        //Exibe a menssagem
        alert(menssagem)

        //Chama a função de back
        back()
    }

    //Retorna o componente
    return(
        <h1>cadastra reclamacao</h1>
        //ao lado o botão de voltar que chama a função de back

        //div com uma textarea para o morador digitar a reclamacao, que altera o estado reclamacao

        //botão de cadastrar que chama a função assincrona cadastraReclamacao
    )
}

//Exporta o componente
export default PaginaCadastraReclamacao