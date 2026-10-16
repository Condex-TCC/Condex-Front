//Tela de cadastro de visitante do porteiro

//Local das importações
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { cadastrarVisitantePorteiro } from '../../service/VisitantePorteiro'
import { getMoradoresPorteiroAPI } from '../../api/MoradorPorteiroApi'
import styles from '../../css/formularioPorteiro.module.css'

//Função que aplica a máscara 000.000.000-00 enquanto o CPF é digitado
//A API aceita no máximo 14 caracteres, que é o tamanho do CPF com máscara
function mascaraCpf(valor) {

    //Mantém apenas os dígitos, limitados a 11
    const d = valor.replace(/\D/g, '').slice(0, 11)

    //Monta o CPF conforme os dígitos digitados
    if(d.length > 9){ return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9)}` }
    if(d.length > 6){ return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6)}` }
    if(d.length > 3){ return `${d.slice(0, 3)}.${d.slice(3)}` }

    return d
}

//Função que monta o texto de cada opção do morador (nome + unidade)
function rotuloMorador(morador) {

    //Sem unidade cadastrada, mostra apenas o nome
    if(!morador.unidade){

        return morador.nome
    }

    //Junta bloco e número quando existirem
    const partes = []

    if(morador.unidade.bloco){ partes.push(`Bloco ${morador.unidade.bloco}`) }

    if(morador.unidade.numero){ partes.push(`Apto ${morador.unidade.numero}`) }

    //Sem bloco nem número, fica só o nome
    if(partes.length === 0){

        return morador.nome
    }

    return `${morador.nome} - ${partes.join(' / ')}`
}

