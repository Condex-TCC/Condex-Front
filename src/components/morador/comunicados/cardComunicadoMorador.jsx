//Card que exibe um comunicado enviado para o morador

//Local das importações
import { useNavigate } from 'react-router-dom';
import styles from '../../../css/cardComunicadoMorador.module.css'

//Função auxiliar que converte a data do formato ISO para o padrão brasileiro (dd/mm/aaaa)
function formatarData(dataIso) {

    //Se não existir data, não tenta formatar
    if(!dataIso){

        return ""
    }

    //Formata a data utilizando o padrão brasileiro
    return new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        timeZone: "America/Sao_Paulo" //Corrige o fuso horário do usuário
    }).format(new Date(dataIso));
}

//Card reutilizável de comunicado do morador
function CardComunicadoMorador({ envio, back }) {

    //Hook que realiza a navegação
    const navigate = useNavigate()

    //Função que realiza a navegação para detalhes
    const detalhesComunicado = () => {

        //Realiza a navegação | Passando o redirecionamento
        navigate("/morador/comunicados/detalhes/" + envio.id, {
            state: {
                redirecionamento: back
            }
        })
    }

    //Retorna o componente
    return (

        // O card inteiro é um <button> com o MESMO onClick de antes:
        // agora a ação também é alcançável pelo teclado (Tab + Enter)
        // e recebe um nome acessível que descreve para onde ele leva.
        <button
            type="button"
            className={styles['cm-card']}
            onClick={detalhesComunicado}
            aria-label={`Abrir detalhes do comunicado: ${envio.comunicado?.titulo ?? ""}`}
        >

            {/* Cabeçalho do card com o título do comunicado e a data de criação */}
            <header className={styles['cm-header']}>

                <h3 className={styles['cm-titulo']}>{envio.comunicado?.titulo}</h3>

                <span className={styles['cm-data']}>{formatarData(envio.comunicado?.criado_em)}</span>
            </header>

            {/* Descrição do comunicado */}
            <p className={styles['cm-descricao']}>{envio.comunicado?.descricao}</p>

            {/* Etiqueta que informa se o morador já visualizou o comunicado.
                A aparência vem das classes globais cx-badge, para ter o mesmo
                significado de cor em todo o sistema (verde = positivo). */}
            <span className={`cx-badge ${envio.visualizado ? 'cx-badge--success' : 'cx-badge--neutral'} ${styles['cm-status']}`}>
                {envio.visualizado ? "Visualizado" : "Não visualizado"}
            </span>

            {/* Bloco com a pergunta do morador e a resposta do síndico */}
            <div className={styles['cm-conversa']}>

                {/* Exibe a pergunta do morador apenas se ela não for nula */}
                {envio.resposta &&
                    <p className={styles['cm-pergunta']}>
                        <strong>Sua pergunta:</strong> {envio.resposta}
                    </p>
                }

                {/* Exibe a resposta do síndico apenas se ela não for nula */}
                {envio.contra_resposta != null &&
                    <p className={styles['cm-resposta']}>
                        <strong>Resposta do síndico:</strong> {envio.contra_resposta}
                    </p>
                }
            </div>
        </button>
    )
}

//Exportando o componente para ser utilizado nas telas de comunicados
export default CardComunicadoMorador