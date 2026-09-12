//Componente que gera cada linha da lista de encomendas (pendentes e retiradas)
//na tela inicial do porteiro.
//
//OBS IMPORTANTE: o protótipo mostra "Destinatário", "Bloco/Apto" e "Retirado por"
//como campos próprios, mas a tabela de encomendas na API só tem nome, descrição,
//porteiro responsável e data de retirada — sem vínculo com morador/bloco/apartamento
//nem campo para registrar quem retirou. Como não alteramos o back-end, o campo
//"nome" é usado como "Destinatário" e "descrição" fica livre para anotar bloco/apto,
//e a retirada é confirmada sem pedir o nome de quem retirou (a API não aceita isso).
//
//Reaproveita as mesmas classes .card--item/.card--top/.card--bottom usadas no
//card de visitante pré-cadastrado, para manter a mesma linguagem visual.

import { useNavigate } from "react-router-dom"
import styles from "../../css/paginainicialPorteiro.module.css"
import { formatarDataHora } from "../../service/formatadores"

function CardEncomenda({ encomenda }) {

    const navigate = useNavigate()

    const jaFoiRetirada = Boolean(encomenda.data_retirada)

    //A API não devolve a data de criação da encomenda no recurso (EncomendaResources),
    //por isso essa data só aparece quando a informação realmente existir.
    const dataRetirada = formatarDataHora(encomenda.data_retirada)
    const dataRecebimento = formatarDataHora(encomenda.created_at)

    return (
        <div className={styles["card--item"]}>

            <div className={styles["card--top"]}>
                <span className={styles["text--name"]}>Destinatário: {encomenda.nome}</span>

                {jaFoiRetirada && dataRetirada && (
                    <span className={styles["text--date"]}>Retirada em: {dataRetirada}</span>
                )}

                {!jaFoiRetirada && dataRecebimento && (
                    <span className={styles["text--date"]}>Recebida em: {dataRecebimento}</span>
                )}
            </div>

            <div className={styles["card--bottom"]}>
                <span className={styles["text--block"]}>{encomenda.descricao}</span>

                {/* Só mostra o botão de retirada para encomendas ainda pendentes */}
                {!jaFoiRetirada && (
                    <button
                        type="button"
                        className={styles["btn--exit"]}
                        onClick={() => navigate(`/porteiro/Encomenda/${encomenda.id}/retirada`, { state: { encomenda } })}
                    >
                        Registrar Retirada
                    </button>
                )}
            </div>

        </div>
    )
}

export default CardEncomenda
