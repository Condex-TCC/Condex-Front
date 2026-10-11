//Importações do arquivo

import { useEffect, useState } from "react";
import CardReservaAutorizacao from "../../../components/sindico/cardReserva";
import { useNavigate } from "react-router-dom";
import { getReservaPendentes } from "../../../service/Reservas";


//Função que cria o componente
function PaginaExibeAprovaReservas(){

    //Hook que irá armazenar os cards
    const [cards, setCards] = useState([])

    //Hook que realiza a navegação
    const navigate = useNavigate()

    //Função que redireciona para a tela de acesso rápido
    const back = () => {

        navigate("/sindico/reservas")
    }

    //Função que busca as reservas na api
    const obtendoReservasPendentes = async () => {

        //Chamando as reservas da api
        const response = await getReservaPendentes()

        //Desestruturando o objeto para obter a propriedade reservas
        const { reservas } = await response

        //Definindo o estado com array de reservas
        setCards(reservas)
        console.log(reservas)
    }

    //useEffect para é chamado quando a página carrega
    useEffect(() => {

        //Chama a função que obten as reservas pendentes
        obtendoReservasPendentes()

    }, [])

    //Retorna o componente
    return (
        <h1>Reservas pendentes</h1>
        //Titulo: Reservas pendentes
        //Botão de voltar que integra o back

        //div com um map no estado que carrega os card (<CardReservaAutorizaca>)

    );
}

//Exportando o componente
export default PaginaExibeAprovaReservas