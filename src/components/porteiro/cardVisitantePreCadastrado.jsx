//Local das importações
import styles from "../../css/paginainicialPorteiro.module.css"
import { registrarEntradaVisitante } from "../../service/Autorizacao"

//Card que exibe um visitante pré cadastrado (autorizado, aguardando entrada)

//Função que cria o componente do card
function CardVisitantePreCadastrado({ autorizacao, renderiza }){

    //Função que registra a entrada do visitante
    const registrarEntrada = async () => {

        //Chama a função que libera a entrada na API
        let message = await registrarEntradaVisitante(autorizacao.id)

        //Exibe a menssagem retornada
        alert(message)

        //Remove o card da lista de pré cadastrados
        renderiza((atuais) => atuais.filter((item) => item.id !== autorizacao.id))
    }

    //Retorna o componente
    return (
        <div className={styles["card--item"]}>

            <div className={styles["card--top"]}>
                <span className={styles["text--name"]}>{autorizacao.visitante?.nome}</span>
                <span className={styles["text--date"]}>Autorizado por {autorizacao.morador?.nome}</span>
            </div>

            <div className={styles["card--active"]}>
                <div className={styles["info--group"]}>
                    <span className={styles["text--block"]}>Autorizado em: {autorizacao.data}</span>
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
