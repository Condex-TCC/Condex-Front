# CONDEX — Melhorias visuais

Refino completo da interface do sistema de condomínios **CONDEX** (React + Vite), em duas etapas:

1. **Etapa 1** — identidade da marca, **tela inicial (rota `/`)** e **tela de login (rota `/login`)**;
2. **Etapa 2** — refino visual de **todas as telas internas dos três perfis** (Síndico, Morador e
   Porteiro), mantendo a estrutura funcional intacta.

> Documento complementar ao [`PADRONIZACAO.md`](./PADRONIZACAO.md), que descreve a padronização
> geral (tokens, sidebars, cabeçalhos e telas dos três perfis).

---

## 1. Resumo do que foi feito

| Frente | Entrega |
| --- | --- |
| **Identidade** | Marca CONDEX centralizada em um único componente (`MarcaCondex`), reutilizada em todas as telas; favicon, título, meta tags e tipografia de display (Manrope) |
| **Tela inicial** | Nova tela de apresentação: selo, marca, frase institucional, assinatura, botão "Acessar sistema" e indicação dos perfis |
| **Tela de login** | Cartão em duas colunas (painel de marca + formulário), tipografia, campos e botão com contraste reforçado |
| **Fundo** | Fundo 100% em CSS (textura, anéis e orbes) compartilhado entre `/` e `/login` |
| **Shell (etapa 2)** | Sidebar persistente no desktop (264px) com item ativo, drawer + fundo escurecido no mobile, cabeçalho de 68px e menu inferior do morador |
| **Telas internas (etapa 2)** | Dashboard, listas, tabelas, formulários, cards e estados vazios dos 3 perfis com a mesma linguagem visual (mesmos nomes de classe) |
| **Responsividade (etapa 2)** | Valida em 1440 (desktop), 900–1024 (notebook/tablet) e 390 (celular): nenhuma tela com rolagem horizontal |
| **Padronização geral** | Tokens globais, botões/cards utilitários, cabeçalhos e menus dos 3 perfis (detalhes no `PADRONIZACAO.md`) |
| **Textos visíveis** | Rótulos de menu padronizados e 3 textos com erro corrigidos; textos originais do app preservados (ver seção 7) |
| **Validação visual** | 39 screenshots com selo de identificação + verificações de DOM automatizadas (ver seção 11) |

**Regra cumprida:** nenhuma alteração de funcionalidade — lógica de negócio, API, services, cookies,
tokens, rotas, CRUD, back-end e banco permanecem intactos. Nenhum arquivo foi removido ou renomeado.

---

## 2. Identidade da marca CONDEX

### 2.1 Componente único da marca — `src/components/marca/marcaCondex.jsx` (novo)

A marca agora existe em **um só lugar** e é reaproveitada em 7 pontos:

`telaInicial` · `telaLogin` · `headerSindoc` · `headerMorador` · `headerPorteiro` · `sidebarSindico` · `sidebarMorador`

Composição:

```
[ícone] CONDE X          ← ícone + nome na mesma linha (cabeçalhos)
   SÍNDICO               ← selo com o papel (quando a tela informa o perfil)
```

- **Ícone SVG (viewBox 92×64):** três prédios em ascensão (gestão/administração) + um balão de
  conversa com reticências (comunicação). Traço único, cantos arredondados e cores herdadas por
  `currentColor`, o que mantém o desenho nítido de 16px (favicon) até 64px (tela inicial).
- **Nome:** `CONDE` + `X` em degradê (`--cx-marca-grad`), caixa alta, `letter-spacing` de logotipo,
  fonte display **Manrope 800**.
- **Selo de papel:** `Síndico` / `Morador` / `Porteiro` — reforça qual perfil está logado.
- **Variações:** `escuro` (sidebars e painel do login: degradê e balão em tons claros sobre
  azul-marinho) e `vertical` (ícone acima do nome, para hero e painel de login).
