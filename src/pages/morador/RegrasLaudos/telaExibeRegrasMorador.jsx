//Importando do arquivo

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRegrasMorador } from "../../../service/Regra";
import CardRegraMorador from "../../../components/morador/registros/cardRegraMorador";
import styles from "../../../css/telaVisitantesMorador.module.css";
import abasStyles from "../../../css/paginainicialPorteiro.module.css";
import listaStyles from "../../../css/paginaExibeEnvios.module.css";



//Função que cria o componente
function PaginaExibeRegrasMorador(){

    //Hook que irá armazenar as regras
    const [regras, setRegras] = useState([])

    //Hook que irá realizar a navegação
    const navigate = useNavigate()

    //Função que realiza a navegação para a tala de laudos
    const navegaLaudo = () => {

        //Realiza a navagação
        navigate("/morador/registros/laudos")
    }

    //Função que obtem as regras
    const obtemRegras = async () => {

        //Obtendo as regras
        const dados = await getRegrasMorador()

        //Salvando os dados no state
        setRegras(dados[0])
    }

    //useEffect que irá chamar a função que carrega os dados das regras
    useEffect(() => {

        //Função que chama os dados
        obtemRegras()
    }, [])

    //Retorna o componente
    return (

        // Container principal da tela
        <div className={styles['vm-container']}>

            {/* Cabeçalho da tela com o título das regras */}
            <div className={styles['vm-page-header']}>
                <h1 className={styles['vm-page-title']}>Regras do condomínio</h1>
            </div>

            {/*Div com os botões de navegação entre as telas de laudos e regras*/}
            <div className={abasStyles['tabs--group']}>

                {/* Botão que leva para os laudos do condomínio */}
                <button
                    type="button"
                    className={abasStyles['tab--inactive']}
                    onClick={navegaLaudo}
                >
                    Laudos
                </button>

                {/* Botão da tela atual, por isso não navega para lugar nenhum */}
                <button type="button" className={abasStyles['tab--active']}>
                    Regras
                </button>
            </div>

            {/*Div que irá exibir os cards das regras*/}
            <div className={listaStyles.listaEnvios}>

                {/* Cards com as regras do condomínio */}
                {
                    // Iterando e adicionando os cards
                    regras.map((regra) => {

                        //Retorna o card da regra
                        return <CardRegraMorador key={regra.id} regra={regra}></CardRegraMorador>
                    } )
                }
            </div>
        </div>
    );
}

//Exportando o arquivo
export default PaginaExibeRegrasMorador