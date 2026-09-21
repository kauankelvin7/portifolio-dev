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
- **RustDesk** — duas contribuições de localização/metadata aceitas no projeto oficial: pt-BR (#16135) e it-IT (#16162) para Android via Fastlane.
- **socplug-fix** — diagnóstico e automação para uma falha real envolvendo JNLP, Java Web Start, WebSocket, registro e firewall no Windows.

## Stack do portfólio

| Área | Tecnologias |
| --- | --- |
| Framework | Next.js 16 + React 19 |
| Linguagem | TypeScript |
| Interface | Tailwind CSS 4 + CSS nativo |
| Internacionalização | next-intl |
| Formulário | Server Actions + Resend + Zod |
| Mídia | next/image + SVGs próprios |
| Deploy | Vercel |
| CI | GitHub Actions |

## Arquitetura

A organização segue uma abordagem por responsabilidade, inspirada nos princípios aplicados no projeto Leve, mas proporcional a um portfólio pessoal:

```text
app/                     rotas, metadata, ícone e estilos globais
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
public/brand/             marca vetorial própria
docs/                    arquitetura e sistema visual
```

A home apenas compõe as features. Seções de conteúdo são Server Components; o cliente fica restrito ao menu, seletor de idioma e formulário de contato.

Mais detalhes: [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md).

## Direção de design

A identidade usa fundo quase preto com superfícies levemente esverdeadas e um verde musgo (`#8baa7d`) como destaque. O verde aparece em ações, foco, estados ativos e elementos de assinatura, evitando grandes blocos saturados.

A foto exibida na seção sobre é a imagem real do perfil do GitHub. Screenshots de projetos são mantidas como evidência do produto: o Leve usa uma captura versionada no próprio repositório e os projetos sem mídia pública adequada recebem um fallback editorial em vez de uma imagem inventada.

A marca `K` e o ícone do site são SVGs próprios. Assets padrão do template Next.js, screenshots antigas do portfólio e mídia sem uso foram removidos.

As regras completas estão em [`docs/VISUAL-SYSTEM.md`](./docs/VISUAL-SYSTEM.md).

## Registro visual da revisão

As capturas abaixo foram geradas a partir da página local durante a revisão final da interface. Elas registram a hierarquia das áreas principais e servem como referência rápida para futuras alterações:

| Área | Captura |
| --- | --- |
| Hero | [screenshots-hero.png](./public/screenshots-hero.png) |
| Projetos e decisões técnicas | [screenshots-projects.png](./public/screenshots-projects.png) |
| Stack e tecnologias | [screenshots-stack.png](./public/screenshots-stack.png) |
| Atividade recente e contribuições | [screenshots-activity.png](./public/screenshots-activity.png) |
| Contato | [screenshots-contact.png](./public/screenshots-contact.png) |

Na revisão da atividade do GitHub, o grid foi corrigido para manter data, conteúdo e ação em colunas próprias. O bloco também recebe margem de rolagem para não ficar escondido pelo header fixo.

## Movimento, acessibilidade e performance

O movimento é CSS-first e progressivo:

- entrada curta do hero;
- hover discreto em cards, avatar e botões;
- reveal de conteúdo com `view-timeline` quando o navegador suporta;
- feedback sutil de disponibilidade e do painel técnico;
- `prefers-reduced-motion` desativa movimento não essencial.

O projeto também considera:

- foco visível por teclado;
- navegação por âncoras sem delays artificiais;
- labels acessíveis e localizados em português, inglês e espanhol;
- contraste e hierarquia tipográfica;
- imagens servidas com `next/image`;
- fontes carregadas com `next/font`;
- Server Components como padrão;
- 3D progressivo em chunk separado, carregado após idle e sempre acompanhado por fallback estático completo;
- ausência de scroll hijacking e animação pesada no caminho crítico.

## Internacionalização

O portfólio mantém três idiomas:

- Português
- Inglês
- Espanhol

Textos de navegação, categorias de stack e labels de acessibilidade fazem parte do mesmo sistema de tradução.

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

O mesmo fluxo é executado pelo GitHub Actions em pull requests, incluindo auditoria de vulnerabilidades críticas no runtime.

## Links

- Portfólio: https://kauankelvindev.vercel.app
- GitHub: https://github.com/kauankelvin7
- LinkedIn: https://www.linkedin.com/in/kauan-kelvin/

## Autor

**Kauan Kelvin**  
Estudante de Engenharia de Software · Back-end · Automação · Desenvolvimento Web

## Licença

MIT — consulte [LICENSE](./LICENSE).
