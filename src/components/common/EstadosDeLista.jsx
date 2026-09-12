//Componentes pequenos e reutilizáveis para os 3 estados que toda lista alimentada
//pela API pode ter: carregando, vazia (sem erro, só não tem dados) e com erro.
//Existem para não repetir o mesmo <h1>Carregando...</h1> em cada tela.

import styles from "../../css/estadosDeLista.module.css"

//Estado de carregamento (usado enquanto a requisição não termina)
export function Carregando({ texto = "Carregando..." }) {

    return (
        <div className={styles.estado}>
            <span className={styles.spinner}></span>
            <p>{texto}</p>
        </div>
    )
}

//Estado vazio (a requisição terminou bem, mas não há itens para mostrar)
export function ListaVazia({ texto = "Nenhum item encontrado." }) {

    return (
        <div className={styles.estado}>
            <p className={styles.textoVazio}>{texto}</p>
        </div>
    )
}

//Estado de erro (a requisição falhou)
export function ErroDeCarregamento({ texto = "Não foi possível carregar os dados.", aoTentarNovamente }) {

    return (
        <div className={styles.estado}>
            <p className={styles.textoErro}>{texto}</p>

            {/* O botão "Tentar novamente" só aparece se a tela passar uma função para isso */}
            {aoTentarNovamente && (
                <button type="button" className={styles.botaoTentarNovamente} onClick={aoTentarNovamente}>
                    Tentar novamente
                </button>
            )}
        </div>
    )
}
