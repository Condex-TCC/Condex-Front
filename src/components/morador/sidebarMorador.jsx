import { Fragment, useContext } from 'react'; // Importa o hook de contexto do React
import styles from '../../css/sidebarSindico.module.css'; // Importa o arquivo de folha de estilos CSS com as classes
import stylesMorador from '../../css/sidebarMorador.module.css'; // Importa as classes extras desta tela
import MarcaCondex from '../marca/marcaCondex'; // Marca compartilhada do CONDEX
import { MenuLateralContext } from '../../context/menuLateralContext';
import { useLocation, useNavigate } from 'react-router-dom';


// Define os nomes apresentados no menu lateral do Morador.
// Os textos seguem a nomenclatura oficial do CONDEX e valem
// apenas para a apresentação: rotas, arquivos e funções
// continuam com os nomes originais (/morador/reservas, etc.).
const ITENS_SIDEBAR = [

    // Início (rota continua sendo /morador)
    {
        chave: 'inicio',
        grupo: 'Principal',
        rotulo: 'Início',
        path: '/morador',
        icone: (
            <>
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </>
        )
    },

    // Áreas comuns (rota interna continua sendo /morador/reservas)
    {
        chave: 'reservas',
        grupo: 'Comunidade',
        rotulo: 'Áreas comuns',
        path: '/morador/reservas',
        icone: (
            <>
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
            </>
        )
    },

    // Comunicação (mantém a rota /morador/comunicados/exibe)
    {
        chave: 'comunicados',
        grupo: 'Comunidade',
        rotulo: 'Comunicação',
        path: '/morador/comunicados/exibe',
        icone: (
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        )
    },

    // Visitantes
    {
        chave: 'visitantes',
        grupo: 'Condomínio',
        rotulo: 'Visitantes',
        path: '/morador/visitantes',
        icone: (
            <>
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
            </>
        )
    },

    // Condomínio (regras e laudos — rota continua /morador/registros/...)
    {
        chave: 'regrasLaudos',
        grupo: 'Condomínio',
        rotulo: 'Condomínio',
        path: '/morador/registros/regras',
        icone: (
            <>
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
            </>
        )
    }
]


// Função que cria o componente da barra lateral
const SidebarMorador = () => {

    //Cmponente que realiza a nevegação automatica
    const navigate = useNavigate();

    //Hook que informa a rota atual, usado para marcar o item selecionado
    const { pathname } = useLocation();

    //Pegando as ações adicionadas no provider
    const {menuLateral, setMenuLateral} = useContext(MenuLateralContext);

    //Função que altera o estado do hook useConstext para alterar o menu lateral
    const toogleMenuLarateral = () => {

        //Altera a o valor da variável do estado
        setMenuLateral( menuLateral === 'fechado' ? "aberto" : 'fechado')
    }

    //Função que diz se o item corresponde à tela que está aberta
    const estaAtivo = (item) => {

        //A aba de visitantes continua marcada ao abrir o formulário de cadastro
        if(item.chave === 'visitantes' && pathname.startsWith('/morador/visitantes')){

            return true
        }

        //A rota /morador/mensagens faz parte da área de comunicação,
        //então ela acende o item "Comunicação" (nenhuma outra condição mudou)
        if(item.chave === 'comunicados' && pathname.startsWith('/morador/mensagens')){

            return true
        }

        return pathname === item.path
    }

    //Função que leva o morador até o item escolhido e fecha a sidebar
    const irPara = (item) => {

        //Navega para a rota do item
        navigate(item.path)

        //Fecha o menu apenas no modo drawer (<= 900px), onde ele cobre o
        //conteúdo. No desktop o menu lateral permanece aberto para que o
        //morador navegue entre telas sem reabrir o menu a cada clique.
        if (typeof window !== 'undefined' && window.innerWidth <= 900) {

            setMenuLateral('fechado')
        }
    }

  return (
    // Container principal de toda a barra lateral
    <div className={styles['sd-wrapper']}>

      {/* Cabeçalho da barra: marca à esquerda, recolher à direita */}
      <div className={styles['sd-header']}>

        {/* Container da marca, em versão sobre fundo escuro (sidebar).
            O selo do perfil vem abaixo do nome para caber na largura
            da barra sem disputar espaço com o botão de recolher. */}
        <div className={styles['sd-brand-box']}>
          <h1 className={styles['sd-brand-title']}>
            <MarcaCondex papel="Morador" escuro papelAbaixo />
          </h1>
        </div>

        {/* Recolhe (desktop) ou fecha (drawer) o menu lateral */}
        <button
          type="button"
          className={styles['sd-menu-btn']}
          onClick={toogleMenuLarateral}
          aria-label="Recolher menu lateral"
          title="Recolher menu"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Área semântica de Navegação */}
      <nav className={styles['sd-nav-area']} aria-label="Menu principal">
        {/* Lista não ordenada que agrupa os links do menu */}
        <ul className={styles['sd-nav-list']}>

          {/* Cada item navega para a sua rota e é destacado quando a tela está aberta.
              O rótulo de grupo aparece quando o grupo do item muda (só apresentação). */}
          {ITENS_SIDEBAR.map((item, indice) => (

            <Fragment key={item.chave}>

              {(indice === 0 || ITENS_SIDEBAR[indice - 1].grupo !== item.grupo) && (
                <li className={styles['sd-group']} aria-hidden="true">{item.grupo}</li>
              )}

              <li
                className={`${styles['sd-nav-item']} ${estaAtivo(item) ? stylesMorador['sd-item--ativo'] : ''}`}
                onClick={() => irPara(item)}
              >

                {/* Ícone SVG do item, montado a partir dos traçados definidos na lista */}
                <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={styles['sd-icon']} aria-hidden="true">
                  {item.icone}
                </svg>

                {/* Texto descritivo do botão */}
                <span className={styles['sd-label']}>{item.rotulo}</span>

              </li>

            </Fragment>

          ))}

        </ul> 
      </nav> 

      {/* Assinatura da marca: ânchora visual do rodapé da barra */}
      <div className={styles['sd-footer']}>Comunicação que conecta</div>

    </div>
  )
};

// Exporta o componente para uso em outras partes da aplicação
export default SidebarMorador;
