//Página que irá exibir o histórico de visitas do morador

//Importações do arquivo
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getVisitasHisoticoMorador } from "../../../service/VisitasVisitantes"
import CardVisitaMorador from "../../../components/morador/cardVisitaMorador"
import styles from "../../../css/paginaVisitasMorador.module.css"


//Função que cria o componente
function PaginaExibeHistoricoVisitasMorador(){

    //Hook que armazena os dados
    const [historico, setHistorico] = useState([])

    //Hook que realiza a navegação
    const navigate = useNavigate()

    //Função que realiza a navegação para a tela de historico
    const navegaVisitas = () => {

        //Realiza a navegação
        navigate("/morador/visitas")
    }

    //Função que obtem os dados que serão exibos na tela
    const obtemDados = async () => {

        //Função que chama os dados que serão exibidos
        let response = await getVisitasHisoticoMorador()

        //Desestruturando os dados
        const {visitas} = await response

        //Salvando no state os dados
        setHistorico(visitas)
    }

    //Executa uma função quando a página é carregada
    useEffect(() => {

        //Chama a função que obtem os dados
        obtemDados()
    }, [])

    //Retorna o componente
    return (
        <div className={styles['pagina--visitas']}>

            {/* Cabeçalho com o título e a descrição da página */}
            <div className={styles['cabecalho--pagina']}>
                <h1 className={styles['titulo--pagina']}>Histórico de visitas</h1>
                <p className={styles['descricao--pagina']}>Consulte as visitas já registradas no seu apartamento.</p>
            </div>

            {/* Barra com o menu de abas */}
            <div className={styles['barra--pagina']}>

                {/* Menu de botões entre as telas de visitas e histórico */}
                <div className={styles['menu--pagina']}>
                    <button type="button" className={`${styles['botao--menu']} ${styles['botao--menu--inativo']}`} onClick={navegaVisitas}>
                        Visitas
                    </button>
                    <button type="button" className={`${styles['botao--menu']} ${styles['botao--menu--ativo']}`}>
                        Histórico
                    </button>
                </div>

            </div>

            {/* Lista com os cards do histórico de visitas */}
            <div className={styles['lista--cards']}>
                {historico?.map((visita) => (
                    <CardVisitaMorador key={visita?.id_visita} visita={visita} redireciona={"/morador/visitas/historico"}/>
                ))}
            </div>

        </div>
    );
}

//Exporta o componente
export default PaginaExibeHistoricoVisitasMorador