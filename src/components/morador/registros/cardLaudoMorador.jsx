//Card que exibe um laudo do condominio para o morador

//Local das importações
import styles from '../../../css/cardRegistroMorador.module.css'

//Card reutilizável de laudo do morador
function CardLaudoMorador({ laudo }) {

    //Retorna o componente
    return (

        <article className={styles['cr-card']}>

            {/* Cabeçalho do card com o ícone do laudo e o nome do laudo */}
            <header className={styles['cr-header']}>

                {/* Ícone decorativo: dá identidade ao card sem competir com o título */}
                <span className={styles['cr-icone']} aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"></path>
                        <path d="M14 3v5h5"></path>
                        <path d="M9 14l2 2 4-4"></path>
                    </svg>
                </span>

                <h3 className={styles['cr-titulo']}>{laudo.laudo}</h3>
            </header>

            {/* Link que abre o documento do laudo em uma nova aba.
                O texto visível é o mesmo; o ícone é decorativo e o
                destino (nova aba) já está no target/rel do âncora. */}
            <a
                className={styles['cr-link']}
                href={laudo.caminho}
                target="_blank"
                rel="noopener noreferrer"
            >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <path d="M15 3h6v6"></path>
                    <path d="M10 14L21 3"></path>
                </svg>
                Abrir laudo
            </a>
        </article>
    )
}

//Exportando o componente para ser utilizado na tela de laudos
export default CardLaudoMorador