// Importações para o arquivo
import cardStyles from "../../../css/cardRegrasLaudosSindico.module.css";

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

    // Retorna o componente | Card
    return (
        /* Card do comunicado */
        <div className={cardStyles.card}>
        
            {/* Cabeçalho do card com o título do comunicado */}
            <header className={cardStyles.header}>
                <h3 className={cardStyles.title}>{comunicado.titulo}</h3>
            </header>
        
            {/* Corpo do card com a data e o trecho do comunicado */}
            <div className={cardStyles.horarioContent}>
                <div className={cardStyles.timeInfo}>
                    {formatarData(comunicado.criado_em)}
                </div>
        
                <p className={cardStyles.description}>
                    {comunicado.descricao}
                </p>
            </div>
        </div>
    );
}

// Exportando os comunicados
export default CardComunicados;