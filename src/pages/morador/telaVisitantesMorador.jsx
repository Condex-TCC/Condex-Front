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

            {/* Cabeçalho da tela */}
            <div className={styles['vm-page-header']}>
                <h1 className={styles['vm-page-title']}>Visitantes</h1>
                <p className={styles['vm-page-subtitle']}>
                    Acompanhe quem está no condomínio e quem já está cadastrado para te visitar.
                </p>
            </div>

            {/* Seção dos visitantes que possuem entrada ativa */}
            <section className={styles['vm-section']}>
                <h2 className={styles['vm-section-title']}>Visitantes ativos</h2>

                {
                    //Se não houver nenhum visitante dentro, mostra o estado vazio
                    visitantesAtivos.length === 0 ?
                        <p className={styles['vm-empty']}>Nenhum</p>
                    :
                        visitantesAtivos.map((visitante) => (
                            <CardVisitanteAtivo key={visitante.id} visitante={visitante} />
                        ))
                }
            </section>

            {/* Seção dos visitantes previamente cadastrados */}
            <section className={styles['vm-section']}>
                <h2 className={styles['vm-section-title']}>Visitantes cadastrados</h2>

                {
                    //Se não houver nenhum visitante cadastrado, mostra o estado vazio
                    proximasVisitas.length === 0 ?
                        <p className={styles['vm-empty']}>Nenhum visitante cadastrado</p>
                    :
                        proximasVisitas.map((visita) => (
                            <CardProximaVisita key={visita.id} visita={visita} />
                        ))
                }
            </section>

            {/* Botão que abre o formulário de cadastro */}
            <div className={styles['vm-action']}>
                <button type="button" className={styles['vm-btn-primary']} onClick={abrirCadastroVisitante}>
                    Cadastrar previamente um visitante
                </button>
            </div>

        </div>
    )
}

//Exportando a tela para ser utilizada no roteador
export default TelaVisitantesMorador
