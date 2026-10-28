// Cardápio da lanchonete

// Estados da tela (etapa 1):
// 1. Carregando: mostra "Carregando cardápio..." enquanto busca os dados.
// 2. Sucesso: esconde o aviso e mostra os itens do cardápio.
// 3. Erro: mostra uma mensagem informando que não foi possível carregar os dados.

// 1. Busca
async function buscarDados(url) {
    const resposta = await fetch(url);

    if (!resposta.ok) {
        throw new Error("Erro ao buscar os dados do cardápio.");
    }

    return resposta.json();
}

// 2. Dados
function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// 3. Tela
async function carregarCardapio() {
    const cardapioElemento = document.querySelector("#cardapio");
    const avisoElemento = document.querySelector("#aviso");

    avisoElemento.textContent = "Carregando cardápio...";
    avisoElemento.hidden = false;

    try {
        const itens = await buscarDados("cardapio.json");

        cardapioElemento.innerHTML = "";

       itens.forEach(function(item) {
    const card = criarCard(item);
    cardapioElemento.appendChild(card);
});

        avisoElemento.hidden = true;

    } catch (erro) {
        avisoElemento.textContent =
            "Erro ao carregar o cardápio. Verifique o arquivo JSON.";

        avisoElemento.hidden = false;
        console.error(erro);
    }
}

function criarCard(item) {
    const card = document.createElement("article");
    card.classList.add("card");

    const nome = document.createElement("h3");
    nome.textContent = item.nome;

    const descricao = document.createElement("p");
    descricao.textContent = item.descricao;

    const preco = document.createElement("p");
    preco.classList.add("card__preco");
    preco.textContent = formatarMoeda(item.preco);

    const botao = document.createElement("button");

    if (item.disponivel === false) {
        card.classList.add("card--esgotado");
        botao.textContent = "Esgotado";
        botao.disabled = true;
    } else {
        botao.textContent = "Adicionar";
    }

    card.append(nome, descricao, preco, botao);

    return card;
}

// 4. Eventos
carregarCardapio();