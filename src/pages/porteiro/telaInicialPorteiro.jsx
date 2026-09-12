// Tela inicial do porteiro
// Mostra duas abas: Visitantes (pré-cadastrados / ativos) e Encomendas (pendentes / retiradas)

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../css/paginainicialPorteiro.module.css";
import { Carregando, ErroDeCarregamento, ListaVazia } from "../../components/common/EstadosDeLista";
import CardVisitante from "../../components/porteiro/CardVisitante";
import CardEncomenda from "../../components/porteiro/CardEncomenda";
import { liberarEntrada, obtendoAutorizados, registrarSaida } from "../../service/Autorizacao";
import { obtendoEncomendas } from "../../service/Encomenda";

function PaginainicialPorteiro() {

    const navigate = useNavigate();

    // Controla qual aba está selecionada: "visitantes" ou "encomendas"
    const [abaAtiva, setAbaAtiva] = useState("visitantes");

    // ---------- Estado da aba Visitantes ----------
    // Lista de autorizações com status "autorizado" (pré-cadastrados)
    const [preCadastrados, setPreCadastrados] = useState([]);

    // Lista de autorizações que já tiveram a entrada liberada nesta sessão (ativos).
    // OBS: a API não tem um endpoint para listar quem está com "entrada_realizada",
    // por isso esse controle é feito aqui no front, a partir do momento em que o
    // porteiro libera a entrada. Ele não sobrevive a um F5 da página.
    const [ativos, setAtivos] = useState([]);

    const [carregandoVisitantes, setCarregandoVisitantes] = useState(true);
    const [erroVisitantes, setErroVisitantes] = useState(null);

    // Guarda o id da autorização que está com uma ação em andamento (liberar/registrar saída),
    // para desabilitar só o botão daquela linha, e não a lista inteira
    const [idEmAcao, setIdEmAcao] = useState(null);

    // ---------- Estado da aba Encomendas ----------
    const [encomendas, setEncomendas] = useState([]);
    const [carregandoEncomendas, setCarregandoEncomendas] = useState(true);
    const [erroEncomendas, setErroEncomendas] = useState(null);

    // Função que busca os visitantes pré-cadastrados (autorizados) na API
    const carregarVisitantes = async () => {

        setCarregandoVisitantes(true);
        setErroVisitantes(null);

        try {

            const autorizados = await obtendoAutorizados();

            setPreCadastrados(autorizados);

        } catch (erro) {

            console.error(erro);
            setErroVisitantes("Não foi possível carregar os visitantes.");

        } finally {

            setCarregandoVisitantes(false);
        }
    };

    // Função que busca as encomendas cadastradas na API
    const carregarEncomendas = async () => {

        setCarregandoEncomendas(true);
        setErroEncomendas(null);

        try {

            const lista = await obtendoEncomendas();

            setEncomendas(lista);

        } catch (erro) {

            console.error(erro);
            setErroEncomendas("Não foi possível carregar as encomendas.");

        } finally {

            setCarregandoEncomendas(false);
        }
    };

    // Carrega os dados das duas abas assim que a tela é montada
    useEffect(() => {

        carregarVisitantes();
        carregarEncomendas();

    }, []);

    // Função que libera a entrada de um visitante pré-cadastrado
    const aoLiberarEntrada = async (idAutorizacao) => {

        setIdEmAcao(idAutorizacao);

        const resultado = await liberarEntrada(idAutorizacao);

        if (resultado.sucesso) {

            // Move o item de "pré-cadastrados" para "ativos" sem precisar recarregar a lista inteira
            setPreCadastrados((atuais) => atuais.filter((item) => item.id !== idAutorizacao));

            setAtivos((atuais) => [...atuais, resultado.autorizacao]);

        } else {

            alert(resultado.mensagem);
        }

        setIdEmAcao(null);
    };

    // Função que registra a saída de um visitante ativo
    const aoRegistrarSaida = async (idAutorizacao) => {

        setIdEmAcao(idAutorizacao);

        const resultado = await registrarSaida(idAutorizacao);

        if (resultado.sucesso) {

            // Remove o visitante da lista de ativos (a saída já foi registrada no servidor)
            setAtivos((atuais) => atuais.filter((item) => item.id !== idAutorizacao));

        } else {

            alert(resultado.mensagem);
        }

        setIdEmAcao(null);
    };

    // Navega para a tela de cadastro (o botão "+" muda de ação conforme a aba ativa)
    const abrirCadastro = () => {

        if (abaAtiva === "visitantes") {

            navigate("/porteiro/RegistroVisitante");

        } else {

            navigate("/porteiro/CadastrarEncomenda");
        }
    };

    // Separa as encomendas em pendentes (sem data_retirada) e retiradas (com data_retirada)
    const encomendasPendentes = encomendas.filter((encomenda) => !encomenda.data_retirada);
    const encomendasRetiradas = encomendas.filter((encomenda) => Boolean(encomenda.data_retirada));

    return (
        <div className={styles['dashboard--container']}>

            <div className={styles['header--section']}>

                <div className={styles['tabs--group']}>

                    <button
                        className={abaAtiva === "visitantes" ? styles['tab--active'] : styles['tab--inactive']}
                        onClick={() => setAbaAtiva("visitantes")}
                    >
                        Visitantes
                    </button>

                    <button
                        className={abaAtiva === "encomendas" ? styles['tab--active'] : styles['tab--inactive']}
                        onClick={() => setAbaAtiva("encomendas")}
                    >
                        Encomendas
                    </button>

                </div>

                <button
                    className={styles['btn--add']}
                    onClick={abrirCadastro}
                >
                    {abaAtiva === "visitantes" ? "+ Registrar visitante" : "+ Cadastrar encomenda"}
                </button>

            </div>

            {/* ---------- Conteúdo da aba Visitantes ---------- */}
            {abaAtiva === "visitantes" && (
                <>
                    <div className={styles['list--section']}>

                        <h2 className={styles['section--title']}>
                            Pré cadastrados
                        </h2>

                        {carregandoVisitantes && <Carregando texto="Carregando visitantes..." />}

                        {!carregandoVisitantes && erroVisitantes && (
                            <ErroDeCarregamento texto={erroVisitantes} aoTentarNovamente={carregarVisitantes} />
                        )}

                        {!carregandoVisitantes && !erroVisitantes && preCadastrados.length === 0 && (
                            <ListaVazia texto="Não há visitantes pré-cadastrados." />
                        )}

                        {!carregandoVisitantes && !erroVisitantes && preCadastrados.map((autorizacao) => (
                            <CardVisitante
                                key={autorizacao.id}
                                autorizacao={autorizacao}
                                tipo="pre-cadastrado"
                                aoLiberarEntrada={aoLiberarEntrada}
                                carregando={idEmAcao === autorizacao.id}
                            />
                        ))}

                    </div>

                    <div className={styles['list--section']}>

                        <h2 className={styles['section--title']}>
                            Visitantes ativos
                        </h2>

                        {!carregandoVisitantes && ativos.length === 0 && (
                            <ListaVazia texto="Não há visitantes ativos." />
                        )}

                        {ativos.map((autorizacao) => (
                            <CardVisitante
                                key={autorizacao.id}
                                autorizacao={autorizacao}
                                tipo="ativo"
                                aoRegistrarSaida={aoRegistrarSaida}
                                carregando={idEmAcao === autorizacao.id}
                            />
                        ))}

                    </div>
                </>
            )}

            {/* ---------- Conteúdo da aba Encomendas ---------- */}
            {abaAtiva === "encomendas" && (
                <>
                    <div className={styles['list--section']}>

                        <h2 className={styles['section--title']}>
                            Pendentes
                        </h2>

                        {carregandoEncomendas && <Carregando texto="Carregando encomendas..." />}

                        {!carregandoEncomendas && erroEncomendas && (
                            <ErroDeCarregamento texto={erroEncomendas} aoTentarNovamente={carregarEncomendas} />
                        )}

                        {!carregandoEncomendas && !erroEncomendas && encomendasPendentes.length === 0 && (
                            <ListaVazia texto="Não há encomendas pendentes." />
                        )}

                        {!carregandoEncomendas && !erroEncomendas && encomendasPendentes.map((encomenda) => (
                            <CardEncomenda key={encomenda.id} encomenda={encomenda} />
                        ))}

                    </div>

                    <div className={styles['list--section']}>

                        <h2 className={styles['section--title']}>
                            Retiradas
                        </h2>

                        {!carregandoEncomendas && !erroEncomendas && encomendasRetiradas.length === 0 && (
                            <ListaVazia texto="Não há encomendas retiradas." />
                        )}

                        {!carregandoEncomendas && !erroEncomendas && encomendasRetiradas.map((encomenda) => (
                            <CardEncomenda key={encomenda.id} encomenda={encomenda} />
                        ))}

                    </div>
                </>
            )}

        </div>
    );
}

export default PaginainicialPorteiro;
