import { createContext, useState } from "react"; //Importando o recurso do react necessário para trabalhar com context

//Criando o contexto | Essa será a variável que será utilizado para importar o contexto em outros arquivos
const MenuLateralContext = createContext();

//Componente do react que vai permitir que todos os outros compodentes dentro de si, acessem o contexto
const MenuLateralProvider = ({children}) => {

    //Criando a informação vamos trabalhar
    const [menuLateral, setMenuLateral] = useState('fechado')

    //Retornando um componente, permitindo o comportalhamento entre todos os elementos filhos
    return(

        //Passando para a variavel de contexto dentro da propriedade provedor duas coisas
        //1°) Uma variável de leitura do useState | 2°) Um modo de alterar a variavel de leitura e 
        //re-redenrizar o componente
        <MenuLateralContext.Provider value={{menuLateral, setMenuLateral}}>
            
            {/* Adiciona aqui todos os componentes filhos que vão poder acessar o contexto */}
            {children}
        </MenuLateralContext.Provider>
    )

}

//Exportando a função que altera o contexto
export {MenuLateralProvider, MenuLateralContext}

// useContext() = Hook do React que permite que você compartilhe valores
//                entre múltiplos níveis de componentes
//                sem passar props através de cada nível

// COMPONENTE PROVEDOR (PROVIDER)
// 1. import {createContext} from 'react';
// 2. export const MyContext = createContext();
// 3. <MyContext.Provider value={value}>
//       <Child />
//    </MyContext.Provider>

// COMPONENTES CONSUMIDORES (CONSUMER)
// 1. import React, { useContext } from 'react';
//    import { MyContext } from './ComponentA';
// 2. const value = useContext(MyContext);