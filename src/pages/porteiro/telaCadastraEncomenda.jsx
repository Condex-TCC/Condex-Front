//Tela de cadastro de encomenda do porteiro

//Local das importações
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { cadastrarEncomenda } from '../../service/Encomenda'
import { getMoradoresPorteiro, rotuloMorador } from '../../service/MoradorPorteiro'
import styles from '../../css/formularioPorteiro.module.css'

//Limite de caracteres do nome da encomenda
const LIMITE_NOME = 100

//Limite de caracteres da descrição, o mesmo exigido pela validação do backend
const LIMITE_DESCRICAO = 150

//Função que monta a descrição quando o porteiro não escreve nenhuma
//A API exige uma descrição, então ela é preenchida com os dados do morador destinatário
function descricaoPadrao(morador) {

    return `Morador: ${rotuloMorador(morador)}`.slice(0, LIMITE_DESCRICAO)
}

//Tela responsável por cadastrar a encomenda
export default function PaginaCadastraEncomenda() {

    //Hook que realiza a navegação
    const navigate = useNavigate()

    //States para controlar o valor de cada campo do formulário
    const [idMorador, setIdMorador] = useState('')
    const [nomeEncomenda, setNomeEncomenda] = useState('')
    const [descricao, setDescricao] = useState('')

    //Estados da lista de moradores usada no campo de seleção
    const [moradores, setMoradores] = useState([])
    const [carregandoMoradores, setCarregandoMoradores] = useState(true)
    const [erroMoradores, setErroMoradores] = useState('')

    //Estado que guarda o erro de validação de cada campo
    const [erros, setErros] = useState({})

    //Estado que desabilita o botão enquanto a gravação acontece
    const [salvando, setSalvando] = useState(false)

    //Função que busca os moradores para o porteiro selecionar o destinatário
    const buscarMoradores = async () => {

        const lista = await getMoradoresPorteiro()

        if(lista === null){

            setErroMoradores('Não foi possível carregar os moradores. Verifique se o servidor está no ar.')
        }
        else{

            setMoradores(lista)
        }

        setCarregandoMoradores(false)
    }

    //Busca os moradores assim que a tela é aberta
    useEffect(() => {

        Promise.resolve().then(() => buscarMoradores())
    }, [])

    //Função que reinicia o carregamento pelo botão "tentar novamente"
    const tentarNovamente = () => {

        setCarregandoMoradores(true)
        setErroMoradores('')
        buscarMoradores()
    }

    //Função que verifica os campos obrigatórios antes de enviar
    const validar = () => {

        const novosErros = {}

        //A API vincula a encomenda ao morador pelo id
        if(!idMorador){

            novosErros.idMorador = 'Selecione o morador destinatário.'
        }

        //O nome da encomenda identifica o pacote (ex.: Pacote do Mercado Livre)
        if(!nomeEncomenda.trim()){

            novosErros.nome = 'Informe o nome da encomenda.'
        }

        setErros(novosErros)

        return Object.keys(novosErros).length === 0
    }

    //Função responsavel por voltar para a tela anterior
    const back = () => {

        //Navega para a tela inicial do porteiro
        navigate("/porteiro")
    }

    //Função que cadastra a encomenda
    const salvar = async (evento) => {

        //Evita que a página recarregue ao enviar o formulário
        evento.preventDefault()

        //Interrompe o envio se algum campo obrigatório estiver vazio
        if(!validar()){

            return
        }

        //Desabilita o botão para não enviar duas vezes
        setSalvando(true)

        //Morador escolhido na lista
        const morador = moradores.find((m) => String(m.id) === String(idMorador))

        //Sem descrição digitada, usa os dados do morador
        const descricaoFinal = descricao.trim() || descricaoPadrao(morador)

        try{

            //Chama a função que cadastra a encomenda na API
            //O último parâmetro só é usado pelo mock
            const resultado = await cadastrarEncomenda(nomeEncomenda.trim(), descricaoFinal, Number(idMorador), {
                bloco: String(morador?.unidade?.bloco ?? ''),
                apartamento: String(morador?.unidade?.numero ?? '')
            })

            //Quando a API recusa o cadastro, a tela fica como está, exibindo o
            //motivo devolvido, para o porteiro corrigir e tentar de novo
            if(!resultado.sucesso){

                setErros({ submit: resultado.mensagem })

                return
            }

            //Volta para a tela inicial do porteiro, que recarrega os dados
            navigate("/porteiro")

            //Exibe a mensagem retornada depois da navegação
            alert(resultado.mensagem)
        }
        finally{

            //Libera o botão tanto no sucesso quanto no erro
            setSalvando(false)
        }
    }

    return (
        <div className={styles['fp-container']}>
            <main className={styles['fp-main']}>

                {/* Botão de retorno no canto e título logo abaixo */}
                <div className={styles['fp-header']}>
                    <button type="button" className={styles['fp-btn-voltar']} onClick={back}>
                        &larr; voltar
                    </button>
                    <h1 className={styles['fp-titulo']}>Cadastrar encomenda</h1>
                </div>

                {/* Formulário */}
                <form className={styles['fp-formulario']} onSubmit={salvar} noValidate>

                    {/* Campo do morador destinatário: a API vincula a encomenda pelo id do morador */}
                    <div className={styles['fp-campo']}>
                        <label className={styles['fp-label-visivel']} htmlFor="encomenda-morador">Morador destinatário</label>
                        <select
                            id="encomenda-morador"
                            className={`${styles['fp-input']} ${styles['fp-select']}`}
                            value={idMorador}
                            disabled={carregandoMoradores || erroMoradores !== ''}
                            onChange={(evento) => setIdMorador(evento.target.value)}
                        >
                            <option value="">
                                {
                                    carregandoMoradores
                                        ? 'Carregando moradores...'
                                        : (erroMoradores ? 'Não foi possível carregar os moradores' : 'Selecione o morador')
                                }
                            </option>

                            {
                                moradores.map((morador) => (
                                    <option key={morador.id} value={morador.id}>
                                        {rotuloMorador(morador)}
                                    </option>
                                ))
                            }
                        </select>

                        {
                            !carregandoMoradores && !erroMoradores && moradores.length === 0 &&
                            <span className={styles['fp-erro']}>
                                Nenhum morador cadastrado. Cadastre um morador antes de registrar a encomenda.
                            </span>
                        }

                        {
                            !carregandoMoradores && erroMoradores &&
                            <span className={styles['fp-erro']}>
                                {erroMoradores}{' '}
                                <button type="button" className={styles['fp-btn-retry']} onClick={tentarNovamente}>
                                    Tentar novamente
                                </button>
                            </span>
                        }

                        {erros.idMorador && <span className={styles['fp-erro']}>{erros.idMorador}</span>}
                    </div>

                    {/* Campo do nome da encomenda, que identifica o pacote */}
                    <div className={styles['fp-campo']}>
                        <label className={styles['fp-label-visivel']} htmlFor="encomenda-nome">Nome da encomenda</label>
                        <input
                            id="encomenda-nome"
                            className={`${styles['fp-input']} ${styles['fp-input--destinatario']}`}
                            type="text"
                            placeholder="Ex.: Pacote do Mercado Livre"
                            maxLength={LIMITE_NOME}
                            value={nomeEncomenda}
                            onChange={(evento) => setNomeEncomenda(evento.target.value)}
                        />
                        {erros.nome && <span className={styles['fp-erro']}>{erros.nome}</span>}
                    </div>

                    {/* Campo da descrição, opcional */}
                    <div className={styles['fp-campo']}>
                        <label className={styles['fp-label-visivel']} htmlFor="encomenda-descricao">Descrição (opcional)</label>
                        <input
                            id="encomenda-descricao"
                            className={`${styles['fp-input']} ${styles['fp-input--destinatario']}`}
                            type="text"
                            placeholder="Breve descrição da encomenda"
                            maxLength={LIMITE_DESCRICAO}
                            value={descricao}
                            onChange={(evento) => setDescricao(evento.target.value)}
                        />
                        <span className={styles['fp-subtitulo']}>
                            Se ficar em branco, são usados os dados do morador.
                        </span>
                    </div>

                    {/* Erro devolvido pela API ao salvar */}
                    {erros.submit && <span className={styles['fp-erro-envio']}>{erros.submit}</span>}

                    {/* Botão para salvar */}
                    <div className={styles['fp-area-salvar']}>
                        <button
                            type="submit"
                            className={styles['fp-btn-salvar']}
                            disabled={salvando || carregandoMoradores || erroMoradores !== ''}
                        >
                            {salvando ? 'Salvando...' : 'SALVAR'}
                        </button>
                    </div>

                </form>
            </main>
        </div>
    )
}
