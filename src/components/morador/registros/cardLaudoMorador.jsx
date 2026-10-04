//Card que exibe um laudo do condominio para o morador

//Local das importações
import styles from '../../../css/cardRegistroMorador.module.css'

//Card reutilizável de laudo do morador
function CardLaudoMorador({ laudo }) {

    //Retorna o componente
    return (

        <div className={styles['cr-card']}>

            {/* Cabeçalho do card com o nome do laudo */}
            <header className={styles['cr-header']}>

                <h3 className={styles['cr-titulo']}>{laudo.laudo}</h3>
            </header>

            {/* Link que abre o documento do laudo em uma nova aba */}
            <a
                className={styles['cr-link']}
                href={laudo.caminho}
                target="_blank"
                rel="noopener noreferrer"
            >
                Abrir laudo
            </a>
        </div>
    )
}

//Exportando o componente para ser utilizado na tela de laudos
export default CardLaudoMorador