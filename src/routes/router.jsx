//Esse arquivo será o responsavel pelas rotas

//Importando as dependencias
//Cria um objeto que seja utilizado para navegar na URL
import { createBrowserRouter } from 'react-router-dom';

//Importando os layouts
import RootLayout from '../layouts/RootLayout';
import LoginLayout from '../layouts/LoginLayout';
import LayoutSindico from '../layouts/SindicoLayout';
import LayoutMorador from '../layouts/MoradorLayout';
import PorteiroLayout from '../layouts/PorteiroLayout';

//Importando as página
import PaginaInical from '../pages/telaInicial';
import TelaDeLogin from '../pages/telaLogin';
import PaginainicialSindico from '../pages/sindico/telaInicialSindico';
import PaginainicialPorteiro from '../pages/porteiro/telaInicialPorteiro';
import PaginaExibeUsuarios from '../pages/sindico/telaExibeUsuarios';

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
            },

            //Tela do sindico
            {
                path: "/sindico", //Caminho do primeiro elemento
                element: <LayoutSindico></LayoutSindico>, //Componente que será carregado

                //Array com as subrotas de sindico
                children: [
                    //Tela de inicial do sindico
                    {
                        path: "/sindico", //Caminho da tela inicial do sindico
                        element: <PaginainicialSindico></PaginainicialSindico>, //Componente que será carregado
                    },
                    
                    //Tela de gerenciamento de usuários
                    {
                        path: "/sindico/usuarios", //Caminho da tela inicial do sindico
                        element: <PaginaExibeUsuarios></PaginaExibeUsuarios>, //Componente que será carregado
                    },
                    
                ]
            },

            //Tela do morador
            {
                path: "/morador", //Caminho do primeiro elemento
                element: <LayoutMorador></LayoutMorador>, //Componente que será carregado

            },

            {
                path: "/porteiro", //Caminho do primeiro elemento
                element: <PorteiroLayout></PorteiroLayout>, //Componente que será carregado

                //Array com as subrotas do porteiro
                children: [
                    //Tela de inicial do porteiro
                    {
                        path: "/porteiro", //Caminho da tela inicial do porteiro
                        element: <PaginainicialPorteiro></PaginainicialPorteiro>, //Componente que será carregado
                    },
                    
                ]
            },
        ]
    }
])

//Exportando o roteador de rotas
export default route