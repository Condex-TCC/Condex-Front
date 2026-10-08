//Card que exibe um visitante cadastrado na API (por um morador ou pelo próprio porteiro)

//Local das importações
import styles from "../../css/paginainicialPorteiro.module.css"

//Função que devolve o texto quando o dado não existe na API
const ouSimbolo = (valor) => valor ?? '—'

//Card que exibe um visitante cadastrado
function CardVisitanteCadastrado({ visitante }){

    //Texto de quem cadastrou, de acordo com a regra da API
    //employee_id nulo = morador | employee_id preenchido = porteiro
    const origem = visitante.cadastradoPor === 'porteiro'
        ? 'Cadastrado pelo porteiro'
        : 'Cadastrado pelo morador'

    //Retorna o componente
    return (
        <article className={styles["card--item"]}>

            {/* Linha superior: nome do visitante + pastilha de origem
                (cx-badge compartilha o visual das outras telas) */}
            <div className={styles["card--top"]}>
                <span className={styles["text--name"]}>{ouSimbolo(visitante.nome)}</span>
                <span className={`cx-badge cx-badge--info ${styles["badge--origem"]}`}>{origem}</span>
            </div>

            {/* Linha de informações: CPF e morador responsável */}
            {/* A API devolve apenas o id do morador, e o porteiro não tem
                nenhum endpoint para consultar o nome dele */}
            <div className={styles["card--info"]}>
                <span className={styles["text--block"]}>CPF: {ouSimbolo(visitante.cpf)}</span>
                <span className={styles["text--date"]}>Morador (ID): {ouSimbolo(visitante.moradorId)}</span>
            </div>

        </article>
    )
}

//Exportando o compomente para ser utilizado em outra página
export default CardVisitanteCadastrado
