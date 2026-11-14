# CONDEX — Padronização visual do front-end

Este documento resume as áreas que foram padronizadas na interface.
**Nenhuma funcionalidade foi alterada:** regras de negócio, rotas, services,
tokens de autenticação, chamadas de API e lógica React permanecem iguais ao
projeto original. As mudanças se restringem a CSS, presentação e textos visíveis.

## 1. Tokens globais (novo arquivo `src/css/condexTokens.css`)

Importado primeiro em `src/main.jsx`, concentra as variáveis `--cx-*` usadas
por todos os módulos:

- **Cores:** azul-marinho (`--cx-navy`), azul principal (`--cx-primary`),
  ciano da marca (`--cx-brand-cyan`), branco, cinzas e fundo padrão.
- **Cores funcionais:** verde = sucesso, vermelho = erro/exclusão,
  amarelo = alerta, cinza = neutro (nada é "tudo azul").
- **Sombras, raios de borda, espaçamentos, tipografia**, halo de foco dos
  campos e texto sobre fundos sólidos.
- **Classes globais reutilizáveis:** `.cx-btn`, `.cx-btn--primary`,
  `.cx-btn--secondary`, `.cx-btn--danger`, `.cx-card`, `.cx-page`.

## 2. Base global (`src/css/rootlayout.css`)

Reset leve, tipografia base, fundo padrão `--cx-bg` e foco visível
(`:focus-visible`) padronizado em botões, selects, links e textareas.

## 3. Estrutura de navegação (Síndico e Morador)

- Sidebars tokenizadas, com hover, item ativo, sombra e media queries
  (drawer sobre o conteúdo em telas ≤ 640px).
- Headers (Síndico, Morador e **Porteiro**) no mesmo padrão: fundo branco,
  título, ações e divisor neutro, com media queries em 900px/640px.
- Fundo dos layouts `SindicoLayout` e `MoradorLayout` usando `var(--cx-bg)`
  em vez de cor fixa inline.

### Rótulos de menu padronizados (somente texto; rotas intactas)

**Morador:** Início · Áreas comuns · Comunicação · Visitantes · Condomínio
**Síndico:** Início · Usuários · Áreas comuns · Comunicação · Condomínio
**Porteiro:** sem sidebar (mantida a estrutura atual — só header, cards,
formulários e botões passaram a seguir o padrão CONDEX).

## 4. Componentes padronizados

- **Botões:** primário azul sólido (sem degradês), secundário branco com
  borda neutra e texto azul, destrutivo vermelho. "Voltar" é sempre
  secundário em todo o sistema.
- **Abas:** mesmo estilo em todas as telas, com estado ativo destacado
  (Regras/Laudos/Apartamentos, Áreas comuns/Gerenciar reservas,
  Comunicados/Respostas).
- **Cards:** superfície branca, raio `--cx-radius-lg`, borda `--cx-border`,
  sombra sutil e elevação no hover.
- **Campos e formulários:** rótulo, input, placeholder, foco com halo azul
  e mensagens de erro/ajuda consistentes.
- **Tabelas:** cabeçalho na cor principal, linhas alternadas e bordas neutras.
- **Badges/etiquetas:** cores funcionais (verde = confirmado, amarelo =
  pendente, vermelho = cancelado/recusado, cinza = neutro).
- **Sombras, raios e espaçamentos** oriundos exclusivamente dos tokens.

## 5. Telas revisadas

- **Síndico:** início, usuários (listagem/cadastro), áreas comuns,
  reservas, comunicação (comunicados, respostas, envios, contra-resposta),
  condomínio (regras, laudos, apartamentos), sucesso e mensagens.
- **Morador:** início, áreas comuns, comunicação (lista, detalhes e
  histórico), visitantes, regras e laudos.
- **Porteiro:** início, formulários (cadastro/atualização), visitantes,
  encomendas e header.
- **Login** e telas de "em desenvolvimento" (mantidas sem funcionalidade nova).

## 6. O que não foi feito de propósito

- Nenhuma rota, service, API, contexto ou regra de negócio foi modificada.
- Mensagens "Tela em desenvolvimento" e falhas de back-end foram mantidas.
- Módulos CSS órfãos (sem import) foram preservados apenas com tokens,
  para não alterar a estrutura do projeto.

## Como rodar

```bash
npm install
npm run dev
```

Build validado com `npx vite build` e lint sem novidades em
`src/pages`, `src/components` e `src/layouts`.

## 7. Continuação — telas vindas da `master` (visitas, encomendas, reclamações)

Depois da incorporação da `master`, as telas novas passaram pelo mesmo padrão
(**só apresentação**; API, services, rotas e regras de negócio ficaram como na `master`).

- **Tokens:** 34 módulos CSS ainda com cor/fonte/raio/sombra/espaçamento fixos
  foram convertidos para `--cx-*` (cores por função: texto, borda, fundo,
  sucesso, erro, alerta; fonte `--cx-font`; raios `--cx-radius-*`; sombras
  `--cx-shadow-*`; tamanhos `--cx-text-*`; espaços `--cx-space-*`).
  Cores decorativas fora da paleta (roxo, verde-água) foram mapeadas para a
  família do azul principal ou para as cores funcionais.
- **Títulos de página:** as classes próprias de título de cada tela
  (`titulo--pagina`, `prs-titulo`, `rm-page-title`…) têm a mesma tipografia
  do `.cx-page-title`.
- **Dashboards (síndico e morador):** o cabeçalho "hero" (gradiente + círculo)
  virou o cabeçalho de página padrão (`cx-overline` + `cx-page-title`).
- **Botões:** "Histórico de visitas" e "Cancelar" do porteiro reutilizam o
  estilo secundário `.btn--exit`; nas reservas do síndico há uma única ação
  primária por cabeçalho.
- **Compartilhados:** `cardReservaAutorizacao.module.css` e
  `paginaExibeReservasSindico.module.css` passaram a herdar as regras do
  padrão (os módulos duplicados `cardReserva` e `paginaExibeReserva` foram
  removidos). Avisos de erro/ajuda usam `.formErro`/`.formAjuda`; selos de
  status usam `.cx-badge--*`. Não restam `style={{…}}` com cor ou medida fixa.
- **Menus:** Visitantes e Reclamações (síndico) e Encomendas (morador) entram
  nos grupos do menu com o destaque de item ativo do padrão.
