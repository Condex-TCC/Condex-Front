//Importações do arquivo

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { envioComunicado } from "../../../service/Comunicados";
import styles from "../../../css/paginaCadastraRegra.module.css";
import destaqueStyles from "../../../css/paginaCadastraContraResposta.module.css";
import selecaoStyles from "../../../css/paginaCadastraComunicados.module.css";


//Criando o componente
function PaginaCadastraComunicados(){

    //REGRA DE NEGOCIO: quando for todos os moradores o array deverá ir vazio,
    //já se for para alguns moradores o array irá conter os id dos moarados selecionados

    //Hook de elementos que vai ser utilizados no cadastro
    const [moradoresSelecionados, setMoradoresSelecionado] = useState([])

    //Hook de com os valores que serão recuperados do componente
    const [titulo, setTiulo] = useState("")
    const [descricao, setDescricao] = useState("")

    //Hook que realiza a navegação
    const navigate = useNavigate()

    //Função que volta para a a tela de comunicados
    const back = () => {

        //Realiza a navegação para a tela do sindico
        navigate('/sindico/comunicados')
    } 
    
    //Função que irá redirecionar para a tela de selecionar os moradores
    const selectMorador = () => {

        //TODO: Fazer a lógica mais terde
    }

    //Função que realiza o cadastro do comunicado e realiza o envio
    const CadastrarEnvioComunicado = async () => {

        //Chamando a função que chama a api
        const menssage = await envioComunicado(titulo, descricao, moradoresSelecionados)

        //Exibindo a menssagem
        alert(menssage)

        //Chama a função para redirecioar para os comunicados
        back()
    }

    //Retorna o componente
    return (

        // Container principal que engloba tudo
        <div className={styles.container}>

            {/* Cabeçalho com o título da tela e o botão de voltar */}
            <header className={styles.header}>

                <h1 className={styles.title}>Cadastrar comunicado</h1>

                {/* Botão que retorna para a tela dos comunicados */}
                <button className={styles.backButton} onClick={back}>
                    &larr; Voltar
                </button>
            </header>

            {/* Linha que mostra o destinatário do comunicado e o botão de seleção na outra extremidade */}
            <div className={selecaoStyles.destinatario}>

                {/* Texto que muda conforme existam moradores selecionados ou não */}
                <span className={selecaoStyles.destinatarioTexto}>
                    {moradoresSelecionados.length > 0 ? "Moradores selecionados" : "Todos os moradores cadastrados"}
                </span>

                {/* Botão que leva para a tela de seleção dos moradores */}
                <button className={selecaoStyles.botaoSelecionar} onClick={selectMorador}>
                    Selecionar morador
                </button>
            </div>

            {/* Bloco com o campo onde o síndico escreve o título do comunicado */}
            <div className={destaqueStyles.campoResposta}>

                <label className={destaqueStyles.rotulo} htmlFor="tituloComunicado">Título</label>

                <input
                    id="tituloComunicado"
                    type="text"
                    className={styles.inputTitle}
                    placeholder="Digite o título do comunicado..."
                    value={titulo}
                    onChange={(evento) => setTiulo(evento.target.value)}
                />
            </div>

            {/* Bloco com o campo onde o síndico escreve a descrição do comunicado */}
            <div className={destaqueStyles.campoResposta}>

                <label className={destaqueStyles.rotulo} htmlFor="descricaoComunicado">Descrição</label>

                <textarea
                    id="descricaoComunicado"
                    className={styles.inputDescription}
                    placeholder="Escreva aqui o conteúdo do comunicado..."
                    value={descricao}
                    onChange={(evento) => setDescricao(evento.target.value)}
                />
            </div>

            {/* Botão verde de envio do comunicado, centralizado na tela */}
            <div className={styles.actionsContainer}>

                <button
                    type="button"
                    className={styles.buttonAprovar}
                    onClick={CadastrarEnvioComunicado}
                >
                    Enviar novo comunicado
                </button>
            </div>
        </div>
    );
}

//Exportando o componente
export default PaginaCadastraComunicados