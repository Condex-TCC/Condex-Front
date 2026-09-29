//Formulário de pré cadastro de visitante do morador

//Local das importações
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { criarVisitaPreCadastrada } from '../../service/Visitante'
import styles from '../../css/telaCadastraVisitanteMorador.module.css'

//Função que cria a tela de cadastro
function TelaCadastraVisitanteMorador(){

    //Hook que realiza a navegação
    const navigate = useNavigate()

    //Estado que guarda os valores digitados nos campos do formulário
    const [nome, setNome] = useState('')
    const [documento, setDocumento] = useState('')
    const [data, setData] = useState('')
    const [horario, setHorario] = useState('')
    const [saidaPrevista, setSaidaPrevista] = useState('')

    //Função que devolve o morador para a lista de visitantes
    const voltarParaVisitantes = () => {

        navigate('/morador/visitantes')
    }

    //Função que salva o visitante previamente cadastrado
    const salvarVisitante = async (evento) => {

        //Evita que a página recarregue ao enviar o formulário
        evento.preventDefault()

        //Impede o envio sem os campos obrigatórios
        if(!nome.trim() || !data || !horario){

            alert('Preencha o nome, a data e o horário da visita.')

            return
        }

        //Monta o registro no mesmo formato que a API devolve
        const visita = {
            nome: nome.trim(),
            documento: documento.trim(),
            data,
            horario,
            saidaPrevista
        }

        //Chama a service que grava a visita
        const mensagem = await criarVisitaPreCadastrada(visita)

        //Exibe a mensagem retornada
        alert(mensagem)

        //Volta para a tela de visitantes, que agora lista a nova visita
        navigate('/morador/visitantes')
    }

    //Retorna o componente
    return (

        <div className={styles['cv-container']}>

            {/* Cabeçalho com o botão de voltar */}
            <div className={styles['cv-header']}>
                <button type="button" className={styles['cv-btn-voltar']} onClick={voltarParaVisitantes}>
                    ← Voltar
                </button>
                <h1 className={styles['cv-title']}>Novo visitante</h1>
            </div>

            <p className={styles['cv-subtitle']}>
                Preencha os dados para autorizar a entrada deste visitante antes que ele chegue.
            </p>

            {/* Formulário */}
            <form className={styles['cv-form']} onSubmit={salvarVisitante}>

                {/* Nome */}
                <div className={`${styles['cv-field']} ${styles['cv-field--full']}`}>
                    <label htmlFor="cv-nome">Nome do visitante</label>
                    <input
                        id="cv-nome"
                        type="text"
                        placeholder="Ex: Maria de Souza"
                        value={nome}
                        onChange={(evento) => setNome(evento.target.value)}
                    />
                </div>

                {/* Documento */}
                <div className={`${styles['cv-field']} ${styles['cv-field--full']}`}>
                    <label htmlFor="cv-documento">CPF / Documento</label>
                    <input
                        id="cv-documento"
                        type="text"
                        placeholder="000.000.000-00"
                        value={documento}
                        onChange={(evento) => setDocumento(evento.target.value)}
                    />
                </div>

                {/* Data */}
                <div className={styles['cv-field']}>
                    <label htmlFor="cv-data">Data da visita</label>
                    <input
                        id="cv-data"
                        type="date"
                        value={data}
                        onChange={(evento) => setData(evento.target.value)}
                    />
                </div>

                {/* Horário de chegada */}
                <div className={styles['cv-field']}>
                    <label htmlFor="cv-horario">Horário de chegada</label>
                    <input
                        id="cv-horario"
                        type="time"
                        value={horario}
                        onChange={(evento) => setHorario(evento.target.value)}
                    />
                </div>

                {/* Saída prevista */}
                <div className={`${styles['cv-field']} ${styles['cv-field--full']}`}>
                    <label htmlFor="cv-saida">Saída prevista (opcional)</label>
                    <input
                        id="cv-saida"
                        type="time"
                        value={saidaPrevista}
                        onChange={(evento) => setSaidaPrevista(evento.target.value)}
                    />
                </div>

                {/* Botão de salvar */}
                <div className={`${styles['cv-action']} ${styles['cv-field--full']}`}>
                    <button type="submit" className={styles['cv-btn-salvar']}>
                        Salvar visitante
                    </button>
                </div>

            </form>

        </div>
    )
}

//Exportando a tela para ser utilizada no roteador
export default TelaCadastraVisitanteMorador
