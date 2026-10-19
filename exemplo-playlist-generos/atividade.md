# Pra onde foi meu dinheiro? — cores, filtro, validação e gráfico

Hoje, o controle de gastos vai ganhar:

- uma **cor para cada categoria**, decidida só pelo CSS;
- um **filtro**, para ver só os gastos de uma categoria;
- um **resumo do filtro**: quantos gastos estão aparecendo e quanto eles somam;
- a **validação do próprio HTML** no formulário;
- um **gráfico de barras** no cartão "Por categoria", feito só com CSS.

## Antes de começar: o ponto de partida

Copie a pasta `controle-de-gastos-ponto-de-partida`. Ela tem o controle de
gastos com tudo o que já fizemos: categorias, tudo calculado a partir da lista,
o histórico em tabela montado com `createElement` e um botão de apagar em cada
linha. Todos começam hoje a partir dela.

Abra no navegador e adicione a sequência de teste de sempre:

| descrição | valor | categoria |
|---|---|---|
| lanche | 12.50 | Alimentação |
| ônibus | 4.35 | Transporte |
| cinema | 30 | Lazer |
| pipoca | 12.50 | Alimentação |

O total deve dar **R$ 59,35**. Depois, dê uma olhada no `script.js`: a
`renderizar()` está lá, e chama outras quatro, uma para cada parte da tela.

---

## Passo 1 — cada categoria com a sua cor

Na tabela, cada linha mostra a categoria do gasto numa **etiqueta**
colorida, e uma faixa da mesma cor no começo da linha.

**No HTML:** uma coluna nova, **Categoria**, entre Descrição e Valor. A tabela
ganhou uma coluna: o `colspan` do rodapé precisa acompanhar.

**No JavaScript**, na `criarLinhaDoHistorico()`:

- a linha `<tr>` ganha o atributo `data-categoria`, com a categoria do gasto:

  ```js
  linha.setAttribute('data-categoria', gasto.categoria);
  ```

- a célula da categoria tem dentro um `<span>` com a classe `etiqueta` e o nome
  da categoria.

**No CSS:** uma variável de cor para cada categoria, e o seletor de atributo
escolhendo a cor:

```css
.tabela-historico tr[data-categoria="Lazer"] td:first-child {
    border-left: 6px solid var(--cor-lazer);
}
```

O JavaScript só diz **qual** é a categoria. **Qual cor** ela tem é decisão do
CSS.

**Funcionou se:**

- cada linha tem a faixa e a etiqueta da cor da sua categoria;
- o lanche e a pipoca têm a mesma cor;
- o rodapé continua alinhado com a coluna Valor.

---

## Passo 2 — o filtro

Acima da tabela, um campo **Mostrar**, com as opções: Todas as categorias, Só
Alimentação, Só Transporte e Só Lazer. Escolhendo uma categoria, a tabela
mostra só os gastos dela.

**A categoria escolhida fica numa variável**, `categoriaEscolhida`, que começa
em `'Todas'`. Quando o filtro muda (evento `change`), a variável muda e a tela
é desenhada de novo.

**Crie a `passaNoFiltro(gasto, categoria)`.** Ela devolve `true` ou `false`:

| no console | deve devolver |
|---|---|
| `passaNoFiltro(gastos[0], 'Alimentação')` | `true` |
| `passaNoFiltro(gastos[0], 'Lazer')` | `false` |
| `passaNoFiltro(gastos[0], 'Todas')` | `true` |

**Na `renderizarHistorico()`:** o `for` continua passando por **todos** os
gastos, mas só cria a linha dos que passam no filtro.

**Funcionou se:**

- com "Só Alimentação", aparecem o lanche e a pipoca, com os números 1 e 4;
- com o filtro em Alimentação, apagando a pipoca, sai a pipoca, e não outro
  gasto;
- o cartão Resumo continua mostrando o total de **todos** os gastos;
- no console, `gastos` continua com todos os gastos, qualquer que seja o
  filtro.

---

## Passo 3 — o resumo do filtro

Com um filtro escolhido, o rodapé da tabela ainda soma todos os gastos. Agora
ele vai somar só os que estão aparecendo. E a legenda da tabela (o `caption`)
vai dizer quantos são.

**Crie a `filtrarGastos(gastos, categoria)`.** Ela devolve uma lista **nova**,
só com os gastos que passam no filtro. A lista `gastos` não muda.

| no console | deve devolver |
|---|---|
| `filtrarGastos(gastos, 'Alimentação').length` | `2` |
| `calcularTotal(filtrarGastos(gastos, 'Alimentação'))` | `25` |
| `gastos.length` | `4`, mesmo depois de filtrar |

Use as duas juntas na `renderizarHistorico()`:

