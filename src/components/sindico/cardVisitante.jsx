//Card que exibe um visitante para o síndico

//Local das importações
import styles from "../../css/cardVisitante.module.css"

//Card reutilizável de visitante para o síndico
function CardVisitante({ visitante }) {

    //Retorna o componente
    return (
        <div className={styles['card--visitante']}>

            {/* Ícone do visitante em um círculo suave */}
            <span className={styles['icone--visitante']}>👤</span>

            {/* Nome e CPF do visitante */}
            <div className={styles['dados--visitante']}>
                <span className={styles['nome--visitante']}>{visitante.name}</span>
                <span className={styles['cpf--visitante']}>
                    {visitante.cpf?.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")}
                </span>
            </div>

        </div>
    )
}

//Exportando o componente para ser utilizado nas telas de visitantes do síndico
export default CardVisitante
