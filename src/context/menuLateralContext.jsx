import { createContext, useState } from "react"; //Importando o recurso do react necessário para trabalhar com context

//Criando o contexto | Essa será a variável que será utilizado para importar o contexto em outros arquivos
const MenuLateralContext = createContext();

//Componente react comum que vai envolver todos os componentes
const MenuLateralProvider = ({children}) => {

    //Criando a informação vamos trabalhar
    const [menuLateral, setMenuLateral] = useState('fechado')

    //Retornando um componente, permitindo o comportalhamento entre todos os elementos filhos
    return(
        //Passandos as ações para o contexto
        <MenuLateralContext.Provider value={{menuLateral, setMenuLateral}}>
            {children}
        </MenuLateralContext.Provider>
    )

}

//Exportando a função que altera o contexto
export {MenuLateralProvider, MenuLateralContext}
