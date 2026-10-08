//Importações do arquivo

import { useLocation, useNavigate, useParams } from "react-router-dom";
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

    //Hook que realiza a navegação para outra tela
    const navigate = useNavigate()

    //Hook que vai pegar os dados passados pela requisição
    const location = useLocation()

    //Variavel que será utilizada para realizar o redirecionamento
    const redirecionamento = location.state?.redirecionamento || '/morador/comunicados/exibe';

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

        //Realiza a navegação para a ultima tela que o usuário utilizou
        navigate(redirecionamento)
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

            {/* Cabeçalho da página: contexto, título concreto, linha de apoio e
                a ação da tela (voltar) no canto superior direito.
                A classe global garante a mesma hierarquia das demais telas;
                dc-header mantém a composição específica deste módulo. */}
            <header className={`cx-page-header ${styles['dc-header']}`}>

                <div>
                    <p className="cx-overline">Comunicação</p>
                    <h2 className="cx-page-title">Detalhes do comunicado</h2>
                    <p className="cx-page-subtitle">Leia a mensagem da administração e responda caso tenha dúvidas.</p>
                </div>

                {/* Botão que retorna para a tela de comunicados */}
                <button type="button" className={formStyles['cv-btn-voltar']} onClick={back}>
                    &larr; Voltar
                </button>
            </header>

            {/* Bloco 1 — dados do comunicado: título, metadados rotulados
                (remetente e data) e a mensagem, com respiro uniforme. */}
            <section className={cardStyles['cm-card']}>

                {/* Título do comunicado */}
                <header className={cardStyles['cm-header']}>
                    <h3 className={cardStyles['cm-titulo']}>{evnio.comunicado?.titulo}</h3>
                </header>

                {/* Metadados em pares rótulo/valor (mesmo padrão das tabelas) */}
                <div className={cardStyles['cm-meta']}>

                    <div className={cardStyles['cm-meta__item']}>
                        <p className="cx-overline">Remetente</p>
                        <p className={cardStyles['cm-meta__valor']}>Administração do condomínio</p>
                    </div>

                    <div className={cardStyles['cm-meta__item']}>
                        <p className="cx-overline">Publicado em</p>

                        {/* Data de criação no padrão brasileiro, protegida para
                            não exibir data inválida enquanto a tela carrega */}
                        <p className={cardStyles['cm-meta__valor']}>
                            {
                                evnio.comunicado?.criado_em &&
                                    new Intl.DateTimeFormat("pt-BR", {
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "numeric",
                                        timeZone: "America/Sao_Paulo"
                                    }).format(new Date(evnio.comunicado?.criado_em))
                            }
                        </p>
                    </div>
                </div>

                {/* Bloco rotulado da mensagem */}
                <div className={cardStyles['cm-bloco']}>
                    <p className="cx-overline">Mensagem</p>
                    <p className={cardStyles['cm-descricao']}>{evnio.comunicado?.descricao}</p>
                </div>
            </section>

            {/* Bloco 2 — formulário de pergunta, exibido somente quando não
                existe resposta e contra resposta. Campos, nomes e handlers
                permanecem exatamente os mesmos; só ganharam uma superfície. */}
            {evnio.resposta == null && evnio.contra_resposta == null &&

                <section className={cardStyles['cm-secao']}>

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

                    {/* Botão que cadastra a pergunta do morador */}
                    <div className={campoStyles.submitContainer}>

                        <button
                            type="button"
                            className={formStyles['cv-btn-salvar']}
                            onClick={cadastraResposta}
                        >
                            Cadastrar pergunta
                        </button>
                    </div>
                </section>
            }

            {/* Bloco 3 — respostas: pergunta do morador e eventual resposta do
                síndico, agrupadas sob um rótulo único com a mesma respiração
                dos demais blocos da tela. */}
            {evnio.resposta != null &&

                <section className={cardStyles['cm-secao']}>

                    <p className="cx-overline">Respostas</p>

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
                </section>
            }
        </div>
    );
}

//Exportando o componente
export default PaginaDetalhesComunicados