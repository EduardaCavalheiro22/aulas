# Na fila, peça por peça

Hoje, a playlist vai ganhar três coisas:

- a lista de músicas passa a ser montada **peça por peça**, com
  `createElement`, e não mais com `innerHTML`;
- cada música ganha o **próprio botão de remover**, com um ícone;
- uma segunda lista, com as músicas que **já tocaram**.

Antes de começar, faça o commit da playlist do jeito que ela está.

Se a sua playlist não está funcionando inteira, use a pasta
`playlist-ponto-de-partida`: é a playlist completa, pronta para os passos de
hoje.

---

## Passo 1 — o problema

Adicione à fila uma música chamada:

```
<h1>Espresso</h1>
```

Depois tente adicionar a **mesma** música de novo, e leia o aviso.

Repare: na lista, a música aparece como um título gigante. No aviso, aparece
escrita, com as tags. O mesmo texto aparece de dois jeitos porque cada um vai
para a tela de um jeito diferente: procure no seu código o que a lista usa e o
que o aviso usa.

---

## Passo 2 — a `renderizar()`

**Renomeie** a `mostrarFila()` para `renderizar()`. Clique no nome da função e
aperte **F2**: o VS Code troca em todos os lugares de uma vez.

*Renderizar* é desenhar a tela a partir dos dados. O array continua sendo a
verdade, e a `renderizar()` desenha a tela a partir dele.

**Crie a `criarItemDaFila(musica)`.** Ela cria um `<li>` com
`document.createElement`, coloca a música dentro com `textContent` e
**devolve** o `<li>`.

| no console | deve aparecer |
|---|---|
| `criarItemDaFila('APT.')` | `<li>APT.</li>` |
| `document.querySelector('.lista').appendChild(criarItemDaFila('teste'))` | um item "teste" no fim da lista |

**Mude a `renderizar()`.** Em vez de montar um texto com os `<li>`, ela:

1. esvazia a lista da tela;
2. percorre a fila com `for` e, para cada música, coloca na lista
   (`appendChild`) o item que a `criarItemDaFila()` devolve.

A `montarItensDaFila()` não é mais usada: pode apagar.

**Funcionou se:**

- o `<h1>Espresso</h1>` aparece escrito, com as tags, e não gigante;
- todos os botões continuam funcionando;
- adicionando várias músicas, a lista não aparece repetida.

---

## Passo 3 — um botão Remover em cada música

Agora a `criarItemDaFila()` recebe também a posição da música:
`criarItemDaFila(musica, posicao)`. O `<li>` passa a ter duas peças:

- um `<span>` com o nome da música;
- um `<button>` Remover. Ao clicar, ele tira da fila a música **daquela
  posição** (`splice`) e chama a `renderizar()`.

Na `renderizar()`, passe o `i` do `for` como posição.

Agora o botão "Remover da fila" do formulário não é mais necessário: apague
ele do HTML e do JavaScript.

**Funcionou se:**

- clicando no Remover da 2ª música, sai a 2ª música;
- você remove uma do meio e depois outra, e sai sempre a certa;
- removendo todas, a Próxima fica desabilitada.

---

## Passo 4 — o ícone

Troque o texto "Remover" por um X desenhado em SVG:

```html
<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
    <path d="M6 6 L18 18 M18 6 L6 18"
          stroke="currentColor" stroke-width="3" stroke-linecap="round" />
</svg>
```

Guarde esse código numa constante, `iconeRemover`, entre crases, e coloque no
botão com `innerHTML`.

Um botão só com ícone não tem texto para o leitor de tela ler. Dê esse texto a
ele com o `aria-label`:

```js
botaoRemover.setAttribute('aria-label', 'Remover ' + musica + ' da fila');
```

No CSS: o botão sem fundo e sem borda, o X cinza, e vermelho quando o mouse
passa por cima. Repare: o X usa `currentColor`, então para mudar a cor dele
basta mudar o `color` do botão.

**Funcionou se:**

- o X fica vermelho com o mouse em cima;
- usando só o Tab, dá para chegar em cada X e ver onde está o foco;
- no DevTools, na aba Elements, cada botão tem o seu `aria-label`.

---

## Passo 5 — o que já tocou

Crie um segundo array, `tocadas`, que começa vazio. Ao clicar em **Próxima**,
a música que sai da fila vai para o fim das `tocadas`.

Na tela, no cartão "Tocando agora", abaixo do botão Próxima, uma lista **Já
tocou**, com as músicas na ordem em que tocaram. Ela é desenhada pela mesma
`renderizar()`, do mesmo jeito que a fila: esvaziar, e um `for` com
`appendChild`. Crie uma `criarItemTocado(musica)` para os itens dela.

E o "Tocando agora"? Ele é sempre a **última** das `tocadas`. Deixe a
`renderizar()` cuidar dele também, e o ouvinte da Próxima fica com uma linha
só de operação no array.

Por fim, a primeira música da fila ganha uma **etiqueta** "a seguir": um
`<span>` com a classe `etiqueta`, criado só quando a posição é 0. No CSS, a
etiqueta fica como um selo pequeno, de cantos bem arredondados.

**Funcionou se:**

- clicando três vezes em Próxima, a lista "Já tocou" tem as três músicas, na
  ordem;
- o "Tocando agora" mostra sempre a última que saiu da fila;
- a etiqueta "a seguir" está sempre só na primeira da fila, também depois de
  remover a primeira ou de tocar alguém depois desta;
- no console, `fila` e `tocadas` batem com o que está na tela.

---

## Se sobrar tempo

- **Tocar de novo.** Cada música da lista "Já tocou" ganha um botão que
  coloca ela de volta no fim da fila.
- **Subir na fila.** Um botão ↑ em cada música, que troca ela de lugar com a
  de cima. A primeira música não tem esse botão.
- **No controle de gastos.** Monte as linhas do histórico com
  `createElement`, e coloque um botão de apagar em cada linha. Se você fez a
  Parte 2 de 14/10, repare no que acontece com o total, o maior e o menor
  quando você apaga um gasto do meio.

---

## Para entregar

Faça o commit e envie para o GitHub, mesmo que incompleto.
