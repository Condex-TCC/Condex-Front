//Card que exibe uma regra do condominio para o morador

//Local das importações
import styles from '../../../css/cardRegistroMorador.module.css'

//Card reutilizável de regra do morador
function CardRegraMorador({ regra }) {

    //Retorna o componente
    return (

        <div className={styles['cr-card']}>

            {/* Cabeçalho do card com o nome da regra */}
            <header className={styles['cr-header']}>

                <h3 className={styles['cr-titulo']}>{regra.regra}</h3>
            </header>

            {/* Descrição da regra */}
            <p className={styles['cr-descricao']}>{regra.descricao}</p>
        </div>
    )
}

//Exportando o componente para ser utilizado na tela de regras
export default CardRegraMorador