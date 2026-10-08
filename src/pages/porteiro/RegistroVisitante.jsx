//Tela de cadastro de visitante do porteiro

//Local das importações
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { cadastrarVisitantePorteiro } from '../../service/VisitantePorteiro'
import styles from '../../css/formularioPorteiro.module.css'

//Função que aplica a máscara 000.000.000-00 enquanto o CPF é digitado
//A API aceita no máximo 14 caracteres, que é o tamanho do CPF com máscara
function mascaraCpf(valor) {

    //Mantém apenas os dígitos, limitados a 11
    const d = valor.replace(/\D/g, '').slice(0, 11)

    //Monta o CPF conforme os dígitos digitados
    if(d.length > 9){ return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9)}` }
    if(d.length > 6){ return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6)}` }
    if(d.length > 3){ return `${d.slice(0, 3)}.${d.slice(3)}` }

    return d
}

//Tela responsável por cadastrar o visitante pelo porteiro
export default function RegistroVisitante() {

    //Hook que realiza a navegação
    const navigate = useNavigate()

    //States para controlar o valor de cada campo do formulário
    const [nome, setNome] = useState('')
    const [cpf, setCpf] = useState('')
    const [idMorador, setIdMorador] = useState('')

    //Estado que guarda o erro de cada campo
    const [erros, setErros] = useState({})

    //Estado que desabilita o botão enquanto a gravação acontece
    const [salvando, setSalvando] = useState(false)

    //Função que verifica os campos exigidos pela API (nome, cpf e morador)
    const validar = () => {

        const novosErros = {}

        if(!nome.trim()){ novosErros.nome = 'Informe o nome do visitante.' }

        if(cpf.replace(/\D/g, '').length !== 11){ novosErros.cpf = 'Informe o CPF completo.' }

        if(!idMorador || Number(idMorador) < 1){ novosErros.idMorador = 'Informe o ID do morador responsável.' }

        setErros(novosErros)

        return Object.keys(novosErros).length === 0
    }

    //Função que cadastra o visitante
    const salvar = async (evento) => {

        //Evita que a página recarregue ao enviar o formulário
        evento.preventDefault()

        //Interrompe o envio se algum campo obrigatório estiver inválido
        if(!validar()){

            return
        }

        //Desabilita o botão para não enviar duas vezes
        setSalvando(true)

        try{

            //Chama a função que cadastra o visitante na API
            const resultado = await cadastrarVisitantePorteiro(nome.trim(), cpf, Number(idMorador))

            //Quando a API recusa, a tela fica como está, exibindo o motivo
            if(!resultado.sucesso){

                setErros({ submit: resultado.mensagem })

                return
            }

            //Volta para a tela inicial do porteiro, que recarrega a lista
            navigate('/porteiro')

            //Exibe a mensagem retornada depois da navegação
            alert(resultado.mensagem)
        }
        finally{

            //Libera o botão tanto no sucesso quanto no erro
            setSalvando(false)
        }
    }

    return (
        <div className={styles['fp-container']}>

            <main className={styles['fp-main']}>

                <div className={styles['fp-header']}>
                    {/* Identificação da tela: contexto (overline) + ação concreta + texto de apoio,
                        na mesma hierarquia de cx-page-header usada no resto do CONDEX */}
                    <div className={styles['fp-header__texto']}>
                        <p className="cx-overline">Visitantes</p>
                        <h1 className={styles['fp-titulo']}>Registrar visitante</h1>
                        <p className={styles['fp-lead']}>
                            Cadastre quem vai entrar no condomínio e informe o ID do morador responsável.
                        </p>
                    </div>

                    {/* Retorno alinhado à direita do título, no mesmo padrão das
                        telas de cadastro do síndico e do morador */}
                    <button type="button" className={styles['fp-btn-voltar']} onClick={() => navigate('/porteiro')}>
                        &larr; voltar
                    </button>
                </div>

                <form className={styles['fp-formulario']} onSubmit={salvar} noValidate>

                    {/* Nome ocupa a linha inteira da grade: é o campo principal da tela.
                        O rótulo é VISÍVEL porque o placeholder some quando o porteiro
                        começa a digitar; o placeholder segue como exemplo auxiliar */}
                    <div className={`${styles['fp-campo']} ${styles['fp-celula--larga']}`}>
                        <label className={styles['fp-rotulo']} htmlFor="visitante-nome">Nome</label>
                        <input
                            id="visitante-nome"
                            className={`${styles['fp-input']} ${styles['fp-input--destinatario']}`}
                            type="text"
                            placeholder="Nome do visitante:"
                            maxLength={100}
                            value={nome}
                            onChange={(evento) => setNome(evento.target.value)}
                        />
                        {erros.nome && <span className={styles['fp-erro']}>{erros.nome}</span>}
                    </div>

                    <div className={styles['fp-campo']}>
                        <label className={styles['fp-rotulo']} htmlFor="visitante-cpf">CPF</label>
                        <input
                            id="visitante-cpf"
                            className={`${styles['fp-input']} ${styles['fp-input--apartamento']}`}
                            type="text"
                            inputMode="numeric"
                            placeholder="000.000.000-00"
                            value={cpf}
                            onChange={(evento) => setCpf(mascaraCpf(evento.target.value))}
                        />
                        {erros.cpf && <span className={styles['fp-erro']}>{erros.cpf}</span>}
                    </div>

                    {/* A API vincula o visitante ao morador pelo id (campo "morador") */}
                    <div className={styles['fp-campo']}>
                        <label className={styles['fp-rotulo']} htmlFor="visitante-id-morador">ID do morador</label>
                        <input
                            id="visitante-id-morador"
                            className={`${styles['fp-input']} ${styles['fp-input--apartamento']}`}
                            type="text"
                            inputMode="numeric"
                            placeholder="ID do morador"
                            maxLength={10}
                            value={idMorador}
                            onChange={(evento) => setIdMorador(evento.target.value.replace(/\D/g, '').slice(0, 10))}
                        />
                        {erros.idMorador && <span className={styles['fp-erro']}>{erros.idMorador}</span>}
                    </div>

                    {/* Ação principal ocupa a linha inteira da grade */}
                    <div className={`${styles['fp-area-salvar']} ${styles['fp-celula--larga']}`}>
                        <button type="submit" className={styles['fp-btn-salvar']} disabled={salvando}>
                            {salvando ? 'Salvando...' : 'SALVAR'}
                        </button>
                    </div>

                </form>

                {
                    erros.submit &&
                    <p className={styles['fp-erro-envio']}>{erros.submit}</p>
                }

            </main>

        </div>
    )
}
