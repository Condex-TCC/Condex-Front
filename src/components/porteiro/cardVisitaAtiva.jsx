//Card que exibe um visitante que está dentro do condomínio (visita sem saída)

//Local das importações
import styles from "../../css/paginainicialPorteiro.module.css"

//Função que devolve o texto quando o dado não existe na API
const ouSimbolo = (valor) => valor ?? '-'

//Formata a data/hora devolvida pela API para exibição
function formatarDataHora(valor) {

    if (!valor) return '-'

    const data = new Date(valor)

    //Se a data não for válida, mostra o valor original
    if (isNaN(data.getTime())) return valor

    return data.toLocaleString('pt-BR')
}

//Card que exibe uma visita ativa
function CardVisitaAtiva({ visita, aoRegistrarSaida }){

    //Retorna o componente
    return (
        <div className={styles["card--item"]}>

            {/* Linha superior com o nome do visitante */}
            <div className={styles["card--top"]}>
                <span className={styles["text--name"]}>{ouSimbolo(visita.nomeVisitante)}</span>
                <span className={styles["badge--origem"]}>No condomínio</span>
            </div>

            {/* Linha de informações e ação: CPF, entrada e saída */}
            <div className={styles["card--active"]}>
                <div className={styles["info--group"]}>
                    <span className={styles["text--block"]}>CPF: {ouSimbolo(visita.cpfVisitante)}</span>
                    <span className={styles["text--date"]}>Entrada: {formatarDataHora(visita.entrada)}</span>
                </div>

                {/* A API registra a saída pelo id do visitante */}
                <button
                    className={styles["btn--exit"]}
                    onClick={() => aoRegistrarSaida(visita)}
                >
                    Registrar saída
                </button>
            </div>

        </div>
    )
}

//Exportando o componente para ser utilizado em outra página
export default CardVisitaAtiva
