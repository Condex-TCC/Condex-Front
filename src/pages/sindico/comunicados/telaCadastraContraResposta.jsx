//Importações

import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { showEnvioDetalhe, updateEnvioContraResposta } from "../../../service/Comunicados";
import styles from "../../../css/paginaCadastraRegra.module.css";
import cardStyles from "../../../css/cardResposta.module.css";
import destaqueStyles from "../../../css/paginaCadastraContraResposta.module.css";

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

        // Container principal que engloba tudo
        <div className={styles.container}>

            {/* Cabeçalho com o título da tela e o botão de voltar */}
            <header className={styles.header}>

                <h1 className={styles.title}>Respondendo o morador</h1>

                {/* Botão que retorna para a tela anterior */}
                <button className={styles.backButton} onClick={back}>
                    &larr; Voltar
                </button>
            </header>

            {/* Bloco com as informações do comunicado */}
            <div className={cardStyles.card}>

                {/* Cabeçalho do bloco com o título do comunicado e a data de criação */}
                <header className={cardStyles.header}>

                    <h2 className={cardStyles.titulo}>{comunicado.titulo}</h2>

                    {/* Data de criação formatada no padrão brasileiro */}
                    <span className={cardStyles.unidade}>
                        {
                            comunicado.criado_em ?
                                new Intl.DateTimeFormat("pt-BR", {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                    timeZone: "America/Sao_Paulo"
                                }).format(new Date(comunicado.criado_em)) : ""
                        }
                    </span>
                </header>

                {/* Descrição do comunicado */}
                <div className={cardStyles.contexto}>

                    <p className={cardStyles.contextoItem}><strong>Descrição:</strong> {comunicado.descricao}</p>
                </div>
            </div>

            {/* Bloco com os dados do morador */}
            <div className={cardStyles.card}>

                {/* Cabeçalho do bloco com o nome do morador e a unidade */}
                <header className={cardStyles.header}>

                    <h2 className={cardStyles.titulo}>{morador.nome}</h2>

                    <span className={cardStyles.unidade}>
                        {morador.unidade?.bloco} - Apto {morador.unidade?.numero}
                    </span>
                </header>

                {/* Contato do morador */}
                <div className={cardStyles.contexto}>

                    <p className={cardStyles.contextoItem}><strong>Telefone:</strong> {morador.telefone}</p>

                    <p className={cardStyles.contextoItem}><strong>E-mail:</strong> {morador.email}</p>
                </div>
            </div>

            {/* Bloco em destaque com a pergunta do morador */}
            <div className={destaqueStyles.perguntaDestaque}>

                <span className={destaqueStyles.rotulo}>Pergunta do morador</span>

                <p className={destaqueStyles.perguntaTexto}>{respostaMorador}</p>
            </div>

            {/* Bloco com o campo onde o síndico escreve a resposta */}
            <div className={destaqueStyles.campoResposta}>

                <label className={destaqueStyles.rotulo} htmlFor="respostaSindico">Sua resposta</label>

                <textarea
                    id="respostaSindico"
                    className={styles.inputDescription}
                    placeholder="Escreva aqui a resposta para o morador..."
                    value={constraResposta}
                    onChange={(evento) => setContraResposta(evento.target.value)}
                />
            </div>

            {/* Botão verde de cadastro da resposta, centralizado na tela */}
            <div className={styles.actionsContainer}>

                <button
                    type="button"
                    className={styles.buttonAprovar}
                    onClick={CadastraContraResposta}
                >
                    Cadastrar resposta
                </button>
            </div>
        </div>
    )
}

//Exporta o componente para poder ser utilizado em outros arquivos
export default PaginaCadastraContraResposta