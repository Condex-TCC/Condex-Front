//Pagina para o porteiro cadastrar a visita

//Importações do arquivo


//Função que cria o componente
function PaginaCadastraVisitaPorteiro(){

    //Hook que armazena os dados que vão ser utilizados para salvar os dados
    const [entrada, setEntrada] = useState(null)
    const [saida, setSaida] = useState(null)

    //Hook que realiza a navegação
    const navigate = useNavigate()

    //Hook que obtem os dados passados pelo state
    const location = useLocation()

    //Pegando o ID e nome do visitante
    const idVisitante = location.state.id_visitante
    const nome = location.state.nome_visitante
    const idMorador = location.state.id_morador

    //Função que realiza a navegação para a tela de consulta
    const back = () => {

        //Realiza a navegação
        navigate("/porteiro/visitante/seleciona/morador", {
            state: {
                id_visitante: idVisitante,
                nome_visitante: nome
            }
        })
    }

    //Função que realiza a navegação para a tela inicial de visitas
    const backVisitaInicial = () => {

        //Realiza a navegação
        navigate("/porteiro")
    }

    //Função que chama a função de  cadastraVisitaPorteiro(), passando as informações necessárias

    //Retonra o componente
    return(
        <h1>Pagina CAdastra visita</h1>
        //Na mesma linha á direita á diretia chama a função de back

        //Mesma lógica da página que de cadastraVisita do morador 
    )
}

//Retorna o componente
export default PaginaCadastraVisitaPorteiro