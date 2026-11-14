//Local das importações
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import styles from "../../css/paginaInicialSindico.module.css"
import { getTelaIncialSindico } from "../../service/TelaInicial"

//Página inicial do sindico
//
//APRESENTAÇÃO: os dados exibidos são os mesmos de sempre
//(pendentes, em andamento e últimos comunicados). O que muda
//é a composição — cabeçalho de página, grade de dois painéis
//e estados vazios com hierarquia — para que a tela use bem a
//largura disponível em vez de deixar um bloco solto no meio.

//Função que cria o componente do sindico
function PaginainicialSindico(){
    
  //Hook que armazena os dados 
  const [dadosTelaInical, setDadosTelaInical] = useState([])

  //Hook que realiza a navegação entre as páginas
  const navigate = useNavigate()

  //Função que redireciona para a tela de reclamações não respondidas
  const redirecionaReclamacoes = () => {

    //Realiza a navegação para a tela de reclamações
    navigate("/sindico/reclamacoes/exibir")
  }

  //Função que redireciona para a tela de aprovação de reservas
  const redirecionaAprovacaoReservas = () => {

    //Realiza a navegação para a tela de reservas que precisam de aprovação
    navigate("/sindico/reservas/exibe/aprovadas")
  }

  //Função que redireciona para as respostas dos comunicados não respondidos
  const redirecionaRespostasComunicados = () => {

    //Realiza a navegação para a tela de respostas dos comunicados
    navigate("/sindico/comunicados/respostas")
  }

  //Função que redireciona para os envios de um comunicado específico
  const redirecionaEnviosComunicado = (id) => {

    //Realiza a navegação passando o id do comunicado na URL
    navigate("/sindico/comunicados/envios/" + id)
  }

  //Função que obtem os dados para a tela inicial do sindico
  const obtendoDadosTelaInicial = async () => {

    //Obtendo os dados
    let dados = await getTelaIncialSindico()

    //Salvando os dados no state para poderem ser utilizados na página
    setDadosTelaInical(dados)
    console.log(dados)
  }

  //Hook que é executado quando a página é renderizada
  useEffect(() => {

    //Chamando a função que obtem os dados para a tela inicial
    obtendoDadosTelaInicial()
    
  }, [])

  //Dados dos moradores e porteiros cadastrados utilizados no gráfico de pizza
  const dadosStatusCondominio = [
    {
      nome: "Moradores",
      quantidade: dadosTelaInical?.status_condominio?.morador ?? 0,
      cor: "#2b45a2"
    },
    {
      nome: "Porteiros",
      quantidade: dadosTelaInical?.status_condominio?.porteiro ?? 0,
      cor: "#33c3f0"
    }
  ]

  //Total de usuários cadastrados no condomínio
  const totalUsuarios = dadosTelaInical?.status_condominio?.total
    ?? (dadosStatusCondominio[0].quantidade + dadosStatusCondominio[1].quantidade)

    //Retorna um componente
    return (
    <div className={styles['dashboard--principal']}>

      {/* Cabeçalho da página: contexto, título e apoio (padrão cx-page-header)
          e, à direita, a data de hoje por extenso */}
      <header className={styles['cabecalho--dashboard']}>

        {/* Bloco da esquerda com o título e o subtítulo */}
        <div className={styles['cabecalho--texto']}>
          <p className="cx-overline">Painel do condomínio</p>
          <h2 className="cx-page-title">Olá, Síndico!</h2>
          <p className="cx-page-subtitle">
            Aqui está um resumo das principais informações do seu condomínio.
          </p>
        </div>

        {/* Bloco da direita com a data de hoje por extenso */}
        <div className={styles['bloco--data']}>
          <span className={styles['icone--data']} aria-hidden="true">📅</span>
          <span className={styles['texto--data']}>
            {new Date().toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
          </span>
        </div>

      </header>

      {/* Cards de resumo do dia */}
      <div className={styles['container--resumo']}>

        {/* Card de reclamações não respondidas */}
        <div
          className={`${styles['cartao--resumo']} ${styles['cartao--resumo--perguntas']}`}
          onClick={redirecionaReclamacoes}
        >
          <div className={`${styles['caixa--icone']} ${styles['caixa--icone--perguntas']}`}>
            <span className={styles['icone--resumo']}>❓</span>
          </div>
          <div className={styles['conteudo--cartao--resumo']}>
            <span className={styles['titulo--cartao--resumo']}>Reclamações não respondidas</span>
            <span className={styles['valor--resumo']}>{dadosTelaInical?.quant_reclamacoes}</span>
          </div>
          <span className={styles['seta--cartao--resumo']}>›</span>
        </div>

        {/* Card de reservas pendentes */}
        <div
          className={`${styles['cartao--resumo']} ${styles['cartao--resumo--reservas']}`}
          onClick={redirecionaAprovacaoReservas}
        >
          <div className={`${styles['caixa--icone']} ${styles['caixa--icone--reservas']}`}>
            <span className={styles['icone--resumo']}>📅</span>
          </div>
          <div className={styles['conteudo--cartao--resumo']}>
            <span className={styles['titulo--cartao--resumo']}>Reservas pendentes</span>
            <span className={styles['valor--resumo']}>{dadosTelaInical?.quant_reservas}</span>
          </div>
          <span className={styles['seta--cartao--resumo']}>›</span>
        </div>

        {/* Card de respostas não lidas */}
        <div
          className={`${styles['cartao--resumo']} ${styles['cartao--resumo--comunicados']}`}
          onClick={redirecionaRespostasComunicados}
        >
          <div className={`${styles['caixa--icone']} ${styles['caixa--icone--comunicados']}`}>
            <span className={styles['icone--resumo']}>💬</span>
          </div>
          <div className={styles['conteudo--cartao--resumo']}>
            <span className={styles['titulo--cartao--resumo']}>Respostas não lidas</span>
            <span className={styles['valor--resumo']}>{dadosTelaInical?.quant_comunicados}</span>
          </div>
          <span className={styles['seta--cartao--resumo']}>›</span>
        </div>

      </div>

      {/* Painéis de resumo, comunicados e status */}
      <div className={styles['container--paineis']}>

        {/* Painel com o resumo gerado por IA */}
        <div className={`${styles['cartao--painel']} ${styles['cartao--painel--resumo']}`}>
          <div className={styles['cabecalho--painel']}>
            <span className={styles['icone--painel']}>✨</span>
            <h2 className={styles['titulo--painel']}>Resumo do condomínio</h2>
            <span className={styles['etiqueta--ia']}>Gerado por IA</span>
          </div>
          <div className={styles['conteudo--painel']}>
            <p className={styles['texto--resumo']}>{dadosTelaInical?.resumo_condominio}</p>
          </div>
        </div>

        {/* Painel com os comunicados recentes */}
        <div className={`${styles['cartao--painel']} ${styles['cartao--painel--comunicados']}`}>
          <div className={styles['cabecalho--painel']}>
            <span className={styles['icone--painel']}>📢</span>
            <h2 className={styles['titulo--painel']}>Comunicados recentes</h2>
          </div>
          <div className={styles['conteudo--painel']}>
            {dadosTelaInical?.top_comunicados?.length === 0 ? (
              <div className={styles['nao-tem-comunicados']}>No momento não tem comunidacos!</div>
            ) : (
              dadosTelaInical?.top_comunicados?.map((comunicado) => (
                <div
                  className={styles['item--comunicado']}
                  key={comunicado.id}
                  onClick={() => redirecionaEnviosComunicado(comunicado.id)}
                >
                  <span className={styles['icone--comunicado']}>📢</span>
                  <div className={styles['texto--comunicado']}>
                    <span className={styles['titulo--comunicado']}>{comunicado.titulo}</span>
                    <span className={styles['descricao--comunicado']}>{comunicado.descricao}</span>
                  </div>
                  <span className={styles['data--comunicado']}>
                    {new Date(comunicado.criado_em).toLocaleDateString("pt-BR")}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Painel com o status do condomínio */}
        <div className={`${styles['cartao--painel']} ${styles['cartao--painel--status']}`}>
          <div className={styles['cabecalho--painel']}>
            <span className={styles['icone--painel']}>📊</span>
            <h2 className={styles['titulo--painel']}>Status do condomínio</h2>
          </div>
          <div className={styles['conteudo--painel']}>
            {totalUsuarios === 0 ? (

              /* Mensagem exibida quando ainda não existem usuários cadastrados */
              <div className={styles['sem-dados--status']}>
                Nenhum morador ou porteiro cadastrado no momento.
              </div>
            ) : (

              /* Gráfico de pizza com a legenda ao lado */
              <div className={styles['status--condominio']}>

                {/* Gráfico de pizza com a divisão entre moradores e porteiros */}
                <div className={styles['grafico--status']}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={dadosStatusCondominio}
                        dataKey="quantidade"
                        nameKey="nome"
                        outerRadius="96%"
                        paddingAngle={2}
                        cornerRadius={4}
                        stroke="none"
                      >
                        {dadosStatusCondominio.map((usuario) => (
                          <Cell key={usuario.nome} fill={usuario.cor} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(valor, nome) => [valor + " cadastrados", nome]}
                        contentStyle={{
                          padding: "8px 12px",
                          background: "#ffffff",
                          border: "1px solid #e4eaf2",
                          borderRadius: "10px",
                          boxShadow: "0 8px 24px rgba(16, 24, 40, 0.1)",
                          fontSize: "12px"
                        }}
                        itemStyle={{ color: "#1f2a44", fontWeight: 600 }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Legenda com a quantidade de cada tipo de usuário */}
                <div className={styles['legenda--status']}>
                  {dadosStatusCondominio.map((usuario) => (
                    <div className={styles['item--legenda--status']} key={usuario.nome}>
                      <span
                        className={styles['bolinha--legenda--status']}
                        style={{ backgroundColor: usuario.cor }}
                      ></span>
                      <span className={styles['texto--legenda--status']}>{usuario.nome}</span>
                      <span className={styles['quantidade--legenda--status']}>{usuario.quantidade}</span>
                    </div>
                  ))}

                  <div className={styles['divisor--legenda--status']}></div>

                  <div className={styles['total--legenda--status']}>
                    <span className={styles['texto--total--status']}>Total cadastrado</span>
                    <span className={styles['quantidade--total--status']}>{totalUsuarios}</span>
                  </div>
                </div>

              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  )
}

//Exportando o compomente para ser utilizado em outra página
export default PaginainicialSindico
