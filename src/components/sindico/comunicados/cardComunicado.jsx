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
    //
    // O card inteiro abre os envios, então ele é um <button>:
    // mesmo onClick, mas com foco visível, teclado e nome
    // acessível formado pelo próprio conteúdo (título + data).
    return (
        /* Card do comunicado */
        <button
            type="button"
            className={`${cardStyles.card} ${cardStyles['card--clicavel']}`}
            onClick={detalhesComunicados}
        >
        
            {/* Cabeçalho do card com o título do comunicado e a data de criação */}
            <span className={cardStyles.header}>
                <span className={cardStyles.titulo}>{comunicado.titulo}</span>
                <span className={cardStyles.unidade}>
                    {formatarData(comunicado.criado_em)}
                </span>
            </span>
        
            {/* Descrição do comunicado em destaque */}
            <span className={cardStyles.resposta}>
                {comunicado.descricao}
            </span>
        </button>
    );
}

// Exportando os comunicados
export default CardComunicados;
