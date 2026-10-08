// Importações para o arquivo
import { useState } from "react";
import cardStyles from "../../../css/cardResposta.module.css";

// Criando a função
function CardMorador({ morador, renderiza, moradoresSelecionados }) {

    //Função que irá pegar o id do morador e adicioar no array de moradores selecionados
    const addMorador = () => {

        if(moradoresSelecionados.includes(morador.id)){

            //Chama função e remove o morador selecionado
            renderiza(moradoresSelecionados.filter((id) => {

                //Condição lógica que irá remover o elementos 
                //Se o id do selecionado não for igual ao do morador
                return id !== morador.id

                //TODO: Consertar aqui!!!
            }))
        }else{

            //Spread Array
            let novoArray = [...moradoresSelecionados]

            //Adicionando o novo elemetno
            novoArray.push(morador.id)

            //Atualiza o array do componente pai
            renderiza(novoArray)
        }
    }

    //Estado de seleção deste morador (derivado do array do pai)
    const selecionado = moradoresSelecionados.includes(morador.id)

    // Retorna o componente | Card
    //
    // O card inteiro é o alvo de marcação, então ele é um
    // <button> com aria-pressed: o leitor de tela anuncia
    // "pressionado/não pressionado" e o estado não depende
    // só da cor de fundo.
    return (
        <button
            type="button"
            className={`${cardStyles.card} ${cardStyles['card--clicavel']} ${selecionado ? cardStyles['card--selecionado'] : ""}`}
            onClick={addMorador}
            aria-pressed={selecionado}
        >

            {/* Cabeçalho do card com o nome do morador e a unidade */}
            <span className={cardStyles.header}>
                <span className={cardStyles.titulo}>{morador.nome}</span>
                <span className={cardStyles.unidade}>
                    {morador.unidade?.bloco} - Apto {morador.unidade?.numero}
                </span>
            </span>

            {/* Bloco com os dados de contato do morador */}
            <span className={cardStyles.contexto}>
                <span className={cardStyles.contextoItem}><strong>Telefone:</strong> {morador.telefone}</span>
                <span className={cardStyles.contextoItem}><strong>E-mail:</strong> {morador.email}</span>
            </span>

            {/* Marcador de seleção: pastilha com ícone, visível mesmo
                em impressão ou para quem não distingue as cores */}
            {selecionado &&
                <span className={cardStyles.selecionado}>
                    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Morador selecionado
                </span>
            }
        </button>
    );
}

// Exportando o componente
export default CardMorador;
