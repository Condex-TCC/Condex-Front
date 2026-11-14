//Janela em que o porteiro escolhe qual morador o visitante vai visitar

//Local das importações
import { useEffect, useState } from "react"
import styles from "../../css/paginainicialPorteiro.module.css"
import { getMoradoresPorteiro, rotuloMorador } from "../../service/MoradorPorteiro"

//Componente da janela de escolha do morador visitado
//aoConfirmar recebe o id do morador e devolve uma promise | aoCancelar fecha a janela
function ModalSelecionarMorador({ visitante, aoConfirmar, aoCancelar }){

    //Lista de moradores e controle de carregamento e erro
    const [moradores, setMoradores] = useState([])
    const [carregando, setCarregando] = useState(true)
    const [erroCarga, setErroCarga] = useState("")

    //Morador escolhido e controle do envio
    const [idMorador, setIdMorador] = useState("")
    const [erro, setErro] = useState("")
    const [enviando, setEnviando] = useState(false)

    //Função que busca os moradores para o porteiro escolher
    const buscarMoradores = async () => {

        const lista = await getMoradoresPorteiro()

        if(lista === null){

            setErroCarga("Não foi possível carregar os moradores. Verifique se o servidor está no ar.")
        }
        else{

            setMoradores(lista)
        }

        setCarregando(false)
    }

    //Busca os moradores assim que a janela abre
    useEffect(() => {

        Promise.resolve().then(() => buscarMoradores())
    }, [])

    //Função que reinicia o carregamento pelo botão "tentar novamente"
    const tentarNovamente = () => {

        setCarregando(true)
        setErroCarga("")
        buscarMoradores()
    }

    //Função que confirma a entrada com o morador escolhido
    const confirmar = async () => {

        if(!idMorador){

            setErro("Selecione o morador que será visitado.")

            return
        }

        setErro("")
        setEnviando(true)

        try{

            await aoConfirmar(Number(idMorador))
        }
        finally{

            setEnviando(false)
        }
    }

    return (
        <div className={styles["modal--overlay"]} onClick={enviando ? undefined : aoCancelar}>

            {/* O clique dentro da janela não fecha o modal */}
            <div className={styles["modal--box"]} onClick={(evento) => evento.stopPropagation()}>

                <h2 className={styles["modal--title"]}>Registrar entrada</h2>

                <p className={styles["modal--text"]}>
                    Qual morador <strong>{visitante.nome}</strong> vai visitar?
                </p>

                <select
                    className={styles["modal--select"]}
                    value={idMorador}
                    disabled={carregando || erroCarga !== "" || enviando}
                    onChange={(evento) => setIdMorador(evento.target.value)}
                >
                    <option value="">
                        {
                            carregando
                                ? "Carregando moradores..."
                                : (erroCarga ? "Não foi possível carregar os moradores" : "Selecione o morador")
                        }
                    </option>

                    {
                        moradores.map((morador) => (
                            <option key={morador.id} value={morador.id}>
                                {rotuloMorador(morador)}
                            </option>
                        ))
                    }
                </select>

                {
                    !carregando && !erroCarga && moradores.length === 0 &&
                    <p className={styles["modal--erro"]}>Nenhum morador cadastrado.</p>
                }

                {
                    !carregando && erroCarga &&
                    <p className={styles["modal--erro"]}>
                        {erroCarga}{" "}
                        <button type="button" className={styles["modal--retry"]} onClick={tentarNovamente}>
                            Tentar novamente
                        </button>
                    </p>
                }

                {erro && <p className={styles["modal--erro"]}>{erro}</p>}

                <div className={styles["modal--actions"]}>
                    <button type="button" className={styles["btn--cancelar"]} onClick={aoCancelar} disabled={enviando}>
                        Cancelar
                    </button>
                    <button
                        type="button"
                        className={styles["btn--exit"]}
                        onClick={confirmar}
                        disabled={enviando || carregando || erroCarga !== ""}
                    >
                        {enviando ? "Registrando..." : "Confirmar entrada"}
                    </button>
                </div>

            </div>
        </div>
    )
}

//Exportando o componente para ser utilizado em outra página
export default ModalSelecionarMorador
