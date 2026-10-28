//Elemento que permite adicioar outros componentes dentro de si
import { Outlet } from 'react-router-dom';
import { useBuscaDoLayout } from '../hooks/useBuscaHeader';
import HeaderPorteiro from '../components/porteiro/headerPorteiro';

//Layout do Porteiro

//Importando o CSS

//Função que cria o componente principal da aplciação
function PorteiroLayout(){

    //Texto digitado na barra de pesquisa do header, compartilhado com as páginas do porteiro
    const { busca, setBusca } = useBuscaDoLayout()

    //Retorna o componente
    return(
        <div id="div-root-porteiro">
            
            {/* Adiciona o header do porteiro */}
            <HeaderPorteiro busca={busca} aoBuscar={setBusca}></HeaderPorteiro>
        
            {/* Permite renderizar outros componentes dentro desse layout */}
            <Outlet context={{ busca, setBusca }}></Outlet>

        </div>
    )
}

//Exportando o componente
export default PorteiroLayout