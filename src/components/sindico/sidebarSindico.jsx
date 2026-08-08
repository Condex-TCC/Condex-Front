import React, { useContext } from 'react'; // Importa a biblioteca base do React para criar o componente
import styles from '../../css/sidebarSindico.module.css'; // Importa o arquivo de folha de estilos CSS com as novas classesimport { MenuLateralContext } from '../../context/menuLateralContext';
import { MenuLateralContext } from '../../context/menuLateralContext';

// Função que cria o componente da barra lateral
const SidebarSindico = () => {

    //Pegando as ações adicionadas no provider
    const {menuLateral, setMenuLateral} = useContext(MenuLateralContext);

    //Função que altera o estado do hook useConstext para alterar o menu lateral
    const toogleMenuLarateral = () => {

        //Altera a o valor da variável do estado
        setMenuLateral( menuLateral === 'fechado' ? "aberto" : 'fechado')
    }

  return (
    // Container principal de toda a barra lateral
    <div className={styles['sd-wrapper']}>

      {/* Cabeçalho que alinha o botão do menu */}
      <div className={styles['sd-header']} onClick={toogleMenuLarateral}>
        {/* Botão interativo que contém o ícone do menu (hambúrguer) */}
        <button className={styles['sd-menu-btn']}>
          {/* Inicia o SVG do menu sanduíche */}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> 
            {/* Desenha as três linhas horizontais arredondadas */}
            <path d="M4 6H20" stroke="#cdd5e0" strokeWidth="2" strokeLinecap="round" />
            <path d="M4 12H20" stroke="#cdd5e0" strokeWidth="2" strokeLinecap="round" />
            <path d="M4 18H20" stroke="#cdd5e0" strokeWidth="2" strokeLinecap="round" />
          </svg> 
        </button>
      </div>

      {/* Container para agrupar o título e o subtítulo da marca */}
      <div className={styles['sd-brand-box']}>
        {/* Título de maior hierarquia para o nome principal */}
        <h1 className={styles['sd-brand-title']}>
          {/* Texto principal com letras isoladas para destaque de cor */}
          Cond<span className={styles['sd-brand-e']}>e</span><span className={styles['sd-brand-x']}>x</span>
        </h1>
        {/* Subtítulo que fica posicionado logo abaixo da marca principal */}
        <span className={styles['sd-brand-sub']}>Síndico</span>
      </div>

      {/* Área semântica de Navegação */}
      <nav className={styles['sd-nav-area']}>
        {/* Lista não ordenada que agrupa os links do menu */}
        <ul className={styles['sd-nav-list']}>

          {/* Item do menu: Início (Possui a classe active para simular seleção) */}
          <li className={`${styles['sd-nav-item']} ${styles['sd-item-active']}`}>
            {/* Ícone SVG: Casa (Início) */}
            <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={styles['sd-icon']}>
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            {/* Texto descritivo do botão */}
            <span className={styles['sd-label']}>Inicio</span> 
          </li>

          {/* Item do menu: Usuários */}
          <li className={styles['sd-nav-item']}>
            {/* Ícone SVG: Grupo de Usuários */}
            <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={styles['sd-icon']}>
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            {/* Texto descritivo do botão (grafia mantida conforme solicitado) */}
            <span className={styles['sd-label']}>Usúarios</span>
          </li>

          {/* Item do menu: Reservas */}
          <li className={styles['sd-nav-item']}>
            {/* Ícone SVG: Calendário */}
            <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={styles['sd-icon']}>
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            {/* Texto descritivo do botão */}
            <span className={styles['sd-label']}>Reservas</span>
          </li>

          {/* Item do menu: Comunicados */}
          <li className={styles['sd-nav-item']}>
            {/* Ícone SVG: Balão de Diálogo */}
            <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={styles['sd-icon']}>
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            {/* Texto descritivo do botão */}
            <span className={styles['sd-label']}>Comunicados</span> 
          </li>

          {/* Item do menu: Condomínio */}
          <li className={styles['sd-nav-item']}>
            {/* Ícone SVG: Edifício */}
            <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={styles['sd-icon']}>
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
            <span className={styles['sd-label']}>Condominio</span>
          </li>

        </ul> 
      </nav> 
      
    </div>
  )
};

// Exporta o componente para uso em outras partes da aplicação
export default SidebarSindico;