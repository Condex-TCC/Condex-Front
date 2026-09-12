//Esse arquivo será o responsavel pelas rotas

//Importando as dependencias
import { createBrowserRouter } from 'react-router-dom';

//Importando os layouts
import RootLayout from '../layouts/RootLayout';
import LoginLayout from '../layouts/LoginLayout';
import LayoutSindico from '../layouts/SindicoLayout';
import LayoutMorador from '../layouts/MoradorLayout';
import PorteiroLayout from '../layouts/PorteiroLayout';

//Importando o componente de proteção de rotas
import RotaProtegida from './RotaProtegida';

//Importando as página
import PaginaInical from '../pages/telaInicial';
import TelaDeLogin from '../pages/telaLogin';
import PaginainicialSindico from '../pages/sindico/telaInicialSindico';
import PaginainicialPorteiro from '../pages/porteiro/telaInicialPorteiro';
import PaginaExibeUsuarios from '../pages/sindico/telaExibeUsuarios';
import PaginaCadastraPorteiro from '../pages/sindico/telaCadastraPorteiro';
import PaginaCadastraMorador from '../pages/sindico/telaCadastraMorador';
import SucessoCadastro from '../pages/sindico/telaUsuarioCadastradoSucesso';
import PaginaAtualizaPorteiro from '../pages/sindico/telaAtualizaPorteiro';
import PaginaExibeRegrasLaudos from '../pages/sindico/telaExibeRegrasLaudos';
import PaginaCadastraRegra from '../pages/sindico/telaCadastraRegras';
import PaginaAtualizaRegra from '../pages/sindico/telaAtualizaRegras';
import PaginaCadastraVisitante from '../pages/porteiro/RegistroVisitante';
import PaginaCadastraEncomenda from '../pages/porteiro/CadastrarEncomenda';
import PaginaRetiradaEncomenda from '../pages/porteiro/RetiradaEncomenda';

//Componente que será utilizado para analisar a URL
const route = createBrowserRouter([
    //Elemento base do array
    {
        path: "/",
        element: <RootLayout />,

        //Array com as subrotas do sistema
        children: [
            //Tela inicial e login
            {
                path: "", // Caminho vazio para herdar o "/"
                element: <LoginLayout />,
                children: [
                    //Tela de inicial
                    {
                        index: true, // Usa index: true para a rota padrão do pai
                        element: <PaginaInical />,
                    },
                    //Tela de login
                    {
                        path: "login", // Caminho relativo (sem a barra inicial)
                        element: <TelaDeLogin />,
                    }
                ]
            },

            //Tela do sindico (protegida: só entra quem tem cookie de tipo "sindico")
            {
                path: "sindico", // Caminho relativo
                element: <RotaProtegida tipoPermitido="Sindico"><LayoutSindico /></RotaProtegida>,

                children: [
                    //Tela inicial do sindico
                    {
                        index: true, // Renderiza no caminho "/sindico"
                        element: <PaginainicialSindico />,
                    },
                    //Tela de gerenciamento de usuários
                    {
                        path: "usuarios", // Renderiza no caminho "/sindico/usuarios"
                        element: <PaginaExibeUsuarios />,
                    },

                    //Tela para cadastrar os porteiros
                    {
                        path: "usuarios/porteiro", // Caminho que vai ser acessado na URL
                        element: <PaginaCadastraPorteiro />,
                    },

                    //Tela para cadastrar os moradores
                    {
                        path: "usuarios/morador", // Caminho que vai ser acessado na URL
                        element: <PaginaCadastraMorador></PaginaCadastraMorador>,
                    },

                    //Tela de sucesso no cadastro
                    {
                        path: "usuarios/sucesso", // Caminho que vai ser acessado na URL
                        element: <SucessoCadastro></SucessoCadastro>,
                    },

                    //Tela de updadte do porteiro
                    {
                        //Essa rota recebe um parametro na url
                        path: "usuarios/porteiro/update/:id", // Caminho que vai ser acessado na URL
                        element: <PaginaAtualizaPorteiro></PaginaAtualizaPorteiro>,
                    },

                    //Tela de exibir regras
                    {
                        path: "condominio/regrasLaudos", //Caminho que vai ser acessado na URL
                        element: <PaginaExibeRegrasLaudos></PaginaExibeRegrasLaudos>
                    },

                    //Tela para cadastro de regras
                    {
                        path: "condominio/regras/create", //Caminho que vai ser acessado na URL
                        element: <PaginaCadastraRegra></PaginaCadastraRegra>
                    },

                    //Tela para atualizar as regras
                    {
                        path: "condominio/regras/update/:id", //Caminho que vai ser acessado na URL
                        element: <PaginaAtualizaRegra></PaginaAtualizaRegra>
                    },
                ]
            },

            //Tela do morador (protegida: só entra quem tem cookie de tipo "morador")
            {
                path: "morador", // Caminho relativo
                element: <RotaProtegida tipoPermitido="Morador"><LayoutMorador /></RotaProtegida>,
            },

            //Tela do porteiro (protegida: só entra quem tem cookie de tipo "porteiro")
            {
                path: "porteiro",
                element: <RotaProtegida tipoPermitido="Porteiro"><PorteiroLayout /></RotaProtegida>,

                children: [
                    // Tela inicial do porteiro
                    {
                        index: true,
                        element: <PaginainicialPorteiro />,
                    },

                    // Tela de registro de visitante
                    {
                        path: "RegistroVisitante",
                        element: <PaginaCadastraVisitante />,
                    },

                    // Tela de cadastro de encomenda
                    {
                        path: "CadastrarEncomenda",
                        element: <PaginaCadastraEncomenda />,
                    },

                    // Tela de retirada de encomenda
                    {
                        path: "Encomenda/:id/retirada",
                        element: <PaginaRetiradaEncomenda />,
                    },
                ]
            },


        ]
    }
]);

//Exportando o roteador de rotas
export default route;