//Tela responsável por cadastrar o visitante pelo porteiro
export default function RegistroVisitante() {

    //Hook que realiza a navegação
    const navigate = useNavigate()

    //States para controlar o valor de cada campo do formulário
    const [nome, setNome] = useState('')
    const [cpf, setCpf] = useState('')
    const [idMorador, setIdMorador] = useState('')

    //Estado que guarda a lista de moradores para seleção
    const [moradores, setMoradores] = useState([])

    //Estados que controlam o carregamento e o erro da lista de moradores
    const [carregandoMoradores, setCarregandoMoradores] = useState(true)
    const [erroMoradores, setErroMoradores] = useState('')

    //Estado que guarda o erro de cada campo
    const [erros, setErros] = useState({})

    //Estado que desabilita o botão enquanto a gravação acontece
    const [salvando, setSalvando] = useState(false)

    //Função que busca os moradores para o porteiro selecionar
    //Não mexe no estado antes do await para não causar renderização em cascata
    const buscarMoradores = async () => {

        try{

            //Faz a requisição para a API
            const response = await getMoradoresPorteiroAPI()

            //Lê o corpo da resposta como JSON sem estourar quando não for JSON
            let json = {}

            try{

                json = await response.json()
            }
            catch{

                json = {}
            }

            //Verifica se houve algum erro na requisição
            if(!response.ok){

                setErroMoradores('Não foi possível carregar os moradores.')
                return
            }

            //A API devolve a lista aninhada em data[0] ou direta em data
            const lista = Array.isArray(json.data?.[0])
                ? json.data[0]
                : (Array.isArray(json.data) ? json.data : [])

            setMoradores(lista)
        }
        catch(erro){

            //Servidor fora do ar ou sem conexão
            console.error('Erro ao buscar os moradores na API:', erro)

            setErroMoradores('Não foi possível conectar à API. Verifique se o servidor está no ar.')
        }
        finally{

            setCarregandoMoradores(false)
        }
    }

    //Busca os moradores assim que a tela é aberta
    //O agendamento evita chamar setState direto no corpo do efeito, o que
    //causaria renderizações em cascata
    useEffect(() => {

        Promise.resolve().then(() => buscarMoradores())
    }, [])

    //Função que reinicia o carregamento pelo botão "tentar novamente"
    const tentarNovamente = () => {

        setCarregandoMoradores(true)
        setErroMoradores('')
        buscarMoradores()
    }

    //Função que verifica os campos exigidos pela API (nome, cpf e morador)
    const validar = () => {

        const novosErros = {}

        if(!nome.trim()){ novosErros.nome = 'Informe o nome do visitante.' }

        if(cpf.replace(/\D/g, '').length !== 11){ novosErros.cpf = 'Informe o CPF completo.' }

        if(!idMorador || Number(idMorador) < 1){ novosErros.idMorador = 'Selecione o morador responsável.' }

        setErros(novosErros)

        return Object.keys(novosErros).length === 0
    }

    //Função que cadastra o visitante
    const salvar = async (evento) => {

        //Evita que a página recarregue ao enviar o formulário
        evento.preventDefault()

        //Interrompe o envio se algum campo obrigatório estiver inválido
        if(!validar()){

            return
        }

        //Desabilita o botão para não enviar duas vezes
        setSalvando(true)

        try{

            //Chama a função que cadastra o visitante na API
            const resultado = await cadastrarVisitantePorteiro(nome.trim(), cpf, Number(idMorador))

            //Quando a API recusa, a tela fica como está, exibindo o motivo
            if(!resultado.sucesso){

                setErros({ submit: resultado.mensagem })

                return
            }

            //Volta para a tela inicial do porteiro, que recarrega a lista
            navigate('/porteiro')

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

                <div className={styles['fp-header']}>
                    <button type="button" className={styles['fp-btn-voltar']} onClick={() => navigate('/porteiro')}>
                        &larr; voltar
                    </button>

                    <h1 className={styles['fp-titulo']}>Registrar visitante</h1>
                </div>

                <form className={styles['fp-formulario']} onSubmit={salvar} noValidate>

                    <div className={styles['fp-campo']}>
                        <label className={styles['fp-rotulo-oculto']} htmlFor="visitante-nome">Nome</label>
                        <input
                            id="visitante-nome"
                            className={`${styles['fp-input']} ${styles['fp-input--destinatario']}`}
                            type="text"
                            placeholder="Nome do visitante:"
                            maxLength={100}
                            value={nome}
                            onChange={(evento) => setNome(evento.target.value)}
                        />
                        {erros.nome && <span className={styles['fp-erro']}>{erros.nome}</span>}
                    </div>

                    <div className={styles['fp-campo']}>
                        <label className={styles['fp-rotulo-oculto']} htmlFor="visitante-cpf">CPF</label>
                        <input
                            id="visitante-cpf"
                            className={`${styles['fp-input']} ${styles['fp-input--apartamento']}`}
                            type="text"
                            inputMode="numeric"
                            placeholder="000.000.000-00"
                            value={cpf}
                            onChange={(evento) => setCpf(mascaraCpf(evento.target.value))}
                        />
                        {erros.cpf && <span className={styles['fp-erro']}>{erros.cpf}</span>}
                    </div>

                    {/* O porteiro escolhe o morador responsável em vez de digitar o id */}
                    <div className={styles['fp-campo']}>
                        <label className={styles['fp-label-visivel']} htmlFor="visitante-morador">Morador responsável</label>
                        <select
                            id="visitante-morador"
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

                        {/* Nenhum morador cadastrado na API */}
                        {
                            !carregandoMoradores && !erroMoradores && moradores.length === 0 &&
                            <span className={styles['fp-erro']}>
                                Nenhum morador cadastrado. Cadastre um morador antes de registrar o visitante.
                            </span>
                        }

                        {/* Erro ao buscar a lista, com opção de tentar de novo */}
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

                    <div className={styles['fp-area-salvar']}>
                        <button
                            type="submit"
                            className={styles['fp-btn-salvar']}
                            disabled={salvando || carregandoMoradores || erroMoradores !== '' || moradores.length === 0}
                        >
                            {salvando ? 'Salvando...' : 'SALVAR'}
                        </button>
                    </div>

                </form>

                {
                    erros.submit &&
                    <p className={styles['fp-erro-envio']}>{erros.submit}</p>
                }

            </main>

        </div>
    )
}
