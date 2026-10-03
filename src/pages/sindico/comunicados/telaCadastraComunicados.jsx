//Importações do arquivo

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { envioComunicado } from "../../../service/Comunicados";


//Criando o componente
function PaginaCadastraComunicados(){

    //REGRA DE NEGOCIO: quando for todos os moradores o array deverá ir vazio,
    //já se for para alguns moradores o array irá conter os id dos moarados selecionados

    //Hook de elementos que vai ser utilizados no cadastro
    const [moradoresSelecionados, setMoradoresSelecionado] = useState([])

    //Hook de com os valores que serão recuperados do componente
    const [titulo, setTiulo] = useState("")
    const [descricao, setDescricao] = useState("")

    //Hook que realiza a navegação
    const navigate = useNavigate()

    //Função que volta para a a tela de comunicados
    const back = () => {

        //Realiza a navegação para a tela do sindico
        navigate('/sindico/comunicados')
    } 
    
    //Função que irá redirecionar para a tela de selecionar os moradores
    const selectMorador = () => {

        //TODO: Fazer a lógica mais terde
    }

    //Função que realiza o cadastro do comunicado e realiza o envio
    const CadastrarEnvioComunicado = async () => {

        //Chamando a função que chama a api
        const menssage = await envioComunicado(titulo, descricao, moradoresSelecionados)

        //Exibindo a menssagem
        alert(menssage)

        //Chama a função para redirecioar para os comunicados
        back()
    }

    //Retorna o componente
    return (
        // <h1></h1>
        //Titulo Cadastrar comunicados

        //Um texto mostando se todos estão delecionados ou se o sindico selecionou todos
        //na diretira um botão para o sindico cadastrar os comunicados

        //Uma compo para o sindico cadastar o titulo do comunicado

        //outro campo para o sindico cadastrar a descrição do conteutdo

        //Um botão verde centralizado escrito: Enviar novo comunicado
        <button onClick={CadastrarEnvioComunicado}>Enviar</button>
    );
}

//Exportando o componente
export default PaginaCadastraComunicados