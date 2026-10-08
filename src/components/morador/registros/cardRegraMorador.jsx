//Card que exibe uma regra do condominio para o morador

//Local das importações
import styles from '../../../css/cardRegistroMorador.module.css'

//Card reutilizável de regra do morador
function CardRegraMorador({ regra }) {

    //Retorna o componente
    return (

        <article className={styles['cr-card']}>

            {/* Cabeçalho do card com o ícone da regra e o nome da regra */}
            <header className={styles['cr-header']}>

                {/* Ícone decorativo: dá identidade ao card sem competir com o título */}
                <span className={styles['cr-icone']} aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16v16H4z"></path>
                        <path d="M8 9h8"></path>
                        <path d="M8 13h8"></path>
                        <path d="M8 17h5"></path>
                    </svg>
                </span>

                <h3 className={styles['cr-titulo']}>{regra.regra}</h3>
            </header>

            {/* Descrição da regra */}
            <p className={styles['cr-descricao']}>{regra.descricao}</p>
        </article>
    )
}

//Exportando o componente para ser utilizado na tela de regras
export default CardRegraMorador