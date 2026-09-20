# Sistema visual do portfólio v5

O sistema combina leitura rápida para recrutamento com uma camada autoral progressiva. A base é escura, editorial e disciplinada. A cena do hero concentra a expressão visual; conteúdo e ações permanecem em HTML renderizado no servidor.

## Tokens

Os tokens vivem em `app/globals.css` e são expostos ao Tailwind 4 por `@theme`.

| Papel | Token | Valor base |
| --- | --- | --- |
| Fundo | `--surface-canvas` | `#0d120e` |
| Superfície | `--surface-section` | `#141c16` |
| Elevada | `--surface-raised` | `#1d281f` |
| Borda | `--border-subtle` | `#344237` |
| Texto principal | `--text-primary` | `#f1f3ec` |
| Texto secundário | `--text-secondary` | `#c2cdb9` |
| Texto discreto | `--text-muted` | `#919b8e` |
| Acento | `--accent` | `#8baa7d` |
| Foco | `--focus` | `#a8c49a` |
| Sucesso | `--success` | `#77a885` |
| Erro | `--error` | `#cf806f` |

A escala de espaço segue passos de `4, 8, 12, 16, 24, 32, 48, 64, 96 e 128px`. Raios distinguem função: controles usam raio pequeno, cartões médios e painéis imersivos grandes. Elevação usa cor escura com baixa opacidade, nunca sombra cinza genérica.

## Tipografia

- **IBM Plex Sans**: corpo, interface, navegação e dados técnicos.
- **Newsreader**: títulos editoriais e números de evidência.

As fontes são carregadas por `next/font`. Títulos usam `clamp()` e formam blocos completos; não há o padrão repetitivo de colorir uma palavra isolada. Texto corrido limita a linha a aproximadamente 70–78 caracteres.

## Componentes

### Button

Primário para a ação principal da seção; secundário para uma alternativa relevante. O texto descreve o resultado: “Baixar currículo”, “Ver repositório” ou “Enviar mensagem”. Estado pendente mantém largura e informa o progresso.

### Card

Agrupa informação relacionada quando a borda ajuda a leitura. Não é a unidade padrão de toda seção. Superfícies e raios variam com a hierarquia.

### Tag

Identifica tecnologia ou domínio; não comunica nível de domínio. Deve permanecer curta e sem iconografia ornamental.

### SectionHeader

Usa título e descrição. Rótulos ou números só aparecem quando carregam informação real; não são decoração obrigatória.

### ProjectCard

Expõe problema, decisão técnica, stack e destinos reais. Screenshot é evidência. Sem screenshot, usa diagrama derivado do README ou assume uma composição somente textual; letras e grades genéricas não são fallback.

### CaseStudy

Apresenta contexto, decisões, trade-offs, o que mudaria e fontes. Conteúdo não verificado vai para `docs/CONTENT-TODO.md`.

### Timeline

Ordena atividade pública do GitHub por data. O eixo e os marcadores codificam sequência temporal e não entram em listas sem tempo.

### Field

Rótulo sempre visível, ajuda curta quando necessária, erro associado ao controle e foco claro. Estados pendente, sucesso e erro são anunciados por `aria-live`.

### Status

Comunica disponibilidade, resultado do formulário e falhas recuperáveis com texto, cor e forma. Nunca depende apenas de cor.

## Imagens e prova

- usar foto real e screenshots reais;
- não inventar telas, métricas, clientes ou resultados;
- Leve usa a captura versionada no repositório de origem;
- projetos sem mídia permanecem textuais até existir evidência adequada;
- diagramas só representam arquitetura confirmada no README.

## 3D progressivo

Existe um único canvas compartilhado. O hero forma o monograma `K` a partir de uma malha e blocos musgo; motivos de projeto usam views leves dentro do mesmo canvas. O conteúdo nunca depende dessa camada.

O canvas carrega depois do idle, quando a área está visível, com `ssr: false`. O fallback SVG/CSS ocupa o mesmo espaço antes do carregamento e permanece definitivo quando há redução de movimento, economia de dados, ausência de WebGL ou baixa capacidade. DPR é limitado, a renderização pausa fora da viewport e não há pós-processamento ou sombras dinâmicas.

## Movimento

- a sequência principal do hero dura cerca de dois segundos;
- microinterações respondem a clique, foco, ponteiro ou visibilidade;
- movimento de interface usa CSS e propriedades de composição;
- não há scroll hijacking, loaders decorativos, Lenis, Framer Motion ou GSAP;
- `prefers-reduced-motion` remove movimento não essencial e mantém o layout completo.

## Acessibilidade e contraste

Texto e controles atendem WCAG 2.2 AA. Foco visível usa halo de `--focus`; alvos interativos têm pelo menos 44px; o canvas é oculto da árvore acessível e acompanhado por descrição textual. Conteúdo continua navegável por teclado e legível sem JavaScript.
