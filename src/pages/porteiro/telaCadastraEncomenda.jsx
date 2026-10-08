//Tela de cadastro de encomenda do porteiro

//Local das importações
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { cadastrarEncomenda } from '../../service/Encomenda'
import styles from '../../css/formularioPorteiro.module.css'

//Limite de caracteres da descrição, o mesmo exigido pela validação do backend
const LIMITE_DESCRICAO = 150

//Texto usado quando nenhum dos campos opcionais foi preenchido
const DESCRICAO_PADRAO = 'Encomenda recebida na portaria'

//Função que devolve a hora no formato 00:00, aceitando que o porteiro
//digite apenas a hora (14) ou a hora e os minutos (1430 ou 14:30).
//Devolve string vazia quando a hora não existe, o que a mesma função
//usa tanto para validar quanto para montar a descrição
function normalizaHora(hora) {

    //Separa os dígitos já digitados
    const digitos = hora.replace(/\D/g, '')

    //Sem dois ou quatro dígitos não há como formar uma hora
    if(digitos.length !== 2 && digitos.length !== 4){

        return ''
    }

    //Separa a hora dos minutos
    const horas = Number(digitos.slice(0, 2))
    const minutos = digitos.length === 4 ? Number(digitos.slice(2, 4)) : 0

    //Hora tem que estar entre 0 e 23, e minutos entre 0 e 59
    if(horas > 23 || minutos > 59){

        return ''
    }

    //Monta o horário com dois dígitos em cada parte
    return `${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}`
}

//Função que confere se a data existe no calendário, e não apenas
//se o dia e o mês estão dentro dos limites numéricos
function dataExisteNoCalendario(dia, mes, ano) {

    //Monta a data com o mês começando em zero, como o Date exige
    const data = new Date(Number(ano), Number(mes) - 1, Number(dia))

    //Compara os três campos de volta: se algum deles não bater,
    //o próprio Date ajustou a data, o que prova que o dia não existe
    return data.getFullYear() === Number(ano)
        && data.getMonth() === Number(mes) - 1
        && data.getDate() === Number(dia)
}

//Função que junta os campos do formulário em uma única descrição,
//porque a API aceita somente "nome" e "descricao" no cadastro
function montarDescricao({ bloco, apartamento, dia, mes, ano, hora }) {

    //Guarda os pedaços da descrição na ordem em que aparecem na tela
    const partes = []

    //Bloco, quando informado
    if(bloco){

        partes.push(`Bloco ${bloco}`)
    }

    //Apartamento, quando informado
    if(apartamento){

        partes.push(`Apto ${apartamento}`)
    }

    //Monta a data somente quando dia, mês e ano estão completos
    const dataCompleta = dia && mes && ano

    //A hora só entra na descrição quando é uma hora válida
    const horaCompleta = normalizaHora(hora)

    //Data e hora do recebimento
    if(dataCompleta && horaCompleta){

        partes.push(`recebida em ${dia}/${mes}/${ano} às ${horaCompleta}`)
    }

    //Data sem a hora
    else if(dataCompleta){

        partes.push(`recebida em ${dia}/${mes}/${ano}`)
    }

    //Sem nenhum campo opcional, usa o texto padrão
    if(partes.length === 0){

        return DESCRICAO_PADRAO
    }

    //Junta tudo e corta no limite caso a frase fique longa demais
    return partes.join(', ').slice(0, LIMITE_DESCRICAO)
}

//Função que valida os campos de data e hora, que são opcionais,
//mas precisam estar completos e dentro do formato quando preenchidos
function validarData({ dia, mes, ano, hora }) {

    //Objeto que guarda os erros encontrados
    const novosErros = {}

    //Conta quantos dos três campos de data foram preenchidos
    const preenchidos = [dia, mes, ano].filter(Boolean).length

    //Se o porteiro preencheu parte da data, cobra os três campos,
    //porque antes a data era descartada em silêncio sem nenhum aviso
    if(preenchidos > 0 && preenchidos < 3){

        novosErros.dia = 'Preencha dia, mês e ano.'

        return novosErros
    }

    //Com a data completa, confere dia, mês e ano
    if(preenchidos === 3){

        //Dia tem que estar entre 1 e 31
        if(Number(dia) < 1 || Number(dia) > 31){

            novosErros.dia = 'Dia inválido.'
        }

        //Mês tem que estar entre 1 e 12
        if(Number(mes) < 1 || Number(mes) > 12){

            novosErros.mes = 'Mês inválido.'
        }

        //Ano tem que ter quatro dígitos
        if(ano.length !== 4){

            novosErros.ano = 'Ano inválido.'
        }

        //Só checa o calendário quando dia, mês e ano estão dentro dos limites
        else if(!dataExisteNoCalendario(dia, mes, ano)){

            novosErros.dia = 'Essa data não existe.'
        }
    }

    //A hora, se preenchida, tem que ser uma hora válida
    if(hora && !normalizaHora(hora)){

        novosErros.hora = 'Use o formato 00:00.'
    }

    return novosErros
}

