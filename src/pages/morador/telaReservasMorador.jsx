//Tela de reservas do morador | Exibe as reservas ativas, o histórico e permite cancelar

//Local das importações
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import CardReservaMorador from '../../components/morador/cardReservaMorador'
import { cancelaReservaMorador, getReservasMorador, reservaAtiva } from '../../service/ReservaMorador'
import { formatarDataReserva } from '../../service/Reservas'
import styles from '../../css/telaReservasMorador.module.css'
import { useBuscaHeader } from '../../hooks/useBuscaHeader'
import { filtrarPorTexto } from '../../utils/busca'

//Função que cria a tela de reservas
function TelaReservasMorador(){

    //Texto da barra de pesquisa do header, usado para filtrar a lista desta página
    const { termo } = useBuscaHeader()

    //Hook que realiza a navegação
    const navigate = useNavigate()

    //Hook que recebe os dados enviados pela tela anterior
    const location = useLocation()

    //Estado que guarda todas as reservas do morador
    const [reservas, setReservas] = useState([])

    //Estado que controla o carregamento inicial da lista
    const [carregando, setCarregando] = useState(true)

    //Estado que guarda o erro ao carregar a lista
    const [erroCarregamento, setErroCarregamento] = useState('')

    //Estado que força uma nova busca na API quando o seu valor muda
    const [versao, setVersao] = useState(0)

    //Estado que guarda o id da reserva que está sendo cancelada
    const [idCancelando, setIdCancelando] = useState(null)

    //Estado com a mensagem de sucesso ou erro | Começa com a mensagem enviada pelo formulário de solicitação
    const [feedback, setFeedback] = useState(
        location.state?.mensagem ? { tipo: 'sucesso', texto: location.state.mensagem } : null
    )

    //Busca as reservas na API quando a tela abre e sempre que a versão muda
    useEffect(() => {

        //Evita atualizar o estado caso a tela já tenha sido fechada
        let montado = true

        //Função que busca os dados
        const carregarReservas = async () => {

            const resultado = await getReservasMorador()

            if(!montado){

                return
            }

            //Guarda a lista e o erro, caso a API tenha falhado
            setReservas(resultado.dados)
            setErroCarregamento(resultado.sucesso ? '' : resultado.mensagem)
            setCarregando(false)
        }

        carregarReservas()

        //Quando a tela é fechada, impede novas atualizações
        return () => {

            montado = false
        }
    }, [versao])

    //Função que tenta buscar as reservas novamente
    const tentarNovamente = () => {

        setCarregando(true)
        setVersao((valor) => valor + 1)
    }

    //Função que cancela uma reserva depois da confirmação do morador
    const cancelarReserva = async (reserva) => {

        //Pede a confirmação, já que o cancelamento não pode ser desfeito
        const confirmou = window.confirm(
            `Deseja cancelar a reserva de ${reserva.espaco?.nome || 'área comum'} em ${formatarDataReserva(reserva.data)}?`
        )

        if(!confirmou){

            return
        }

        //Bloqueia o botão e limpa a mensagem anterior
        setIdCancelando(reserva.id)
        setFeedback(null)

        //Chama a service que cancela a reserva na API
        const resultado = await cancelaReservaMorador(reserva.id)

        //Libera o botão e exibe a mensagem retornada
        setIdCancelando(null)
        setFeedback({ tipo: resultado.sucesso ? 'sucesso' : 'erro', texto: resultado.mensagem })

        //Busca a lista de novo para a tela refletir o estado atual da API
        if(resultado.sucesso){

            setVersao((valor) => valor + 1)
        }
    }

    //Função que leva o morador para o formulário de solicitação
    const abrirSolicitacao = () => {

        navigate('/morador/reservas/nova')
    }

    //Função que compara duas reservas pela data e pelo horário de início
    const porDataHora = (a, b) => `${a.data}${a.inicio}`.localeCompare(`${b.data}${b.inicio}`)

    //Separa as reservas futuras (ativas) do histórico
    //As ativas ficam da mais próxima para a mais distante | O histórico da mais recente para a mais antiga
    const reservasAtivas = filtrarPorTexto(reservas, termo).filter((reserva) => reservaAtiva(reserva)).sort(porDataHora)
    const reservasHistorico = filtrarPorTexto(reservas, termo).filter((reserva) => !reservaAtiva(reserva)).sort((a, b) => porDataHora(b, a))

    //Retorna o componente
    return (

        <div className={styles['rm-container']}>

            {/* Cabeçalho da tela */}
            <div className={styles['rm-page-header']}>
                <h1 className={styles['rm-page-title']}>Reservas</h1>
                <p className={styles['rm-page-subtitle']}>
                    Agende e acompanhe as reservas das áreas comuns.
                </p>
            </div>

            {/* Mensagem de sucesso ou erro da última ação */}
            {
                feedback &&
                <div
                    role="status"
                    className={`${styles['rm-feedback']} ${feedback.tipo === 'sucesso' ? styles['rm-feedback--sucesso'] : styles['rm-feedback--erro']}`}
                >
                    {feedback.texto}
                </div>
            }

            {/* Botão que abre o formulário de solicitação */}
            <div className={styles['rm-action']}>
                <button type="button" className={styles['rm-btn-primary']} onClick={abrirSolicitacao}>
                    Solicitar reserva de área comum
                </button>
            </div>

            {
                //Estado de carregamento
                carregando ?
                    <p className={styles['rm-empty']} style={{ marginTop: 24 }}>Carregando reservas...</p>
                :
                //Estado de erro
                erroCarregamento ?
                    <div className={styles['rm-error']} style={{ marginTop: 24 }}>
                        {erroCarregamento}
                        <button type="button" className={styles['rm-btn-retry']} onClick={tentarNovamente}>
                            Tentar novamente
                        </button>
                    </div>
                :
                //Estado sem nenhuma reserva cadastrada
                reservas.length === 0 ?
                    <p className={styles['rm-empty']} style={{ marginTop: 24 }}>Você ainda não possui reservas.</p>
                :
                <>
                    {/* Seção das reservas que ainda vão acontecer */}
                    <section className={styles['rm-section']} style={{ marginTop: 24 }}>
                        <h2 className={styles['rm-section-title']}>Reservas ativas</h2>

                        {
                            reservasAtivas.length === 0 ?
                                <p className={styles['rm-empty']}>Nenhuma reserva ativa.</p>
                            :
                                reservasAtivas.map((reserva) => (
                                    <CardReservaMorador
                                        key={reserva.id}
                                        reserva={reserva}
                                        aoCancelar={cancelarReserva}
                                        idCancelando={idCancelando}
                                    />
                                ))
                        }
                    </section>

                    {/* Seção do histórico de reservas */}
                    <section className={styles['rm-section']}>
                        <h2 className={styles['rm-section-title']}>Histórico de reservas</h2>

                        {
                            reservasHistorico.length === 0 ?
                                <p className={styles['rm-empty']}>Nenhuma reserva no histórico.</p>
                            :
                                reservasHistorico.map((reserva) => (
                                    <CardReservaMorador
                                        key={reserva.id}
                                        reserva={reserva}
                                        aoCancelar={cancelarReserva}
                                        idCancelando={idCancelando}
                                    />
                                ))
                        }
                    </section>
                </>
            }

        </div>
    )
}

//Exportando a tela para ser utilizada no roteador
export default TelaReservasMorador
