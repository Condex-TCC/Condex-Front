//Card que exibe uma visita na tela inicial do porteiro

//Local das importações
import { useNavigate } from "react-router-dom"
import styles from "../../css/cardVisitaPorteiro.module.css"

//Função que formata uma data da API para o padrão brasileiro
const formatarData = (valor) => {

    //Retorna um traço quando a data não existe na API
    if (!valor) return "-"

    //Convertendo a string da API para data
    const data = new Date(valor)

    //Retorna um traço quando a data é inválida
    if (Number.isNaN(data.getTime())) return "-"

    //Retornando a data formatada
    return data.toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" })
}

//Função que aplica a máscara de CPF quando o valor chega apenas com números
const formatarCpf = (valor) => {

    //Retorna um traço quando o CPF não existe na API
    if (!valor) return "-"

    //Aplicando a máscara apenas em sequências de 11 dígitos
    return String(valor).replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
}

//Função que devolve o texto quando o dado não existe na API
const ouSimbolo = (valor) => valor ?? "-"

//Função que gera as iniciais do visitante para o avatar
const obterIniciais = (nome) => {

    //Retorna um símbolo quando o nome não existe
    if (!nome) return "?"

    //Separando as palavras do nome
    const partes = nome.trim().split(/\s+/)

    //Nome com apenas uma palavra
    if (partes.length === 1) return partes[0].slice(0, 2).toUpperCase()

    //Retornando a primeira letra do primeiro e do último nome
    return (partes[0][0] + partes[partes.length - 1][0]).toUpperCase()
}

//Função que define o status da visita de acordo com os dados da API
const obterStatus = (visita) => {

    //Visita recusada pelo morador
    if (visita.autorizacao === 0 || visita.autorizacao === false) {
        return { texto: "Recusada", classe: "selo--status--recusada", acao: null }
    }

    //Visita que ainda aguarda a autorização do morador
    if (visita.autorizacao == null) {
        return { texto: "Aguardando autorização", classe: "selo--status--pendente", acao: "deletar" }
    }

    //Visita já finalizada, quando existe o registro de saída
    if (visita.saida_registro != null) {
        return { texto: "Finalizada", classe: "selo--status--finalizada", acao: null }
    }

    //Visita em andamento, quando existe o registro de entrada
    if (visita.entrada_registro != null) {
        return { texto: "Em andamento", classe: "selo--status--andamento", acao: "saida" }
    }

    //Visita autorizada, mas que ainda não teve a entrada registrada
    return { texto: "Autorizada", classe: "selo--status--autorizada", acao: "entrada" }
}

//Componente que exibe um rótulo e um valor dentro das grades de informação
function Informacao({ rotulo, valor }) {

    return (
        <div className={styles['linha--informacao']}>
            <span className={styles['rotulo--informacao']}>{rotulo}</span>
            <span className={styles['valor--informacao']}>{ouSimbolo(valor)}</span>
        </div>
    )
}

//Componente que exibe um registro de entrada ou saída da visita
function Registro({ titulo, data, porteiro }) {

    //Registro ainda não realizado
    if (!data) {
        return (
            <div className={styles['registro']}>
                <span className={styles['registro--titulo']}>{titulo}</span>
                <span className={styles['registro--vazio']}>Ainda não registrada</span>
            </div>
        )
    }

    //Registro realizado com os dados do porteiro
    return (
        <div className={styles['registro']}>
            <span className={styles['registro--titulo']}>{titulo}</span>
            <span className={styles['registro--data']}>{formatarData(data)}</span>
            <span className={styles['registro--porteiro']}>Porteiro: {ouSimbolo(porteiro?.nome)}</span>
        </div>
    )
}

