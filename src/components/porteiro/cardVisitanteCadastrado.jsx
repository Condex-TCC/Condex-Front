//Card que exibe um visitante cadastrado na API (por um morador ou pelo próprio porteiro)

//Local das importações
import styles from "../../css/paginainicialPorteiro.module.css"

//Função que devolve o texto quando o dado não existe na API
const ouSimbolo = (valor) => valor ?? '-'

//Card que exibe um visitante cadastrado
function CardVisitanteCadastrado({ visitante, aoRegistrarEntrada }){

    //Texto de quem cadastrou, de acordo com a regra da API
    //employee_id nulo = morador | employee_id preenchido = porteiro
    const origem = visitante.cadastradoPor === 'porteiro'
        ? 'Cadastrado pelo porteiro'
        : 'Cadastrado pelo morador'

    //Retorna o componente
    return (
        <div className={styles["card--item"]}>

            {/* Linha superior com o nome do visitante */}
            <div className={styles["card--top"]}>
                <span className={styles["text--name"]}>{ouSimbolo(visitante.nome)}</span>
                <span className={styles["badge--origem"]}>{origem}</span>
            </div>

            {/* Linha de informações e ação: CPF, morador responsável e entrada */}
            <div className={styles["card--active"]}>
                <div className={styles["info--group"]}>
                    <span className={styles["text--block"]}>CPF: {ouSimbolo(visitante.cpf)}</span>
                    <span className={styles["text--date"]}>Morador (ID): {ouSimbolo(visitante.moradorId)}</span>
                </div>

                {/* A API registra a entrada pelo id do visitante */}
                {
                    aoRegistrarEntrada &&
                    <button
                        className={styles["btn--exit"]}
                        onClick={() => aoRegistrarEntrada(visitante)}
                    >
                        Registrar entrada
                    </button>
                }
            </div>

        </div>
    )
}

//Exportando o componente para ser utilizado em outra página
export default CardVisitanteCadastrado
