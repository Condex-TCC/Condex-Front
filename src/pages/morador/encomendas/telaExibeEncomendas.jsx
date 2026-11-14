//Página que irá exibir as encomendas do morador

//Importações do arquivo
import { useEffect, useState } from "react"
import { getEncomendasMorador } from "../../../service/Encomenda"
import CardEncomendaMorador from "../../../components/morador/cardEncomendaMorador"
import styles from "../../../css/paginaEncomendasMorador.module.css"

//Função que cria um componente
function PaginaExibeEncomendaMorador(){

    //Hook que armazena os dados das encomendas do morador
    const [dadosEncomendas, setDadosEncomendas] = useState({})

    //Função que obtem as encomendas do morador
    const obtendoEncomendas = async () => {

        //Obtendo os dados
        let dados = await getEncomendasMorador()

        //Salvando os dados no state para poderem ser utilizados na página
        setDadosEncomendas(dados)
    }

    //Hook que é executado quando a página é renderizada
    useEffect(() => {

        //Chamando a função que obtem as encomendas
        obtendoEncomendas()

    }, [])

    //Retorna o componente
    return(
        <div className={styles['pagina--encomendas']}>

            {/* Cabeçalho com o título da página */}
            <div className={styles['cabecalho--pagina']}>
                <h1 className={styles['titulo--pagina']}>Encomendas</h1>
            </div>

            {/* Seção com as encomendas que ainda precisam ser retiradas */}
            <section className={styles['secao--encomendas']}>

                <h2 className={styles['subtitulo--secao']}>Encomendas pendentes</h2>
                <p className={styles['descricao--secao']}>Encomendas que você precisa retirar na portaria.</p>

                {/* Lista com os cards das encomendas pendentes */}
                <div className={styles['lista--cards']}>
                    {dadosEncomendas?.encomendas_pendentes?.length === 0 ? (
                        <div className={styles['nao-tem-encomendas']}>No momento não há encomendas pendentes!</div>
                    ) : (
                        dadosEncomendas?.encomendas_pendentes?.map((encomenda) => (
                            <CardEncomendaMorador key={encomenda.id} encomenda={encomenda} />
                        ))
                    )}
                </div>

            </section>

            {/* Seção com as encomendas já retiradas */}
            <section className={styles['secao--encomendas']}>

                <h2 className={styles['subtitulo--secao']}>Encomendas retiradas</h2>
                <p className={styles['descricao--secao']}>Histórico das encomendas já retiradas na portaria.</p>

                {/* Lista com os cards das encomendas retiradas */}
                <div className={styles['lista--cards']}>
                    {dadosEncomendas?.encomendas_retiradas?.length === 0 ? (
                        <div className={styles['nao-tem-encomendas']}>No momento não há encomendas retiradas!</div>
                    ) : (
                        dadosEncomendas?.encomendas_retiradas?.map((encomenda) => (
                            <CardEncomendaMorador key={encomenda.id} encomenda={encomenda} />
                        ))
                    )}
                </div>

            </section>

        </div>
    );
}

//Exporta o componente
export default PaginaExibeEncomendaMorador
