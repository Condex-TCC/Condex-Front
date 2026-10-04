//Importando do arquivo

import { getLaudosMorador } from "../../../service/Laudos"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CardLaudoMorador from "../../../components/morador/registros/cardLaudoMorador";
import styles from "../../../css/telaVisitantesMorador.module.css";
import abasStyles from "../../../css/paginainicialPorteiro.module.css";
import listaStyles from "../../../css/paginaExibeEnvios.module.css";



//Função que cria o componente
function PaginaExibeLaudosMorador(){

    //Hook que irá armazenar os laudos
    const [laudos, setLaudos] = useState([])

    //Hook que irá realizar a navegação
    const navigate = useNavigate()

    //Função que realiza a navegação para a tala de regras
    const navegaRegra = () => {

        //Realiza a navagação
        navigate("/morador/registros/regra")
    }

    //Função que obtem os laudos
    const obtemLaudos = async () => {

        //Obtendo os laudos
        const dados = await getLaudosMorador()

        //Salvando os dados no state
        setLaudos(dados[0])
    }

    //useEffect que irá chamar a função que carrega os dados dos laudos
    useEffect(() => {

        //Função que chama os dados
        obtemLaudos()
    }, [])

    //Retorna o componente
    return (

        // Container principal da tela
        <div className={styles['vm-container']}>

            {/* Cabeçalho da tela com o título dos laudos */}
            <div className={styles['vm-page-header']}>
                <h1 className={styles['vm-page-title']}>Laudos do condomínio</h1>
            </div>

            {/*Div com os botões de navegação entre as telas de laudos e regras*/}
            <div className={abasStyles['tabs--group']}>

                {/* Botão da tela atual, por isso não navega para lugar nenhum */}
                <button type="button" className={abasStyles['tab--active']}>
                    Laudos
                </button>

                {/* Botão que leva para as regras do condomínio */}
                <button
                    type="button"
                    className={abasStyles['tab--inactive']}
                    onClick={navegaRegra}
                >
                    Regras
                </button>
            </div>

            {/*Div que irá exibir os cards dos laudos*/}
            <div className={listaStyles.listaEnvios}>

                {/* Cards com os laudos do condomínio */}
                {
                    // Iterando e adicionando os cards
                    laudos.map((laudo) => {

                        //Retorna o card do laudo
                        return <CardLaudoMorador key={laudo.id} laudo={laudo}></CardLaudoMorador>
                    } )
                }
            </div>
        </div>
    );
}

//Exportando o arquivo
export default PaginaExibeLaudosMorador