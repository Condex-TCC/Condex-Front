//Tela onde será inserido o código de validação para redefinir a senha

//Importações do aquivo
import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { validaCodigo } from "../service/Login"


//Função que cria o componente
function PaginaInsereCodigo(){

    //Hook que armazena o código digitado
    const [codigo, setCodigo] = useState("")

    //Hook que recebe os dados vindos de outra página
    const location = useLocation()

    //Hook que realiza a navegação
    const navigate = useNavigate()

    //Pegando os dados passados via state das rotas
    const id = location.state.id
    const tipo = location.state.tipo

    //Função de volta para a página para validar informações
    const back = () => {

        //Realiza a navegação para a tela de login
        navigate("/consta/valida")
    }

    //Função que realiza a validação do código
    const implementaValidaCodigo = async () => {

        //Função que chama função que valida o código
        const request = await validaCodigo(id, tipo, codigo)

        //Desestruturando o objeto
        const { acesso } = await request

        //Verifica se o acesso foi concedido
        if(acesso == true){
 
            alert("Acesso liberado!")

            //TODO: Fazer aqui depois
        }else{

            //Exibe uma menssagem ao usuário
            alert("O código não está correto! O seu acesso está negado")
        }
    }

    //Retorna o componente
    return (
        <h1>Tela valida o código</h1>
        //Botão de veltar que chama a função de back

        //Texto que diz: Entre com o código enviado para o seu SMS

        //Div com um label de seis caractes no minimo e no maximo obirgatório que só aceita número

        //Botão de verificar que chama função de valida código
    )
}

//Exporta o componente
export default PaginaInsereCodigo