//Tela responsável por cadastrar a encomenda
export default function PaginaCadastraEncomenda() {

    //Hook que realiza a navegação
    const navigate = useNavigate()

    //States para controlar o valor de cada campo do formulário
    const [destinatario, setDestinatario] = useState('')
    const [idMorador, setIdMorador] = useState('')
    const [bloco, setBloco] = useState('')
    const [apartamento, setApartamento] = useState('')
    const [dia, setDia] = useState('')
    const [mes, setMes] = useState('')
    const [ano, setAno] = useState('')
    const [hora, setHora] = useState('')

    //Estado que guarda o erro de validação de cada campo
    const [erros, setErros] = useState({})

    //Estado que desabilita o botão enquanto a gravação acontece
    const [salvando, setSalvando] = useState(false)

    //Função que limita um campo ao tamanho máximo de caracteres
    const limita = (valor, maximo) => valor.replace(/\D/g, '').slice(0, maximo)

    //Função do campo de hora, que precisa aceitar o dois pontos e
    //insere o separador automaticamente depois das duas primeiras dígitos
    const limitaHora = (valor) => {

        //Mantém apenas os dígitos digitados
        const digitos = valor.replace(/\D/g, '').slice(0, 4)

        //Com dois ou mais dígitos, devolve no formato 00:00
        if(digitos.length > 2){

            return `${digitos.slice(0, 2)}:${digitos.slice(2)}`
        }

        //Com menos de dois dígitos, devolve apenas o que foi digitado
        return digitos
    }

    //Função que verifica se os campos obrigatórios foram preenchidos
    const validar = () => {

        //Objeto que guarda os erros encontrados
        const novosErros = {}

        //O nome do destinatário é o único dado realmente obrigatório
        if(!destinatario.trim()){

            novosErros.destinatario = 'Informe o nome do destinatário.'
        }

        //A API exige o id do morador destinatário (id_morador) para vincular a encomenda
        if(!idMorador){

            novosErros.idMorador = 'Informe o ID do morador destinatário.'
        }

        //O id precisa ser um número inteiro maior que zero
        else if(!Number.isInteger(Number(idMorador)) || Number(idMorador) < 1){

            novosErros.idMorador = 'ID do morador inválido.'
        }

        //Junta os erros de formato da data e da hora
        Object.assign(novosErros, validarData({ dia, mes, ano, hora }))

        //Guarda os erros e devolve o que o botão precisa saber
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

        //Junta bloco, apartamento e data numa única descrição, já que a API
        //não possui colunas separadas para esses dados
        const descricao = montarDescricao({ bloco, apartamento, dia, mes, ano, hora })

        try{

            //Chama a função que cadastra a encomenda na API, levando o id do morador
            //que a API exige e os campos separados para o mock conseguir mostrar
            //bloco, apartamento e data
            const resultado = await cadastrarEncomenda(destinatario.trim(), descricao, Number(idMorador), {
                bloco,
                apartamento,
                dia,
                mes,
                ano,
                hora: normalizaHora(hora)
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

                {/* Botão de retorno no canto e bloco de identificação logo abaixo */}
                <div className={styles['fp-header']}>
                    {/* Contexto + ação concreta + texto de apoio (padrão cx-page-header) */}
                    <div className={styles['fp-header__texto']}>
                        <p className="cx-overline">Encomendas</p>
                        <h1 className={styles['fp-titulo']}>Cadastrar encomenda</h1>
                        <p className={styles['fp-lead']}>
                            Registre o que foi recebido na portaria e a quem a encomenda é destinada.
                        </p>
                    </div>

                    {/* Retorno alinhado à direita do título, no mesmo padrão das
                        telas de cadastro do síndico e do morador */}
                    <button type="button" className={styles['fp-btn-voltar']} onClick={back}>
                        &larr; voltar
                    </button>
                </div>

                {/* Formulário */}
                <form className={styles['fp-formulario']} onSubmit={salvar} noValidate>

                    {/* Campo do destinatário: linha inteira da grade, por ser o dado principal.
                        Rótulos VISÍVEIS em todos os campos: o placeholder some ao digitar,
                        e ele permanece apenas como exemplo do formato esperado */}
                    <div className={`${styles['fp-campo']} ${styles['fp-celula--larga']}`}>
                        <label className={styles['fp-rotulo']} htmlFor="encomenda-destinatario">Destinatário</label>
                        <input
                            id="encomenda-destinatario"
                            className={`${styles['fp-input']} ${styles['fp-input--destinatario']}`}
                            type="text"
                            placeholder="Destinatário:"
                            value={destinatario}
                            onChange={(evento) => setDestinatario(evento.target.value)}
                        />
                        {erros.destinatario && <span className={styles['fp-erro']}>{erros.destinatario}</span>}
                    </div>

                    {/* Campo do morador destinatário: a API vincula a encomenda pelo id do morador */}
                    <div className={styles['fp-campo']}>
                        <label className={styles['fp-rotulo']} htmlFor="encomenda-id-morador">ID do morador</label>
                        <input
                            id="encomenda-id-morador"
                            className={`${styles['fp-input']} ${styles['fp-input--apartamento']}`}
                            type="text"
                            inputMode="numeric"
                            placeholder="ID do morador"
                            maxLength={10}
                            value={idMorador}
                            onChange={(evento) => setIdMorador(limita(evento.target.value, 10))}
                        />
                        {erros.idMorador && <span className={styles['fp-erro']}>{erros.idMorador}</span>}
                    </div>

                    {/* Linha com bloco e apartamento */}
                    <div className={styles['fp-campo']}>
                        <div className={styles['fp-linha-endereco']}>

                            <div>
                                <label className={styles['fp-rotulo']} htmlFor="encomenda-bloco">Bloco</label>
                                <input
                                    id="encomenda-bloco"
                                    className={`${styles['fp-input']} ${styles['fp-input--bloco']}`}
                                    type="text"
                                    placeholder="bloco"
                                    maxLength={10}
                                    value={bloco}
                                    onChange={(evento) => setBloco(limita(evento.target.value, 10))}
                                />
                                {erros.bloco && <span className={styles['fp-erro']}>{erros.bloco}</span>}
                            </div>

                            <div>
                                <label className={styles['fp-rotulo']} htmlFor="encomenda-apartamento">Apartamento</label>
                                <input
                                    id="encomenda-apartamento"
                                    className={`${styles['fp-input']} ${styles['fp-input--apartamento']}`}
                                    type="text"
                                    placeholder="Apartamento"
                                    maxLength={10}
                                    value={apartamento}
                                    onChange={(evento) => setApartamento(limita(evento.target.value, 10))}
                                />
                                {erros.apartamento && <span className={styles['fp-erro']}>{erros.apartamento}</span>}
                            </div>

                        </div>
                    </div>

                    {/* Área da data e hora em que a encomenda foi recebida (linha inteira) */}
                    <div className={`${styles['fp-campo']} ${styles['fp-celula--larga']}`}>
                        <span className={styles['fp-label-visivel']}>Recebida :</span>

                        <div className={styles['fp-linha-recebida']}>

                            <div>
                                <label className={styles['fp-rotulo']} htmlFor="encomenda-dia">Dia</label>
                                <input
                                    id="encomenda-dia"
                                    className={`${styles['fp-input']} ${styles['fp-input--data']}`}
                                    type="text"
                                    inputMode="numeric"
                                    placeholder="DD"
                                    maxLength={2}
                                    value={dia}
                                    onChange={(evento) => setDia(limita(evento.target.value, 2))}
                                />
                                {erros.dia && <span className={styles['fp-erro']}>{erros.dia}</span>}
                            </div>

                            <div>
                                <label className={styles['fp-rotulo']} htmlFor="encomenda-mes">Mês</label>
                                <input
                                    id="encomenda-mes"
                                    className={`${styles['fp-input']} ${styles['fp-input--data']}`}
                                    type="text"
                                    inputMode="numeric"
                                    placeholder="MM"
                                    maxLength={2}
                                    value={mes}
                                    onChange={(evento) => setMes(limita(evento.target.value, 2))}
                                />
                                {erros.mes && <span className={styles['fp-erro']}>{erros.mes}</span>}
                            </div>

                            <div>
                                <label className={styles['fp-rotulo']} htmlFor="encomenda-ano">Ano</label>
                                <input
                                    id="encomenda-ano"
                                    className={`${styles['fp-input']} ${styles['fp-input--data']}`}
                                    type="text"
                                    inputMode="numeric"
                                    placeholder="YYYY"
                                    maxLength={4}
                                    value={ano}
                                    onChange={(evento) => setAno(limita(evento.target.value, 4))}
                                />
                                {erros.ano && <span className={styles['fp-erro']}>{erros.ano}</span>}
                            </div>

                            <div>
                                <label className={styles['fp-rotulo']} htmlFor="encomenda-hora">Hora</label>
                                <input
                                    id="encomenda-hora"
                                    className={`${styles['fp-input']} ${styles['fp-input--hora']}`}
                                    type="text"
                                    inputMode="numeric"
                                    placeholder="00:00"
                                    maxLength={5}
                                    value={hora}
                                    onChange={(evento) => setHora(limitaHora(evento.target.value))}
                                />
                                {erros.hora && <span className={styles['fp-erro']}>{erros.hora}</span>}
                            </div>

                        </div>
                    </div>

                    {/* Botão de salvar: ocupa a linha inteira da grade */}
                    <div className={`${styles['fp-area-salvar']} ${styles['fp-celula--larga']}`}>
                        <button type="submit" className={styles['fp-btn-salvar']} disabled={salvando}>
                            {salvando ? 'Salvando...' : 'SALVAR'}
                        </button>
                    </div>

                </form>

                {
                    //Erro de envio, mostrado abaixo do formulário para o porteiro
                    //saber que a encomenda não foi gravada
                    erros.submit &&
                    <p className={styles['fp-erro-envio']}>{erros.submit}</p>
                }

            </main>

        </div>
    );
}
