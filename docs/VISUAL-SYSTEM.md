# Sistema visual

A identidade do portfólio foi desenhada para parecer técnica, pessoal e sóbria sem recorrer ao visual genérico de dashboard, cyberpunk ou a efeitos pesados. O verde musgo funciona como assinatura, não como preenchimento indiscriminado.

## Paleta

Os componentes devem consumir os tokens de `app/globals.css` em vez de repetir hexadecimais.

| Papel | Token | Referência |
| --- | --- | --- |
| Fundo | `--background` | `#090d09` |
| Superfície | `--surface` | `#0f150f` |
| Superfície elevada | `--surface-strong` | `#141c14` |
| Borda | `--border` | `#2b382b` |
| Texto | `--text` | `#f0f4ed` |
| Texto secundário | `--text-soft` | `#bcc7b8` |
| Texto discreto | `--text-muted` | `#8f9b8a` |
| Destaque | `--accent` | `#8baa7d` |
| Destaque hover | `--accent-hover` | `#9bbc8d` |

O destaque deve aparecer em ações, linhas de orientação, estados ativos e pequenos pontos de identidade. Grandes áreas saturadas de verde devem ser evitadas.

## Tipografia

- `Archivo Black`: títulos de alto impacto e marca.
- `Inter`: leitura, navegação e conteúdo.
- stack monoespaçada do sistema: pequenos índices técnicos e labels de interface.

A hierarquia depende principalmente de escala, espaço e contraste; não de múltiplas famílias ou efeitos tipográficos.

## Marca e SVG

`public/brand/mark.svg` é a marca principal. `app/icon.svg` usa a mesma geometria para o ícone do site. A marca é simples de propósito: deve funcionar em 16–32 px sem depender de efeitos ou texto minúsculo.

Não adicionar SVGs decorativos de bibliotecas ou do template quando não houver função clara na interface.

## Fotografia e screenshots

- A foto de Kauan vem do perfil público real do GitHub.
- Não gerar ou retocar artificialmente o rosto para o portfólio.
- Screenshots de projetos devem representar versões reais dos sistemas.
- Imagens são tratadas com enquadramento, contraste e overlay via CSS, preservando o arquivo original.
- Quando não existe screenshot pública adequada, o card usa o fallback editorial do design system.

## Movimento

O movimento deve comunicar estado ou hierarquia, não chamar atenção para si mesmo.

- entrada inicial do hero: até ~620 ms;
- hover de cards e botões: 180–450 ms;
- reveal de seção: CSS `view-timeline` apenas quando suportado;
- brilho do painel técnico: lento e discreto;
- `prefers-reduced-motion: reduce` desativa o comportamento não essencial.

Não usar scroll hijacking, loaders decorativos, WebGL ou bibliotecas de animação apenas para transições que CSS resolve.

## Critério de qualidade

Uma nova peça visual deve responder a pelo menos uma destas perguntas:

1. ajuda a compreender quem é o profissional?
2. comprova um projeto ou competência?
3. melhora hierarquia, navegação ou feedback?
4. reforça a identidade sem comprometer performance?

Se a resposta for não para todas, o elemento provavelmente não precisa existir.
