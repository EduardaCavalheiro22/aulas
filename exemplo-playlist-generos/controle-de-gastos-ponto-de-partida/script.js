/* ===========================================================
   Pra onde foi meu dinheiro? — ponto de partida de 19/10

   O que já está pronto:
   - cada gasto é um objeto: descrição, valor e categoria;
   - a lista gastos é a única coisa que o programa lembra;
   - tudo o que a tela mostra é CALCULADO a partir dela:
     total, quantidade, média, maior, menor, orçamento e os
     totais por categoria;
   - o histórico é uma tabela montada com createElement, com
     um botão de apagar em cada linha;
   - a renderizar() desenha a tela inteira, e todo ouvinte
     termina chamando ela.
   =========================================================== */


/* -----------------------------------------------------------
   Funções que só devolvem
   ----------------------------------------------------------- */

function formatarReais(valor) {
    return 'R$ ' + valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function calcularMedia(total, quantidade) {
    if (quantidade === 0) {
        return 0;
    }
    return total / quantidade;
}

function montarTextoDoGasto(gasto) {
    return gasto.descricao + ' — ' + formatarReais(gasto.valor);
}

function montarMensagemDoOrcamento(restante) {
    if (restante >= 0) {
        return formatarReais(restante) + ' disponíveis';
    }
    return 'Passou ' + formatarReais(-restante) + ' do orçamento';
}

function passouDoOrcamento(total, orcamento) {
    return total > orcamento;
}

function montarOpcoesDeCategorias(categorias) {
    let opcoes = '<option value="">Escolha a categoria</option>';

    for (let i = 0; i < categorias.length; i++) {
        opcoes += `<option value="${i}">${categorias[i].nome === 'Alimentacao' ? 'Alimentação' : categorias[i].nome}</option>`;
    }

    return opcoes;
}

// calcularTotal([{ valor: 12.5 }, { valor: 30 }]) → 42.5
function calcularTotal(gastos) {
    let total = 0;
    for (let i = 0; i < gastos.length; i++) {
        total = total + gastos[i].valor;
    }
    return total;
}

function calcularMaiorGasto(gastos) {
    let maior = gastos[0];
    for (let i = 1; i < gastos.length; i++) {
        if (gastos[i].valor > maior.valor) {
            maior = gastos[i];
        }
    }
    return maior;
}

function calcularMenorGasto(gastos) {
    let menor = gastos[0];
    for (let i = 1; i < gastos.length; i++) {
        if (gastos[i].valor < menor.valor) {
            menor = gastos[i];
        }
    }
    return menor;
}

function calcularTotalDaCategoria(gastos, nomeDaCategoria) {
    let total = 0;
    for (let i = 0; i < gastos.length; i++) {
        if (gastos[i].categoria === nomeDaCategoria) {
            total = total + gastos[i].valor;
        }
    }
    return total;
}

function renderizarCategorias() {
    telaCategorias.innerHTML = '';

    const totalGeral = calcularTotal(gastos);

    for (let i = 0; i < CATEGORIAS.length; i++) {
        const categoria = CATEGORIAS[i];
        const totalCategoria = calcularTotalDaCategoria(
            gastos,
            categoria.nome
        );

        const porcentagem = calcularPorcentagem(
            totalCategoria,
            totalGeral
        );

        const item = document.createElement('li');
        item.setAttribute('data-categoria', categoria.nome);

        const legenda = document.createElement('div');
        legenda.classList.add('legenda-da-barra');

        const nome = document.createElement('span');
        nome.textContent =
            categoria.nome === 'Alimentacao'
                ? 'Alimentação'
                : categoria.nome;

        const valor = document.createElement('strong');
        valor.textContent =
            formatarReais(totalCategoria) +
            ' (' + Math.round(porcentagem) + '%)';

        legenda.appendChild(nome);
        legenda.appendChild(valor);

        const trilho = document.createElement('div');
        trilho.classList.add('trilho');

        const barra = document.createElement('div');
        barra.classList.add('barra');
        barra.style.width = porcentagem + '%';

        trilho.appendChild(barra);
        item.appendChild(legenda);
        item.appendChild(trilho);

        telaCategorias.appendChild(item);
    }
}

// Devolve o problema do gasto novo, ou '' se estiver tudo certo.
function montarErroDoGasto(gasto) {
    if (gasto.descricao.trim() === '') {
        return 'Escreva a descrição.';
    }
    return '';
}


/* -----------------------------------------------------------
   Selecionar
   ----------------------------------------------------------- */

const formulario = document.querySelector('.formulario');
const campoDescricao = document.querySelector('.campo-descricao');
const campoValor = document.querySelector('.campo-valor');
const campoCategoria = document.querySelector('.campo-categoria');
const botaoDesfazer = document.querySelector('.botao-desfazer');
const erro = document.querySelector('.erro');

const telaTotal = document.querySelector('.total');
const telaQuantidade = document.querySelector('.quantidade');
const telaMedia = document.querySelector('.media');
const telaMaior = document.querySelector('.maior');
const telaMenor = document.querySelector('.menor');
const telaRestante = document.querySelector('.restante');
const telaHistorico = document.querySelector('.historico');
const telaTotalRodape = document.querySelector('.total-rodape');
const telaCategorias = document.querySelector('.categorias');
const etiqueta = document.querySelector('.etiqueta');

let categoriaEscolhida = 'Todas';


/* -----------------------------------------------------------
   Valores fixos e o que precisa ser lembrado
   ----------------------------------------------------------- */

const ORCAMENTO = 50;

const CATEGORIAS = [
    { nome: 'Alimentacao' },
    { nome: 'Transporte' },
    { nome: 'Lazer' }
];

const iconeApagar = `
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <path d="M6 6 L18 18 M18 6 L6 18"
              stroke="currentColor" stroke-width="3" stroke-linecap="round" />
    </svg>`;

// A única coisa que o programa lembra.
const gastos = [];


/* -----------------------------------------------------------
   Funções que criam elementos
   ----------------------------------------------------------- */

function criarCelula(texto) {
    const celula = document.createElement('td');
    celula.textContent = texto;
    return celula;
}

// A linha <tr> de um gasto, com o botão de apagar.
function criarLinhaDoHistorico(gasto, posicao) {
    const linha = document.createElement('tr');

    linha.setAttribute('data-categoria', gasto.categoria);

    linha.appendChild(criarCelula(posicao + 1));
    linha.appendChild(criarCelula(gasto.descricao));

    // Nova célula da categoria
    const celulaCategoria = document.createElement('td');
    const etiqueta = document.createElement('span');
    etiqueta.classList.add('etiqueta');
    etiqueta.textContent = gasto.categoria;
    celulaCategoria.appendChild(etiqueta);
    linha.appendChild(celulaCategoria);

    linha.appendChild(criarCelula(formatarReais(gasto.valor)));

    const botaoApagar = document.createElement('button');
    botaoApagar.type = 'button';
    botaoApagar.classList.add('botao-apagar');
    botaoApagar.innerHTML = iconeApagar;
    botaoApagar.setAttribute(
        'aria-label',
        'Apagar ' + gasto.descricao
    );

    botaoApagar.addEventListener('click', function () {
        gastos.splice(posicao, 1);
        renderizar();
    });

    const celulaDoBotao = document.createElement('td');
    celulaDoBotao.appendChild(botaoApagar);
    linha.appendChild(celulaDoBotao);

    return linha;
}

/* -----------------------------------------------------------
   Desenhar a tela a partir dos dados
   ----------------------------------------------------------- */

function lerCategoriaEscolhida() {
    return CATEGORIAS[Number(campoCategoria.value)];
}

function renderizarResumo() {
    const total = calcularTotal(gastos);

    telaTotal.textContent = formatarReais(total);
    telaQuantidade.textContent = gastos.length;
    telaMedia.textContent = formatarReais(calcularMedia(total, gastos.length));

    if (gastos.length === 0) {
        telaMaior.textContent = '—';
        telaMenor.textContent = '—';
    } else {
        telaMaior.textContent = montarTextoDoGasto(calcularMaiorGasto(gastos));
        telaMenor.textContent = montarTextoDoGasto(calcularMenorGasto(gastos));
    }
}

function renderizarHistorico() {
    const historico = document.querySelector('.historico');
    const legenda = document.querySelector('.tabela-historico caption');

    const gastosFiltrados = filtrarGastos(
        gastos,
        categoriaEscolhida
    );

    historico.innerHTML = '';

    for (let i = 0; i < gastosFiltrados.length; i++) {
        const gasto = gastosFiltrados[i];
        const posicaoOriginal = gastos.indexOf(gasto);

        historico.appendChild(
            criarLinhaDoHistorico(gasto, posicaoOriginal)
        );
    }

    if (categoriaEscolhida === 'Todas') {
        legenda.textContent = 'Todos os ' + gastos.length + ' gastos';
    } else {
        legenda.textContent =
            'Mostrando ' + gastosFiltrados.length +
            ' de ' + gastos.length + ' gastos';
    }

    telaTotalRodape.textContent =
        formatarReais(calcularTotal(gastosFiltrados));
}

function renderizarOrcamento() {
    const total = calcularTotal(gastos);
    telaRestante.textContent = montarMensagemDoOrcamento(ORCAMENTO - total);

    if (passouDoOrcamento(total, ORCAMENTO)) {
        telaTotal.classList.add('estourado');
        telaRestante.classList.add('estourado');
    } else {
        telaTotal.classList.remove('estourado');
        telaRestante.classList.remove('estourado');
    }
}

function renderizarCategorias() {
    telaCategorias.innerHTML = montarOpcoesDeCategorias(CATEGORIAS, gastos);
}

// A tela inteira. Todo ouvinte termina chamando esta função.
function renderizar() {
    renderizarResumo();
    renderizarHistorico();
    renderizarOrcamento();
    renderizarCategorias();
    botaoDesfazer.disabled = gastos.length === 0;
}

function limparFormulario() {
    formulario.reset();
}

campoCategoria.innerHTML = montarOpcoesDeCategorias(CATEGORIAS);
renderizar();


/* -----------------------------------------------------------
   Escutar
   ----------------------------------------------------------- */

formulario.addEventListener('submit', function (evento) {
    evento.preventDefault();

    const gasto = {
        descricao: campoDescricao.value.trim(),
        valor: Number(campoValor.value),
        categoria: lerCategoriaEscolhida().nome
    };

    erro.textContent = montarErroDoGasto(gasto);

    if (erro.textContent === '') {
        gastos.push(gasto);
        limparFormulario();
        renderizar();
    }
});

botaoDesfazer.addEventListener('click', function () {
    gastos.pop();
    renderizar();
});

function passaNoFiltro(gasto, categoria) {
    return categoria === 'Todas' ||
           gasto.categoria === categoria;
}

function filtrarGastos(gastos, categoria) {
    return gastos.filter(function (gasto) {
        return passaNoFiltro(gasto, categoria);
    });
}

const filtroCategoria = document.getElementById('filtro-categoria');

filtroCategoria.addEventListener('change', function () {
    categoriaEscolhida = filtroCategoria.value;
    renderizarHistorico();
});

function calcularPorcentagem(parte, total) {
    if (total === 0) {
        return 0;
    }

    return (parte / total) * 100;
}
