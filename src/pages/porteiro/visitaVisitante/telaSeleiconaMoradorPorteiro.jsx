//Página de para selecionar o morador

//Importaçoes do arquivo
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useBuscaHeader } from "../../../hooks/useBuscaHeader"
import { interpretarBuscaMorador } from "../../../utils/busca"
import { getMoradoresVisitasPortiero } from "../../../service/VisitasVisitantes"

//Importações do arquivo
import CardMoradorPorteiro from "../../../components/porteiro/cardMoradorPorteiro"
import styles from "../../../css/paginaSelecionaMoradorPorteiro.module.css"


//Função que cria a página
function PaginaSelecionaMoradorPorteiro(){

    //Texto da barra de pesquisa do header, já com atraso depois da digitação
    const { termo } = useBuscaHeader()

    //Hook que armazena os dados
    //Guarda também o termo usado na busca, para saber quando a lista ainda está carregando
    const [resultado, setResultado] = useState({ termo: null, lista: [] })

    //Hook que realiza a navegação
    const navigate = useNavigate()

    //Hook que otem o state passage pela url
    const location = useLocation()

    //Pegando o ID do visitante
    const idVisitante = location.state.id_visitante
    const nomeVisitante = location.state.nome_visitante

    //Indica que a lista do termo atual ainda está sendo buscada
    const carregando = resultado.termo !== termo

    //Lista de moradores exibida na tela
    const cards = resultado.lista

    //Função que retonro para a tela de consulta visitante
    const back = () => {

        //Realiza a navegação
        navigate("/porteiro/visitante/consulta")
    }

    //Função que obtem os dados
    //Recebe o termo buscado para montar os filtros enviados na query string
    const obterDados = async (termoAtual) => {

        //Monta os filtros (?nome= ou ?cpf=) a partir do texto digitado
        const filtros = interpretarBuscaMorador(termoAtual)

        //Chamando a função de obter dadso, enviando os filtros
        const response = await getMoradoresVisitasPortiero(filtros)

        //A API devolve a lista de moradores aninhada em data[0]
        const lista = Array.isArray(response?.[0]) ? response[0] : response

        //Devolve a lista já normalizada
        return lista ?? []
    }

    //Função que é chamada quando a página é renderizada e sempre que a busca muda
    useEffect(() => {

        //Evita atualizar o estado quando a página já saiu de cena ou o termo mudou
        let cancelado = false

        //Função que busca os dados do termo atual
        const carregar = async () => {

            //Chama a função que obtem os dados
            const moradores = await obterDados(termo)

            //Se a busca foi cancelada, não atualiza a tela
            if(cancelado){

                return
            }

            //Salvando os dados no state
            setResultado({ termo, lista: moradores })
        }

        //Chama a função que obtem os dados
        carregar()

        //Limpeza executada quando o termo muda ou a tela sai de cena
        return () => {

            cancelado = true
        }
    }, [termo])

    //Retorna o componente
    return(
        <div className={styles['pagina--seleciona-morador']}>

            {/* Cabeçalho com o título e o botão de voltar na mesma linha */}
            <div className={styles['cabecalho--pagina']}>

                <h1 className={styles['titulo--pagina']}>Seleciona o morador</h1>

                {/* Botão que retorna para a tela de consulta do visitante */}
                <button type="button" className={styles['botao--voltar']} onClick={back}>
                    &larr; Voltar
                </button>

            </div>

            {/* Descrição da tela */}
            <p className={styles['descricao--pagina']}>Selecione o morador que vai receber a visita.</p>

            {/* Div que renderiza os cards de morador do porteiro */}
            <div className={styles['lista--cards']}>
                {carregando ?
                    <p className={styles['aviso--vazio']}>Carregando moradores...</p>
                : cards.length === 0 ?
                    <p className={styles['aviso--vazio']}>
                        {termo.trim() !== ""
                            ? "Nenhum morador encontrado para a busca."
                            : "Nenhum morador cadastrado."}
                    </p>
                :
                    cards.map((morador) => (
                        <CardMoradorPorteiro
                            key={morador.id}
                            morador={morador}
                            id={idVisitante}
                            nome={nomeVisitante}
                            idMorador={morador.id}
                        />
                    ))
                }
            </div>

        </div>
    )
}

//Exportando o visitante
export default PaginaSelecionaMoradorPorteiro
