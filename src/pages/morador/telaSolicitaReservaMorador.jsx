//Formulário de solicitação de reserva de área comum do morador

//Local das importações
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    getEspacosMorador,
    getReservasMorador,
    horariosSeSobrepoem,
    reservaConfirmada,
    reservasDoMoradorNoDia,
    rotuloStatusReserva,
    solicitaReserva,
    validaSolicitacaoReserva
} from '../../service/ReservaMorador'
import { dataHojeIso, formatarHoraReserva } from '../../service/Reservas'
import styles from '../../css/telaSolicitaReservaMorador.module.css'

//Função que cria a tela de solicitação
function TelaSolicitaReservaMorador(){

    //Hook que realiza a navegação
    const navigate = useNavigate()

    //Estados que guardam os valores dos campos do formulário
    const [idEspaco, setIdEspaco] = useState('')
    const [data, setData] = useState('')
    const [inicio, setInicio] = useState('')
    const [fim, setFim] = useState('')

    //Estado com os espaços disponíveis para reserva (vindos da API)
    const [espacos, setEspacos] = useState([])

    //Estado com as reservas do próprio morador, usadas para verificar a disponibilidade
    const [reservasMorador, setReservasMorador] = useState([])

    //Estado que indica se as reservas do morador foram carregadas com sucesso
    const [reservasCarregadas, setReservasCarregadas] = useState(false)

    //Estados de carregamento e de erro da busca dos espaços
    const [carregando, setCarregando] = useState(true)
    const [erroCarregamento, setErroCarregamento] = useState('')

    //Estado que bloqueia o botão enquanto a solicitação é enviada
    const [enviando, setEnviando] = useState(false)

    //Estado com a mensagem de erro, de validação ou de indisponibilidade | { tipo, texto }
    const [mensagem, setMensagem] = useState(null)

    //Carrega os espaços e as reservas do morador quando a tela abre
    useEffect(() => {

        //Evita atualizar o estado caso a tela já tenha sido fechada
        let montado = true

        //Função que busca os dados
        const carregarDados = async () => {

            //Busca em paralelo os espaços e as reservas do morador
            const [resultadoEspacos, resultadoReservas] = await Promise.all([

                getEspacosMorador(),
                getReservasMorador()
            ])

            if(!montado){

                return
            }

            setEspacos(resultadoEspacos.dados)
            setErroCarregamento(resultadoEspacos.sucesso ? '' : resultadoEspacos.mensagem)
            setReservasMorador(resultadoReservas.dados)
            setReservasCarregadas(resultadoReservas.sucesso)
            setCarregando(false)
        }

        carregarDados()

        //Quando a tela é fechada, impede novas atualizações
        return () => {

            montado = false
        }
    }, [])

    //Função que altera um campo do formulário e remove a mensagem anterior, que já não vale
    const alteraCampo = (alteraValor, valor) => {

        alteraValor(valor)
        setMensagem(null)
    }

    //Função que devolve o morador para a lista de reservas
    const voltarParaReservas = () => {

        navigate('/morador/reservas')
    }

    //Espaço escolhido no formulário | Usado para avisar se exige aprovação do síndico
    const espacoSelecionado = espacos.find((espaco) => String(espaco.id) === String(idEspaco))
    const exigeAprovacao = espacoSelecionado ? Boolean(Number(espacoSelecionado.autorizacao)) : false

    //Reservas do próprio morador no espaço e na data escolhidos
    const reservasNoDia = idEspaco && data ? reservasDoMoradorNoDia(reservasMorador, idEspaco, data) : []

    //Indica se o intervalo digitado já está completo e válido para ser comparado
    const intervaloValido = Boolean(inicio) && Boolean(fim) && fim > inicio

    //Função que envia a solicitação
    const enviarSolicitacao = async (evento) => {

        //Evita que a página recarregue ao enviar o formulário
        evento.preventDefault()

        //Monta o registro com os valores digitados
        const solicitacao = { idEspaco, data, inicio, fim }

        //Impede o envio de dados inválidos
        const erroValidacao = validaSolicitacaoReserva(solicitacao, reservasMorador)

        if(erroValidacao){

            setMensagem({ tipo: 'erro', texto: erroValidacao })

            return
        }

        //Bloqueia o botão e limpa a mensagem anterior
        setEnviando(true)
        setMensagem(null)

        //Chama a service que grava a reserva e devolve o resultado
        const resultado = await solicitaReserva(solicitacao)

        //Libera o botão
        setEnviando(false)

        //Quando a API recusa, exibe o motivo na própria tela
        if(!resultado.sucesso){

            setMensagem({ tipo: resultado.tipo === 'indisponivel' ? 'indisponivel' : 'erro', texto: resultado.mensagem })

            return
        }

        //Informa se a reserva já foi confirmada ou se depende do síndico
        const textoSucesso = reservaConfirmada(resultado.dados?.status)
            ? 'Reserva confirmada com sucesso.'
            : 'Reserva solicitada com sucesso. Aguarde a aprovação do síndico.'

        //Volta para a lista, que busca na API e já mostra a nova reserva
        navigate('/morador/reservas', { state: { mensagem: textoSucesso } })
    }

    //Retorna o componente
    return (

        <div className={styles['sr-container']}>

            {/* Cabeçalho com o botão de voltar */}
            <div className={styles['sr-header']}>
                <button type="button" className={styles['sr-btn-voltar']} onClick={voltarParaReservas}>
                    ← Voltar
                </button>
                <h1 className={styles['sr-title']}>Solicitar reserva</h1>
            </div>

            <p className={styles['sr-subtitle']}>
                Escolha a área comum, a data e o horário que deseja reservar.
            </p>

            {
                //Estado de carregamento
                carregando ?
                    <p className={styles['sr-empty']}>Carregando áreas comuns...</p>
                :
                //Estado de erro ao buscar as áreas
                erroCarregamento ?
                    <p className={`${styles['sr-mensagem']} ${styles['sr-mensagem--erro']}`}>{erroCarregamento}</p>
                :
                //Estado sem nenhuma área cadastrada
                espacos.length === 0 ?
                    <p className={styles['sr-empty']}>Nenhuma área comum disponível para reserva.</p>
                :
                <form className={styles['sr-form']} onSubmit={enviarSolicitacao} noValidate>

                    {/* Área comum */}
                    <div className={`${styles['sr-field']} ${styles['sr-field--full']}`}>
                        <label htmlFor="sr-espaco">Área comum</label>
                        <select
                            id="sr-espaco"
                            value={idEspaco}
                            onChange={(evento) => alteraCampo(setIdEspaco, evento.target.value)}
                        >
                            <option value="">Selecione uma área</option>
                            {
                                espacos.map((espaco) => (
                                    <option key={espaco.id} value={espaco.id}>{espaco.nome}</option>
                                ))
                            }
                        </select>

                        {/* Aviso quando a área exige a aprovação do síndico */}
                        {
                            exigeAprovacao &&
                            <span className={styles['sr-hint']}>
                                Esta área exige aprovação do síndico. A reserva ficará pendente até a decisão.
                            </span>
                        }
                    </div>

                    {/* Data */}
                    <div className={`${styles['sr-field']} ${styles['sr-field--full']}`}>
                        <label htmlFor="sr-data">Data</label>
                        <input
                            id="sr-data"
                            type="date"
                            min={dataHojeIso()}
                            value={data}
                            onChange={(evento) => alteraCampo(setData, evento.target.value)}
                        />
                    </div>

                    {/* Horário de início */}
                    <div className={styles['sr-field']}>
                        <label htmlFor="sr-inicio">Início</label>
                        <input
                            id="sr-inicio"
                            type="time"
                            value={inicio}
                            onChange={(evento) => alteraCampo(setInicio, evento.target.value)}
                        />
                    </div>

                    {/* Horário de fim */}
                    <div className={styles['sr-field']}>
                        <label htmlFor="sr-fim">Fim</label>
                        <input
                            id="sr-fim"
                            type="time"
                            value={fim}
                            onChange={(evento) => alteraCampo(setFim, evento.target.value)}
                        />
                    </div>

                    {/* Painel de disponibilidade */}
                    <div className={`${styles['sr-disponibilidade']} ${styles['sr-field--full']}`} aria-live="polite">
                        <div className={styles['sr-disponibilidade-titulo']}>Disponibilidade</div>

                        {
                            //Antes de escolher a área e a data, não há o que verificar
                            !idEspaco || !data ?
                                <div className={styles['sr-disponibilidade-texto']}>
                                    Escolha a área e a data para ver os horários que você já reservou.
                                </div>
                            :
                            //Sem as reservas do morador, não é possível comparar os horários
                            !reservasCarregadas ?
                                <div className={styles['sr-disponibilidade-texto']}>
                                    Não foi possível carregar as suas reservas para verificar os horários.
                                    A disponibilidade será confirmada pelo sistema ao solicitar.
                                </div>
                            :
                            <>
                                {
                                    reservasNoDia.length === 0 ?
                                        <div className={styles['sr-disponibilidade-texto']}>
                                            Você não possui reservas nesta área neste dia.
                                        </div>
                                    :
                                    <>
                                        <div className={styles['sr-disponibilidade-texto']}>
                                            Horários que você já reservou nesta área neste dia:
                                        </div>
                                        <ul className={styles['sr-horarios']}>
                                            {
                                                reservasNoDia.map((reserva) => {

                                                    //Marca o horário que conflita com o intervalo escolhido
                                                    const conflita = intervaloValido
                                                        && horariosSeSobrepoem(inicio, fim, reserva.inicio, reserva.fim)

                                                    return (
                                                        <li
                                                            key={reserva.id}
                                                            className={`${styles['sr-horario']} ${conflita ? styles['sr-horario--conflito'] : ''}`}
                                                        >
                                                            {formatarHoraReserva(reserva.inicio)} às {formatarHoraReserva(reserva.fim)}
                                                            {' · '}{rotuloStatusReserva(reserva.status)}
                                                            {conflita ? ' · conflita com o horário escolhido' : ''}
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </>
                                }

                                <div className={styles['sr-disponibilidade-texto']}>
                                    Se o horário estiver ocupado por outro morador, o sistema avisará ao solicitar.
                                </div>
                            </>
                        }
                    </div>

                    {/* Mensagem de erro, de validação ou de indisponibilidade */}
                    {
                        mensagem &&
                        <div
                            role="alert"
                            className={`${styles['sr-mensagem']} ${styles['sr-field--full']} ${mensagem.tipo === 'indisponivel' ? styles['sr-mensagem--indisponivel'] : styles['sr-mensagem--erro']}`}
                        >
                            {mensagem.texto}
                        </div>
                    }

                    {/* Botão de solicitar */}
                    <div className={`${styles['sr-action']} ${styles['sr-field--full']}`}>
                        <button type="submit" className={styles['sr-btn-solicitar']} disabled={enviando}>
                            {enviando ? 'Enviando...' : 'Solicitar reserva'}
                        </button>
                    </div>

                </form>
            }

        </div>
    )
}

//Exportando a tela para ser utilizada no roteador
export default TelaSolicitaReservaMorador