- **Escala em `em`:** o tamanho final é definido pelo contexto (o `font-size` do título de cada
  tela); a marca não precisa de medidas duplicadas.

### 2.2 Navegador — `index.html` e `public/favicon.svg`

- `lang="pt-BR"`, título **"CONDEX — Sistema de administração de condomínios"**, meta description e
  `theme-color #001c3f` (barra do navegador em azul-marinho).
- Tipografia de display **Manrope** (500–800) via Google Fonts; corpo continua em `--cx-font`.
- Favicon redesenhado como a própria marca, com traço mais grosso para continuar legível a 16px.

### 2.3 Tokens globais — `src/css/condexTokens.css` (novo)

Importado **primeiro** em `src/main.jsx`, para que as variáveis de `:root` estejam disponíveis em
todos os `*.module.css`. Paleta e função de cada família:

| Família | Função |
| --- | --- |
| Azul-marinho (`--cx-navy*`) | estrutura e identidade (sidebars, cabeçalhos escuros) |
| Azul principal (`--cx-primary`) | ações primárias, abas ativas, foco, marca |
| Ciano (`--cx-brand-cyan`) | destaque da marca (X e balão sobre escuro) |
| Verde (`--cx-success`) | sucesso e confirmação |
| Vermelho (`--cx-danger`) | erro, exclusão e ações destrutivas |
| Amarelo (`--cx-warning`) | alerta e pendência |
| Cinzas (`--cx-*`) | fundos, bordas, textos de apoio |

> **"Não quero que tudo fique azul."** — os azuis ficaram restritos a estrutura/identidade/ação
> primária; sucesso, erro e alerta usam cores próprias, e os neutros são cinzas.

Também estão aqui as classes globais reutilizáveis `.cx-btn` (primário/secundário/destrutivo),
`.cx-card`, `.cx-page` e as classes `.cx-marca*` da identidade.

---

## 3. Tela inicial — rota `/`

Arquivos: `src/pages/telaInicial.jsx` + `src/css/loginLayout.module.css` + `src/layouts/LoginLayout.jsx`

Estrutura (nesta ordem — a ordem do JSX também é a ordem da animação de entrada):

1. **Selo** "Gestão condominial"
2. **Marca CONDEX** em tamanho de destaque (ícone acima do nome)
3. **Frase institucional** "Sistema de administração de condomínios"
4. **Régua** em degradê (decorativa, `aria-hidden`)
5. **Assinatura** "Comunicação que conecta"
6. **Botão "Acessar sistema"** → `<Link to="/login">` (único link da tela)
7. **Perfis** "Síndico · Morador · Porteiro"

### Fundo 100% em CSS

Camadas decorativas (todas `aria-hidden` e `pointer-events: none`):

- `textura-pontos` — pontos em degradê pelo fundo
- `anel-1` / `anel-2` — círculos vazados nas bordas
- `orbe-1` / `orbe-2` — orbs com flutuação lenta

> **Decisão:** `src/assets/imagemInicial.png` foi mantida no repositório (conforme solicitado), mas
> **não é referenciada**: o fundo em CSS pesa zero no bundle, escala para qualquer resolução e
> permite animação/responsividade sem depender de um bitmap.

---

## 4. Tela de login — rota `/login`

Arquivo: `src/pages/telaLogin.jsx` (apresentação) + `src/css/loginLayout.module.css`

Cartão em duas colunas:

```
┌──────────────────────┬─────────────────────────────┐
│  painel-marca        │  Bem-vindo ao CONDEX        │
│  (escuro)            │  Acesse sua conta           │
│  marca + assinatura  │                             │
│  Síndico/Morador/    │  [ usuário ]                │
│  Porteiro            │  [ senha            👁 ]    │
│                      │  [ Entrar → ]               │
│                      │  rodapé legal               │
└──────────────────────┴─────────────────────────────┘
```

- Mesma linguagem da tela inicial: mesma marca, mesma tipografia e o **mesmo fundo em CSS**
  (continuidade visual entre `/` e `/login`).
