//Página que irá conulsta uma visita

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cadastraVisitante, consultaVisitante } from "../../../service/VisitasVisitantes";

//Importações do arquivo


//Função que cria o componente
function PaginaConsultaVisitanteMorador(){

    //Hook que armazena as váriaveis de do componente
    const [existe, setExiste] = useState(false) //Se foi encontrada ou nãio
    const [nome, setNome] = useState("")
    const [rg, setRg] = useState("")
    const [cpf, setCpf] = useState("")

    //Hook que realiza a navegaçação
    const navigate = useNavigate()

    //Função que realiza a navegação
    const back = () => {

        //Realiza a navegação
        navigate("/morador/visitas")
    }

    //Função que navega para a página de agendar visita
    const agendaVisita = (id) => {

        //Realiza a navegação
        navigate("/morador/visitante/agendar/visita", {
            state: {
                id_visitante: id
            }
        })
    }

    //Função que realiza a consulta do visitante
    const consultaVisitante = async () => {

        //Chama a função que realiza a consulta
        const response = await consultaVisitante(rg, cpf)

        //Desestruturando a responsta
        const { encontrado , visitante} = await response

        //Salvando os dados no state
        setExiste(encontrado)
        
        //Verifica se foi encontrada
        if(existe == true){

            //Redireciona para a tela de agendar visitante
            agendaVisita(visitante.id)
        }
    }

    //Função que cadastra visitante
    const createVisitante = async () => {

        //Chama a função que realiza a consulta
        const response = await cadastraVisitante(nome, rg, cpf)

        //Exibe a menssagem 
        alert(response)

        //Chama a função de buscar o visitante
        //Para garantir que tenha sido salvo com sucesso, e realizar o redirecionamento
        consultaVisitante()
    }

    //Funções que chama as funções assincronas
    const consulta = () => {

        //Chama a função assincrono
        consultaVisitante()
    }
    const cadastra = () => {

        //Chama a função assincrona
        createVisitante
    }
    

    //Retorna o componente
    return (
        <h1>Consulta o morador</h1> 
        //Na mesma linha na direita uma botão de voltar que chama a função de back

        //Div com o titulo: Procurar visitante
        //descrição: Por motivos legais da LGPD, será preciso procurar o visitante
        //Duas label e um botão: 1°) será para RG; 2°) será para CPF 3°) Botão que chama a função de consultar
        //as duas labels devem estar ligadas ao state de rg e cpf
        
        //Se quando for realiza a consulta, o state existir estivar vázio, ele deve exibir em baixo uma nova div
        //Dentro dessa div deve ter uma descrição: Deseja cadastrar esse novo vitante, preencha o noem
        //Em baixo, na mesma linha deve ter uma uma label para o nome (ligada ao state de nome) e um botão para cadastrar o visitante, que chama a função de cadstrar
    );
}

//Exporta o componente
export default PaginaConsultaVisitanteMorador