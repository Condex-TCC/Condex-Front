//Card que exibe um morador para o porteiro selecionar na visita

//Local das importações
import { useNavigate } from "react-router-dom"
import styles from "../../css/cardMoradorPorteiro.module.css"

//Função que cria o card do morador
function CardMoradorPorteiro({ morador, id, nome, idMorador }){

    //Hook que realiza a navegação
    const navigate = useNavigate()

    //Função que navega para a página de cadastrar visita
    const cadastraVisita = (id, nome, idMorador) => {

        //Realiza a navegação
        navigate("/porteiro/visitas/create", {
            state: {
                id_visitante: id,
                nome_visitante: nome,
                id_morador: idMorador,
            }
        })
    }

    //Retorna o componente
    return (
        <div className={styles['card--morador']} onClick={() => cadastraVisita(id, nome, idMorador)}>

            {/* Cabeçalho do card com o nome do morador e a unidade */}
            <div className={styles['cabecalho--morador']}>

                <h2 className={styles['nome--morador']}>{morador?.nome ?? "-"}</h2>

                <span className={styles['unidade--morador']}>
                    {morador?.unidade?.bloco ?? "-"} - Apto {morador?.unidade?.numero ?? "-"}
                </span>

            </div>

            {/* Bloco com os dados de contato do morador */}
            <div className={styles['dados--morador']}>

                {/* Telefone do morador */}
                <div className={styles['linha--dado']}>
                    <span className={styles['rotulo--dado']}>Telefone</span>
                    <span className={styles['valor--dado']}>{morador?.telefone ?? "-"}</span>
                </div>

                {/* E-mail do morador */}
                <div className={styles['linha--dado']}>
                    <span className={styles['rotulo--dado']}>E-mail</span>
                    <span className={styles['valor--dado']}>{morador?.email ?? "-"}</span>
                </div>

            </div>

        </div>
    )
}

//Exportando o componente
export default CardMoradorPorteiro
