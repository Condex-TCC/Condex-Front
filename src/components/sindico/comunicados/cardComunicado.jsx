// Importações para o arquivo
import { useNavigate } from "react-router-dom";
import cardStyles from "../../../css/cardResposta.module.css";

// Função para formatar a data e hora
function formatarData(dataIso) {
    if (!dataIso) return "";
    
    const data = new Date(dataIso);
    
    // Formata para o padrão brasileiro (DD/MM/AAAA HH:mm)
    return new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "America/Sao_Paulo" // Ajusta para o fuso horário correto do usuário
    }).format(data);
}

// Criando a função
function CardComunicados({ comunicado }) {

    //Hook utilizado para realizar a naveração
    const navigate = useNavigate()

    //Função que pega o id do comuinicado
    const detalhesComunicados = () => {

        //Muda para para a tela de detalhes dos envios | Passando o id do comunicado
        navigate('/sindico/comunicados/envios/' + comunicado.id)
    }

    // Retorna o componente | Card
    return (
        /* Card do comunicado */
        <div className={cardStyles.card} onClick={detalhesComunicados}>
        
            {/* Cabeçalho do card com o título do comunicado e a data de criação */}
            <header className={cardStyles.header}>
                <h3 className={cardStyles.titulo}>{comunicado.titulo}</h3>
                <span className={cardStyles.unidade}>
                    {formatarData(comunicado.criado_em)}
                </span>
            </header>
        
            {/* Descrição do comunicado em destaque */}
            <p className={cardStyles.resposta}>
                {comunicado.descricao}
            </p>
        </div>
    );
}

// Exportando os comunicados
export default CardComunicados;