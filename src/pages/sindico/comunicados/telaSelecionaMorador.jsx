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
    const [moradoes, setMoradores] = useState([])
    const [moradoesSelecionados, setMoradoresSelecionado] = useState([])

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

        //TODO: Implementar essa lógica mais tarde

        console.log(moradoesSelecionados)
    }

    //Função que seleciona todos os moradores
    const selectAll = () => {

        //Define o array se moradoresSelecionados como o de moradores
        setMoradoresSelecionado(moradoes)
    }

    //Função que cria o componente
    return(

        // Container principal que engloba tudo
        <div className={styles.container}>

            {/* Cabeçalho com o título da tela e o botão de voltar */}
            <header className={styles.header}>

                <h1 className={styles.title}>Selecionar moradores</h1>

                {/* Botão que retorna para a tela de cadastro de comunicados */}
                <button className={styles.backButton} onClick={back}>
                    &larr; Voltar
                </button>
            </header>

            {/*Div que agrupa os cards dos moradores*/}
            <div className={listaStyles.listaEnvios}>

                {/* Cards com os moradores que podem ser selecionados */}
                {
                    // Iterando e adicionando os cards
                    moradoes.map((morador) => {

                        //Retorna o card do morador
                        return <CardMorador key={morador.id} morador={morador}
                         renderiza={setMoradoresSelecionado} moradoresSelecionados={moradoesSelecionados} ></CardMorador>
                    } )
                }
            </div>

            {/* Área de ação com o botão que seleciona todos e o botão verde de confirmação */}
            <div className={styles.actionsContainer}>

                {/* Botão que seleciona todos os moradores de uma só vez */}
                <button
                    type="button"
                    className={selecaoStyles.botaoSelecionar}
                    onClick={selectAll}
                >
                    Selecionar todos
                </button>

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