//Página que exibe o histórico das visitas do porteiro

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBuscaHeader } from "../../../hooks/useBuscaHeader";
import { interpretarBuscaVisitante } from "../../../utils/busca";
import { getHistoricoVisitasPorterio } from "../../../service/VisitasVisitantes";

//Importações do arquivos
import CardVisitaPorteiro from "../../../components/porteiro/cardVisitaPorteiro";
import styles from "../../../css/paginaHistoricoVisitaPorteiro.module.css";


//Funão que cria o componente
function PaginaHistoricoVisitaPorteiro(){

    //Texto da barra de pesquisa do header, já com atraso depois da digitação
    const { termo } = useBuscaHeader()

    //Hook que armazena os cards
    //Guarda também o termo usado na busca, para saber quando a lista ainda está carregando
    const [resultado, setResultado] = useState({ termo: null, lista: [] })

    //Hook que realiza a navegação
    const navigate = useNavigate()

    //Indica que a lista do termo atual ainda está sendo buscada
    const carregando = resultado.termo !== termo

    //Lista de visitas exibida na tela
    const cards = resultado.lista

    //Função que retorna para a tela principal do porteiro
    const back = () => {

        //Realiza a navegação
        navigate("/porteiro")
    }

    //Função que obtem os dados da API
    //Recebe o termo buscado para montar os filtros enviados na query string
    const obterDados = async (termoAtual) => {

        //Monta os filtros (?nome= ou ?cpf=) a partir do texto digitado
        const filtros = interpretarBuscaVisitante(termoAtual)

        //Chama a função de obter dados, enviando os filtros
        const response = await getHistoricoVisitasPorterio(filtros)

        //Desestruturando o json, tolerando a falha da requisição
        const { visitas } = response ?? {}

        //Devolve a lista já normalizada
        return visitas ?? []
    }

    //Função que é executada quando a página é renderizada e sempre que a busca muda
    useEffect(() => {

        //Evita atualizar o estado quando a página já saiu de cena ou o termo mudou
        let cancelado = false

        //Função que busca os dados do termo atual
        const carregar = async () => {

            //Chama a função que obtem os dados
            const visitas = await obterDados(termo)

            //Se a busca foi cancelada, não atualiza a tela
            if(cancelado){

                return
            }

            //Salvando os dados no state
            setResultado({ termo, lista: visitas })
        }

        //Chama a função que obtem os dados
        carregar()

        //Limpeza executada quando o termo muda ou a tela sai de cena
        return () => {

            cancelado = true
        }
    }, [termo])

    //Retorna um componente
    return(
        <div className={styles['pagina--historico']}>

            {/* Cabeçalho com o título e o botão de voltar na mesma linha */}
            <div className={styles['cabecalho--historico']}>
                <h1 className={styles['titulo--historico']}>Histórico de visitas</h1>

                <button type="button" className={styles['botao--voltar']} onClick={back}>
                    &larr; voltar
                </button>
            </div>

            {/* Div que renderiza os cards presentes no state */}
            <div className={styles['lista--cards']}>
                {carregando ?
                    <p className={styles['aviso--vazio']}>Carregando visitas...</p>
                : cards.length === 0 ?
                    <p className={styles['aviso--vazio']}>
                        {termo.trim() !== ""
                            ? "Nenhuma visita encontrada para a busca."
                            : "Nenhuma visita registrada."}
                    </p>
                :
                    cards.map((visita) => (
                        <CardVisitaPorteiro key={visita?.id_visita} visita={visita} />
                    ))
                }
            </div>
        </div>
    );
}

//Exporta o compente
export default PaginaHistoricoVisitaPorteiro