//Menu inferior com a navegação principal do morador

//Local das importações
import { useLocation, useNavigate } from 'react-router-dom'
import styles from '../../css/menuInferiorMorador.module.css'

//Lista de itens do menu
//path: rota de destino | quando não existir, o item avisa que a tela ainda está em desenvolvimento
const ITENS_MENU = [

    //Início
    {
        chave: 'inicio',
        rotulo: 'Início',
        path: '/morador',
        icone: (
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        ),
        complementares: (
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
        )
    },

    //Calendário / Reservas
    {
        chave: 'reservas',
        rotulo: 'Reservas',
        path: '/morador/reservas',
        icone: (
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        ),
        complementares: (
            <>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
            </>
        )
    },

    //Mensagens / Notificações
    {
        chave: 'mensagens',
        rotulo: 'Mensagens',
        path: '/morador/mensagens',
        icone: (
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        )
    },

    //Perfil / Visitantes
    {
        chave: 'visitantes',
        rotulo: 'Visitantes',
        path: '/morador/visitantes',
        icone: (
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        ),
        complementares: (
            <circle cx="12" cy="7" r="4"></circle>
        )
    },

    //Documentos
    {
        chave: 'documentos',
        rotulo: 'Documentos',
        path: '/morador/documentos',
        icone: (
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        ),
        complementares: (
            <>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
            </>
        )
    }
]

//Função que cria o componente do menu inferior
function MenuInferiorMorador(){

    //Hook que realiza a navegação
    const navigate = useNavigate()

    //Hook que informa a rota atual, usado para marcar a aba selecionada
    const { pathname } = useLocation()

    //Função que diz se o item corresponde à tela que está aberta
    const estaAtivo = (item) => {

        //A aba de visitantes continua marcada ao abrir o formulário de cadastro
        if(item.chave === 'visitantes' && pathname.startsWith('/morador/visitantes')){

            return true
        }

        return pathname === item.path
    }

    //Função que leva o morador até o item escolhido
    const irPara = (item) => {

        //Não recarrega a tela quando o morador toca na aba que já está aberta
        if(estaAtivo(item)){

            return
        }

        //Navega para a rota do item
        navigate(item.path)
    }

    //Retorna o componente
    return (

        //Elemento de navegação que contém todos os itens
        <nav className={styles['mi-wrapper']} aria-label="Navegação principal">

            {/* Lista os itens do menu */}
            {ITENS_MENU.map((item) => (

                //Marca como selecionado o item cuja rota corresponde à tela aberta
                <button
                    key={item.chave}
                    type="button"
                    className={`${styles['mi-item']} ${estaAtivo(item) ? styles['mi-item--ativo'] : ''}`}
                    onClick={() => irPara(item)}
                    aria-current={estaAtivo(item) ? 'page' : undefined}
                >

                    {/* Ícone SVG do item, montado a partir dos traçados definidos na lista */}
                    <svg
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={styles['mi-icon']}
                        aria-hidden="true"
                    >
                        {item.icone}
                        {item.complementares}
                    </svg>

                    {/* Texto descritivo do botão */}
                    <span className={styles['mi-label']}>{item.rotulo}</span>

                </button>
            ))}

        </nav>
    )
}

//Exportando o componente para ser utilizado no layout do morador
export default MenuInferiorMorador
