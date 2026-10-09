

const formulario = document.querySelector('.formulario');
const campoDescricao = document.querySelector('.campo-descricao');
const campoValor = document.querySelector('.campo-valor');
const erro = document.querySelector('.erro');

const telaTotal = document.querySelector('.total');
const telaQuantidade = document.querySelector('.quantidade');
const telaMedia = document.querySelector('.media');
const telaMaior = document.querySelector('.maior');
const telaRestante = document.querySelector('.restante');
//const telaHistorico = document.querySelector('.historico');
const lista = document.querySelector('.lista')
const ORCAMENTO = 50;

let total = 0;              // acumulador
let quantidade = 0;         // contador
let maiorValor = 0;         // o maior visto até agora
let maiorDescricao = '';
let historico = '';         // acumulador de texto


/* -----------------------------------------------------------
   Escutar e alterar
   ----------------------------------------------------------- */

formulario.addEventListener('submit', function (evento) {
    evento.preventDefault();
    const descricao = campoDescricao.value.trim();
    const valor = Number(campoValor.value);
    if (descricao === '') {
        erro.textContent = 'Escreva uma descrição.';
    } else if (campoValor.value === '') {
        erro.textContent = 'Informe o valor.';
    } else if (valor <= 0) {
        erro.textContent = 'O valor precisa ser maior que zero.';
    } else {

        erro.textContent = '';
        total = total + valor;
        if (valor > maiorValor) {
            maiorValor = valor;
            maiorDescricao = descricao;
        }
        quantidade = quantidade + 1;
        const media = total / quantidade;
        historico = historico + descricao + ' — R$ ' + valor.toFixed(2).replace('.', ',') + '\n';
        const restante = ORCAMENTO - total;

        if (restante >= 0) {
            telaRestante.textContent = 'R$ ' + restante.toFixed(2).replace('.', ',') + ' disponíveis';
        } else {
            telaRestante.textContent = 'Passou R$ ' + (-restante).toFixed(2).replace('.', ',') + ' do orçamento';
        }

        if (total > ORCAMENTO) {
            telaTotal.classList.add('estourado');
            telaRestante.classList.add('estourado');
        } else {
            telaTotal.classList.remove('estourado');
            telaRestante.classList.remove('estourado');
        }

        // ===== mostrar na tela ============================

        telaTotal.textContent = 'R$ ' + total.toFixed(2).replace('.', ',');
        telaQuantidade.textContent = quantidade;
        telaMedia.textContent = 'R$ ' + media.toFixed(2).replace('.', ',');
        telaMaior.textContent = maiorDescricao + ' — R$ ' + maiorValor.toFixed(2).replace('.', ',');
        telaHistorico.textContent = historico;

        // limpar para o próximo
        campoDescricao.value = '';
        campoValor.value = '';
    }

});


//lista gasto

const listaGasto = [''];
const fila = [''];

function montarItensDaFila(fila) {
    let itens = '';
    for (let i = 0; i < fila.length; i++) {
        itens = itens + `<li>${fila[i]}</li>`;
    }
    return itens;
}

function mostrarListaGasto(listaGasto, fila) {
    if (campoDescricao, campoValor === '') {
        return '';
    }
    if (lista.includes(campoDescricao, campoValor)) {
        return fila + listaGasto;
    }
    return '';
}

function mostrarFila() {
    lista.innerHTML = mostrarListaGasto(fila);
}

mostrarFila();