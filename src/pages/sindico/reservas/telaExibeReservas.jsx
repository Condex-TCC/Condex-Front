import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { ptBR } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';

import CardReservaPendenteMini from '../../../components/sindico/cardReservaPendenteMini';
import CardReservaConfirmadaMini from '../../../components/sindico/cardReservaConfirmadaMini';
import CardReservaCanceladaMini from '../../../components/sindico/cardReservaCanceladaMini';
import { dataHojeIso, formatarDataReserva, getReservasPorData } from '../../../service/Reservas';
import styles from '../../../css/telaExibeReservasSindico.module.css';

// Converte uma data ISO (aaaa-mm-dd) para objeto Date local
function isoParaData(valor) {
  if (!valor) return null;
  const [ano, mes, dia] = String(valor).slice(0, 10).split('-').map(Number);
  if (!ano || !mes || !dia) return null;
  return new Date(ano, mes - 1, dia);
}

// Converte um objeto Date para ISO (aaaa-mm-dd)
function dataParaIso(data) {
  if (!data) return '';
  const ano = data.getFullYear();
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const dia = String(data.getDate()).padStart(2, '0');
  return `${ano}-${mes}-${dia}`;
}

// Soma ou subtrai dias de uma data ISO
function somaDias(dataIso, dias) {
  const [ano, mes, dia] = String(dataIso).split('-').map(Number);
  const nova = new Date(ano, mes - 1, dia + dias);
  const novoMes = String(nova.getMonth() + 1).padStart(2, '0');
  const novoDia = String(nova.getDate()).padStart(2, '0');
  return `${nova.getFullYear()}-${novoMes}-${novoDia}`;
}

export default function PaginaExibeReserva() {
  const navigate = useNavigate();

  // Dia selecionado na agenda (padrão: hoje)
  const [dataSelecionada, setDataSelecionada] = useState(dataHojeIso());

  // Reservas do dia selecionado
  const [agenda, setAgenda] = useState({
    data: null,
    confirmadas: [],
    pendentes: [],
    canceladas: [],
    erro: false,
  });

  const carregando = agenda.data !== dataSelecionada;

  // Busca as reservas sempre que a data selecionada mudar
  useEffect(() => {
    let montado = true;

    const carregarAgenda = async () => {
      const resposta = await getReservasPorData(dataSelecionada);

      if (!montado) return;

      setAgenda({
        data: dataSelecionada,
        confirmadas: resposta?.reservas ?? [],
        pendentes: resposta?.reservas_pendentes ?? [],
        canceladas: resposta?.reservas_canceladas ?? [],
        erro: !resposta,
      });
    };

    carregarAgenda();

    return () => {
      montado = false;
    };
  }, [dataSelecionada]);

  const alteraData = (valor) => {
    if (valor) {
      setDataSelecionada(valor);
    }
  };

  const redirecionaGerencia = () => {
    navigate('gerenciamento');
  };

  const redirecinaAprovadas = () => {
    navigate('/sindico/reservas/exibe/aprovadas');
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <p className="cx-overline">Áreas comuns</p>
          <h2 className="cx-page-title">Reservas de áreas comuns</h2>
          <p className="cx-page-subtitle">
            Acompanhe as solicitações pendentes e as reservas do condomínio no dia selecionado.
          </p>
        </div>

        <div className={styles.actions}>
          <button type="button" className={styles.configButton} onClick={redirecionaGerencia}>
            Áreas comuns
          </button>
          <button type="button" className={styles.configButton} onClick={redirecinaAprovadas}>
            Gerenciar reservas
          </button>
        </div>
      </header>

      <main className={styles.content}>
        {/* Área central: calendário e reservas do dia */}
        <section className={styles.agenda}>
          <div className={styles.dayPicker}>
            <button
              type="button"
              className={styles.dayButton}
              onClick={() => setDataSelecionada(somaDias(dataSelecionada, -1))}
              aria-label="Dia anterior"
            >
              &larr;
            </button>

            <DatePicker
              selected={isoParaData(dataSelecionada)}
              onChange={(dataEscolhida) => alteraData(dataParaIso(dataEscolhida))}
              locale={ptBR}
              dateFormat="dd/MM/yyyy"
              placeholderText="dd/mm/aaaa"
              wrapperClassName={styles.dayInputWrapper}
              className={styles.dayInput}
              calendarClassName={styles.dayCalendar}
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

          {carregando ? (
            <p className={styles.empty}>Carregando reservas do dia...</p>
          ) : agenda.erro ? (
            <p className={styles.error}>Não foi possível carregar as reservas deste dia.</p>
          ) : (
            <>
              <h3 className={styles.sectionTitle}>
                Reservas confirmadas em {formatarDataReserva(dataSelecionada)}
              </h3>
              {agenda.confirmadas.length === 0 ? (
                <p className={styles.empty}>Nenhuma reserva confirmada neste dia.</p>
              ) : (
                <div className={styles.listaCards}>
                  {agenda.confirmadas.map((reserva) => (
                    <CardReservaConfirmadaMini
                      key={reserva.id}
                      espaco={reserva.espaco}
                      inicio={reserva.inicio}
                      fim={reserva.fim}
                      morador={reserva.morador}
                    />
                  ))}
                </div>
              )}

              <h3 className={styles.sectionTitle}>Reservas canceladas</h3>
              {agenda.canceladas.length === 0 ? (
                <p className={styles.empty}>Nenhuma reserva cancelada neste dia.</p>
              ) : (
                <div className={styles.listaCards}>
                  {agenda.canceladas.map((reserva) => (
                    <CardReservaCanceladaMini
                      key={reserva.id}
                      espaco={reserva.espaco}
                      inicio={reserva.inicio}
                      fim={reserva.fim}
                      morador={reserva.morador}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </section>

        {/* Lateral direita: reservas pendentes */}
        <aside className={styles.sidebar}>
          <div>
            <h3 className={styles.sectionTitle}>Reservas pendentes</h3>

            {carregando ? (
              <p className={styles.empty}>Carregando reservas pendentes...</p>
            ) : agenda.erro ? (
              <p className={styles.error}>Não foi possível carregar as reservas pendentes.</p>
            ) : agenda.pendentes.length === 0 ? (
              <p className={styles.empty}>Nenhuma reserva pendente neste dia.</p>
            ) : (
              <div className={styles.listaCards}>
                {agenda.pendentes.map((reserva) => (
                  <CardReservaPendenteMini
                    key={reserva.id}
                    id={reserva.id}
                    espaco={reserva.espaco}
                    inicio={reserva.inicio}
                    fim={reserva.fim}
                    morador={reserva.morador}
                  />
                ))}
              </div>
            )}
          </div>
        </aside>
      </main>
    </div>
  );
}
