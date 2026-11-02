//Página inicial do morador

//Importações do arquivos
import { useEffect, useState } from "react"
import styles from "../../css/paginaInicialMorador.module.css"
import { getTelaInicialMorador } from "../../service/TelaInicial"

//Função que cria a componente
function PaginaInicalMorador(){

    //Hook que armazena os dados
    const [dadosTelaInicial, setDadosTelaInicial] = useState({})

    //Função que obtem os dados para a tela inicial do morador
    const obtendoDadosTelaInicial = async () => {

        //Obtendo os dados
        let dados = await getTelaInicialMorador()

        //Salvando os dados no state para poderem ser utilizados na página
        setDadosTelaInicial(dados)
    }

    //Hook que é executado quando a página é renderizada
    useEffect(() => {

        //Chamando a função que obtem os dados para a tela inicial
        obtendoDadosTelaInicial()

    }, [])

    //Retorna o componente da função
    return(
        <div className={styles['dashboard--principal']}>

            {/* Cabeçalho com a saudação do morador */}
            <div className={styles['cabecalho--dashboard']}>

                {/* Bloco com o título e o subtítulo */}
                <div className={styles['cabecalho--texto']}>
                    <h1 className={styles['titulo--boas-vindas']}>Olá, Morador! 👋</h1>
                    <p className={styles['subtitulo--boas-vindas']}>
                        Aqui está um resumo das suas informações no condomínio.
                    </p>
                </div>

            </div>

            {/* Cards de resumo do dia */}
            <div className={styles['container--resumo']}>

                {/* Card de comunicados não vistos */}
                <div className={`${styles['cartao--resumo']} ${styles['cartao--resumo--comunicados']}`}>
                    <div className={`${styles['caixa--icone']} ${styles['caixa--icone--comunicados']}`}>
                        <span className={styles['icone--resumo']}>💬</span>
                    </div>
                    <div className={styles['conteudo--cartao--resumo']}>
                        <span className={styles['titulo--cartao--resumo']}>Comunicados não vistos</span>
                        <span className={styles['valor--resumo']}>{dadosTelaInicial?.quant_comunicados}</span>
                    </div>
                    <span className={styles['seta--cartao--resumo']}>›</span>
                    {/* TODO: o redirecionamento será implementado mais tarde */}
                </div>

                {/* Card de reservas pendentes */}
                <div className={`${styles['cartao--resumo']} ${styles['cartao--resumo--reservas']}`}>
                    <div className={`${styles['caixa--icone']} ${styles['caixa--icone--reservas']}`}>
                        <span className={styles['icone--resumo']}>📅</span>
                    </div>
                    <div className={styles['conteudo--cartao--resumo']}>
                        <span className={styles['titulo--cartao--resumo']}>Reservas pendentes</span>
                        <span className={styles['valor--resumo']}>{dadosTelaInicial?.quant_reservas}</span>
                    </div>
                    <span className={styles['seta--cartao--resumo']}>›</span>
                    {/* TODO: o redirecionamento será implementado mais tarde */}
                </div>

                {/* Card de encomendas aguardando retirada */}
                <div className={`${styles['cartao--resumo']} ${styles['cartao--resumo--encomendas']}`}>
                    <div className={`${styles['caixa--icone']} ${styles['caixa--icone--encomendas']}`}>
                        <span className={styles['icone--resumo']}>📦</span>
                    </div>
                    <div className={styles['conteudo--cartao--resumo']}>
                        <span className={styles['titulo--cartao--resumo']}>Encomendas aguardando retirada</span>
                        <span className={styles['valor--resumo']}>{dadosTelaInicial?.quant_encomendas}</span>
                    </div>
                    <span className={styles['seta--cartao--resumo']}>›</span>
                    {/* TODO: o redirecionamento será implementado mais tarde */}
                </div>

            </div>

            {/* Painéis de reservas e comunicados */}
            <div className={styles['container--paineis']}>

                {/* Painel com as próximas reservas */}
                <div className={`${styles['cartao--painel']} ${styles['cartao--painel--reservas']}`}>
                    <div className={styles['cabecalho--painel']}>
                        <span className={styles['icone--painel']}>📅</span>
                        <h2 className={styles['titulo--painel']}>Próximas reservas</h2>
                    </div>
                    <div className={styles['conteudo--painel']}>
                        {dadosTelaInicial?.top_reservas?.length === 0 ? (
                            <div className={styles['nao-tem-reservas']}>No momento não há reservas!</div>
                        ) : (
                            dadosTelaInicial?.top_reservas?.map((reserva) => (
                                <div className={styles['item--reserva']} key={reserva.id}>
                                    <div className={styles['data--reserva']}>
                                        <span className={styles['dia--reserva']}>
                                            {new Date(reserva?.data + "T00:00:00").toLocaleDateString("pt-BR", { day: "2-digit" })}
                                        </span>
                                        <span className={styles['mes--reserva']}>
                                            {new Date(reserva?.data + "T00:00:00").toLocaleDateString("pt-BR", { month: "short" }).replace(".", "")}
                                        </span>
                                    </div>
                                    <div className={styles['texto--reserva']}>
                                        <span className={styles['espaco--reserva']}>{reserva?.espaco?.nome}</span>
                                        <span className={styles['horario--reserva']}>
                                            {reserva?.inicio?.slice(0, 5)} - {reserva?.fim?.slice(0, 5)}
                                        </span>
                                    </div>
                                    <span className={reserva?.status === "pendente"
                                        ? `${styles['selo--status']} ${styles['selo--status--pendente']}`
                                        : `${styles['selo--status']} ${styles['selo--status--neutro']}`}>
                                        {reserva?.status}
                                    </span>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Painel com os comunicados recentes */}
                <div className={`${styles['cartao--painel']} ${styles['cartao--painel--comunicados']}`}>
                    <div className={styles['cabecalho--painel']}>
                        <span className={styles['icone--painel']}>📢</span>
                        <h2 className={styles['titulo--painel']}>Comunicados recentes</h2>
                    </div>
                    <div className={styles['conteudo--painel']}>
                        {dadosTelaInicial?.top_comunicados?.length === 0 ? (
                            <div className={styles['nao-tem-comunicados']}>No momento não há comunicados!</div>
                        ) : (
                            dadosTelaInicial?.top_comunicados?.map((item) => (
                                <div className={styles['item--comunicado']} key={item.id}>
                                    <span className={styles['icone--comunicado']}>📢</span>
                                    <div className={styles['texto--comunicado']}>
                                        <div className={styles['linha--titulo--comunicado']}>
                                            <span className={styles['titulo--comunicado']}>{item.comunicado?.titulo}</span>
                                            {item.visualizado === false && (
                                                <span className={styles['selo--novo']}>Novo</span>
                                            )}
                                        </div>
                                        <span className={styles['descricao--comunicado']}>{item.comunicado?.descricao}</span>
                                    </div>
                                    <span className={styles['data--comunicado']}>
                                        {new Date(item.comunicado?.criado_em).toLocaleDateString("pt-BR")}
                                    </span>
                                </div>
                            ))
                        )}
                    </div>
                </div>

            </div>

        </div>
    );
}

//Exportando o componente
export default PaginaInicalMorador
