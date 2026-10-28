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

function aplicarPromocoes(itens, promocoes) {
    return itens.map(function(item) {
        const promocao = promocoes.find(function(p) {
            return p.id === item.id;
        });

        if (promocao) {
            item.desconto = promocao.desconto;
            item.precoFinal =
                item.preco * (1 - promocao.desconto / 100);
        } else {
            item.desconto = 0;
            item.precoFinal = item.preco;
        }

        return item;
    });
}

let cardapio = [];

function filtrarPorCategoria (categoria) {
    if (categoria === "todas") {
        return cardapio
    }
    return cardapio.filter(function(item) {
        return item.categoria === categoria;
    });
}

let pedido = [];


// 3. Tela
async function carregarCardapio() {
    const cardapioElemento = document.querySelector("#cardapio");
    const avisoElemento = document.querySelector(".aviso");

    avisoElemento.textContent = "Carregando cardápio...";
    avisoElemento.hidden = false;

    try {
        const resultados = await Promise.all([
    buscarDados("cardapio.json"),
    buscarDados("promocoes.json")
]);

const itens = resultados[0];
const promocoes = resultados[1];

cardapio = aplicarPromocoes(itens, promocoes);

        cardapioElemento.innerHTML = "";

       cardapio.forEach(function(item) {
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

if (item.desconto > 0) {
    const selo = document.createElement("span");
    selo.classList.add("card__promocao");
    selo.textContent = `${item.desconto}% OFF`;

    const precoAntigo = document.createElement("s");
    precoAntigo.textContent = formatarMoeda(item.preco);

    const precoFinal = document.createElement("strong");
    precoFinal.textContent = formatarMoeda(item.precoFinal);

    preco.append(selo, document.createElement("br"), precoAntigo,
        document.createElement("br"), precoFinal);
} else {
    preco.textContent = formatarMoeda(item.precoFinal ?? item.preco);
}

    const botao = document.createElement("button");

    if (item.disponivel === false) {
        card.classList.add("card--esgotado");
        botao.textContent = "Esgotado";
        botao.disabled = true;
    } else {
    botao.textContent = "Adicionar";

    botao.addEventListener("click", function() {
        pedido.push(item);
        atualizarPedido();
    });
}

    card.append(nome, descricao, preco, botao);

    return card;
}

function mostrarCardapio(itens) {
    const cardapioElemento = document.querySelector("#cardapio");

    cardapioElemento.innerHTML = "";

    itens.forEach(function(item) {
        const card = criarCard(item);
        cardapioElemento.appendChild(card);
    });
}

function atualizarPedido() {
    const listaPedido = document.querySelector("#lista-pedido");
    const totalElemento = document.querySelector("#total");

    listaPedido.innerHTML = "";

    pedido.forEach(function(item) {
        const linha = document.createElement("li");
        linha.textContent = `${item.nome} - ${formatarMoeda(item.precoFinal ?? item.preco)}`;
        listaPedido.appendChild(linha);
    });

    const total = pedido.reduce(function(soma, item) {
        return soma + (item.precoFinal ?? item.preco);
    }, 0);

    totalElemento.textContent = formatarMoeda(total);
}

function enviarPedido(itens) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            const falhou = Math.random() < 0.3;

            if (falhou) {
                reject(new Error("Não foi possível enviar o pedido. Tente novamente."));
            } else {
                const numeroPedido = Math.floor(Math.random() * 9000) + 1000;

                resolve({
                    numero: numeroPedido,
                    itens: itens
                });
            }
        }, 2000);
    });
}


// 4. Eventos
document.addEventListener("DOMContentLoaded", function() {
    carregarCardapio();
    const botaoFinalizar = document.querySelector("#finalizar");
const statusPedido = document.querySelector("#status-pedido");

botaoFinalizar.addEventListener("click", async function() {
    if (pedido.length === 0) {
        statusPedido.textContent = "Adicione pelo menos um item ao pedido.";
        return;
    }

    botaoFinalizar.disabled = true;
    botaoFinalizar.textContent = "Enviando pedido...";
    statusPedido.textContent = "Enviando pedido...";

    try {
        const resultado = await enviarPedido(pedido);

        statusPedido.textContent =
            `Pedido #${resultado.numero} confirmado com sucesso!`;

        pedido = [];
        atualizarPedido();

    } catch (erro) {
        statusPedido.textContent = erro.message;

    } finally {
        botaoFinalizar.disabled = false;
        botaoFinalizar.textContent = "Finalizar pedido";
    }
});

    const filtroCategoria = document.querySelector("#filtro");

    filtroCategoria.addEventListener("change", function() {
        const categoriaSelecionada = filtroCategoria.value;
        const itensFiltrados = filtrarPorCategoria(categoriaSelecionada);

        mostrarCardapio(itensFiltrados);
    });
});