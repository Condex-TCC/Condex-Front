//Importações do arquivo

import { useEffect, useState } from "react"
import { getMoradores } from "../../../api/MoradoresApi"
import { useNavigate } from "react-router-dom"
import CardMorador from "../../../components/sindico/comunicados/cardMorador"
import styles from "../../../css/paginaCadastraRegra.module.css"
import listaStyles from "../../../css/paginaExibeEnvios.module.css"
import selecaoStyles from "../../../css/paginaCadastraComunicados.module.css"


//Função que cria o componente
function PaginaSelecionaMoradorComunicado(){

    //Hook que irá armazenar os moradores
    const [moradoes, setMoradores] = useState([]) //Array de objetos
    const [moradoesSelecionados, setMoradoresSelecionado] = useState([]) //Array de id do tipo int

    //Hook que realiza a navegação
    const navigate = useNavigate()

    //Função que recupera todos os moradores selecionados
    const obtendoMoradores = async () => {

        //Fazendo a requisição
        const response = await getMoradores()

        //Convertendo o JSON para objetos no JS
        let json = await response.json()

        //Desestrutura o promisse
        const { message, status, data} = await json

        //Verifica se houve algum erro na requisição
        if(status != 200){

            //Para a execução do try e lança um erro para o catch
            throw("Erro na requisição " + status)
        }

        //Pegando os moradores
        await setMoradores(data[0])
    }

    //useEffet que será chamando no momento em que se criar a página
    useEffect(() => {

        //Chama a função que recupera os dados
        obtendoMoradores()

    }, [])

    //Função que apenas volta para a tela de cadastro
    const back = () => {

        //Realiza a navegação
        navigate('/sindico/comunicados/cadastrar')
    }

    //Função que irá realizar o retorno para a tela de cadastro, passando os moradores
    const selectedMoradores = () => {

        //Realiza a navegação para a tela de cadastro passando o array de moradores selecionados
        navigate('/sindico/comunicados/cadastrar', {
            state: {
                moradoresSelecionados: moradoesSelecionados
            }
        })
    }

    //Função que seleciona todos os moradores
    const selectAll = () => {

        //Percorre todos os moradores pegando apenas o id de cada um
        let idsMoradores = moradoes.map((morador) => {

            //Retorna o id do morador
            return morador.id
        })

        //Define o array de moradores selecionados com os ids de todos os moradores
        setMoradoresSelecionado(idsMoradores)
    }

    //Lista segura para renderizar (a API pode falhar e devolver undefined)
    const listaMoradores = Array.isArray(moradoes) ? moradoes : []

    //Função que cria o componente
    return(

        // Container principal que engloba tudo
        <div className={styles.container}>

            {/* Cabeçalho da página: contexto, ação concreta e retorno */}
            <header className={selecaoStyles['cabecalho-pagina']}>

                <div>
                    <p className="cx-overline">Comunicação</p>
                    <h2 className="cx-page-title">Selecionar moradores</h2>
                    <p className="cx-page-subtitle">
                        Marque quem vai receber este comunicado e confirme a seleção.
                    </p>
                </div>

                {/* Botão que retorna para a tela de cadastro de comunicados */}
                <button type="button" className={styles.backButton} onClick={back}>
                    &larr; Voltar
                </button>
            </header>

            {/* Barra de ação da seleção: contagem à esquerda, "selecionar todos"
                à direita. A contagem vem do próprio estado — o síndico sabe de
                imediato quantos destinatários já marcou. */}
            <div className={selecaoStyles.toolbar}>
                <span className={selecaoStyles.contagem} aria-live="polite">
                    {moradoesSelecionados.length} de {listaMoradores.length} selecionados
                </span>

                {/* Botão que seleciona todos os moradores de uma só vez */}
                <button
                    type="button"
                    className={selecaoStyles.botaoSelecionar}
                    onClick={selectAll}
                >
                    Selecionar todos
                </button>
            </div>

            {/* Estado vazio: a seleção só faz sentido com a lista de moradores */}
            {listaMoradores.length === 0 && (
                <div className="cx-empty">
                    <span className="cx-empty__icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        </svg>
                    </span>
                    <p className="cx-empty__title">Nenhum morador disponível</p>
                    <p className="cx-empty__text">
                        Assim que os moradores estiverem cadastrados, eles aparecem aqui para seleção.
                    </p>
                </div>
            )}

            {/*Div que agrupa os cards dos moradores*/}
            <div className={listaStyles.listaEnvios}>

                {/* Cards com os moradores que podem ser selecionados */}
                {
                    // Iterando e adicionando os cards
                    listaMoradores.map((morador) => {

                        //Retorna o card do morador
                        return <CardMorador key={morador.id} morador={morador}
                         renderiza={setMoradoresSelecionado} moradoresSelecionados={moradoesSelecionados} ></CardMorador>
                    } )
                }
            </div>

            {/* Área de ação com a confirmação da seleção */}
            <div className={styles.actionsContainer}>

                {/* Botão verde de confirmação da seleção, centralizado na tela */}
                <button
                    type="button"
                    className={styles.buttonAprovar}
                    onClick={selectedMoradores}
                >
                    Selecionar esses moradores
                </button>
            </div>
        </div>
    )
}

//Exportando o componente
export default PaginaSelecionaMoradorComunicado