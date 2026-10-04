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

        // //Verifica se o elemento já foi selecionado | Adidiona o elemento
        // if(!moradoresSelecionados.includes(morador.id)){

        //     //Spread Array
        //     let novoArray = [...moradoresSelecionados]

        //     //Adicionando o novo elemetno
        //     novoArray.push(morador.id)

        //     //Atualiza o array do componente pai
        //     renderiza(novoArray)

        // }
    }

    // Retorna o componente | Card
    return (
        <div className={cardStyles.card} onClick={addMorador}>

            {/* Cabeçalho do card com o nome do morador e a unidade */}
            <header className={cardStyles.header}>
                <h3 className={cardStyles.titulo}>{morador.nome}</h3>
                <span className={cardStyles.unidade}>
                    {morador.unidade?.bloco} - Apto {morador.unidade?.numero}
                </span>
            </header>

            {/* Bloco com os dados de contato do morador */}
            <div className={cardStyles.contexto}>
                <p className={cardStyles.contextoItem}><strong>Telefone:</strong> {morador.telefone}</p>
                <p className={cardStyles.contextoItem}><strong>E-mail:</strong> {morador.email}</p>
            </div>

            {/* Texto provisódio para o morador selecionado */}
            {moradoresSelecionados.includes(morador.id) &&
                <h1>Morador selecionado</h1>
            }
        </div>
    );
}

// Exportando o componente
export default CardMorador;