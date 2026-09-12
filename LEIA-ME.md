# Condex — Módulo do Porteiro (Front-End)

Este documento resume o que foi implementado/alterado neste ciclo de trabalho, as
adaptações necessárias em relação ao protótipo e como rodar o projeto localmente.

## Como rodar

1. `npm install`
2. Copie `.env.example` para `.env` e ajuste `VITE_API_URL` se a API não estiver em
   `http://127.0.0.1:8000/api`.
3. `npm run dev`
4. No back-end (Laravel), aplique o arquivo `cors.php` entregue junto (veja
   `config-cors-para-backend.php`), copiando-o para `config/cors.php` do projeto
   `Condex-API`, e rode `php artisan config:clear`. Sem isso, o navegador bloqueia as
   requisições do Front para a API (CORS).

## O que foi implementado

- **Infraestrutura**: cliente HTTP central (`src/service/httpClient.js`), variável de
  ambiente para a URL da API (`.env`), correção do atributo `secure` do cookie (antes
  quebrava o login em `http://localhost`).
- **Arquivos de API que faltavam**: `VisitanteApi.js`, `AutorizacaoApi.js`,
  `EncomendaApi.js`, `MoradorPorteiroApi.js` — e as respectivas camadas de serviço em
  `src/service/`.
- **Bug corrigido**: `RegistroVisitante.jsx` chamava uma função (`insertVisitanteAPI`)
  que nunca existiu no projeto. O cadastro de visitante agora funciona de ponta a ponta.
- **Tela inicial do porteiro** (`telaInicialPorteiro.jsx`): abas "Visitantes" e
  "Encomendas" agora funcionam de verdade, com dados reais da API, estados de
  carregamento/erro/vazio e ações (liberar entrada, registrar saída, registrar retirada).
- **Duas telas novas**: "Cadastrar encomenda" e "Retirada de encomenda".
- **Proteção de rotas** (`RotaProtegida.jsx`): `/porteiro`, `/sindico` e `/morador` agora
  exigem login com o tipo de usuário correto.
- **Componentes reutilizáveis**: estados de lista (carregando/vazio/erro),
  `CardVisitante`, `CardEncomenda`.
- **Responsividade básica** nas telas do porteiro (breakpoints para tablet/celular).

## Adaptações em relação ao protótipo (decisão do usuário: não alterar o back-end)

O protótipo pede alguns campos/telas que a API atual não suporta. Como decidido, o
back-end não foi alterado — os ajustes abaixo foram feitos **só no Front-End**:

| Tela do protótipo | O que o protótipo pedia | O que a API realmente aceita | Adaptação aplicada |
|---|---|---|---|
| Registrar visitante | Bloco + Apartamento (texto livre) | `fk_morador` (id de um morador já cadastrado) | Campo de texto virou um **seletor de morador** |
| Registrar visitante | Chegada / saída prevista | Não existem essas colunas na tabela `visitantes` | Campos **removidos** do formulário |
| Cadastrar encomenda | Destinatário, Bloco, Apartamento, Recebida (data manual) | Apenas `nome` e `descricao` (data é sempre automática) | "Destinatário" → `nome`; "Bloco/Apto" ficam livres dentro de `descricao`; sem campo de data |
| Retirada de encomenda | "Retirada por" + data/hora manual | O endpoint só grava a data/hora atual do servidor | Virou uma tela de **confirmação** (sem campo de nome/data) |
| Visitantes ativos | Lista de quem está "dentro" do condomínio | Não existe endpoint para listar quem está com status `entrada_realizada` | Controlado **no front, por sessão** (lista zera ao recarregar a página — ver limitação abaixo) |
| Bloco/Apto nos cards de visitante | Aparecem no card | O endpoint de autorização não devolve unidade do morador, só o nome | O card mostra **"Autorizado por &lt;nome do morador&gt;"** no lugar de bloco/apto |

## Limitações conhecidas (para citar no TCC)

1. **Lista de "visitantes ativos" não persiste** entre recarregamentos de página, porque
   a API não expõe uma rota para consultar quem está com status `entrada_realizada`. A
   solução completa exigiria um novo endpoint no back-end
   (`GET /porteiro/autorizacao/active`).
2. **CORS** precisa ser configurado manualmente no back-end (arquivo entregue à parte),
   pois o projeto Laravel não tinha `config/cors.php`.
3. O formato de resposta da API tem uma inconsistência conhecida: rotas de listagem
   (`index`) devolvem o array de resultados com uma camada extra
   (`data: [ [ ... ] ]`), diferente das rotas de item único. Isso já foi tratado no
   Front (`src/service/utils.js`), reaproveitando o mesmo padrão que o módulo do síndico
   já usava para contornar esse comportamento.
