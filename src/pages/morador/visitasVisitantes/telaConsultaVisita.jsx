//Página que irá conulsta uma visita

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cadastraVisitante, consultaVisitante } from "../../../service/VisitasVisitantes";

//Importações do arquivo
import styles from "../../../css/paginaConsultaVisitanteMorador.module.css";


//Função que cria o componente
function PaginaConsultaVisitanteMorador(){

    //Hook que armazena as váriaveis de do componente
    const [existe, setExiste] = useState(null) //null = ainda não consultou, false = consultou e não encontrou, true = encontrou
    const [nome, setNome] = useState("")
    const [rg, setRg] = useState("")
    const [cpf, setCpf] = useState("")

    //Hook que realiza a navegaçação
    const navigate = useNavigate()

    //Função que realiza a navegação
    const back = () => {

        //Realiza a navegação
        navigate("/morador/visitas")
    }

    //Função que navega para a página de agendar visita
    const agendaVisita = (id, nome) => {

        //Realiza a navegação
        navigate("/morador/visitante/agendar/visita", {
            state: {
                id_visitante: id,
                nome_visitant: nome,
            }
        })
    }

    //Função que aplica a máscara do RG (00.000.000-0)
    const mascaraRg = (valor) => {

        //Remove tudo que não for dígito e limita a 9 dígitos
        const digitos = valor.replace(/\D/g, "").slice(0, 9)

        //Monta a máscara conforme os dígitos já foram digitados
        return digitos
            .replace(/^(\d{2})(\d)/, "$1.$2")
            .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
            .replace(/^(\d{2})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4")
    }

    //Função que aplica a máscara do CPF (000.000.000-00)
    const mascaraCpf = (valor) => {

        //Remove tudo que não for dígito e limita a 11 dígitos
        const digitos = valor.replace(/\D/g, "").slice(0, 11)

        //Monta a máscara conforme os dígitos já foram digitados
        return digitos
            .replace(/^(\d{3})(\d)/, "$1.$2")
            .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
            .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4")
    }

    //Função que atualiza o RG e limpa a consulta anterior
    const mudaRg = (e) => {

        //Salva o valor com máscara
        setRg(mascaraRg(e.target.value))

        //Volta a consulta para o estado inicial
        setExiste(null)
    }

    //Função que atualiza o CPF e limpa a consulta anterior
    const mudaCpf = (e) => {

        //Salva o valor com máscara
        setCpf(mascaraCpf(e.target.value))

        //Volta a consulta para o estado inicial
        setExiste(null)
    }

    //Função que realiza a consulta do visitante
    const buscaVisitante = async () => {

        //Remove a máscara do RG e do CPF antes de enviar
        const rgSemMascara = rg.replace(/\D/g, "")
        const cpfSemMascara = cpf.replace(/\D/g, "")

        //Chama a função que realiza a consulta
        const response = await consultaVisitante(rgSemMascara, cpfSemMascara)

        //Só continua se a requisição não falhou
        if(response){

            //Desestruturando a responsta
            const { encontrado , visitante} = await response

            //Salvando os dados no state
            setExiste(encontrado)

            //Verifica se foi encontrada
            if(encontrado == true){

                //Redireciona para a tela de agendar visitante
                agendaVisita(visitante.id, visitante.name)
            }
        }
    }

    //Função que cadastra visitante
    const createVisitante = async () => {

        //Remove a máscara do RG e do CPF antes de enviar
        const rgSemMascara = rg.replace(/\D/g, "")
        const cpfSemMascara = cpf.replace(/\D/g, "")

        //Chama a função que realiza o cadastro
        const response = await cadastraVisitante(nome, rgSemMascara, cpfSemMascara)

        //Só continua se a requisição não falhou
        if(response){

            //Exibe a menssagem
            alert(response)

            //Chama a função de buscar o visitante
            //Para garantir que tenha sido salvo com sucesso, e realizar o redirecionamento
            buscaVisitante()
        }
    }

    //Funções que chama as funções assincronas
    const consulta = () => {

        //Chama a função assincrono
        buscaVisitante()
    }
    const cadastra = () => {

        //Chama a função assincrona
        createVisitante()
    }
    

    //Retorna o componente
    return (
        <div className={styles['pagina--consulta-visitante']}>

            {/* Cabeçalho com o título e o botão de voltar */}
            <div className={styles['cabecalho--pagina']}>

                <h1 className={styles['titulo--pagina']}>Consulta de visitante</h1>

                {/* Botão que retorna para a tela de visitas */}
                <button type="button" className={styles['botao--voltar']} onClick={back}>
                    &larr; Voltar
                </button>

            </div>

            {/* Div com os campos de consulta do visitante */}
            <div className={styles['cartao--consulta']}>

                <h2 className={styles['titulo--cartao']}>Procurar visitante</h2>

                <p className={styles['descricao--cartao']}>Por motivos legais da LGPD, será preciso procurar o visitante pelo RG e CPF.</p>

                <div className={styles['grade--campos']}>

                    {/* RG do visitante */}
                    <div className={styles['campo--formulario']}>
                        <label htmlFor="consulta-rg">RG</label>
                        <input
                            id="consulta-rg"
                            type="text"
                            value={rg}
                            onChange={mudaRg}
                            inputMode="numeric"
                            maxLength={12}
                            placeholder="00.000.000-0"
                        />
                    </div>

                    {/* CPF do visitante */}
                    <div className={styles['campo--formulario']}>
                        <label htmlFor="consulta-cpf">CPF</label>
                        <input
                            id="consulta-cpf"
                            type="text"
                            value={cpf}
                            onChange={mudaCpf}
                            inputMode="numeric"
                            maxLength={14}
                            placeholder="000.000.000-00"
                        />
                    </div>

                </div>

                {/* Botão que realiza a consulta */}
                <div className={styles['acoes--cartao']}>
                    <button type="button" className={styles['botao--consultar']} onClick={consulta}>
                        Consultar
                    </button>
                </div>

            </div>

            {/* Div de cadastro, exibida apenas quando o visitante não foi encontrado */}
            {existe === false && (
                <div className={styles['cartao--consulta']}>

                    <p className={styles['descricao--cartao']}>Deseja cadastrar esse novo visitante? Preencha o nome.</p>

                    <div className={styles['linha--cadastro']}>

                        {/* Nome do novo visitante */}
                        <div className={`${styles['campo--formulario']} ${styles['campo--formulario--nome']}`}>
                            <label htmlFor="consulta-nome">Nome</label>
                            <input
                                id="consulta-nome"
                                type="text"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                            />
                        </div>

                        {/* Botão que realiza o cadastro */}
                        <button type="button" className={styles['botao--cadastrar']} onClick={cadastra}>
                            Cadastrar visitante
                        </button>

                    </div>

                </div>
            )}

        </div>
    );
}

//Exporta o componente
export default PaginaConsultaVisitanteMorador
