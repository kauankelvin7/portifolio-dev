# Arquitetura do portfólio

Este projeto adota uma organização por responsabilidade, inspirada nos princípios usados no Leve, mas proporcional ao tamanho de um portfólio pessoal.

## Estrutura

- `app/`: composição de rotas, metadata, ícone e estilos globais do Next.js.
- `components/`: componentes compartilhados entre features, como navegação e seletor de idioma.
- `config/`: identidade, links externos e configurações estáveis do site.
- `features/portfolio/`: conteúdo e apresentação do portfólio.
  - `content/`: dados tipados de projetos, stack e certificados.
  - `components/`: componentes específicos do domínio do portfólio.
  - `sections/`: seções server-first da página principal.
- `features/contact/`: formulário e comportamento de contato, isolando a fronteira client-side.
- `actions/`: Server Actions e integração com serviços externos.
- `i18n/` e `messages/`: configuração e textos localizados.
- `public/brand/`: marca vetorial própria e assets estáveis de identidade.
- `docs/`: decisões técnicas, identidade visual, validação e manutenção.

## Regras de engenharia

1. Server Components são o padrão. `"use client"` só entra onde há estado, eventos de UI, APIs do navegador ou Server Actions via hooks.
2. A página principal apenas compõe features; não concentra regra visual ou comportamento.
3. Conteúdo verificável fica em arquivos de conteúdo tipados. Traduções ficam apenas em `messages/`.
4. Efeitos visuais não podem bloquear navegação, scroll ou conteúdo principal.
5. Nenhum recurso pesado entra na primeira dobra sem fallback estático e justificativa mensurável.
6. Links, identidade e referências pessoais estáveis ficam centralizados em `config/site.ts`.
7. A interface usa tokens semânticos; componentes não devem criar uma segunda paleta paralela.
8. Imagens de projeto devem ser evidência real. Quando não existir screenshot pública adequada, é preferível usar um fallback gráfico da própria identidade em vez de fabricar uma tela.
9. Antes de merge: `npm run lint` e `npm run build` devem passar.

## Performance

O hero não depende de WebGL. As seções estáticas são renderizadas no servidor e usam `content-visibility` para reduzir trabalho de renderização fora da viewport. O JavaScript no cliente fica restrito ao menu, idioma e formulário.

As animações de apresentação e scroll são CSS-first. Elas são curtas, não alteram o fluxo da página e respeitam `prefers-reduced-motion`. Não existe scroll hijacking, loop gráfico pesado ou dependência de animação no caminho crítico.

## Mídia e identidade

A foto de perfil é a imagem real publicada no perfil do GitHub e é carregada pelo `next/image`. Projetos usam screenshots reais quando disponíveis. O projeto Leve, por exemplo, referencia a screenshot versionada no próprio repositório, evitando duplicar binários no portfólio.

A marca e o favicon são SVGs próprios em verde musgo. Assets genéricos do template Next.js e screenshots obsoletas do próprio portfólio não fazem parte da árvore atual.

A especificação da identidade está em [`VISUAL-SYSTEM.md`](./VISUAL-SYSTEM.md).

## Critério para novas dependências

Uma dependência só deve ser adicionada quando reduzir complexidade real ou habilitar uma necessidade que não seja razoável implementar com a plataforma. Bibliotecas de animação, scroll ou 3D não devem ser padrão neste projeto.
