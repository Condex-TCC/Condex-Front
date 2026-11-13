//Pagina para o porteiro cadastrar a visita

//Importações do arquivo
import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { cadastraVisitaPorteiro } from "../../../service/VisitasVisitantes"

//Importações do arquivo
import styles from "../../../css/paginaCadastraVisitaPorteiro.module.css"
import DatePicker from "react-datepicker"
import { ptBR } from "date-fns/locale"
import "react-datepicker/dist/react-datepicker.css"


//Função que cria o componente
function PaginaCadastraVisitaPorteiro(){

    //Hook que armazena os dados que vão ser utilizados para salvar os dados
    const [entrada, setEntrada] = useState(null)
    const [saida, setSaida] = useState(null)

    //Hook que realiza a navegação
    const navigate = useNavigate()

    //Hook que obtem os dados passados pelo state
    const location = useLocation()

    //Pegando o ID e nome do visitante
    const idVisitante = location.state.id_visitante
    const nome = location.state.nome_visitante
    const idMorador = location.state.id_morador

    //Função que realiza a navegação para a tela de consulta
    const back = () => {

        //Realiza a navegação
        navigate("/porteiro/visitante/seleciona/morador", {
            state: {
                id_visitante: idVisitante,
                nome_visitante: nome
            }
        })
    }

    //Função que realiza a navegação para a tela inicial de visitas
    const backVisitaInicial = () => {

        //Realiza a navegação
        navigate("/porteiro")
    }

    //Função que converte a data escolhida para o formato da API (aaaa-mm-ddThh:mm)
    const converteDataHora = (data) => {

        //Só converte quando uma data foi escolhida
        if(!data){

            return ""
        }

        //Monta o ano, o mês, o dia, a hora e o minuto com dois dígitos
        const ano = data.getFullYear()
        const mes = String(data.getMonth() + 1).padStart(2, "0")
        const dia = String(data.getDate()).padStart(2, "0")
        const hora = String(data.getHours()).padStart(2, "0")
        const minuto = String(data.getMinutes()).padStart(2, "0")

        //Retorna no formato aaaa-mm-ddThh:mm
        return `${ano}-${mes}-${dia}T${hora}:${minuto}`
    }

    //Função que chama a função de  cadastraVisitaPorteiro(), passando as informações necessárias
    const createVisita = async () => {

        //Converte a data e a hora escolhidas para o formato da API
        const entradaAPI = converteDataHora(entrada)
        const saidaAPI = converteDataHora(saida)

        //Chama a funçao que cadastrar a visita do porteiro
        const response = await cadastraVisitaPorteiro(idVisitante, idMorador, entradaAPI, saidaAPI)

        //Desestruturando o retorno 
        const { message, status} = await response

        //Exibe a menssagen do usuário
        alert(message)

        //Verifica se o cadastro foi um sucesso
        if(status == 200){

            //Realiza o redirecionamentio
            backVisitaInicial()
        }
    }

    //Função que chama a função assincrona
    const cadastra = () => {

        //Chama a função assincronoa
        createVisita()
    }

    //Retonra o componente
    return(
        <div className={styles['pagina--agenda-visita']}>

            {/* Cabeçalho com o título e o botão de voltar */}
            <div className={styles['cabecalho--pagina']}>

                <h1 className={styles['titulo--pagina']}>
                    Agendar visita para: {nome}
                </h1>

                {/* Botão que retorna para a tela de consulta */}
                <button type="button" className={styles['botao--voltar']} onClick={back}>
                    &larr; Voltar
                </button>

            </div>

            {/* Descrição curta da tela */}
            <p className={styles['descricao--pagina']}>
                Preencha o dia e a hora da entrada e da saída para a visita.
            </p>

            {/* Div com os horários previstos da visita */}
            <div className={styles['cartao--horarios']}>

                {/* Hora prevista da entrada */}
                <div className={styles['campo--formulario']}>
                    <label htmlFor="visita-entrada">Hora prevista da entrada</label>
                    <DatePicker
                        id="visita-entrada"
                        selected={entrada}
                        onChange={(data) => setEntrada(data)}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={30}
                        timeCaption="Hora"
                        dateFormat="dd/MM/yyyy HH:mm"
                        locale={ptBR}
                        placeholderText="dd/mm/aaaa hh:mm"
                        wrapperClassName={styles['campo--data-wrapper']}
                        className={styles['campo--data']}
                        calendarClassName={styles['calendario--visita']}
                    />
                </div>

                {/* Hora prevista da saída */}
                <div className={styles['campo--formulario']}>
                    <label htmlFor="visita-saida">Hora prevista da saída</label>
                    <DatePicker
                        id="visita-saida"
                        selected={saida}
                        onChange={(data) => setSaida(data)}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={30}
                        timeCaption="Hora"
                        dateFormat="dd/MM/yyyy HH:mm"
                        locale={ptBR}
                        placeholderText="dd/mm/aaaa hh:mm"
                        wrapperClassName={styles['campo--data-wrapper']}
                        className={styles['campo--data']}
                        calendarClassName={styles['calendario--visita']}
                    />
                </div>

            </div>

            {/* Botão verde que cadastra a visita */}
            <button type="button" className={styles['botao--cadastrar']} onClick={cadastra}>
                Cadastrar
            </button>

        </div>
    )
}

//Retorna o componente
export default PaginaCadastraVisitaPorteiro
