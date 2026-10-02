//Importações

import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { showEnvioDetalhe, updateEnvioContraResposta } from "../../../service/Comunicados";

//Função que cria o componente
function PaginaCadastraContraResposta(){

    //Hooks para salvar os dados que serão exibidos na tela
    const [comunicado, setComunicado] = useState({})
    const [morador, setMorador] = useState({})
    const [respostaMorador, setRespostMorador] = useState('')
    const [constraResposta, setContraResposta] = useState('') //DEverá ser ligado ao compo que obtem esse dados

    //Hook que pega o id passado na url
    const { id } = useParams()

    //Hook que realiza a navegação entre as páginas
    const navigate = useNavigate()

    //Hook utilizado para enviar dados durante o redirecionamento
    const location = useLocation();

    //Variavel que será utilizada para realizar o redirecionamento
    const redirecionamento = location.state?.redirecionamento || '/sindico/comunicado';

    //Função que pega os dados do envio
    const obtendoDadosEnvio = async () =>{

        //Pegando os dados da API
        const dados = showEnvioDetalhe(id)

        //Desetruturando os dados
        const { envio } = await dados

        //Alterando o estado
        setComunicado(envio.comunicado)
        setMorador(envio.morador)
        setRespostMorador(envio.resposta)
    }

    //Hook que irá chamar a função que obten os dados no momento em que se cria o componente
    useEffect(() => {

        //Chamando a função que obten os dados
        obtendoDadosEnvio()
    }, [])

    //Função que redireciona o usuário para a tela anterio
    const back = () => {

        //Realiza a navegação
        navigate(redirecionamento)
    }

    //Função que realiza o updade da do envio e adiciona a contra resposta
    const CadastraContraResposta = async () => {

        //Chama a função que cadastra a contra resposta
        const menssage = await updateEnvioContraResposta(id, constraResposta)

        //Exibe a menssagem para o usuário
        alert(menssage)

        //Chama a função de back e redireciona para a tela anterior
        back()
    }

    //Retorna um componente
    return (
        <h1></h1>
        // Title dizendo: respondendo o morador
        // No canto direito o botão de voltar

        // Div com as informações do comunicado

        // div com os dados do morador

        // Div com a resposta do morador

        // Campo onde o sindico irá escrevar a contra resposta
        
        // Embaixo de tudo dentralizado no meio da tela um botão verde para cadastrar
    );
}

//Exporta o componente para poder ser utilizado em outros arquivos
export default PaginaCadastraContraResposta