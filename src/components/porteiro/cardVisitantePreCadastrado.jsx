//Card que exibe um visitante pré cadastrado (autorizado, aguardando entrada)

//Local das importações
import styles from "../../css/paginainicialPorteiro.module.css"
import { registrarEntradaVisitante } from "../../service/Autorizacao"

//Função que devolve o texto quando o dado não existe na API
const ouSimbolo = (valor) => valor ?? '—'

//Card que exibe um visitante pré cadastrado
function CardVisitantePreCadastrado({ autorizacao, renderiza }){

    //Separa os dados que a API já devolve hoje para o porteiro
    //visitante, morador e a data da autorização vêm como relações do objeto
    const nomeVisitante = autorizacao.visitante?.nome
    const nomeMorador = autorizacao.morador?.nome
    const apartamento = autorizacao.visitante?.apartamento
    const dataAutorizacao = autorizacao.data

    //Função que registra a entrada do visitante
    const registrarEntrada = async () => {

        //Chama a função que libera a entrada na API
        const mensagem = await registrarEntradaVisitante(autorizacao.id)

        //Exibe a menssagem retornada
        alert(mensagem)

        //Remove o card da lista de pré cadastrados, já que o visitante deixou de esperar
        renderiza((atuais) => atuais.filter((item) => item.id !== autorizacao.id))
    }

    //Retorna o componente
    return (
        <div className={styles["card--item"]}>

            {/* Linha superior com o nome do visitante */}
            <div className={styles["card--top"]}>
                <span className={styles["text--name"]}>{ouSimbolo(nomeVisitante)}</span>
            </div>

            {/* Linha de informações: apartamento e morador responsável */}
            <div className={styles["card--info"]}>
                <span className={styles["text--block"]}>Apartamento: {ouSimbolo(apartamento)}</span>
                <span className={styles["text--date"]}>Morador: {ouSimbolo(nomeMorador)}</span>
            </div>

            {/* Linha de ação: data prevista e botão de entrada */}
            <div className={styles["card--active"]}>
                <div className={styles["info--group"]}>
                    <span className={styles["text--block"]}>Autorizado em: {ouSimbolo(dataAutorizacao)}</span>
                </div>

                <button className={styles["btn--exit"]} onClick={registrarEntrada}>
                    Registrar entrada
                </button>
            </div>

        </div>
    )
}

//Exportando o compomente para ser utilizado em outra página
export default CardVisitantePreCadastrado
