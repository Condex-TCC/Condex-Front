// Pequenas funções de formatação usadas nas telas do porteiro,
// para exibir datas vindas da API (formato ISO) no padrão "dd/mm - HH:MM"
// usado no protótipo (ex: "01/06 - 14:20").

//Formata uma data ISO (ou null) no padrão "dd/mm - HH:MM"
export function formatarDataHora(dataIso) {

    //Se não houver data, não há o que formatar
    if (!dataIso) return null

    const data = new Date(dataIso)

    //Se a data vier inválida, evita mostrar "NaN/NaN" na tela
    if (Number.isNaN(data.getTime())) return null

    const dia = String(data.getDate()).padStart(2, "0")
    const mes = String(data.getMonth() + 1).padStart(2, "0")
    const hora = String(data.getHours()).padStart(2, "0")
    const minuto = String(data.getMinutes()).padStart(2, "0")

    return `${dia}/${mes} - ${hora}:${minuto}`
}
