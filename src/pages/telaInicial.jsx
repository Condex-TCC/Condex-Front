import { Link } from 'react-router-dom';
import MarcaCondex from '../components/marca/marcaCondex';
import styles from "../css/loginLayout.module.css" //Importando o CSS para trabalhar com módulos

//Tela inicial (apresentação)

//Função que cria a página inicial do programa.
//Esta é a primeira tela do CONDEX: ela apenas apresenta a marca e leva o
//usuário para o login. Nenhuma regra de negócio vive aqui — o único
//comportamento é a navegação para /login.
function PaginaInical(){

    //Retorna um componente
    return(

        <section className={styles["tela-inicial"]}>

            {/* Conteúdo central da apresentação.
                Os blocos entram em cascata via CSS (nth-child), por isso
                a ordem abaixo também é a ordem da animação de entrada. */}
            <div className={styles["tela-inicial__conteudo"]}>

                {/* Selo que situa o visitante antes de ler o nome */}
                <span className={styles["selo-entrada"]}>Gestão condominial</span>

                {/* Marca CONDEX em tamanho de destaque (ícone acima do nome) */}
                <h1 className={styles["marca-apresentacao"]}>
                    <MarcaCondex escuro vertical />
                </h1>

                {/* Frase institucional */}
                <p className={styles["subtitulo-apresentacao"]}>
                    Sistema de administração de condomínios
                </p>

                {/* Filete em degradê separando título e assinatura */}
                <span className={styles["regua-apresentacao"]} aria-hidden="true"></span>

                {/* Assinatura da marca */}
                <p className={styles["assinatura-apresentacao"]}>Comunicação que conecta</p>

                {/* Chamada principal: único link desta tela, leva ao login */}
                <Link to="/login" className={`${styles['btn-login']} ${styles['btn-inicial']}`}>
                    Acessar sistema
                    <span className={styles['seta-botao']} aria-hidden="true">→</span>
                </Link>

                {/* Perfis atendidos pelo sistema, apenas informativo */}
                <p className={styles["perfis-entrada"]}>Síndico · Morador · Porteiro</p>
            </div>
        </section>
    )
}

//Exportando a tela
export default PaginaInical
