//Tela provisória para as seções do morador que ainda não foram implementadas

//Local das importações
import styles from '../../css/telaVisitantesMorador.module.css'

//Função que cria a tela de aviso
function TelaEmBreveMorador({ titulo, descricao }){

    //Retorna o componente
    return (

        <div className={styles['vm-container']}>

            {/* Cabeçalho da tela: overline fixo de contexto acima do título,
                mesma hierarquia overline > título > subtítulo das outras
                telas do morador. O texto é genérico de propósito porque o
                componente atende Início, Reservas e Mensagens. */}
            <div className={styles['vm-page-header']}>
                <p className="cx-overline">Painel do condomínio</p>
                <h1 className={styles['vm-page-title']}>{titulo}</h1>
                <p className={styles['vm-page-subtitle']}>{descricao}</p>
            </div>

            {/* Aviso de funcionalidade em desenvolvimento: bloco
                centralizado com ícone, sem mudar a mensagem */}
            <div className={styles['vm-em-breve']} role="status">
                <span className={styles['vm-em-breve__icone']} aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                    </svg>
                </span>

                <p className={styles['vm-em-breve__texto']}>Tela em desenvolvimento</p>

                {/* Linha de apoio em estilo secundário: diz o que esperar
                    sem tirar o foco do título do cartão */}
                <p className={styles['vm-em-breve__apoio']}>
                    Esta tela estará disponível em uma próxima versão do CONDEX.
                </p>
            </div>

        </div>
    )
}

//Exportando a tela para ser utilizada no roteador
export default TelaEmBreveMorador
