/* ==================================================
   MARCA CONDEX — componente visual compartilhado
   --------------------------------------------------
   PAPEL NO SISTEMA
   Única fonte da identidade gráfica do CONDEX. Monta

       [prédios + balão]  CONDE**X**   │  SÍNDICO

   e é reaproveitado pela tela inicial, pelo login, pelos
   três cabeçalhos e pelas duas sidebars. Como o desenho
   vive em um só lugar, qualquer ajuste futuro se propaga
   para todas as telas.

   NÃO há lógica de negócio aqui: o componente apenas
   desenha. As classes visuais são globais e estão
   documentadas em src/css/condexTokens.css.

   REFERÊNCIA DA IDENTIDADE (logo original do CONDEX)
   --------------------------------------------------
   • três prédios em ascensão (o condomínio/administração);
   • balão de conversa com reticências (a comunicação);
   • wordmark CONDEX em tipografia leve e espaçada;
   • o "X" final em degradê azul -> ciano;
   • paleta azul-marinho + azul + ciano.

   O selo do papel (Síndico/Morador/Porteiro) é sempre
   INFORMAÇÃO SECUNDÁRIA: menor, cor neutra e separado
   por um filete — nunca compete com a marca.

   COMO ESCALA
   Ícone, nome e selo usam unidades `em`: o tamanho final
   é definido pelo contexto (font-size de quem o usa).
   ================================================== */

/**
 * Ícone da marca (viewBox 118 x 76).
 *
 * Desenho: três prédios de altura crescente com janelas
 * quadradas; o prédio mais alto usa o degradê da marca.
 * O balão de conversa é um círculo com abertura apenas
 * no canto inferior esquerdo, de onde nasce a cauda —
 * assim o círculo continua legível em qualquer tamanho.
 *
 * O balão é preenchido com `--cx-marca-mascara`: ele passa
 * por cima do prédio (como na referência) e precisa "cortar"
 * o traço atrás de si. Branco em fundo claro e azul-marinho
 * em fundo escuro.
 *
 * @param {string} className classe aplicada ao <svg> (tamanho/posição)
 */
export function IconeCondex({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 118 76"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"        /* Decorativo: o nome já descreve a marca */
      focusable="false"
    >
      <defs>
        {/* Degradê do prédio mais alto: azul-marinho na base -> ciano no topo */}
        <linearGradient id="cx-grad-bloco-claro" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#123a8f" />
          <stop offset="55%" stopColor="#1f6fd0" />
          <stop offset="100%" stopColor="#33b6f0" />
        </linearGradient>
        <linearGradient id="cx-grad-bloco-escuro" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#2f6fd0" />
          <stop offset="55%" stopColor="#57b7f2" />
          <stop offset="100%" stopColor="#8ce4ff" />
        </linearGradient>

        {/* Degradê do balão: azul -> ciano */}
        <linearGradient id="cx-grad-balao-claro" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#1f8fd6" />
          <stop offset="100%" stopColor="#33c3f0" />
        </linearGradient>
        <linearGradient id="cx-grad-balao-escuro" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#33c3f0" />
          <stop offset="100%" stopColor="#7fe0ff" />
        </linearGradient>
      </defs>

      {/* ---------- Prédios (traço de 4,5 com cantos arredondados) ---------- */}
      <g stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3"  y="44" width="24" height="28" rx="2" />
        <rect x="32" y="24" width="26" height="48" rx="2" />
      </g>

      {/* Prédio mais alto: mesmo desenho, cor pelo degradê da identidade */}
      <rect
        className="cx-marca-bloco"
        x="63" y="4" width="28" height="68" rx="2"
        stroke="url(#cx-grad-bloco-claro)"
        strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round"
      />

      {/* Janelas: quadrados preenchidos que dão textura sem poluir o desenho */}
      <g fill="currentColor">
        <rect x="8.5" y="51" width="4.6" height="4.6" rx="1" />
        <rect x="17"  y="51" width="4.6" height="4.6" rx="1" />
        <rect x="8.5" y="61" width="4.6" height="4.6" rx="1" />
        <rect x="17"  y="61" width="4.6" height="4.6" rx="1" />

        <rect x="38" y="31" width="4.6" height="4.6" rx="1" />
        <rect x="47" y="31" width="4.6" height="4.6" rx="1" />
        <rect x="38" y="42" width="4.6" height="4.6" rx="1" />
        <rect x="47" y="42" width="4.6" height="4.6" rx="1" />
        <rect x="38" y="53" width="4.6" height="4.6" rx="1" />
        <rect x="47" y="53" width="4.6" height="4.6" rx="1" />

        <rect x="69" y="13" width="4.6" height="4.6" rx="1" />
        <rect x="78" y="13" width="4.6" height="4.6" rx="1" />
        <rect x="69" y="24" width="4.6" height="4.6" rx="1" />
        <rect x="78" y="24" width="4.6" height="4.6" rx="1" />
        <rect x="69" y="35" width="4.6" height="4.6" rx="1" />
        <rect x="78" y="35" width="4.6" height="4.6" rx="1" />
      </g>

      {/* ---------- Balão de conversa (por cima do prédio) ---------- */}
      <g className="cx-marca-balao">
        {/* Contorno: círculo aberto apenas no canto inferior esquerdo,
            de onde nasce a cauda (arco de 312° para manter o círculo legível) */}
        <path
          className="cx-marca-balao-traco"
          d="M76 71 L95.05 66.74 A17 17 0 1 0 83.58 59.01 Z"
          stroke="url(#cx-grad-balao-claro)"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Reticências da conversa */}
        <g className="cx-marca-balao-pontos" fill="currentColor" stroke="none">
          <circle cx="91"   cy="50" r="2.6" />
          <circle cx="98.5" cy="50" r="2.6" />
          <circle cx="106"  cy="50" r="2.6" />
        </g>
      </g>
    </svg>
  );
}

/**
 * Monta a marca completa.
 *
 * @param {string}  papel       Texto do selo (ex.: "Síndico"). Se ausente, o selo não aparece.
 * @param {boolean} escuro      true quando a marca está sobre fundo azul-marinho.
 * @param {boolean} vertical    true quando o ícone deve ficar acima do nome (hero/painel).
 * @param {boolean} papelAbaixo true para empilhar o selo ABAIXO do nome — usado na
 *                               sidebar, onde a largura é curta e o selo não pode
 *                               disputar espaço com o botão de recolher o menu.
 * @param {string}  className   Classes extras do contexto (não altera a marca).
 */
export default function MarcaCondex({ papel, escuro = false, vertical = false, papelAbaixo = false, className = "" }) {
  // Composição de classes: base + variações + classes do contexto
  const classes = [
    "cx-marca",
    escuro ? "cx-marca--escuro" : "",
    vertical ? "cx-marca--vertical" : "",
    papelAbaixo ? "cx-marca--papel-abaixo" : "",
    className,
  ].filter(Boolean).join(" ");

  return (
    <span className={classes}>
      <span className="cx-marca-linha">
        {/* Ícone dos prédios + balão */}
        <IconeCondex className="cx-marca-icone" />

        {/* Nome: "CONDE" + "X" com degradê azul -> ciano */}
        <span className="cx-marca-nome">
          <span>CONDE</span>
          <span className="cx-marca-x">X</span>
        </span>

        {/* Selo do papel — só existe quando a tela informa o perfil.
            Sempre depois do nome e em estilo secundário. */}
        {papel && <span className="cx-marca-papel">{papel}</span>}
      </span>
    </span>
  );
}
