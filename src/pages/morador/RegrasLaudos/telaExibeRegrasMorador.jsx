//Importando do arquivo

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRegrasMorador } from "../../../service/Regra";



//Função que cria o componente
function PaginaExibeRegrasMorador(){

    //Hook que irá armazenar as regras
    const [regras, setRegras] = useState([])

    //Hook que irá realizar a navegação
    const navigate = useNavigate()

    //Função que realiza a navegação para a tala de laudos
    const navegaLaudo = () => {

        //Realiza a navagação
        navigate("/morador/registros/laudos")
    }

    //Função que obtem as regras
    const obtemRegras = async () => {

        //Obtendo as regras
        const dados = await getRegrasMorador()

        //Salvando os dados no state
        setRegras(dados[0])
    }

    //useEffect que irá chamar a função que carrega os dados das regras
    useEffect(() => {

        //Função que chama os dados
        obtemRegras()
    }, [])

    //Retorna o componente
    return (
        <h1>Regras do condominio</h1>

        //titulo

        //botão de regra(faz nada), botão de laudo (realiza a navegação)

        //Div que rederiza os cards com as regras
    );
}

//Exportando o arquivo
export default PaginaExibeRegrasMorador