- Campos, estados (`usuario`, `password`), função `realizarLogin` ligada ao `onSubmit`, cookies e
  redirecionamento por perfil **permanecem exatamente como estavam** — apenas a apresentação mudou.
- Rótulos com `htmlFor`/`id` (acessibilidade por teclado/leitor de tela).
- Ícone de olho é **decorativo** (`pointer-events: none`, sem hover), pois não há comportamento de
  mostrar/ocultar senha associado — evita sugerir uma função inexistente.
- Contraste: rótulos em texto forte, campos com borda visível e halo de foco, botão primário com
  texto branco.

**Responsivo:**

| Breakpoint | Comportamento |
| --- | --- |
| `> 880px` | cartão em 2 colunas (painel escuro à esquerda) |
| `≤ 880px` | painel de marca vira **faixa superior** (coluna única) |
| `≤ 640px` | painel centralizado, título reduzido, botões em largura total, orbes menores |
| `≤ 680px` de altura | respiro vertical reduzido para o botão ficar visível sem rolar |

---

## 5. Fluxo tela inicial → login

```
   "/"  (tela inicial)
     │
     │  clique em "Acessar sistema"
     ▼
   "/login"
     │
     │  preencher usuário/senha → botão "Entrar"
     │  (lógica intacta: HendleLogin → cookie → navegação)
     ▼
   "/sindico"  |  "/morador"  |  "/porteiro"     ← conforme o tipo_usuario da API
```

Observações:

- Se já existir cookie de sessão válida, o `useEffect` do login redireciona automaticamente para o
  perfil correspondente (comportamento original preservado).
- Voltando ao histórico: o botão da tela inicial é um `<Link>` do React Router (navegação interna,
  sem recarregar a página).

---

## 6. Animações

Todas ficam em `src/css/loginLayout.module.css` (regra de CSS Modules: `@keyframes` vive no mesmo
arquivo que o referencia).

| Animação | Onde | O que faz |
| --- | --- | --- |
| `cx-entrada` | blocos da tela inicial (`0.65s`) | sobe 14px e ganha opacidade |
| `cx-entrada` | cartão do login (`0.55s`) | mesma entrada, para o cartão aparecer com suavidade |
| cascata `nth-child` | `0.05s → 0.53s` | cada bloco da tela inicial entra um pouco depois do anterior |
| `cx-flutuar` | `orbe-1` (14s) e `orbe-2` (19s) | flutuação vertical muito lenta, em direções opostas |
| transições `0.2s` | botões, campos, menu | feedback de hover/focus/active |

Critérios adotados:

- **Discretas:** sem parallax, sem carrossel, sem animação sobre o conteúdo textual.
- **Acessíveis:** `@media (prefers-reduced-motion: reduce)` desliga todas as animações e transições,
  mantendo o layout e a leitura intactos (quem ativa "reduzir animações" no sistema operacional vê
  as telas estáticas).
- Elementos decorativos são `aria-hidden="true"` e não capturam clique.

---

## 7. Textos visíveis padronizados

**Rótulos de menu (fase 1 — só texto; rotas e handlers intactos):**

| Perfil | Antes | Depois |
| --- | --- | --- |
| Morador | Home | **Início** |
| Morador | Reservas | **Áreas comuns** |
| Morador | Comunicados | **Comunicação** |
| Morador | Regras e Laudos | **Condomínio** |
| Morador | Visitantes | Visitantes (inalterado) |
| Síndico | — | Início · Usuários · Áreas comuns · Comunicação · Condomínio |
| Porteiro | — | sem sidebar (comportamento preservado) |

**Correções de texto (erros pré-existentes, apenas string visível):**

| Arquivo | Antes | Depois |
| --- | --- | --- |
| `src/routes/router.jsx` | "Seja bem-vindo ao **Cond e x**, morador." | "Seja bem-vindo ao **CONDEX**, morador." |
| `src/pages/sindico/telaInicialSindico.jsx` | "**Ultimos** comunicados" | "**Últimos** comunicados" |
| `src/pages/sindico/telaInicialSindico.jsx` | "No momento não tem **comunidacos**!" | "No momento não há **comunicados**!" |

