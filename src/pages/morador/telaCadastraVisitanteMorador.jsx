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

    //Função que devolve o morador para a lista de visitantes
    const voltarParaVisitantes = () => {

        navigate('/morador/visitantes')
    }

    //Função que salva o visitante previamente cadastrado
    const salvarVisitante = async (evento) => {

        //Evita que a página recarregue ao enviar o formulário
        evento.preventDefault()

        //Impede o envio sem os campos obrigatórios da API (nome e cpf)
        if(!nome.trim() || !documento.trim()){

            alert('Preencha o nome e o CPF do visitante.')

            return
        }

        //Monta o registro no formato aceito pela API
        const visita = {
            nome: nome.trim(),
            documento: documento.trim()
        }

        //Chama a service que grava a visita e devolve o resultado
        const resultado = await criarVisitaPreCadastrada(visita)

        //Exibe a mensagem retornada (sucesso ou erro da API)
        alert(resultado.mensagem)

        //Só navega quando a API confirmou a gravação
        if(resultado.sucesso){

            //Volta para a tela de visitantes, que agora lista o novo cadastro
            navigate('/morador/visitantes')
        }
    }

    //Retorna o componente
    return (

        <div className={styles['cv-container']}>

            {/* Cabeçalho da tela: contexto + ação concreta + apoio à esquerda
                e o "Voltar" à direita, na mesma linha (mesma composição do
                cx-page-header usada pelas telas de cadastro do síndico). */}
            <header className={styles['cv-cabecalho-pagina']}>
                <div className={styles['cv-cabecalho-texto']}>
                    <p className="cx-overline">Visitantes</p>
                    <h1 className={styles['cv-title']}>Novo visitante</h1>
                    <p className={styles['cv-subtitle']}>
                        Preencha o nome e o CPF para deixar este visitante cadastrado para o porteiro.
                    </p>
                </div>

                <button type="button" className={styles['cv-btn-voltar']} onClick={voltarParaVisitantes}>
                    ← Voltar
                </button>
            </header>

            {/* Formulário: o próprio elemento recebe o card branco do padrão
                cx-card, igual às outras telas de cadastro, para os campos
                não ficarem soltos sobre o fundo cinza da página */}
            <form className={`${styles['cv-form']} cx-card cx-card--pad`} onSubmit={salvarVisitante}>

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
                {/*
                    A API de visitantes ainda não possui colunas de agendamento
                    (data, horário de chegada e saída prevista), então esses
                    campos ficaram fora do formulário até o backend criá-los.
                */}

                {/* Botão de salvar: largura automática alinhada à direita no
                    pé do card (desktop); no celular continua largura total */}
                <div className={`${styles['cv-action']} ${styles['cv-field--full']}`}>
                    <button
                        type="submit"
                        className={`${styles['cv-btn-salvar']} ${styles['cv-btn-salvar--auto']}`}
                    >
                        Salvar visitante
                    </button>
                </div>

            </form>

        </div>
    )
}

//Exportando a tela para ser utilizada no roteador
export default TelaCadastraVisitanteMorador