| filtro | legenda da tabela | rodapé |
|---|---|---|
| Todas as categorias | Todos os 4 gastos | R$ 59,35 |
| Só Alimentação | Mostrando 2 de 4 gastos | R$ 25,00 |
| Só Transporte | Mostrando 1 de 4 gastos | R$ 4,35 |
| Só Lazer | Mostrando 1 de 4 gastos | R$ 30,00 |

---

## Passo 4 — a validação do próprio HTML

O HTML sabe conferir sozinho se um campo está preenchido, antes de qualquer
JavaScript rodar.

**No HTML:**

- troque o `<h2>Novo gasto</h2>` por um `<fieldset>` em volta dos campos, com
  uma `<legend>Novo gasto</legend>`. Tire a borda padrão do `fieldset` no CSS;
- coloque `required` na descrição, no valor e na categoria;
- no valor, `min="0.01"`: o navegador não aceita zero nem valor negativo.

**A categoria precisa de uma opção vazia.** Na `montarOpcoesDeCategorias()`,
a primeira opção passa a ser `<option value="">Escolha a categoria</option>`.
Sem ela, o select já começa com uma categoria escolhida, e o `required` nunca
reclama.

**No CSS**, os campos errados ficam vermelhos com o `:user-invalid`. Ele só
marca o campo depois que a pessoa mexeu nele ou tentou enviar. Experimente
trocar por `:invalid` e veja a diferença ao abrir a página.

**No JavaScript:** algumas mensagens de erro da `montarErroDoGasto()` nunca
mais vão aparecer, porque o HTML barra antes. Apague essas. Uma continua
necessária: descubra qual testando uma descrição feita só de espaços.

Para limpar o formulário depois de adicionar, use `formulario.reset()`. Ele
volta o formulário inteiro ao começo, inclusive o select.

**Funcionou se:**

- clicando em Adicionar com tudo vazio, o navegador mostra um aviso e nada
  entra na lista;
- valor 0 não entra;
- sem escolher a categoria, não entra;
- depois de adicionar um gasto, os campos voltam vazios e **sem** vermelho.

---

## Passo 5 — o gráfico de barras

O cartão "Por categoria" vira um gráfico: cada categoria tem o nome, o valor,
a porcentagem do total e uma barra do tamanho dessa porcentagem.

**Crie a `calcularPorcentagem(parte, total)`**, que devolve quanto a parte é
do total, de 0 a 100:

| no console | deve devolver |
|---|---|
| `calcularPorcentagem(25, 50)` | `50` |
| `calcularPorcentagem(1, 4)` | `25` |
| `calcularPorcentagem(0, 0)` | `0` (e não `NaN`) |

**Cada categoria do gráfico** é um `<li>` criado com `createElement`, com o
`data-categoria` da categoria e esta estrutura:

```html
<li data-categoria="Lazer">
    <div class="legenda-da-barra">
        <span>Lazer</span>
        <strong>R$ 30,00 (51%)</strong>
    </div>
    <div class="trilho">
        <div class="barra"></div>
    </div>
</li>
```

O **trilho** é a barra inteira, cinza. A **barra** fica dentro dele, com a cor
da categoria. A largura dela é a única coisa que o JavaScript escreve no
estilo:

```js
barra.style.width = porcentagem + '%';
```

Na tela, a porcentagem aparece arredondada, com `Math.round()`.

**No CSS:** o trilho com altura, fundo cinza e cantos arredondados. A barra com
`height: 100%`, e a cor de cada categoria pelo seletor de atributo, com as
mesmas variáveis do Passo 1.

A `montarListaDeCategorias()`, que montava o cartão com `innerHTML`, não é
mais usada: pode apagar.

**Funcionou se**, com a sequência de teste:

| categoria | aparece | a barra ocupa |
|---|---|---|
| Alimentação | R$ 25,00 (42%) | um pouco menos da metade |
| Transporte | R$ 4,35 (7%) | quase nada |
| Lazer | R$ 30,00 (51%) | um pouco mais da metade |

E também:

- apagando o cinema, Alimentação vai para 85%, Transporte para 15%, e a barra
  do Lazer some;
- com a página recém-aberta, sem gastos, aparece 0% em tudo, e não `NaN%`;
- o gráfico conta **todos** os gastos, com qualquer filtro.

---

## Se sobrar tempo

- **"Nenhum gasto de Lazer".** Com um filtro que não mostra nenhum gasto, a
  tabela fica vazia. Mostre uma linha com a mensagem, ocupando todas as
  colunas.
- **O filtro montado pelo JavaScript.** As opções do filtro são criadas a
  partir da lista `CATEGORIAS`, como as do formulário. Para conferir: uma
  quarta categoria, acrescentada só no JavaScript, aparece nos dois.
- **A categoria escolhida em destaque.** No cartão "Por categoria", a
  categoria do filtro aparece destacada.

---

## Para entregar

Faça o commit e envie para o GitHub, mesmo que incompleto.
