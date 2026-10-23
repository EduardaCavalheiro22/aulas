# Agenda de entregas — Etapa 2: o CSS

Agora a página ganha cara de app. O HTML continua o mesmo da etapa 1: só entram
o `style.css` e o `<link>` para ele.

## O mockup

**No computador** (a partir de 800px de largura):

![Mockup da etapa 2 no computador](mockups/etapa-2-computador.png)

**No celular:**

![Mockup da etapa 2 no celular](mockups/etapa-2-celular.png)

---

## O guia de estilo

Um designer de verdade entrega, junto com o mockup, as medidas e as cores.
Aqui estão as nossas.

**Cores**

| uso | cor |
|---|---|
| fundo da página | `#f4f1ec` |
| fundo dos cartões | `#ffffff` |
| texto | `#2b2d42` |
| texto suave (rótulos, rodapé) | `#6c6f86` |
| topo e títulos | `#253858` |
| botão Adicionar | `#ff7a59` (com o mouse em cima: `#e8603e`) |
| bordas | `#e3ded5` |
| Prova | `#e03131` |
| Trabalho | `#1971c2` |
| Apresentação | `#9c36b5` |

**Medidas**

| o quê | medida |
|---|---|
| fonte | `"Segoe UI", Roboto, Helvetica, Arial, sans-serif`, 16px |
| espaço entre os cartões | 16px |
| espaço dentro dos cartões | 20px |
| cantos dos cartões | 12px |
| cantos dos campos, botões e entregas | 8px |
| faixa colorida de cada entrega | 6px, à esquerda |
| largura máxima do conteúdo | 1000px, centralizado |

**O layout**

- **No celular**, uma coluna, nesta ordem: Resumo, Nova entrega, Próximas
  entregas.
- **A partir de 800px**, duas colunas: a da esquerda com o Resumo e a Nova
  entrega, uma embaixo da outra; a da direita, duas vezes mais larga, com as
  Próximas entregas.

---

## Por onde começar: o caminho em passos

Não tente fazer tudo de uma vez. Siga os passos na ordem, e confira o
**pronto quando** de cada um antes de ir para o próximo. Se quiser, faça um
commit a cada passo: fica fácil voltar se algo der errado.

Depois de cada passo, tem uma imagem de como a página fica na tela do
computador. Compare com a sua.

**1. A base.** Crie o `style.css`, ligue no HTML e escreva as variáveis de cor
no `:root`. No `body`: a cor de fundo, a fonte e a cor do texto, e tire a
margem.

*Pronto quando:* o fundo fica bege e a fonte muda na página inteira.

![Como a página fica depois do passo 1](mockups/caminho/passo-01.png)

**2. O topo e o rodapé.** O topo com o fundo azul-escuro, o texto branco e
centralizado. O rodapé com o texto suave, pequeno e centralizado.

*Pronto quando:* o topo está igual ao mockup.

![Como a página fica depois do passo 2](mockups/caminho/passo-02.png)

**3. O layout no celular.** No elemento que envolve as três seções, o grid com
`grid-template-areas` em uma coluna, na ordem do mockup: Resumo, Nova entrega,
Próximas entregas. Coloque também o espaço entre elas, a largura máxima e a
centralização.

*Pronto quando:* as três seções estão empilhadas na ordem certa, com espaço
entre elas.

Ainda sem a media query, as seções ocupam a largura toda também no computador. Isso é esperado.

![Como a página fica depois do passo 3](mockups/caminho/passo-03.png)

**4. Os cartões.** Uma classe para as três seções: fundo branco, borda, cantos
arredondados e espaço por dentro. Depois, os títulos (`h2` e `legend`) com a
cor e o tamanho do mockup.

*Pronto quando:* as três seções viraram cartões brancos.

![Como a página fica depois do passo 4](mockups/caminho/passo-04.png)

**5. O layout no computador.** A media query a partir de 800px, com as duas
colunas: a da direita duas vezes mais larga, com as Próximas entregas.

*Pronto quando:* estreitando a janela devagar, o layout passa de duas colunas
para uma.

![Como a página fica depois do passo 5](mockups/caminho/passo-05.png)

**6. O resumo.** Os dois indicadores lado a lado, cada um com o fundo bege e o
número grande.

*Pronto quando:* o cartão do Resumo está igual ao mockup.

![Como a página fica depois do passo 6](mockups/caminho/passo-06.png)

**7. O formulário.** O `fieldset` sem borda, os labels em cima dos campos,
os campos ocupando a largura toda. Por fim, o botão Adicionar laranja, com a
cor mais escura quando o mouse passa por cima.

*Pronto quando:* o cartão da Nova entrega está igual ao mockup.

![Como a página fica depois do passo 7](mockups/caminho/passo-07.png)

**8. As entregas.** Tire as bolinhas da lista. Cada entrega vira um cartãozinho
com borda, e as três partes ficam lado a lado com `flex`: a data, as
informações (que ocupam todo o espaço que sobrar) e os botões. Por enquanto,
a faixa da esquerda pode ser cinza, e a etiqueta também.

*Pronto quando:* as quatro entregas estão em linha, com os botões à direita.

![Como a página fica depois do passo 8](mockups/caminho/passo-08.png)

**9. As cores dos tipos.** Com o seletor de atributo pelo `data-tipo`: a
faixa da esquerda e a etiqueta de cada entrega com a cor do seu tipo.

*Pronto quando:* a Matemática está vermelha, o Inglês roxo, e os trabalhos
azuis.

![Como a página fica depois do passo 9](mockups/caminho/passo-09.png)

**10. A entrega feita.** A entrega com a classe `feita` fica apagada, e a
matéria dela, riscada.

*Pronto quando:* o Português está como no mockup.

![Como a página fica depois do passo 10](mockups/caminho/passo-10.png)

**11. O acabamento.** O efeito dos botões Feita e Apagar com o mouse em cima,
o foco visível com o Tab, e a conferência no celular.

*Pronto quando:* tudo da lista "Antes de chamar o professor", lá no fim,
está certo.

O efeito do mouse e o foco não aparecem na imagem: confira passando o mouse e usando o Tab.

![Como a página fica depois do passo 11](mockups/caminho/passo-11.png)

---

## Requisitos

- As cores ficam em **variáveis CSS**, no `:root`.
- A cor de cada tipo vem do **seletor de atributo**, pelo `data-tipo` de cada
  entrega: a faixa à esquerda e a etiqueta com o nome do tipo.
- A entrega **feita** fica apagada (`opacity`) e com a matéria riscada
  (`text-decoration: line-through`).
- Os botões mudam com o mouse em cima, e todos os campos e botões mostram onde
  está o foco quando você navega com o Tab.
- No celular, **nada passa da largura da tela**: sem rolagem para o lado.

---

## Antes de chamar o professor

- Estreite a janela do navegador devagar: o layout muda de duas colunas para
  uma, sem nada cortado?
- No DevTools, simule um celular: a página fica igual ao mockup do celular?
- Navegue só com o Tab: dá para ver onde você está o tempo todo?
- Troque a cor de Prova na variável: todas as provas mudam juntas?

Commit: `Etapa 2`.
