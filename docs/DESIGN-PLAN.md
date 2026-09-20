# Plano visual — Portfólio v5

## Conceito

**Engenharia editorial.** A página deve ser entendida em dez segundos como um portfólio de back-end para estágio ou vaga júnior. A assinatura autoral aparece na transformação visual de estrutura em produto, concentrada no hero e em motivos 3D leves dos projetos.

## Paleta

- `Forest Ink` — `#0d120e`: fundo principal, escuro com matiz verde.
- `Deep Moss` — `#141c16`: primeira superfície.
- `Moss Slate` — `#1d281f`: superfície elevada e cartões.
- `Moss` — `#8baa7d`: ação, foco, estado ativo e geometria 3D.
- `Lichen` — `#c2cdb9`: texto secundário e divisores de alto contraste.
- `Paper` — `#f1f3ec`: texto principal e fundos claros pontuais.

Estados funcionais derivam da paleta sem competir com a marca: sucesso em verde frio, erro em terracota escuro e foco em `Moss` com halo opaco.

## Tipografia

- **IBM Plex Sans:** interface, corpo, navegação e dados técnicos. A família remete a engenharia sem parecer terminal ou template de SaaS.
- **Newsreader:** títulos editoriais e números de evidência. Usada em blocos inteiros de título, sem destacar uma palavra isolada por hábito.

As fontes serão carregadas por `next/font`. O corpo mantém linhas abaixo de 80 caracteres e a escala usa `clamp()`.

## Estrutura

```text
┌────────────────────────────────────────────────────────────────────┐
│ marca K    Projetos  Trajetória  Contato    PT/EN/ES   Currículo  │
├────────────────────────────────────────────────────────────────────┤
│ H1 direto + papel/stack/local         cena K: malha → blocos      │
│ [Ver projetos] [Baixar currículo]     fallback SVG completo       │
├────────────────────────────────────────────────────────────────────┤
│ 3 provas verificáveis com fonte                                   │
├────────────────────────────────────────────────────────────────────┤
│ projetos principais: problema / decisão / stack / links / mídia   │
│ Omni e Leve levam a estudos de caso                               │
├────────────────────────────────────────────────────────────────────┤
│ RustDesk + atividade pública do GitHub                            │
├────────────────────────────────────────────────────────────────────┤
│ stack por função              trajetória, idiomas e certificados  │
├────────────────────────────────────────────────────────────────────┤
│ formulário protegido      e-mail / LinkedIn / GitHub              │
└────────────────────────────────────────────────────────────────────┘
```

## Princípios de decisão

1. Toda informação necessária para recrutamento existe em HTML renderizado no servidor.
2. O 3D começa tarde, pode desaparecer e nunca deixa um buraco visual.
3. A hierarquia vem de tipografia, ritmo e contraste; cartões não compartilham um molde genérico.
4. Verde-musgo sinaliza ação e estrutura. Não vira iluminação neon ou preenchimento indiscriminado.
5. Movimento responde a entrada, foco, clique ou visibilidade. Não há animação repetida em cada seção.
6. Imagens provam o produto. Na ausência de evidência, a composição assume o espaço sem inventar telas.

## Revisão contra padrões genéricos

Foram descartados: gradientes decorativos, rótulos em caixa-alta em todas as seções, numeração ornamental, cartões arredondados idênticos, slogans abstratos e uma palavra colorida em cada título. A única peça deliberadamente teatral é a formação do monograma no hero.
