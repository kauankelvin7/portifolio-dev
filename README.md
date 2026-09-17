# Portfólio — Kauan Kelvin

Portfólio pessoal desenvolvido para apresentar minha formação em Engenharia de Software, projetos, experiências práticas com tecnologia e contribuições open source.

O projeto prioriza conteúdo verificável, navegação rápida e uma arquitetura simples de manter. A interface evita efeitos pesados no caminho crítico e concentra JavaScript no cliente apenas onde existe interação real.

## Sobre mim

Sou estudante de Engenharia de Software e atualmente trabalho na área administrativa, onde também atuo com suporte de TI, sistemas e melhoria de processos. Tenho direcionado meus estudos para back-end, APIs, Java e Spring Boot, além de usar Python para automação e React/TypeScript em aplicações web.

Busco oportunidades de estágio ou nível júnior em tecnologia.

## Projetos em destaque

- **Leve** — agenda pessoal PWA com React, TypeScript, Firebase, API de comandos, controle de revisão, conflitos explícitos e suporte offline.
- **Automação Odontológica** — RPA em Python e Selenium criado para automatizar um fluxo real de faturamento odontológico.
- **Omni** — sistema para clínicas com Java 17, Spring Boot 3, PostgreSQL, React/TypeScript e automações em Python.
- **Cinesia** — plataforma de estudos para Fisioterapia com React, Firebase, PWA, revisão espaçada e recursos assistidos por IA.
- **RustDesk** — contribuição open source aceita no projeto oficial, adicionando metadados pt-BR para Android via Fastlane.
- **Jogo de Xadrez** — projeto em Java para consolidar orientação a objetos, regras de domínio e organização de código.

## Stack do portfólio

| Área | Tecnologias |
| --- | --- |
| Framework | Next.js 16 + React 19 |
| Linguagem | TypeScript |
| Interface | Tailwind CSS 4 |
| Internacionalização | next-intl |
| Formulário | Server Actions + Resend + Zod |
| Deploy | Vercel |
| CI | GitHub Actions |

## Arquitetura

A organização segue uma abordagem por responsabilidade, inspirada nos princípios aplicados no projeto Leve, mas proporcional a um portfólio pessoal:

```text
app/                     rotas, metadata e estilos globais
components/              componentes compartilhados
config/                  identidade e links estáveis
features/
  portfolio/
    components/          UI específica do portfólio
    content/             projetos, stack e certificados tipados
    sections/            seções server-first da home
  contact/               formulário e fronteira client-side
actions/                 integrações server-side
i18n/ + messages/        localização pt/en/es
docs/                    arquitetura e decisões técnicas
```

A home apenas compõe as features. Seções de conteúdo são Server Components; o cliente fica restrito ao menu, seletor de idioma e formulário de contato.

Mais detalhes: [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md).

## Direção de design

A identidade visual usa fundo quase preto, tipografia de alto contraste e laranja como cor de destaque. O hero é uma composição editorial em CSS, sem WebGL obrigatório, preservando personalidade sem transformar efeito visual em custo permanente de CPU/GPU.

O design system usa tokens semânticos para superfície, borda, texto, destaque, espaçamento e raios. Abaixo da primeira dobra, `content-visibility` reduz trabalho de renderização em conteúdo ainda fora da viewport.

## Internacionalização

O portfólio mantém três idiomas:

- Português
- Inglês
- Espanhol

## Acessibilidade e performance

O projeto considera:

- `prefers-reduced-motion`;
- foco visível por teclado;
- navegação por âncoras sem delays artificiais;
- labels acessíveis em links e botões;
- contraste e hierarquia tipográfica;
- imagens servidas com `next/image`;
- fontes carregadas com `next/font`;
- Server Components como padrão;
- ausência de 3D, scroll hijacking e animação pesada no caminho crítico.

## Executando localmente

Requer Node.js 22, também registrado em `.nvmrc`.

```bash
git clone https://github.com/kauankelvin7/portifolio-dev.git
cd portifolio-dev
npm ci
npm run dev
```

Validação antes de merge:

```bash
npm run lint
npm run build
```

O mesmo fluxo é executado pelo GitHub Actions em pull requests.

## Links

- Portfólio: https://kauankelvindev.vercel.app
- GitHub: https://github.com/kauankelvin7
- LinkedIn: https://www.linkedin.com/in/kauan-kelvin/

## Autor

**Kauan Kelvin**  
Estudante de Engenharia de Software · Back-end · Automação · Desenvolvimento Web

## Licença

MIT — consulte [LICENSE](./LICENSE).
