//Importações do arquivo

import { useEffect, useState } from "react";
import CardReservaAutorizacao from "../../../components/sindico/cardReserva";
import { useNavigate } from "react-router-dom";
import { getReservaPendentes } from "../../../service/Reservas";
import styles from "../../../css/paginaExibeRegrasLaudos.module.css";
import stylesTitle from "../../../css/paginaCadastraRegra.module.css";


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
    }

    //useEffect para é chamado quando a página carrega
    useEffect(() => {

        //Chama a função que obten as reservas pendentes
        obtendoReservasPendentes()

    }, [])

    //Retorna o componente
    return (
        // Container principal que engloba tudo
        <div className={styles.container}>

          {/* Header da página */}
          <header className={stylesTitle.header}>

            {/* Titulo da página */}
            <h1 className={stylesTitle.title}>Reservas pendentes</h1>

              {/* Botão de voltar */}
              <button className={stylesTitle.backButton} onClick={back}>
                &larr; Voltar
              </button>

          </header>

          {/* Div onde será carregado os cards com as reservas pendentes */}
          <div>

            {/* Percorrendo o array com as reservas pendentes */}
            {
              cards.map((reserva) => {

                //Retorna o card da reserva
                return <CardReservaAutorizacao key={reserva.id} id={reserva.id} espaco={reserva.espaco} data={reserva.data} inicio={reserva.inicio} fim={reserva.fim} morador={reserva.morador}></CardReservaAutorizacao>
              })
            }
          </div>

        </div>
    );
}

//Exportando o componente
export default PaginaExibeAprovaReservas