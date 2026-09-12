// Tela de confirmação de retirada de uma encomenda
//
// OBS: o protótipo pedia um campo "Retirada por" (nome de quem retirou) e uma data/hora
// manual. O endpoint de retirada (PUT /porteiro/encomenda/withdraw/{id}) não aceita esses
// dados — ele apenas grava a data/hora atual no servidor. Por isso essa tela virou uma
// confirmação: mostra os dados da encomenda e, ao confirmar, registra a retirada agora.
//
// A API também não tem uma rota "show" de encomenda para o porteiro (só para o morador),
// então os dados da encomenda vêm preferencialmente da navegação (state do CardEncomenda);
// se a página for aberta direto pela URL (ex: F5), eles são buscados na listagem completa.

import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styles from '../../css/paginaEncomenda.module.css';
import { Carregando, ErroDeCarregamento } from '../../components/common/EstadosDeLista';
import { obtendoEncomendas, retirarEncomenda } from '../../service/Encomenda';
import { formatarDataHora } from '../../service/formatadores';

function RetiradaEncomenda() {

  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Tenta usar a encomenda que já veio da tela anterior (evita uma requisição extra)
  const [encomenda, setEncomenda] = useState(location.state?.encomenda || null);
  const [carregando, setCarregando] = useState(!location.state?.encomenda);
  const [erro, setErro] = useState(null);

  const [confirmando, setConfirmando] = useState(false);

  // Se a tela foi aberta direto pela URL (sem vir do card), busca a encomenda na listagem
  useEffect(() => {

    if (encomenda) return;

    const buscarEncomenda = async () => {

      setCarregando(true);
      setErro(null);

      const lista = await obtendoEncomendas();

      const encontrada = lista.find((item) => String(item.id) === String(id));

      if (encontrada) {

        setEncomenda(encontrada);

      } else {

        setErro('Encomenda não encontrada.');
      }

      setCarregando(false);
    };

    buscarEncomenda();

  }, [id, encomenda]);

  const voltar = () => {
    navigate('/porteiro');
  };

  const confirmarRetirada = async () => {

    setConfirmando(true);

    const resultado = await retirarEncomenda(id);

    setConfirmando(false);

    if (resultado.sucesso) {

      alert(resultado.mensagem || 'Retirada registrada com sucesso!');

      navigate('/porteiro');

    } else {

      alert(resultado.mensagem);
    }
  };

  return (
    <div className={styles.container}>

      {/* Cabeçalho */}
      <header className={styles.header}>

        <div className={styles.logo}>
          Cond<span>ex</span>
        </div>

        <div className={styles.pesquisa}>
          <span className={styles.iconePesquisa}>⌕</span>
          <input type="text" placeholder="Pesquisar..." />
        </div>

        <div className={styles.usuario}>MJ</div>

      </header>

      {/* Área principal */}
      <main className={styles.main}>

        <button className={styles.btnVoltar} onClick={voltar} type="button">
          <span>←</span>
          voltar
        </button>

        <h1 className={styles.titulo}>
          Retirada de encomenda
        </h1>

        {carregando && <Carregando texto="Carregando encomenda..." />}

        {!carregando && erro && (
          <ErroDeCarregamento texto={erro} />
        )}

        {!carregando && !erro && encomenda && (
          <>
            <div className={styles.resumo}>

              <p className={styles.resumoTitulo}>
                Destinatário: {encomenda.nome}
              </p>

              <p className={styles.resumoLinha}>
                {encomenda.descricao}
              </p>

              {encomenda.created_at && (
                <p className={styles.resumoLinha}>
                  Recebido em: {formatarDataHora(encomenda.created_at) ?? '—'}
                </p>
              )}

            </div>

            <p className={styles.avisoRetirada}>
              A retirada será registrada agora, com a data e o horário atuais.
            </p>

            <div className={styles.areaSalvar}>

              <button
                className={styles.btnSalvar}
                onClick={confirmarRetirada}
                disabled={confirmando}
                type="button"
              >
                {confirmando ? 'CONFIRMANDO...' : 'CONFIRMAR RETIRADA'}
              </button>

            </div>
          </>
        )}

      </main>

    </div>
  );
}

export default RetiradaEncomenda;