### 7.1 Textos originais preservados (decisão registrada)

O refino **não reescreve** o texto que já existia no app original, mesmo quando ele tem erro de
digitação ou de caixa: alterar string visível pode mudar um rótulo que o usuário já conhece, e o
pedido foi justamente preservar a nomenclatura. Ficaram exatamente como estão:

| Texto visível | Onde aparece |
| --- | --- |
| `&larr; voltar` (minúsculo) | formulários do Porteiro |
| `&larr; VOLTAR` (caixa alta) | tela de confirmação do Síndico |
| `SALVAR` | botão dos formulários do Porteiro |
| `+ Cadastar nova Regra` | lista de regras (erro de digitação original) |
| `+ Registrar Area comum` | gerenciamento de reservas (sem acento, original) |
| `configurar áreas` | ação da tela de reservas (minúsculas, original) |
| `Cadastrar um novo Porteiro` | título da lista de usuários (caixa alta original) |
| `Proximas reservas...` · `Pendente...` · `Recebida :` · `YYYY` · `bloco` | reservas e formulários do Porteiro |
| `Página exibe os comunicados` | título da lista de comunicados |
| `Selecionar esses moradores` com 0 marcados | botão segue habilitado: **array vazio = todos os moradores** (regra de negócio original) |

**Exceções autorizadas** — só onde o texto original estava quebrado ou passou a mentir por causa da
própria mudança visual:

| Arquivo | Antes | Depois | Por quê |
| --- | --- | --- | --- |
| `src/pages/morador/telaVisitantesMorador.jsx` | "Nenhum" | "Nenhum visitante ativo" | frase cortada no meio |
| `src/pages/sindico/reservas/telaExibeReservas.jsx` | "(unrendered component)" | estado vazio "Calendário de reservas" | texto de desenvolvedor visível ao usuário |
| `src/pages/morador/telaVisitantesMorador.jsx` | "Use o botão **abaixo**..." | "Use o botão **acima**..." | o botão primário subiu para o topo da tela |
| `src/routes/router.jsx` · `telaInicialSindico.jsx` | "Cond e x" · "Ultimos" · "comunidacos" | correções ortográficas | erros pré-existentes (etapa 1) |

> **Sobre o botão verde:** a classe `.buttonAprovar` continua com `--cx-success` porque o original
> já era verde (`#7ab973`) — é a semântica de aprovar/enviar. As demais ações primárias usam
> `--cx-primary`.

---

## 8. Etapa 2 — como o refino foi executado

| Passo | O que foi feito |
| --- | --- |
| 1. Design system | `src/css/condexTokens.css`: tokens de cor/espaçamento/tipografia + classes globais `.cx-btn`, `.cx-card`, `.cx-field`, `.cx-empty`, `.cx-badge`, `.cx-overline`/`.cx-page-title` |
| 2. Marca | `MarcaCondex` redesenhado (SVG 118×76: prédios + balão + `CONDE`**`X`** em degradê azul→ciano), com a prop nova `papelAbaixo` para o selo do perfil aparecer abaixo do nome na sidebar |
| 3. Shell | `shellLayout.module.css` + sidebars/cabeçalhos: sidebar fixa ≥901px, drawer + fundo escurecido <900px, item ativo com fundo claro e barra ciano, Porteiro continua **sem** sidebar |
| 4. Reescrita das telas | Cada `*.module.css` foi reescrito **mantendo os nomes das classes**, de modo que o JSX continuasse funcionando; mudanças de composição no JSX ficaram restritas a elementos de apresentação (títulos, seções, rótulos, estados vazios) |
| 5. Paralelização | 4 frentes com ownership de arquivos disjunto, guiadas por uma spec única: formulários do Síndico · Porteiro + visitantes · comunicação + reservas · morador + telas de entrada |
| 6. Revisão visual | 3 rodadas de revisão por screenshots (desktop e mobile) → correção → nova captura → nova revisão, até zerar os achados críticos e médios |
| 7. Verificação final | Captura completa com selo + checagens de DOM automatizadas (seção 11) |

