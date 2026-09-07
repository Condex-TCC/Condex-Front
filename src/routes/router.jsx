//Esse arquivo será o responsavel pelas rotas

//Importando as dependencias
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
import PaginaCadastraPorteiro from '../pages/sindico/telaCadastraPorteiro';
import PaginaCadastraMorador from '../pages/sindico/telaCadastraMorador';
import PaginaMenssagem from '../pages/sindico/telaMenssagem';
import PaginaAtualizaPorteiro from '../pages/sindico/telaAtualizaPorteiro';
import PaginaExibeRegrasLaudos from '../pages/sindico/telaExibeRegrasLaudos';
import PaginaCadastraRegra from '../pages/sindico/telaCadastraRegras';
import PaginaAtualizaRegra from '../pages/sindico/telaAtualizaRegras';
import PaginaCadastraLaudos from '../pages/sindico/telaCadastraLaudo';
import PaginaAtualizaLaudos from '../pages/sindico/telaAtualizaLaudo';
import PaginaCadastraApertamento from '../pages/sindico/telaCadastraApertamento';
import PaginaAtualizaApertamento from '../pages/sindico/telaAtualizaApertamento';
import PaginaSelecionaApertamento from '../pages/sindico/telaSelecionaApartamento';
import PaginaAtualizaMorador from '../pages/sindico/telaAtualizaMorador';
import PaginaSelecionaApertamentoUpdate from '../pages/sindico/telaSelecionaApartamentoUpdate';

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

            //Tela do sindico
            {
                path: "sindico", // Caminho relativo
                element: <LayoutSindico />, 

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

                    //Tela para selecionar o apartento
                    {
                        path: "usuarios/morador/apertamento", // Caminho que vai ser acessado na URL
                        element: <PaginaSelecionaApertamento></PaginaSelecionaApertamento>, 
                    },

                    //Tela para para cadastrar os moradoes
                    {
                        path: "usuarios/morador/create/:id", // Caminho que vai ser acessado na URL
                        element: <PaginaCadastraMorador></PaginaCadastraMorador>, 
                    },

                    //Tela para para cadastrar os moradoes
                    {
                        path: "usuarios/morador/updade/:id", // Caminho que vai ser acessado na URL
                        element: <PaginaAtualizaMorador></PaginaAtualizaMorador>, 
                    },

                    //Tela de sucesso no cadastro
                    {
                        path: "mensagem", // Caminho que vai ser acessado na URL
                        element: <PaginaMenssagem></PaginaMenssagem>, 
                    },

                    //Tela para selecionar o apartento para atualizar 
                    {
                        path: "usuarios/morador/apertamento/update", // Caminho que vai ser acessado na URL
                        element: <PaginaSelecionaApertamentoUpdate></PaginaSelecionaApertamentoUpdate>, 
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

                    //Tela para cadastro dos laudos
                    {
                        path: "condominio/laudos/create", //Caminho que vai ser acessado na URL
                        element: <PaginaCadastraLaudos></PaginaCadastraLaudos>
                    },

                    //Tela para atualizar os laudos
                    {
                        path: "condominio/laudos/update/:id", //Caminho que vai ser acessado na URL
                        element: <PaginaAtualizaLaudos></PaginaAtualizaLaudos>
                    },

                    //Tela para casdastro dos apartamentos
                    {
                        path: "apertamentos/laudos/create", //Caminho que vai ser acessado na URL
                        element: <PaginaCadastraApertamento></PaginaCadastraApertamento>
                    },

                    //Tela para atualizar os apartamentos
                    {
                        path: "condominio/apertamentos/update/:id", //Caminho que vai ser acessado na URL
                        element: <PaginaAtualizaApertamento></PaginaAtualizaApertamento>
                    },

                    
                ]
            },

            //Tela do morador
            {
                path: "morador", // Caminho relativo
                element: <LayoutMorador />, 
            },

            //Tela do porteiro
            {
                path: "porteiro", // Caminho relativo
                element: <PorteiroLayout />, 

                children: [
                    //Tela inicial do porteiro
                    {
                        index: true, // Renderiza no caminho "/porteiro"
                        element: <PaginainicialPorteiro />, 
                    },
                ]
            },
        ]
    }
]);

//Exportando o roteador de rotas
export default route;