# GitHub Auto Sync

O portfólio usa a atividade pública do GitHub como uma fonte de dados complementar. A curadoria dos projetos principais continua manual; a sincronização automática preenche apenas a camada dinâmica.

## O que é sincronizado

- repositórios públicos elegíveis que não estejam na lista curada;
- linguagens mais recorrentes;
- frameworks e ferramentas detectados por tópicos e por arquivos de configuração (`package.json`, `pom.xml`, `Dockerfile` e `firebase.json`);
- pull requests merged em repositórios de outros proprietários, exibidos como contribuições open source.

## O que não entra automaticamente

- forks;
- repositórios arquivados ou desabilitados;
- repositórios muito pequenos e sem metadados úteis;
- o próprio portfólio;
- projetos já presentes na seleção editorial principal;
- repositórios com tópico `portfolio-ignore`, `archive`, `template` ou `learning-only`.

## Curadoria por topics

Os tópicos abaixo aumentam a relevância interna de um repositório:

- `portfolio`
- `featured`
- tecnologias conhecidas como `java`, `spring-boot`, `python`, `react`, `typescript`, `firebase` e `postgresql`.

`featured` recebe peso maior que `portfolio`. Esses pesos servem apenas para ordenar a camada automática; não são exibidos como notas ou níveis de habilidade.

## Stack

A stack é calculada por recorrência de uso. O algoritmo combina:

1. linguagens retornadas pelo endpoint de linguagens do GitHub;
2. topics reconhecidos;
3. sinais de arquivos de configuração.

A interface não transforma esse peso em porcentagens de domínio. O peso existe apenas para decidir ordem e relevância.

## Cache e limites

As requisições usam o Data Cache do Next.js com revalidação de 1 hora. O número de repositórios inspecionados em profundidade é limitado para que a sincronização continue funcional mesmo sem autenticação.

`GITHUB_TOKEN` é opcional e fica exclusivamente no servidor. Em produção, vale configurá-lo para aumentar a margem de rate limit. Não use prefixo `NEXT_PUBLIC_`.

## Falhas

A sincronização é degradável. Se o GitHub estiver indisponível ou o rate limit for atingido:

- a home continua renderizando;
- os projetos curados continuam intactos;
- a stack volta para a seleção estática já versionada;
- a seção dinâmica deixa de aparecer caso não haja dados confiáveis.

Detalhes técnicos são enviados apenas para `console.error` no servidor.

## Como controlar manualmente

Para impedir que um repositório apareça na camada automática, adicione o topic `portfolio-ignore`.

Para aumentar a chance de um repositório novo aparecer, use `portfolio` ou `featured` e mantenha descrição/topics coerentes no GitHub.

Projetos principais continuam sendo promovidos manualmente para a lista curada em `features/github-sync/config.ts`. Isso evita que um experimento ou exercício substitua um case importante apenas por ser mais recente.