**Principais correções das rodadas de revisão:** abas cortando a 3ª opção no celular; estado de erro
e estados vazios aparecendo juntos no Porteiro; campos com só placeholder e sem rótulo visível;
formulários sem card branco e com larguras desiguais; rótulos em caixa alta; título de seção e
filete ausentes; textarea com alça de redimensionamento no celular; contraste do rodapé do login;
seta nativa no select de perfil; botão primário escondido no rodapé da tela de visitantes; overlines
ausentes; selo do perfil pequeno demais (5–7px → **9,1px**).

---

## 9. Arquivos alterados

Comparação byte a byte com o ZIP original (MD5 por arquivo): **5 novos, 104 modificados, 0
removidos** — 144 → 149 arquivos, nenhum renomeado, nenhuma tela apagada, nenhum seed alterado.

### Novos (5)

| Arquivo | Finalidade |
| --- | --- |
| `src/css/condexTokens.css` | tokens globais + classes utilitárias + classes da marca |
| `src/css/shellLayout.module.css` | shell: sidebar, drawer mobile, fundo escurecido e cabeçalho |
| `src/components/marca/marcaCondex.jsx` | componente único da identidade CONDEX |
| `PADRONIZACAO.md` | documentação da padronização geral |
| `MELHORIAS_VISUAIS.md` | este documento |

### Modificados (104)

| Grupo | Qtde | Conteúdo |
| --- | --- | --- |
| `src/pages/sindico/**` | 27 | dashboard, usuários, regras/laudos, reservas, comunicação e formulários |
| `src/css/*.module.css` | 30 | todos os módulos de estilo das telas (nomes de classe preservados) |
| `src/components/sindico/**` | 13 | cabeçalho, sidebar e cards do síndico |
| `src/pages/morador/**` | 8 | início, visitantes, cadastro e "em desenvolvimento" |
| `src/components/morador/**` | 7 | cabeçalho, sidebar, menu inferior e cards |
| `src/components/porteiro/**` | 5 | cabeçalho e cards do porteiro |
| `src/pages/porteiro/**` | 4 | painel, visitantes e encomendas |
| raiz, layouts e context | 10 | `index.html` · `public/favicon.svg` · `src/main.jsx` · `src/pages/telaInicial.jsx` · `src/pages/telaLogin.jsx` · `src/routes/router.jsx` (1 string) · `src/context/menuLateralContext.jsx` (estado inicial do drawer) · `src/layouts/LoginLayout.jsx` · `src/layouts/SindicoLayout.jsx` · `src/layouts/MoradorLayout.jsx` |

> **Nenhum arquivo de `src/service/` ou `src/api/` foi tocado.** As duas exceções em áreas
> normalmente intocáveis são de apresentação: `router.jsx` tem **uma única linha diferente** (a
> string "Seja bem-vindo ao CONDEX"), sem mudança de rota, de elemento ou de import;
> `menuLateralContext.jsx` só define o estado inicial do drawer por viewport (aberto acima de 900px).

> Também foram corrigidos resíduos de uma corrupção de caracteres (`b` → `o`) que deixava
> propriedades CSS inválidas em 4 arquivos (`var(--cx-oorder)`, `oox-shadow`, `rgoa(` etc.) — a
> versão original já renderizava errado por causa disso.

---

## 10. Como testar

Na pasta do projeto:

```bash
npm install
npm run dev
```

Fluxo recomendado para validar esta entrega:

1. Abrir **`/`** → tela inicial com marca, frase institucional e botão.
2. Clicar em **"Acessar sistema"** → cai em **`/login`** com o mesmo fundo.
3. Testar em diferentes larguras (1440px, 900px, 640px, 390px): o cartão do login muda de 2 colunas
   para 1 coluna e nada estoura horizontalmente.
