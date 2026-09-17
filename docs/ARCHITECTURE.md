# Arquitetura do portfólio

Este projeto adota uma organização por responsabilidade, inspirada nos princípios usados no Leve, mas proporcional ao tamanho de um portfólio pessoal.

## Estrutura

- `app/`: composição de rotas, metadata e estilos globais do Next.js.
- `components/`: componentes compartilhados entre features, como navegação e seletor de idioma.
- `config/`: identidade, links externos e configurações estáveis do site.
- `features/portfolio/`: conteúdo e apresentação do portfólio.
  - `content/`: dados tipados de projetos, stack e certificados.
  - `components/`: componentes específicos do domínio do portfólio.
  - `sections/`: seções server-first da página principal.
- `features/contact/`: formulário e comportamento de contato, isolando a fronteira client-side.
- `actions/`: Server Actions e integração com serviços externos.
- `i18n/` e `messages/`: configuração e textos localizados.
- `docs/`: decisões técnicas, validação e manutenção.

## Regras de engenharia

1. Server Components são o padrão. `"use client"` só entra onde há estado, eventos de UI, APIs do navegador ou Server Actions via hooks.
2. A página principal apenas compõe features; não concentra regra visual ou comportamento.
3. Conteúdo verificável fica em arquivos de conteúdo tipados. Traduções ficam apenas em `messages/`.
4. Efeitos visuais não podem bloquear navegação, scroll ou conteúdo principal.
5. Nenhum recurso pesado entra na primeira dobra sem fallback estático e justificativa mensurável.
6. Links e identidade ficam centralizados em `config/site.ts`.
7. Antes de merge: `npm run lint` e `npm run build` devem passar.

## Performance

O hero não depende de WebGL. As seções estáticas são renderizadas no servidor e usam `content-visibility` para reduzir trabalho de renderização fora da viewport. O JavaScript no cliente fica restrito ao menu, idioma e formulário.

## Critério para novas dependências

Uma dependência só deve ser adicionada quando reduzir complexidade real ou habilitar uma necessidade que não seja razoável implementar com a plataforma. Bibliotecas de animação, scroll ou 3D não devem ser padrão neste projeto.
