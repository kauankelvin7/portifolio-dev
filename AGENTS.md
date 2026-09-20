# AGENTS.md

Diretrizes de manutenção para humanos e agentes que alterarem este portfólio.

## Objetivo

Manter um portfólio rápido, verificável, simples de entender e coerente com o perfil real de Kauan Kelvin: estudante de Engenharia de Software com foco em back-end, automação e desenvolvimento web quando necessário.

## Princípios

- Não inventar cargo, experiência, cliente, métrica ou resultado.
- Preferir evidência de projeto a copy promocional.
- Manter a home server-first.
- Introduzir `"use client"` somente quando houver necessidade objetiva.
- Não adicionar scroll artificial, delays de navegação, loaders decorativos ou animações que atrasem interação.
- 3D/WebGL só pode entrar como carga tardia e progressiva, com fallback estático completo. Conteúdo, navegação e ações essenciais nunca dependem do canvas.
- Reutilizar tokens e componentes existentes antes de criar variantes.
- Manter dados de projetos e certificados tipados e fora dos componentes.
- Centralizar URLs e identidade em `config/site.ts`.
- Manter pt/en/es sincronizados ao alterar conteúdo localizado.
- Evitar comentários artificiais ou explicações óbvias no código.

## Organização

- `app/`: rotas e composição.
- `components/`: UI compartilhada.
- `features/portfolio/`: domínio visual/conteúdo do portfólio.
- `features/contact/`: contato e única fronteira client mais complexa.
- `config/`: configuração estável.
- `actions/`: integrações server-side.
- `docs/`: arquitetura e decisões.

## Definition of Done

Antes de considerar uma alteração pronta:

1. `npm run lint`
2. `npm run build`
3. revisar mobile e desktop
4. conferir navegação por teclado e foco visível
5. confirmar que não houve regressão nos idiomas
6. confirmar que novas claims têm fonte verificável

Se o ambiente não permitir executar uma dessas etapas, registrar explicitamente a limitação no PR. Nunca declarar validação que não foi executada.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
