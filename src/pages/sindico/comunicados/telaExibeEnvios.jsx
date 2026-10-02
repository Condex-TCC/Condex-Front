//Importações do arquivo

import { useNavigate, useParams } from "react-router-dom";
import { getEnviosComunicados } from "../../../service/Comunicados";
import { useEffect, useState } from "react";
import styles from "../../../css/paginaExibeRegrasLaudos.module.css";
import listaStyles from "../../../css/paginaExibeEnvios.module.css";
import cardStyles from "../../../css/cardRegrasLaudosSindico.module.css";
import stylesTitle from '../../../css/paginaCadastraRegra.module.css';
import CardResposta from "../../../components/sindico/comunicados/cardResposta";

//Função auxiliar que converte a data do formato ISO para o padrão brasileiro (dd/mm/aaaa)
function formatarData(dataIso) {

    //Se não existir data, não tenta formatar
    if (!dataIso) {

        return "";
    }

    //Formata a data utilizando o padrão brasileiro
    return new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        timeZone: "America/Sao_Paulo" // Ajusta para o fuso horário correto do usuário
    }).format(new Date(dataIso));
}

//Função que cria o componente
function PaginaExibeEnvios(){

    //Hook que pega o parametro passado na url
    const { id } = useParams()

    //Hook que irão salvar os dados que serão exibidos na tela
    const [comunicado, setComunicado] = useState({})
    const [envios, setEnvios] = useState([])

    //Hook que realiza a navegação
    const navigate = useNavigate()

    //Função que recupera os dados do comunicado e do envio
    const obtendoEnvios = async () => {

        //Chamando a função que recupera os dados
        const dados = await getEnviosComunicados(id)

        //Desestrutura os dados
        const {comunicado, envios_moradores} = await dados

        //Salvando os dados nas variáveis de estado
        setComunicado(comunicado)
        setEnvios(envios_moradores)
    }

    //Hook que realiza uma ação sempre que a tela carregar
    useEffect(() => {

        //Chamando a função que obten os dados
        obtendoEnvios()
    }, [])

    //Função que volta para a tela de comunicados
    const back = () => {

        //Raliza a navegação
        navigate('/sindico/comunicados')
    }

    //Retorna os envios
    return (

        // Container principal que engloba tudo
        <div className={styles.container}>

            {/* Barra superior com o titulo da tela e o botão de voltar */}
            <div className={styles.topBar}>

                <h1 className={stylesTitle.title}>Envios do comunicado</h1>

                {/* Botão que retorna para a tela dos comunicados */}
                <button className={styles.backButton} onClick={back}>&larr; Voltar</button>
            </div>

            {/* Bloco com os dados do comunicado */}
            <div className={`${cardStyles.card} ${listaStyles.comunicado}`}>

                {/* Cabeçalho do bloco com o título do comunicado e o total de envios */}
                <header className={cardStyles.header}>

                    <h2 className={`${cardStyles.title} ${listaStyles.comunicadoTitulo}`}>{comunicado.titulo}</h2>

                    <div className={cardStyles.timeInfo}>Total de envios: {envios.length}</div>
                </header>

                {/* Corpo do bloco com a descrição e a data de criação do comunicado */}
                <div className={`${cardStyles.horarioContent} ${listaStyles.comunicadoCorpo}`}>

                    <p className={`${cardStyles.description} ${listaStyles.comunicadoDescricao}`}>{comunicado.descricao}</p>

                    <div className={cardStyles.timeInfo}>
                        Criado em: {formatarData(comunicado.criado_em)}
                    </div>
                </div>
            </div>

            {/*Div com os cards de Reposta (que já existem)*/}
            <div className={listaStyles.listaEnvios}>

                {/* Cards com os envios dos moradores */}
                {
                    // Interando e adicioando os cards
                    envios.map((envio) => {

                        //Retorna o card de resposta com o envio do morador
                        return <CardResposta key={envio.id} resposta={envio}></CardResposta>
                    } )
                }
            </div>
        </div>
    )
}

//Exportando o componente
export default PaginaExibeEnvios
