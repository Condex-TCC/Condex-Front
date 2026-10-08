import React, { useContext } from 'react'; // Importa a biblioteca base do React para criar o componente
import styles from '../../css/sidebarSindico.module.css'; // Importa o arquivo de folha de estilos CSS com as novas classes
import { MenuLateralContext } from '../../context/menuLateralContext';
import MarcaCondex from '../marca/marcaCondex'; // Marca compartilhada do CONDEX
import { useLocation, useNavigate } from 'react-router-dom';

// Rótulos exibidos no menu do Síndico (apresentação).
// Rotas, arquivos e funções continuam com os nomes originais.
const GRUPOS = {
  principal: 'Principal',
  comunidade: 'Comunidade',
  condominio: 'Condomínio',
}

// Função que cria o componente da barra lateral
const SidebarSindico = () => {

    //Cmponente que realiza a nevegação automatica
    const navigate = useNavigate();

    //Rota atual, usada apenas para marcar o item do menu que
    //corresponde à tela aberta (estado visual, sem tocar em rota)
    const { pathname } = useLocation();

    //Pegando as ações adicionadas no provider
    const {menuLateral, setMenuLateral} = useContext(MenuLateralContext);

    //Função que altera o estado do hook useConstext para alterar o menu lateral
    const toogleMenuLarateral = () => {

        //Altera a o valor da variável do estado
        setMenuLateral( menuLateral === 'fechado' ? "aberto" : 'fechado')
    }

    //Fecha o menu apenas no modo drawer (<= 900px).
    //No desktop o menu permanece aberto para o síndico
    //navegar entre telas sem reabrir o menu a cada clique.
    const fecharNoDrawer = () => {

      if (typeof window !== 'undefined' && window.innerWidth <= 900) {

        setMenuLateral('fechado')
      }
    }

    //FUNÇÕES PARA REDIRECIONAMENTO

    //Inicio
    const incio = () => {

      navigate("/sindico")
      fecharNoDrawer()
    }

    //Usuários
    const usuarios = () => {

      navigate("/sindico/usuarios")
      fecharNoDrawer()
    }

    //Laudos e regras
    const regrasLaudos = () => {

      navigate("condominio/regrasLaudos")
      fecharNoDrawer()
    }

    //Reservas
    const reservas = () => {

      navigate('/sindico/reservas')
      fecharNoDrawer()
    }

    //Comunicados
    const comunicados = () => {

      navigate('/sindico/comunicados')
      fecharNoDrawer()
    }

    //Diz se um item corresponde à tela aberta.
    //Início compara por igualdade (senão valeria para tudo);
    //os demais aceitam subrotas (ex.: /sindico/usuarios/porteiro
    //mantém "Usuários" destacado).
    const estaAtivo = (path) => {

      if (path === '/sindico') return pathname === path
      return pathname === path || pathname.startsWith(`${path}/`)
    }

    //Comum aos itens que pertencem à área de gestão condominial
    //(regras, laudos e apartamentos ficam sob "Condomínio")
    const estaAtivoCondominio = () =>
      estaAtivo('/sindico/condominio') || estaAtivo('/sindico/apertamentos')

    //Classe do item: base + destaque quando for a tela aberta
    const classeItem = (ativo) =>
      `${styles['sd-nav-item']} ${ativo ? styles['sd-item-active'] : ''}`

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
            <MarcaCondex papel="Síndico" escuro papelAbaixo />
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

          {/* Rótulo de seção — apenas apresentação, não navega */}
          <li className={styles['sd-group']} aria-hidden="true">{GRUPOS.principal}</li>

          {/* Item do menu: Início */}
          <li className={classeItem(estaAtivo('/sindico'))} onClick={incio}>

            {/* Ícone SVG: Casa (Início) */}
            <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={styles['sd-icon']} aria-hidden="true">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>

            {/* Texto descritivo do botão */}
            <span className={styles['sd-label']}>Início</span>
          </li>

          {/* Item do menu: Usuários */}
          <li className={classeItem(estaAtivo('/sindico/usuarios'))} onClick={usuarios}>

            {/* Ícone SVG: Grupo de Usuários */}
            <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={styles['sd-icon']} aria-hidden="true">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>

            {/* Texto descritivo do botão (rótulo padronizado: "Usuários") */}
            <span className={styles['sd-label']}>Usuários</span>
          </li>

          {/* Rótulo de seção */}
          <li className={styles['sd-group']} aria-hidden="true">{GRUPOS.comunidade}</li>

          {/* Item do menu: Reservas */}
          <li className={classeItem(estaAtivo('/sindico/reservas'))} onClick={reservas}>
            {/* Ícone SVG: Calendário */}
            <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={styles['sd-icon']} aria-hidden="true">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            {/* Texto descritivo do botão */}
            <span className={styles['sd-label']}>Áreas comuns</span>
          </li>

          {/* Item do menu: Comunicados */}
          <li className={classeItem(estaAtivo('/sindico/comunicados'))} onClick={comunicados}>
            {/* Ícone SVG: Balão de Diálogo */}
            <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={styles['sd-icon']} aria-hidden="true">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            {/* Texto descritivo do botão */}
            <span className={styles['sd-label']}>Comunicação</span> 
          </li>

          {/* Rótulo de seção */}
          <li className={styles['sd-group']} aria-hidden="true">{GRUPOS.condominio}</li>

          {/* Item do menu: Condomínio */}
          <li className={classeItem(estaAtivoCondominio())} onClick={regrasLaudos}>
            {/* Ícone SVG: Edifício */}
            <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={styles['sd-icon']} aria-hidden="true">
              <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18"></path>
              <path d="M10 22v-5h4v5"></path> 
              <path d="M9 7h.01"></path>
              <path d="M15 7h.01"></path>
              <path d="M9 11h.01"></path>
              <path d="M15 11h.01"></path>
              <path d="M9 15h.01"></path> 
              <path d="M15 15h.01"></path> 
            </svg>
            {/* Texto descritivo do botão */}
            <span className={styles['sd-label']}>Condomínio</span>
          </li>

        </ul> 
      </nav> 

      {/* Assinatura da marca: ânchora visual do rodapé da barra */}
      <div className={styles['sd-footer']}>Comunicação que conecta</div>

    </div>
  )
};

// Exporta o componente para uso em outras partes da aplicação
export default SidebarSindico;