4. Fazer login com um usuário válido → cai no perfil correspondente
   (`/sindico`, `/morador` ou `/porteiro`).
5. Conferir a marca no cabeçalho e na sidebar (sidebar abre pelo botão de menu do cabeçalho).
6. Ativar "reduzir animações" no sistema operacional → as telas abrem estáticas.

Comandos de verificação:

```bash
npm run build     # build de produção
npx eslint .      # lint
```

> O login depende da API/back-end estarem no ar (fora do escopo desta etapa). Telas marcadas como
> "Tela em desenvolvimento" também ficaram intactas, conforme combinado.

---

## 11. Validação executada

| Verificação | Resultado |
| --- | --- |
| `npm install` | OK |
| `npx vite build` | OK — **153 módulos**, **114,38 kB CSS** / **473,35 kB JS** |
| `npx eslint .` | **131 problemas** — todos pré-existentes, abaixo da linha de base de 134 |
| Variáveis CSS | nenhum `var(--cx-*)` sem definição |
| Animações | `@keyframes` definidos e usados no mesmo módulo; `prefers-reduced-motion` presente |
| Resíduos da corrupção `b→o` | nenhum restante em CSS/JSX |
| Diferença com o original | 5 novos / 104 modificados / **0 removidos**; nada em `src/service/` ou `src/api/` |
| Screenshots com selo | **41 capturas** (30 desktop 1440×900 + 11 mobile 390×844), cada uma com um selo escuro no canto inferior direito gravando o nome da tela — 41/41 conferem |
| Rolagem horizontal | **0 telas** cortadas (`scrollWidth == innerWidth` em todas as 41) |
| Tabela com linhas | A rota `/sindico/usuarios` depende da API (fora do ar), então as 2 capturas de tabela usaram **dados fictícios injetados por interceptação de rede (CDP)** — nenhum arquivo de código foi alterado; a tabela real foi fotografada com 3 linhas e 7 colunas, e a conferência por DOM mostrou `3 registros`, 0 estouro e rolagem interna contida |
| Verificações de DOM | abas sem corte a 390px · textarea sem alça de redimensionamento no toque · Porteiro sem seções órfãs quando há erro · "voltar" à direita no cabeçalho do Porteiro · estado vazio "Nenhum visitante ativo" · selo do perfil em 9,1px (antes 5–7px) · nenhum texto cortado em `overflow` |
| Revisão visual | 3 rodadas por revisores independentes sobre as capturas — na rodada final: 13/13 telas aprovadas, **0 achados críticos ou médios** |
| Estrutura | 0 arquivos removidos/renomeados em relação ao original |

> **Durante a validação a API (`127.0.0.1:8000`) estava fora do ar**, então as telas reais exibem
> carregamento, estado vazio ou erro de conexão — comportamento esperado e fora do escopo desta
> etapa. Os `alert()` dos services originais são descartados automaticamente pelo capturador, para
> que não travem o navegador headless.

---

## 12. O que **não** foi alterado (fora de escopo)

- Regras de negócio, chamadas de API, services, cookies/tokens, rotas e CRUD.
- Back-end, banco de dados e dados seed.
- Estrutura de pastas e nomes de arquivo (nenhum arquivo criado para "substituir" outro).
- Arquitetura React (sem refatoração de componentes/contextos).
- Telas "Tela em desenvolvimento" (só receberam ajuste visual) e falhas de API/back-end.
- Comportamento do Porteiro (continua **sem** sidebar e sem menu hambúrguer — o perfil não tem
  menu por design; a ausência de item ativo ou de menu não é defeito).
- Textos visíveis originais, mesmo com erro de digitação ou caixa (seção 7.1) e o botão verde de
  aprovação/envio (`.buttonAprovar`).
- `alert()` dos services originais (fora do escopo: é comportamento de código, não de interface).
- Tela inicial e login, aprovados como base — receberam apenas refinamentos de contraste e
  espaçamento.
