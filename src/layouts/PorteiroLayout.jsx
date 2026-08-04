//Elemento que permite adicioar outros componentes dentro de si
import { Outlet } from 'react-router-dom';
import HeaderPorteiro from '../components/porteiro/headerPorteiro';
import PaginainicialPorteiro from '../pages/porteiro/telaInicialPorteiro';

//Layout do Porteiro

//Importando o CSS

//Função que cria o componente principal da aplciação
function PorteiroLayout(){

    //Retorna o componente
    return(
        <div id="div-root">
            
            {/* Adiciona o header do porteiro */}
            <HeaderPorteiro></HeaderPorteiro>
        
            {/* Permite renderizar outros componentes dentro desse layout */}
            <Outlet></Outlet>
            
            <PaginainicialPorteiro></PaginainicialPorteiro>

        </div>
    )
}

//Exportando o componente
export default PorteiroLayout