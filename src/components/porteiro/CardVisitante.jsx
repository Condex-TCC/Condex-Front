//Componente que gera cada linha da lista de visitantes (pré-cadastrados e ativos)
//na tela inicial do porteiro.
//
//OBS IMPORTANTE: o protótipo mostra "bloco A - 27" e "Apartamento de Amanda Martins"
//em cada linha, mas o endpoint de autorização (GET /porteiro/autorizacao/authorized)
//só devolve o nome do morador, sem bloco/apartamento/unidade. Como não alteramos o
//back-end, aqui exibimos o que a API realmente entrega: o nome do morador responsável
//pela visita, no lugar do bloco/apartamento.
//
//Reaproveita as classes .card--item/.card--top/.card--bottom (visitante pré-cadastrado)
//e .card--active/.info--group (visitante ativo) que já existiam no CSS do projeto,
//mas nunca tinham sido usadas em nenhum componente.

import styles from "../../css/paginainicialPorteiro.module.css"
import { formatarDataHora } from "../../service/formatadores"

function CardVisitante({ autorizacao, tipo, aoLiberarEntrada, aoRegistrarSaida, carregando }) {

    //Nome do visitante e do morador que autorizou, com um texto de reserva
    //para o caso (raro) da API não trazer o relacionamento carregado
    const nomeVisitante = autorizacao.visitante?.nome || "Visitante sem nome"
    const nomeMorador = autorizacao.morador?.nome || "morador não identificado"

    //Card do visitante ATIVO (já teve a entrada liberada) — layout lado a lado com botão de saída
    if (tipo === "ativo") {

        const dataEntrada = formatarDataHora(autorizacao.entrada_em)

        return (
            <div className={styles["card--active"]}>

                <div className={styles["info--group"]}>
                    <span className={styles["text--name"]}>{nomeVisitante}</span>
                    <span className={styles["text--block"]}>
                        Autorizado por {nomeMorador}
                        {dataEntrada ? ` · entrou às ${dataEntrada}` : ""}
                    </span>
                </div>

                <button
                    type="button"
                    className={styles["btn--exit"]}
                    onClick={() => aoRegistrarSaida(autorizacao.id)}
                    disabled={carregando}
                >
                    {carregando ? "Registrando..." : "registrar saída"}
                </button>

            </div>
        )
    }

    //Card do visitante PRÉ-CADASTRADO (aguardando a liberação de entrada)
    const dataAutorizacao = formatarDataHora(autorizacao.data_autorizacao)

    return (
        <div className={styles["card--item"]}>

            <div className={styles["card--top"]}>
                <span className={styles["text--name"]}>{nomeVisitante}</span>
                {dataAutorizacao && <span className={styles["text--date"]}>Previsto para {dataAutorizacao}</span>}
            </div>

            <div className={styles["card--bottom"]}>
                <span className={styles["text--block"]}>Autorizado por {nomeMorador}</span>

                <button
                    type="button"
                    className={styles["btn--exit"]}
                    onClick={() => aoLiberarEntrada(autorizacao.id)}
                    disabled={carregando}
                >
                    {carregando ? "Liberando..." : "liberar entrada"}
                </button>
            </div>

        </div>
    )
}

export default CardVisitante
