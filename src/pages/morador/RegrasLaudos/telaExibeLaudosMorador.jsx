//Importando do arquivo

import { getLaudosMorador } from "../../../service/Laudos"



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
        <h1>Laudos do condominio</h1>

        //titulo

        //botão de regra(realiza a navegação), botão de laudo (faz nada)

        //Div que rederiza os cards com os laudos
    );
}

//Exportando o arquivo
export default PaginaExibeLaudosMorador