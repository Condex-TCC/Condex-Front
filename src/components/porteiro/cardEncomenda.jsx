//Card que exibe uma encomenda (pendente ou já retirada)

//Local das importações
import { useNavigate } from "react-router-dom"
import styles from "../../css/paginainicialPorteiro.module.css"
import { registrarRetiradaEncomenda } from "../../service/Encomenda"

//Função que devolve o texto quando o dado ainda não é devolvido pela API
const ouSimbolo = (valor) => valor ?? '—'

//Card que exibe uma encomenda
function CardEncomenda({ encomenda, atualizaLista }){

    //Hook que realiza a navegação
    const navigate = useNavigate()

    //Separa os dados que a API já devolve hoje
    //A API trata o campo "data" como a data da retirada, então a encomenda é
    //considerada pendente enquanto esse campo for nulo
    const destinatario = encomenda.nome
    const bloco = encomenda.bloco
    const apartamento = encomenda.apartamento
    const recebida = encomenda.recebida ?? encomenda.data_recebimento
    const descricao = encomenda.descricao
    const jaRetirada = encomenda.data != null

    //Função que abre a tela de registro de retirada
    const verDetalhe = () => {

        //Navega para a tela de retirada, passando a encomenda pelo estado da rota
        navigate("/porteiro/encomenda/show/" + encomenda.id, {
            state: { encomenda: encomenda }
        })
    }

    //Função que registra a retirada da encomenda
    const registrarRetirada = async (evento) => {

        //Impede que o clique também dispare a navegação para o detalhe
        evento.stopPropagation()

        //Chama a função que registra a retirada na API
        const resultado = await registrarRetiradaEncomenda(encomenda.id)

        //Exibe a menssagem retornada pela API (sucesso ou erro)
        alert(resultado.mensagem)

        //Busca a lista novamente no backend para a tela refletir o que foi salvo
        //Mesmo em caso de erro, pois a encomenda pode já ter sido retirada por outro porteiro
        atualizaLista()
    }

    //Retorna o componente
    return (
        //O card inteiro continua clicável para o mouse; o acesso por
        //teclado é o botão do título logo abaixo, que executa a MESMA
        //ação. A classe --clicavel só existe para o hover não prometer
        //clique em cards que não abrem nada (spec 5.5)
        <article
            className={`${styles["card--item"]} ${styles["card--item--clicavel"]}`}
            onClick={verDetalhe}
        >

            {/* Linha superior: destinatário (clicável, mesmo onClick do
                card) + pastilha de status da encomenda */}
            <div className={styles["card--top"]}>
                <button
                    type="button"
                    className={`${styles["text--name"]} ${styles["text--name--botao"]}`}
                    onClick={(evento) => {

                        //O clique já navega pelo próprio botão; parar a
                        //propagação evita disparar o onClick do card duas
                        // vezes e criar um histórico duplicado
                        evento.stopPropagation()
                        verDetalhe()
                    }}
                    aria-label={`Abrir a encomenda de ${destinatario ?? 'destinatário'}`}
                >
                    {ouSimbolo(destinatario)}
                </button>

                {/* Status derivado do próprio dado: segue pendente
                    enquanto a data de retirada for nula (cx-badge) */}
                <span className={`cx-badge ${jaRetirada ? 'cx-badge--success' : 'cx-badge--warning'} ${styles["badge--status"]}`}>
                    {jaRetirada ? 'Retirada' : 'Pendente'}
                </span>
            </div>

            {/* Linha de informações: bloco, apartamento e recebimento */}
            {/* A API não devolve esses campos (bloco e apartamento ficam dentro da descrição),
                então a linha só aparece quando algum deles existe */}
            {
                (bloco != null || apartamento != null || recebida != null) &&
                <div className={styles["card--info"]}>
                    <span className={styles["text--block"]}>
                        Bloco: {ouSimbolo(bloco)} · Apartamento: {ouSimbolo(apartamento)}
                    </span>
                    <span className={styles["text--date"]}>Recebida em: {ouSimbolo(recebida)}</span>
                </div>
            }

            {/* Linha de ação: descrição, dados da retirada e botão */}
            <div className={styles["card--active"]}>
                <div className={styles["info--group"]}>
                    {
                        descricao &&
                        <span className={styles["text--block"]}>{descricao}</span>
                    }

                    {
                        //Quem retirou e a data da retirada aparecem depois que a encomenda é retirada
                        jaRetirada &&
                        <>
                            {
                                //A API não informa quem retirou, então só mostra quando existir
                                encomenda.retirado_por != null &&
                                <span className={styles["text--date"]}>
                                    Retirado por: {encomenda.retirado_por}
                                </span>
                            }
                            <span className={styles["text--date"]}>Retirada em: {encomenda.data}</span>
                        </>
                    }
                </div>

                {
                    !jaRetirada &&
                    <button
                        type="button"
                        className={styles["btn--exit"]}
                        onClick={registrarRetirada}
                        aria-label={`Registrar retirada da encomenda de ${destinatario ?? 'destinatário'}`}
                    >
                        Registrar retirada
                    </button>
                }
            </div>

        </article>
    )
}

//Exportando o compomente para ser utilizado em outra página
export default CardEncomenda
