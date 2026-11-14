//Card que exibe um visitante cadastrado na API (nome e CPF)

//Local das importações
import styles from "../../css/paginainicialPorteiro.module.css"

//Função que devolve o texto quando o dado não existe na API
const ouSimbolo = (valor) => valor ?? '-'

//Card que exibe um visitante cadastrado
function CardVisitanteCadastrado({ visitante, aoRegistrarEntrada }){

    //Retorna o componente
    return (
        <article className={styles["card--item"]}>

            {/* Linha superior: nome do visitante + pastilha de origem
                (cx-badge compartilha o visual das outras telas) */}
            <div className={styles["card--top"]}>
                <span className={styles["text--name"]}>{ouSimbolo(visitante.nome)}</span>
            </div>

            {/* Linha de informações e ação: CPF, entrada */}
            <div className={styles["card--active"]}>
                <div className={styles["info--group"]}>
                    <span className={styles["text--block"]}>CPF: {ouSimbolo(visitante.cpf)}</span>
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

        </article>
    )
}

//Exportando o componente para ser utilizado em outra página
export default CardVisitanteCadastrado
