//Local das importações
import { useNavigate } from "react-router-dom"
import styles from "../../css/paginainicialPorteiro.module.css"
import { registrarRetiradaEncomenda } from "../../service/Encomenda"

//Card que exibe uma encomenda (pendente ou já retirada)

//Função que cria o componente do card
function CardEncomenda({ encomenda, renderiza }){

    //Hook que realiza a navegação
    const navigate = useNavigate()

    //Verifica se a encomenda já foi retirada
    const jaRetirada = encomenda.data != null

    //Função que abre a tela de detalhe da encomenda
    const verDetalhe = () => {

        //Navega para a tela de detalhe, passando a encomenda pelo estado da rota
        navigate("/porteiro/encomenda/show/" + encomenda.id, {
            state: { encomenda: encomenda }
        })
    }

    //Função que registra a retirada diretamente pela lista
    const retirar = async (evento) => {

        //Impede que o clique também dispare a navegação para o detalhe
        evento.stopPropagation()

        //Chama a função que registra a retirada na API
        let message = await registrarRetiradaEncomenda(encomenda.id)

        //Exibe a menssagem retornada
        alert(message)

        //Atualiza a lista de encomendas
        renderiza((atuais) => atuais.map((item) =>
            item.id === encomenda.id ? { ...item, data: new Date().toISOString() } : item
        ))
    }

    //Retorna o componente
    return (
        <div className={styles["card--item"]} onClick={verDetalhe}>

            <div className={styles["card--top"]}>
                <span className={styles["text--name"]}>{encomenda.nome}</span>
            </div>

            <div className={styles["card--active"]}>
                <div className={styles["info--group"]}>
                    <span className={styles["text--block"]}>{encomenda.descricao}</span>
                    {
                        jaRetirada &&
                        <span className={styles["text--date"]}>Retirada em: {encomenda.data}</span>
                    }
                </div>

                {
                    !jaRetirada &&
                    <button className={styles["btn--exit"]} onClick={retirar}>
                        Registrar retirada
                    </button>
                }
            </div>

        </div>
    )
}

//Exportando o compomente para ser utilizado em outra página
export default CardEncomenda
