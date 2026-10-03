//Importações do arquivo

import { useEffect, useState } from "react"
import { getMoradores } from "../../../api/MoradoresApi"
import { useNavigate } from "react-router-dom"


//Função que cria o componente
function PaginaSelecionaMoradorComunicado(){

    //Hook que irá armazenar os moradores
    const [moradoes, setMoradores] = useState([])
    const [moradoesSelecionados, setMoradoresSelecionado] = useState([])

    //Hook que realiza a navegação
    const navigate = useNavigate()

    //Função que recupera todos os moradores selecionados
    const obtendoMoradores = async () => {

        //Fazendo a requisição
        const response = await getMoradores()

        //Convertendo o JSON para objetos no JS
        let json = await response.json()

        //Desestrutura o promisse
        const { message, status, data} = await json

        //Verifica se houve algum erro na requisição
        if(status != 200){

            //Para a execução do try e lança um erro para o catch
            throw("Erro na requisição " + status)
        }

        //Pegando os moradores
        await setMoradores(data[0])
    }

    //useEffet que será chamando no momento em que se criar a página
    useEffect(() => {

        //Chama a função que recupera os dados
        obtendoMoradores()

    }, [])

    //Função que apenas volta para a tela de cadastro
    const back = () => {

        //Realiza a navegação
        navigate('/sindico/comunicados/cadastrar')
    }

    //Função que irá realizar o retorno para a tela de cadastro, passando os moradores
    const selectedMoradores = () => {

        //TODO: Implementar essa lógica mais tarde
    }

    //Função que cria o componente
    return(
        <h1></h1>
        //Titulo selecionar moradores
        //na direita do tiutlo um botão de voltar

        //uma div onde será exibido os cards dos moradores 

        //um obtão verde, escrito: Selecoinar esses moradores
    )
}

//Exportando o componente
export default PaginaSelecionaMoradorComunicado