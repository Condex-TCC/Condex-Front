// Reservas.jsx
//Tela de acesso rápido às reservas do síndico | Agenda do dia e solicitações pendentes
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CardReservaAutorizacao from '../../../components/sindico/cardReserva';
import { dataHojeIso, formatarDataReserva, formatarHoraReserva, getReservaPendentes, getReservasPorData } from '../../../service/Reservas';
import styles from '../../../css/paginaExibeReservasSindico.module.css';
import { useBuscaHeader } from '../../../hooks/useBuscaHeader'
import { filtrarPorTexto } from '../../../utils/busca'

//Função que soma (ou subtrai) dias de uma data no formato aaaa-mm-dd
function somaDias(dataIso, dias) {

  //Separa ano, mês e dia
  const [ano, mes, dia] = dataIso.split('-').map(Number)

  //Cria a nova data | O JS ajusta sozinho a virada de mês e de ano
  const nova = new Date(ano, mes - 1, dia + dias)

  //Monta de volta no formato aaaa-mm-dd
  const novoMes = String(nova.getMonth() + 1).padStart(2, '0')
  const novoDia = String(nova.getDate()).padStart(2, '0')

  return `${nova.getFullYear()}-${novoMes}-${novoDia}`
}

export default function PaginaExibeReserva() {

    //Texto da barra de pesquisa do header, usado para filtrar a lista desta página
    const { termo } = useBuscaHeader()

    //Hook para navegação
    const navigate = useNavigate()

    //Estado com o dia que está sendo consultado na agenda
    const [dataSelecionada, setDataSelecionada] = useState(dataHojeIso())

    //Estado com as reservas do dia | Guarda também a data a que elas pertencem
    const [agenda, setAgenda] = useState({ data: null, confirmadas: [], pendentes: [], erro: false })

    //Estado com as solicitações pendentes de aprovação (de todas as datas)
    const [solicitacoes, setSolicitacoes] = useState({ carregado: false, lista: [], erro: false })

    //A agenda está carregando enquanto os dados guardados não forem do dia escolhido
    const carregandoAgenda = agenda.data !== dataSelecionada

    //Busca as solicitações pendentes quando a tela abre
    useEffect(() => {

      //Evita atualizar o estado caso a tela já tenha sido fechada
      let montado = true

      const carregarSolicitacoes = async () => {

        //O service devolve undefined quando a API falha
        const resposta = await getReservaPendentes()

        if (!montado) {

          return
        }

        setSolicitacoes({ carregado: true, lista: resposta?.reservas ?? [], erro: !resposta })
      }

      carregarSolicitacoes()

      return () => {

        montado = false
      }
    }, [])

    //Busca as reservas do dia sempre que o dia escolhido muda
    useEffect(() => {

      //Evita atualizar o estado caso a tela já tenha sido fechada ou o dia tenha mudado
      let montado = true

      const carregarAgenda = async () => {

        //O service devolve undefined quando a API falha
        const resposta = await getReservasPorData(dataSelecionada)

        if (!montado) {

          return
        }

        setAgenda({
          data: dataSelecionada,
          confirmadas: resposta?.reservas ?? [],
          pendentes: resposta?.reservas_pendentes ?? [],
          erro: !resposta
        })
      }

      carregarAgenda()

      return () => {

        montado = false
      }
    }, [dataSelecionada])

    //Função que altera o dia consultado | Ignora o campo de data apagado
    const alteraData = (valor) => {

      if (valor) {

        setDataSelecionada(valor)
      }
    }

    //Função que realiza o redirecionamento
    const redirecionaGerencia = () => {

      navigate("gerenciamento")
    }

    //Função que realiza o redirecinamento para a tela que exibe as reservas que vão ser aprovadas
    const redirecinaAprovadas= () => {

      navigate("/sindico/reservas/exibe/aprovadas")
    }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Reservas de áreas comuns</h1>

        <div className={styles.actions}>

          {/* Botão que redireciona para outra tela */}
          <button className={styles.configButton} onClick={redirecionaGerencia}>Áreas comuns</button>

          <button className={styles.configButton} onClick={redirecinaAprovadas}>Gerenciar reservas</button>
        </div>
      </header>

      <main className={styles.content}>

        {/* Agenda do dia escolhido */}
        <section className={styles.agenda}>

          {/* Seletor de dia */}
          <div className={styles.dayPicker}>
            <button
              type="button"
              className={styles.dayButton}
              onClick={() => setDataSelecionada(somaDias(dataSelecionada, -1))}
              aria-label="Dia anterior"
            >
              &larr;
            </button>

            <input
              type="date"
              className={styles.dayInput}
              value={dataSelecionada}
              onChange={(evento) => alteraData(evento.target.value)}
              aria-label="Dia da agenda"
            />

            <button
              type="button"
              className={styles.dayButton}
              onClick={() => setDataSelecionada(somaDias(dataSelecionada, 1))}
              aria-label="Próximo dia"
            >
              &rarr;
            </button>

            <button
              type="button"
              className={styles.dayButton}
              onClick={() => setDataSelecionada(dataHojeIso())}
            >
              Hoje
            </button>
          </div>

          {
            //Estado de carregamento
            carregandoAgenda ?
              <p className={styles.empty}>Carregando reservas do dia...</p>
            :
            //Estado de erro
            agenda.erro ?
              <p className={styles.error}>Não foi possível carregar as reservas deste dia.</p>
            :
            <>
              {/* Reservas confirmadas no dia */}
              <h3 className={styles.sectionTitle}>Reservas confirmadas em {formatarDataReserva(dataSelecionada)}</h3>

              {
                filtrarPorTexto(agenda.confirmadas, termo).length === 0 ?
                  <p className={styles.empty}>Nenhuma reserva confirmada neste dia.</p>
                :
                filtrarPorTexto(agenda.confirmadas, termo).map((reserva) => (
                  <div key={reserva.id} className={`${styles.card} ${styles.cardGap}`}>
                    <div className={styles.cardContent}>
                      <h4>{reserva.espaco?.nome}</h4>
                      <p>{formatarHoraReserva(reserva.inicio)} às {formatarHoraReserva(reserva.fim)}</p>
                      <p>{reserva.morador?.nome} · {reserva.morador?.unidade?.bloco} - Apto {reserva.morador?.unidade?.numero}</p>
                    </div>
                    <span className={styles.statusAccepted}>Confirmada ✓</span>
                  </div>
                ))
              }

              {/* Solicitações pendentes para o dia */}
              <h3 className={styles.sectionTitle}>Aguardando aprovação neste dia</h3>

              {
                filtrarPorTexto(agenda.pendentes, termo).length === 0 ?
                  <p className={styles.empty}>Nenhuma solicitação pendente neste dia.</p>
                :
                filtrarPorTexto(agenda.pendentes, termo).map((reserva) => (
                  <CardReservaAutorizacao
                    key={reserva.id}
                    id={reserva.id}
                    espaco={reserva.espaco}
                    data={reserva.data}
                    inicio={reserva.inicio}
                    fim={reserva.fim}
                    morador={reserva.morador}
                  />
                ))
              }
            </>
          }
        </section>

        {/* Solicitações que aguardam a decisão do síndico */}
        <aside className={styles.sidebar}>
          <div>
            <h3 className={styles.sectionTitle}>Solicitações de reservas</h3>

            {
              //Estado de carregamento
              !solicitacoes.carregado ?
                <p className={styles.empty}>Carregando solicitações...</p>
              :
              //Estado de erro
              solicitacoes.erro ?
                <p className={styles.error}>Não foi possível carregar as solicitações.</p>
              :
              //Estado sem solicitações
              filtrarPorTexto(solicitacoes.lista, termo).length === 0 ?
                <p className={styles.empty}>Nenhuma solicitação pendente.</p>
              :
              filtrarPorTexto(solicitacoes.lista, termo).map((reserva) => (
                <CardReservaAutorizacao
                  key={reserva.id}
                  id={reserva.id}
                  espaco={reserva.espaco}
                  data={reserva.data}
                  inicio={reserva.inicio}
                  fim={reserva.fim}
                  morador={reserva.morador}
                />
              ))
            }
          </div>
        </aside>
      </main>
    </div>
  );
}
