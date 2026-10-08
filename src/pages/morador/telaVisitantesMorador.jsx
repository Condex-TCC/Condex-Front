//Tela de Visitantes do Morador

//Local das importações
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CardProximaVisita from '../../components/morador/cardProximaVisita'
import CardVisitanteAtivo from '../../components/morador/cardVisitanteAtivo'
import { getProximasVisitas, getVisitantesAtivos } from '../../service/Visitante'
import styles from '../../css/telaVisitantesMorador.module.css'

//Função que cria a tela de visitantes
function TelaVisitantesMorador(){

    //Hook que realiza a navegação
    const navigate = useNavigate()

    //Estado que guarda os visitantes que estão dentro do condomínio
    const [visitantesAtivos, setVisitantesAtivos] = useState([])

    //Estado que guarda as visitas previamente cadastradas
    const [proximasVisitas, setProximasVisitas] = useState([])

    //Carrega os dois grupos de visitantes assim que a tela é aberta
    useEffect(() => {

        //Função que busca os dados
        const carregarVisitantes = async () => {

            //Busca em paralelo os visitantes ativos e as próximas visitas
            const [ativos, visitas] = await Promise.all([

                getVisitantesAtivos(),
                getProximasVisitas()
            ])

            //Garante listas vazias caso a origem dos dados não devolva nada
            setVisitantesAtivos(Array.isArray(ativos) ? ativos : [])
            setProximasVisitas(Array.isArray(visitas) ? visitas : [])
        }

        carregarVisitantes()
    }, [])

    //Função que leva o morador para o formulário de pré cadastro
    const abrirCadastroVisitante = () => {

        navigate('/morador/visitantes/cadastro')
    }

    //Retorna o componente
    return (

        <div className={styles['vm-container']}>

            {/* Cabeçalho da tela: overline de contexto acima do título,
                mesma hierarquia (overline > título > subtítulo) usada pelas
                demais telas do morador (ex.: Comunicados e Regras).
                O contexto é "Condomínio" — o mesmo grupo desta tela na sidebar
                — para não repetir a palavra "Visitantes" duas vezes seguidas. */}
            <div className={styles['vm-page-header']}>
                <p className="cx-overline">Condomínio</p>
                <h1 className={styles['vm-page-title']}>Visitantes</h1>
                <p className={styles['vm-page-subtitle']}>
                    Acompanhe quem está no condomínio e quem já está cadastrado para te visitar.
                </p>
            </div>

            {/* Ação principal no topo: fica visível sem precisar rolar a página
                e alinha à direita no desktop (mesmo padrão das telas de cadastro) */}
            <div className={styles['vm-action']}>
                <button type="button" className={styles['vm-btn-primary']} onClick={abrirCadastroVisitante}>
                    Cadastrar previamente um visitante
                </button>
            </div>

            {/* Seção dos visitantes que possuem entrada ativa */}
            <section className={styles['vm-section']} aria-labelledby="vm-titulo-ativos">
                <h2 className={styles['vm-section-title']} id="vm-titulo-ativos">Visitantes ativos</h2>

                {
                    //Se não houver nenhum visitante dentro, mostra o estado vazio
                    visitantesAtivos.length === 0 ?
                        <div className="cx-empty">
                            <span className="cx-empty__icon" aria-hidden="true">
                                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                            </span>
                            <p className="cx-empty__title">Nenhum visitante ativo</p>
                            <p className="cx-empty__text">
                                Quando o porteiro registrar a entrada, quem estiver no
                                condomínio aparece nesta lista.
                            </p>
                        </div>
                    :
                        visitantesAtivos.map((visitante) => (
                            <CardVisitanteAtivo key={visitante.id} visitante={visitante} />
                        ))
                }
            </section>

            {/* Seção dos visitantes previamente cadastrados */}
            <section className={styles['vm-section']} aria-labelledby="vm-titulo-cadastrados">
                <h2 className={styles['vm-section-title']} id="vm-titulo-cadastrados">Visitantes cadastrados</h2>

                {
                    //Se não houver nenhum visitante cadastrado, mostra o estado vazio
                    proximasVisitas.length === 0 ?
                        <div className="cx-empty">
                            <span className="cx-empty__icon" aria-hidden="true">
                                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="9" cy="7" r="4"></circle>
                                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                </svg>
                            </span>
                            <p className="cx-empty__title">Nenhum visitante cadastrado</p>
                            <p className="cx-empty__text">
                                Use o botão acima para deixar quem vai te visitar
                                autorizado de antemão.
                            </p>
                        </div>
                    :
                        proximasVisitas.map((visita) => (
                            <CardProximaVisita key={visita.id} visita={visita} />
                        ))
                }
            </section>

        </div>
    )
}

//Exportando a tela para ser utilizada no roteador
export default TelaVisitantesMorador
