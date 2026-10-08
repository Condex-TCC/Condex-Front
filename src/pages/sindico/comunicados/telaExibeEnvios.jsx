//Importações do arquivo

import { useNavigate, useParams } from "react-router-dom";
import { getEnviosComunicados } from "../../../service/Comunicados";
import { useEffect, useState } from "react";
import styles from "../../../css/paginaExibeRegrasLaudos.module.css";
import listaStyles from "../../../css/paginaExibeEnvios.module.css";
import cardStyles from "../../../css/cardRegrasLaudosSindico.module.css";
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

    //Lista segura para renderizar (a API pode falhar e devolver undefined)
    const listaEnvios = Array.isArray(envios) ? envios : []

    //Retorna os envios
    return (

        // Container principal que engloba tudo
        <div className={styles.container}>

            {/* Cabeçalho da página: contexto, ação concreta e retorno.
                O botão de voltar mora aqui porque é a ação do cabeçalho,
                igual às demais telas da área interna. */}
            <header className={styles['cabecalho-pagina']}>

                <div>
                    <p className="cx-overline">Comunicação</p>
                    <h2 className="cx-page-title">Envios do comunicado</h2>
                    <p className="cx-page-subtitle">
                        Veja para quem este comunicado foi enviado e o que cada morador respondeu.
                    </p>
                </div>

                {/* Botão que retorna para a tela dos comunicados */}
                <button type="button" className={styles.backButton} onClick={back}>&larr; Voltar</button>
            </header>

            {/* Bloco com os dados do comunicado */}
            <div className={`${cardStyles.card} ${listaStyles.comunicado}`}>

                {/* Cabeçalho do bloco com o título do comunicado e o total de envios */}
                <header className={cardStyles.header}>

                    <h2 className={`${cardStyles.title} ${listaStyles.comunicadoTitulo}`}>{comunicado.titulo}</h2>

                    <div className={cardStyles.timeInfo}>Total de envios: {listaEnvios.length}</div>
                </header>

                {/* Corpo do bloco com a descrição e a data de criação do comunicado */}
                <div className={`${cardStyles.horarioContent} ${listaStyles.comunicadoCorpo}`}>

                    <p className={`${cardStyles.description} ${listaStyles.comunicadoDescricao}`}>{comunicado.descricao}</p>

                    <div className={cardStyles.timeInfo}>
                        Criado em: {formatarData(comunicado.criado_em)}
                    </div>
                </div>
            </div>

            {/* Estado vazio: nenhum morador recebeu/respondeu ainda */}
            {listaEnvios.length === 0 && (
                <div className="cx-empty">
                    <span className="cx-empty__icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                            <polyline points="22 6 12 13 2 6"></polyline>
                        </svg>
                    </span>
                    <p className="cx-empty__title">Nenhum envio registrado</p>
                    <p className="cx-empty__text">
                        Os envios deste comunicado e as respostas dos moradores aparecem aqui.
                    </p>
                </div>
            )}

            {/*Div com os cards de Reposta (que já existem)*/}
            <div className={`${listaStyles.listaEnvios}`}>

                {/* Cards com os envios dos moradores */}
                {
                    // Interando e adicioando os cards
                    listaEnvios.map((envio) => {

                        //Retorna o card de resposta com o envio do morador
                        return <CardResposta key={envio.id} resposta={envio} redirecionamento={"/sindico/comunicados/envios/" + id}></CardResposta>
                    } )
                }
            </div>
        </div>
    )
}

//Exportando o componente
export default PaginaExibeEnvios