//Card estático de visita do porteiro
function CardVisitaPorteiro({ visita }) {

    //Hook que realiza a navegação
    const navigate = useNavigate()

    //Obtendo o status da visita
    const status = obterStatus(visita)

    //Atalho para a unidade do morador visitado
    const unidade = visita.morador?.unidade

    //Função que realiza a navegação para a tela de datlhes
    const navega = () => {

        //Realiza a navegação
        navigate("/porteiro/visitas/detalhe/" + visita.id_visita)
    }

    //Função que exibe o aviso do botão de registrar entrada
    const registrarEntrada = () => {

        alert("Registrando a entrada da visita...")
    }

    //Função que exibe o aviso do botão de registrar saída
    const registrarSaida = () => {

        alert("Registrando a saída da visita...")
    }

    //Função que exibe o aviso do botão de deletar visita
    const deletarVisita = () => {

        alert("Deletando a visita...")
    }

    //Retorna o componente
    return (
        <article className={styles['card--visita']} onClick={navega}>

            {/* Cabeçalho com os dados do visitante e o status da visita */}
            <header className={styles['cabecalho--visita']}>

                {/* Avatar com as iniciais e identificação do visitante */}
                <div className={styles['identificacao--visitante']}>
                    <span className={styles['avatar--visitante']} aria-hidden="true">
                        {obterIniciais(visita.visitante?.name)}
                    </span>

                    <div className={styles['dados--visitante']}>
                        <span className={styles['nome--visitante']}>{ouSimbolo(visita.visitante?.name)}</span>

                        {/* CPF e RG do visitante em formato de etiquetas */}
                        <div className={styles['chips--visitante']}>
                            <span className={styles['chip']}>CPF {formatarCpf(visita.visitante?.cpf)}</span>
                            {visita.visitante?.rg &&
                                <span className={styles['chip']}>RG {visita.visitante.rg}</span>
                            }
                        </div>
                    </div>
                </div>

                {/* Status da visita */}
                <div className={styles['status--visita']}>
                    <span className={`${styles['selo--status']} ${styles[status.classe]}`}>
                        {status.texto}
                    </span>
                </div>

            </header>

            {/* Dados do morador visitado */}
            <section className={styles['secao--visita']}>
                <h3 className={styles['titulo--secao']}>Morador visitado</h3>

                <div className={styles['grade--informacao']}>
                    <Informacao rotulo="Nome" valor={visita.morador?.nome} />
                    <Informacao rotulo="CPF" valor={formatarCpf(visita.morador?.cpf)} />
                </div>
            </section>

            {/* Dados da unidade do morador visitado */}
            <section className={styles['secao--visita']}>
                <h3 className={styles['titulo--secao']}>Unidade</h3>

                <div className={styles['grade--informacao']}>
                    <Informacao rotulo="Bloco" valor={unidade?.bloco} />
                    <Informacao rotulo="Número" valor={unidade?.numero} />
                </div>
            </section>

            {/* Horários previstos da visita */}
            <section className={styles['secao--visita']}>
                <h3 className={styles['titulo--secao']}>Agendamento</h3>

                <div className={styles['grade--informacao']}>
                    <Informacao rotulo="Entrada prevista" valor={formatarData(visita.entrada_prevista)} />
                    <Informacao rotulo="Saída prevista" valor={formatarData(visita.saida_prevista)} />
                </div>
            </section>

            {/* Registros de entrada e saída feitos pelos porteiros */}
            <section className={styles['secao--visita']}>
                <h3 className={styles['titulo--secao']}>Registros</h3>

                <div className={styles['grade--registros']}>
                    <Registro
                        titulo="Entrada"
                        data={visita.entrada_registro}
                        porteiro={visita.porteiro_entrada}
                    />
                    <Registro
                        titulo="Saída"
                        data={visita.saida_registro}
                        porteiro={visita.porteiro_saida}
                    />
                </div>
            </section>

            {/* Ações disponíveis de acordo com o status da visita */}
            {status.acao &&
                <footer className={styles['acoes--visita']}>
                    {status.acao === "entrada" &&
                        <button
                            type="button"
                            className={`${styles['botao--acao']} ${styles['botao--entrada']}`}
                            onClick={registrarEntrada}
                        >
                            Registrar entrada
                        </button>
                    }

                    {status.acao === "saida" &&
                        <button
                            type="button"
                            className={`${styles['botao--acao']} ${styles['botao--saida']}`}
                            onClick={registrarSaida}
                        >
                            Registrar saída
                        </button>
                    }

                    {status.acao === "deletar" &&
                        <button
                            type="button"
                            className={`${styles['botao--acao']} ${styles['botao--deletar']}`}
                            onClick={deletarVisita}
                        >
                            Deletar visita
                        </button>
                    }
                </footer>
            }
        </article>
    )
}

//Exportando o componente para ser utilizado na tela inicial do porteiro
export default CardVisitaPorteiro
