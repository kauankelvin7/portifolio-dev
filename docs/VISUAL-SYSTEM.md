# Sistema visual

A identidade do portfólio combina engenharia de software com uma assinatura visual própria: verde musgo, fundo quase preto, monograma `K` e uma órbita que representa sistemas, integração e evolução contínua. A intenção é evitar o visual genérico de dashboard, cyberpunk e templates de portfólio baseados apenas em cards.

## Tipografia

- `Space Grotesk`: títulos, navegação, corpo e marca. A geometria mais técnica substitui `Archivo Black + Inter` e deixa o site mais coeso.
- `IBM Plex Mono`: metadados, labels técnicos, microcopy e elementos de interface com caráter de engenharia.
- as fontes são carregadas via `next/font`, sem `@import` externo.

## Marca

A marca usa três elementos recorrentes:

1. monograma `K` geométrico;
2. órbita inclinada, que funciona como assinatura visual;
3. ponto orbital em verde claro, usado como detalhe de estado e continuidade.

Arquivos principais:

- `public/brand/mark.svg`: marca compacta para header e contextos pequenos;
- `public/brand/orbit-symbol.svg`: símbolo hero/decorativo em maior escala;
- `app/icon.svg`: favicon e ícone do App Router seguindo a mesma geometria.

A marca não deve ser substituída por símbolos genéricos de código como `</>`.

## Paleta

O verde continua funcionando como assinatura, mas a V2 amplia a faixa para permitir profundidade sem saturar a tela.

| Papel | Referência |
| --- | --- |
| Fundo | `#081008` / `#090d09` |
| Superfície | `#0f150f` |
| Borda | `#2b382b` |
| Texto principal | `#f0f4ed` |
| Texto secundário | `#bcc7b8` |
| Musgo | `#9fbe8e` |
| Musgo claro | `#bdd8ae` |
| Sage | `#d5e5cd` |

Os tokens históricos continuam em `app/globals.css`; os ajustes de identidade V2 ficam concentrados em `app/identity.css` para facilitar manutenção e rollback.

## Hero

O hero não usa mais o painel "console" como protagonista visual. A composição passa a ter:

- monograma orbital em escala grande;
- quatro labels técnicos posicionados ao redor da órbita;
- grid discreto e glow apenas como suporte;
- nome com peso e espaçamento mais editorial;
- divisor de identidade próprio antes da próxima seção.

O símbolo não depende de WebGL, canvas ou bibliotecas de animação.

## Header

O header usa um lockup de marca com:

- símbolo orbital compacto;
- nome `Kauan Kelvin`;
- descriptor `software engineering` em mono.

Em telas pequenas o descriptor some para preservar espaço.

## Stack

A stack continua sincronizada com GitHub, mas deixa de mostrar apenas iniciais genéricas. Tecnologias reconhecidas recebem pequenas marcas vetoriais consistentes por meio de `StackMark.tsx`; tecnologias desconhecidas usam fallback tipográfico.

As marcas não representam nível de domínio. O ranking continua sendo calculado por recorrência nos repositórios.

## Fotografia e screenshots

- usar apenas foto real do perfil e screenshots reais dos projetos;
- não gerar rosto artificial;
- quando não houver mídia boa, usar fallback editorial da identidade;
- não usar mockups que façam parecer que um produto existe quando não existe.

## Movimento

- entrada curta do hero;
- flutuação lenta e sutil do símbolo orbital;
- hover discreto em cards e ações;
- slider de stack pausa no hover;
- `prefers-reduced-motion: reduce` remove animações não essenciais.

## Critério de qualidade

Uma nova peça visual deve reforçar pelo menos uma destas funções:

1. identidade pessoal;
2. entendimento do trabalho;
3. prova de projeto ou competência;
4. hierarquia e navegação;
5. feedback de estado.

Se for apenas decoração genérica, não entra.
