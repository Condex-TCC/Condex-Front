//Esse arquivo será o responsavel pelas rotas

//Importando as dependencias
//Cria um objeto que seja utilizado para navegar na URL
import { createBrowserRouter } from 'react-router-dom';

//Importando os layouts
import RootLayout from '../layouts/RootLayout';

//Importando as página

//Componente que será utilizado para analizar a URL
const route = createBrowserRouter([
    //Elemento base do array
    {
        path: "/", //Caminho do primeiro elemento
        element: <RootLayout></RootLayout> //Elemento que será carregado
    }
])

//Exportando o roteador de rotas
export default route