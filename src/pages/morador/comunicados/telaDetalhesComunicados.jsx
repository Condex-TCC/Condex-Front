//Importações do arquivo

import { useParams } from "react-router-dom";
import { cadastraRespostaMorador, getDetalhesComunicado } from "../../../service/Comunicados";
import { useEffect, useState } from "react";
import styles from "../../../css/paginaDetalhesComunicados.module.css";
import telaStyles from "../../../css/telaVisitantesMorador.module.css";
import formStyles from "../../../css/telaCadastraVisitanteMorador.module.css";
import cardStyles from "../../../css/cardComunicadoMorador.module.css";
import campoStyles from "../../../css/paginaCadastraRegra.module.css";


//Função que cria o componente
function PaginaDetalhesComunicados(){

    //Hook que vai guardar o comunicado e exibir seus dados
    const [evnio, setEnvio] = useState({})
    const [resposta, setRespota] = useState("")

    //Hook que vai receber o id vindo da url
    const { id } = useParams()

    //Função que recupera os comunicados
    const obtemComunicados = async () => {

        //Pegando os dados
        const dados = await getDetalhesComunicado(id)

        //Desestruturando os dados
        const { envio } = await dados

        //Salvando o estado
        setEnvio(envio)
    }

    //useEfect que será executado quando a págian renderizar
    useEffect(() => {

        //Chama a função que carrega os dados
        obtemComunicados()
    }, [])

    //Função que irá fazer o botão volta
    const back = () => {

        //TODO: Será implementado mais tarde
    }

    //Função que irá cadastrar a resposta do morador ao comunicado
    const cadastraResposta = async () => {

        //Chama a função que realiza o cadastro
        const message = await cadastraRespostaMorador(id, resposta)

        //Exibe a menssagem
        alert(message)

        //Realiza o redirecionamento
        back()
    }

//Retorna os componente
    return (

        // Container principal da tela
        <div className={telaStyles['vm-container']}>

            {/* Cabeçalho com o título da tela e o botão de voltar */}
            <div className={styles['dc-header']}>

                <h1 className={telaStyles['vm-page-title']}>Detalhes do comunicado</h1>

                {/* Botão que retorna para a tela de comunicados */}
                <button type="button" className={formStyles['cv-btn-voltar']} onClick={back}>
                    &larr; Voltar
                </button>
            </div>

            {/* Div que vai exibir os dados do comunicado */}
            <div className={cardStyles['cm-card']}>

                {/* Cabeçalho do card com o título do comunicado e a data de criação */}
                <header className={cardStyles['cm-header']}>

                    <h2 className={cardStyles['cm-titulo']}>{evnio.comunicado?.titulo}</h2>

                    {/* Data de criação do comunicado no padrão brasileiro, protegida para não exibir data inválida */}
                    <span className={cardStyles['cm-data']}>
                        {
                            evnio.comunicado?.criado_em &&
                                new Intl.DateTimeFormat("pt-BR", {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                    timeZone: "America/Sao_Paulo"
                                }).format(new Date(evnio.comunicado?.criado_em))
                        }
                    </span>
                </header>

                {/* Descrição do comunicado */}
                <p className={cardStyles['cm-descricao']}>{evnio.comunicado?.descricao}</p>
            </div>

            {/* Div onde o morador irá cadastrar a sua pergunta, exibida somente quando não existe resposta e contra resposta */}
            {evnio.resposta == null && evnio.contra_resposta == null &&

                <div className={formStyles['cv-field']}>

                    <label htmlFor="perguntaComunicado">Sua pergunta</label>

                    {/* A ligação do textarea com o state que guarda a pergunta será feita depois */}
                    <textarea
                        id="perguntaComunicado"
                        className={campoStyles.inputDescription}
                        placeholder="Escreva aqui a sua pergunta sobre o comunicado..."
                        onChange={(e) => {setRespota(e.target.value)}}
                    />
                </div>
            }

            {/* Botão que cadastra a pergunta do morador */}
            {evnio.resposta == null && evnio.contra_resposta == null &&

                <div className={campoStyles.submitContainer}>

                    <button
                        type="button"
                        className={formStyles['cv-btn-salvar']}
                        onClick={cadastraResposta}
                    >
                        Cadastrar pergunta
                    </button>
                </div>
            }

            {/* Div com a pergunta e a resposta do síndico, exibida somente quando já existe uma pergunta */}
            {evnio.resposta != null &&

                <div className={cardStyles['cm-conversa']}>

                    {/* Pergunta feita pelo morador */}
                    <p className={cardStyles['cm-pergunta']}>
                        <strong>Sua pergunta:</strong> {evnio.resposta}
                    </p>

                    {/* Resposta enviada pelo síndico, exibida apenas se ela não for nula */}
                    {evnio.contra_resposta != null &&
                        <p className={cardStyles['cm-resposta']}>
                            <strong>Resposta do síndico:</strong> {evnio.contra_resposta}
                        </p>
                    }
                </div>
            }
        </div>
    );
}

//Exportando o componente
export default PaginaDetalhesComunicados