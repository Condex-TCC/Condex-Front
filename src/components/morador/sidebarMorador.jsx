import React, { useContext } from 'react'; // Importa a biblioteca base do React para criar o componente
import styles from '../../css/sidebarSindico.module.css'; // Importa o arquivo de folha de estilos CSS com as novas classes
import { MenuLateralContext } from '../../context/menuLateralContext';
import { Link, useNavigate } from 'react-router-dom';


// Função que cria o componente da barra lateral
const SidebarMorador = () => {

    //Cmponente que realiza a nevegação automatica
    const navigate = useNavigate();

    //Pegando as ações adicionadas no provider
    const {menuLateral, setMenuLateral} = useContext(MenuLateralContext);

    //Função que altera o estado do hook useConstext para alterar o menu lateral
    const toogleMenuLarateral = () => {

        //Altera a o valor da variável do estado
        setMenuLateral( menuLateral === 'fechado' ? "aberto" : 'fechado')
    }

    //FUNÇÕES PARA REDIRECIONAMENTO

    //Home
    const home = () => {
      // TODO: Implementar depois
    }

    //Reservas
    const reservas = () => {
      // TODO: Implementar depois
    }

    //Comunicados
    const comunicados = () => {
      // TODO: Implementar depois
    }

    //Visitantes
    const visitantes = () => {
      // TODO: Implementar depois
    }

    //Regras e Laudos
    const regrasLaudos = () => {
      // TODO: Implementar depois
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
        <span className={styles['sd-brand-sub']}>Morador</span>
      </div>

      {/* Área semântica de Navegação */}
      <nav className={styles['sd-nav-area']}>
        {/* Lista não ordenada que agrupa os links do menu */}
        <ul className={styles['sd-nav-list']}>

          {/* Item do menu: Home (Possui a classe active para simular seleção) */}
          <li className={`${styles['sd-nav-item']} ${styles['sd-item-active']}`} onClick={home}>

            {/* Ícone SVG: Casa (Home) */}
            <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={styles['sd-icon']}>
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>

            {/* Texto descritivo do botão */}
            <span className={styles['sd-label']}>Home</span> 
          </li>

          {/* Item do menu: Reservas */}
          <li className={styles['sd-nav-item']} onClick={reservas}>
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
          <li className={styles['sd-nav-item']} onClick={comunicados}>
            {/* Ícone SVG: Balão de Diálogo */}
            <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={styles['sd-icon']}>
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            {/* Texto descritivo do botão */}
            <span className={styles['sd-label']}>Comunicados</span> 
          </li>

          {/* Item do menu: Visitantes */}
          <li className={styles['sd-nav-item']} onClick={visitantes}>
            {/* Ícone SVG: Usuário */}
            <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={styles['sd-icon']}>
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            {/* Texto descritivo do botão */}
            <span className={styles['sd-label']}>Visitantes</span>
          </li>

          {/* Item do menu: Regras e Laudos */}
          <li className={styles['sd-nav-item']} onClick={regrasLaudos}>
            {/* Ícone SVG: Papel com texto escrito */}
            <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={styles['sd-icon']}>
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            {/* Texto descritivo do botão */}
            <span className={styles['sd-label']}>Regras e Laudos</span>
          </li>

        </ul> 
      </nav> 
      
    </div>
  )
};

// Exporta o componente para uso em outras partes da aplicação
export default SidebarMorador;
