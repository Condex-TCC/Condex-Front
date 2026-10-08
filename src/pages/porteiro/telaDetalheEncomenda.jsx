//Tela de registro de retirada de encomenda do porteiro

//Local das importações
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { registrarRetiradaEncomenda } from '../../service/Encomenda'
import styles from '../../css/formularioPorteiro.module.css'

//Função que devolve o texto quando o dado ainda não é devolvido pela API
const ouSimbolo = (valor) => valor ?? '—'

//Tela responsável por registrar a retirada de uma encomenda
export default function PaginaDetalheEncomenda() {

    //Hook que realiza a navegação
    const navigate = useNavigate()

    //Hook que pega os parametros da url
    const { id } = useParams()

    //Hook que pega o estado passado na navegação
    const { state } = useLocation()

    //A encomenda chega pelo estado da navegação quando o porteiro clica no card
    const encomenda = state?.encomenda

    //Função responsavel por voltar para a tela inicial do porteiro
    const back = () => {

        //Navega para a tela inicial do porteiro
        navigate("/porteiro")
    }

    //Função que registra a retirada da encomenda
    const retirar = async () => {

        //Chama a função que registra a retirada na API
        const resultado = await registrarRetiradaEncomenda(encomenda?.id ?? id)

        //Exibe a menssagem retornada pela API (sucesso ou erro)
        alert(resultado.mensagem)

        //Volta para a tela inicial do porteiro, que recarrega os dados
        navigate("/porteiro")
    }

    //Caso a tela seja acessada direto pela url, não há encomenda para exibir
    if(!encomenda){

        return (
            <div className={styles['fp-container']}>

                <main className={styles['fp-main']}>

                    <div className={styles['fp-header']}>
                        <button type="button" className={styles['fp-btn-voltar']} onClick={back}>
                            &larr; voltar
                        </button>

                        {/* Contexto + ação concreta, mesmo padrão das outras telas do porteiro */}
                        <div className={styles['fp-header__texto']}>
                            <p className="cx-overline">Encomendas</p>
                            <h1 className={styles['fp-titulo']}>Registrar retirada</h1>
                        </div>
                    </div>

                    <p className={styles['fp-subtitulo']}>
                        Não foi possível carregar os dados dessa encomenda. Volte para a lista
                        e abra a encomenda novamente.
                    </p>

                </main>

            </div>
        )
    }

    return (
        <div className={styles['fp-container']}>

            <main className={styles['fp-main']}>

                {/* Linha superior com o botão voltar e a identificação da tela */}
                <div className={styles['fp-header']}>
                    <button type="button" className={styles['fp-btn-voltar']} onClick={back}>
                        &larr; voltar
                    </button>

                    {/* Contexto + ação concreta + apoio (padrão cx-page-header) */}
                    <div className={styles['fp-header__texto']}>
                        <p className="cx-overline">Encomendas</p>
                        <h1 className={styles['fp-titulo']}>Registrar retirada</h1>
                        <p className={styles['fp-lead']}>
                            Confira os dados abaixo e confirme a entrega ao morador.
                        </p>
                    </div>
                </div>

                {/* Resumo da encomenda que está sendo retirada */}
                <div className={styles['fp-resumo']}>
                    <h2 className={styles['fp-resumo-titulo']}>Dados da encomenda</h2>

                    <div className={styles['fp-resumo-linha']}>
                        <span>Destinatário</span>
                        <span>{ouSimbolo(encomenda.nome)}</span>
                    </div>

                    {/* A API guarda bloco, apartamento e data de recebimento dentro
                        do campo "descricao", sem colunas separadas */}
                    <div className={styles['fp-resumo-linha']}>
                        <span>Descrição</span>
                        <span>{ouSimbolo(encomenda.descricao)}</span>
                    </div>

                    <div className={styles['fp-resumo-linha']}>
                        <span>Retirada</span>
                        <span>{ouSimbolo(encomenda.data)}</span>
                    </div>
                </div>

                <p className={styles['fp-subtitulo']}>
                    Ao confirmar, a data e a hora da retirada são registradas
                    automaticamente pelo servidor.
                </p>

                {/* Botão de confirmar a retirada (rótulo acessível mais
                    descritivo que o texto visual "SALVAR") */}
                <div className={`${styles['fp-area-salvar']} ${styles['fp-celula--larga']}`}>
                    <button
                        type="button"
                        className={styles['fp-btn-salvar']}
                        onClick={retirar}
                        aria-label="Confirmar retirada da encomenda"
                    >
                        SALVAR
                    </button>
                </div>

            </main>

        </div>
    );
}
