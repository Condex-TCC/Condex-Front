//Esse arquivo será o responsavel pelas rotas

//Importando as dependencias
//Cria um objeto que seja utilizado para navegar na URL
import { createBrowserRouter } from 'react-router-dom';

//Importando os layouts
import RootLayout from '../layouts/RootLayout';
import LoginLayout from '../layouts/LoginLayout';

//Importando as página
import PaginaInical from '../pages/telaInicial';
import TelaDeLogin from '../pages/telaLogin';

//Componente que será utilizado para analizar a URL
const route = createBrowserRouter([
    //Elemento base do array
    {
        path: "/", //Caminho do primeiro elemento
        element: <RootLayout></RootLayout>, //Elemento que será carregado

        //Array com as subrotas do sistema
        children: [

            //Tela inicial e login
            {
                path: "/", //Caminho do primeiro elemento
                element: <LoginLayout></LoginLayout>, //Componente que será carregado

                //Array com as subrotas de login
                children: [
                    //Tela de inicial
                    {
                        path: "/", //Caminho da tela inicial
                        element: <PaginaInical></PaginaInical>, //Componente que será carregado
                    },
                    //Tela de login
                    {
                        path: "/login", //Caminho da tela inicial
                        element: <TelaDeLogin></TelaDeLogin>, //Componente que será carregado
                    }
                ]
            }
        ]
    }
])

//Exportando o roteador de rotas
export default route