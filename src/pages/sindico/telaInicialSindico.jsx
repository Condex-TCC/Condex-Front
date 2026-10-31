//Local das importações
import { useEffect, useState } from "react"
import styles from "../../css/paginaInicialSindico.module.css"
import { getTelaIncialSindico } from "../../service/TelaInicial"

//Página inicial do sindico

//Função que cria o componente do sindico
function PaginainicialSindico(){
    
  //Hook que armazena os dados 
  const [dadosTelaInical, setDadosTelaInical] = useState([])

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

    //Retorna um componente
    return (
    <div className={styles['dashboard--principal']}>

      {/* Cabeçalho com a saudação e a data atual */}
      <div className={styles['cabecalho--dashboard']}>

        {/* Bloco da esquerda com o título e o subtítulo */}
        <div className={styles['cabecalho--texto']}>
          <h1 className={styles['titulo--boas-vindas']}>Olá, Síndico! 👋</h1>
          <p className={styles['subtitulo--boas-vindas']}>
            Aqui está um resumo das principais informações do seu condomínio.
          </p>
        </div>

        {/* Bloco da direita com a data de hoje por extenso */}
        <div className={styles['bloco--data']}>
          <span className={styles['icone--data']}>📅</span>
          <span className={styles['texto--data']}>
            {new Date().toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
          </span>
        </div>

      </div>

      {/* Cards de resumo do dia */}
      <div className={styles['container--resumo']}>

        {/* Card de reclamações não respondidas */}
        <div className={`${styles['cartao--resumo']} ${styles['cartao--resumo--perguntas']}`}>
          <div className={`${styles['caixa--icone']} ${styles['caixa--icone--perguntas']}`}>
            <span className={styles['icone--resumo']}>❓</span>
          </div>
          <div className={styles['conteudo--cartao--resumo']}>
            <span className={styles['titulo--cartao--resumo']}>Reclamações não respondidas</span>
            <span className={styles['valor--resumo']}>{dadosTelaInical?.quant_reclamacoes}</span>
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
            <span className={styles['valor--resumo']}>{dadosTelaInical?.quant_reservas}</span>
          </div>
          <span className={styles['seta--cartao--resumo']}>›</span>
          {/* TODO: o redirecionamento será implementado mais tarde */}
        </div>

        {/* Card de respostas não lidas */}
        <div className={`${styles['cartao--resumo']} ${styles['cartao--resumo--comunicados']}`}>
          <div className={`${styles['caixa--icone']} ${styles['caixa--icone--comunicados']}`}>
            <span className={styles['icone--resumo']}>💬</span>
          </div>
          <div className={styles['conteudo--cartao--resumo']}>
            <span className={styles['titulo--cartao--resumo']}>Respostas não lidas</span>
            <span className={styles['valor--resumo']}>{dadosTelaInical?.quant_comunicados}</span>
          </div>
          <span className={styles['seta--cartao--resumo']}>›</span>
          {/* TODO: o redirecionamento será implementado mais tarde */}
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
                <div className={styles['item--comunicado']} key={comunicado.id}>
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
          {/* TODO: o status do condomínio será implementado mais tarde */}
        </div>

      </div>

    </div>
  )
}

//Exportando o compomente para ser utilizado em outra página
export default PaginainicialSindico