//Tela provisória para as seções do morador que ainda não foram implementadas

//Local das importações
import styles from '../../css/telaVisitantesMorador.module.css'

//Função que cria a tela de aviso
function TelaEmBreveMorador({ titulo, descricao }){

    //Retorna o componente
    return (

        <div className={styles['vm-container']}>

            {/* Cabeçalho da tela */}
            <div className={styles['vm-page-header']}>
                <h1 className={styles['vm-page-title']}>{titulo}</h1>
                <p className={styles['vm-page-subtitle']}>{descricao}</p>
            </div>

            {/* Aviso de functionality em desenvolvimento */}
            <p className={styles['vm-empty']}>Tela em desenvolvimento</p>

        </div>
    )
}

//Exportando a tela para ser utilizada no roteador
export default TelaEmBreveMorador
