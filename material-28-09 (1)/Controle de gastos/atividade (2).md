# Pra onde foi meu dinheiro? — os gastos numa lista

Vamos levar a playlist para o controle de gastos: os gastos passam a ficar
numa lista, como as músicas da fila.

Teste com a sequência de sempre:

| descrição | valor | categoria |
|---|---|---|
| lanche | 12.50 | Alimentação |
| ônibus | 4.35 | Transporte |
| cinema | 30.00 | Lazer |
| pipoca | 12.50 | Alimentação |

O resumo não pode mudar:

| | depois dos quatro |
|---|---|
| Total gasto | R$ 59,35 |
| Gastos registrados | 4 |
| Média por gasto | R$ 14,84 |
| Maior gasto | cinema — R$ 30,00 |
| Orçamento | Passou R$ 9,35 do orçamento |

---

## Parte 1 — a lista de gastos

Crie uma lista vazia, `gastos`, e a cada gasto adicionado, coloque o objeto
do gasto nela.

Para conferir: depois da sequência de teste, digite `gastos` no console. Deve
aparecer uma lista com 4 objetos, na ordem em que foram adicionados. E
`gastos[2]` deve ser o cinema.

---

## Parte 2 — o histórico como lista

Hoje o histórico é um texto que vai crescendo. Troque por uma lista numerada
no HTML, montada a partir dos gastos, como a fila da playlist:

```
1. lanche — R$ 12,50
2. ônibus — R$ 4,35
3. cinema — R$ 30,00
4. pipoca — R$ 12,50
```

No CSS, as linhas pares ganham um fundo diferente.

No fim, a variável do histórico não deve existir mais: ele sai da lista.

---

## Parte 3 — quantos gastos

Na playlist, a contagem de músicas vinha do tamanho da fila. Faça o mesmo com
a quantidade de gastos.

No fim, a variável da quantidade também não deve existir mais.

---

## Para pensar no caderno

Imagine um botão "Desfazer último gasto". Na lista, bastaria um `pop()`. Mas e
o resto da tela?

- o histórico e a quantidade voltariam sozinhos? Por quê?
- e o total? E o maior gasto?

Traga a sua resposta para a próxima aula.

---

## Se sobrar tempo

- **Na playlist:** a música que acabou de tocar vai para uma segunda lista,
  "Já tocou", mostrada embaixo da fila.
- **Na playlist:** um botão "Esvaziar fila", que pede confirmação antes. Dica:
  o `confirm('Tem certeza?')` devolve `true` ou `false`.
- **No controle de gastos:** o histórico mostra também a categoria de cada
  gasto: "lanche — R$ 12,50 (Alimentação)".

---

## Para entregar

Faça o commit dos dois repositórios, a playlist e o controle de gastos, e
envie para o GitHub, mesmo que incompletos.
