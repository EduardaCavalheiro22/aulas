

const formulario = document.querySelector('.formulario');
const campoDescricao = document.querySelector('.campo-descricao');
const campoValor = document.querySelector('.campo-valor');
const erro = document.querySelector('.erro');

const botaoDesfazer = document.querySelector('.botaoDesfazer');

const telaTotal = document.querySelector('.total');
const telaAviso = document.querySelector('.aviso');
const telaQuantidade = document.querySelector('.quantidade');
const telaMedia = document.querySelector('.media');
const telaMaior = document.querySelector('.maior');
const telaRestante = document.querySelector('.restante');
const telaFila = document.querySelector('.telaFila')
const lista = document.querySelector('.lista')
const ORCAMENTO = 50;
const listaGasto = [];


let total = 0;              // acumulador
let numeros = 0;         // contador
let maiorValor = 0;         // o maior visto até agora
let maiorDescricao = '';
let historico = '';         // acumulador de texto
let volume = 0;            


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

        listaGasto .push({'descricao':descricao,'valor':valor});
        mostrarFila();
        erro.textContent = '';
        total = total + valor;
        if (valor > maiorValor) {
            maiorValor = valor;
            maiorDescricao = descricao;
        }
        //ALTERAÇÕES QUANTIDADE
        numeros = numeros + 1;
        const media = total / numeros;
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
        telaQuantidade.textContent = numeros;
        telaMedia.textContent = 'R$ ' + media.toFixed(2).replace('.', ',');
        telaMaior.textContent = maiorDescricao + ' — R$ ' + maiorValor.toFixed(2).replace('.', ',');

        // limpar para o próximo
        campoDescricao.value = '';
        campoValor.value = '';
    }

});


//lista gasto

function mostrarListaGasto(listaGasto) {
    let itens = '';
    for (let i = 0; i < listaGasto.length; i++) {
        itens = itens + `<li>${listaGasto[i].descricao} - ${listaGasto[i].valor}</li>`;
    }
    return itens;
}

function mostrarFila() {
     telaFila.textContent = montarTextoDaContagem(listaGasto.length);
    lista.innerHTML = mostrarListaGasto(listaGasto);
}

mostrarFila();

//telaFila

function montarTextoDaContagem(volume) {
    if (volume === 0) {
        return 'Nenhum gasto.';
    }
    if (volume === 1) {
        return '1 gasto registrado.';
    }
    return volume + ' gastos registrados.';
}

// alterações calculadora

function calcularTotal(listaGasto) {
    let soma = 0;
    for (let i = 0; i < listaGasto.length; i++) {
        soma = soma + listaGasto[i].listaGasto;
    }
    return soma;
}

function encontrarMaiorValor(listaGasto) {
    let maior = gasto[0];
    for (let i = 1; i < listaGasto.length; i++) {
        if (gasto[i].gasto > maior.gasto) {
            maior = gasto[i];
        }
    }
    return maior;
}

function encontrarMenorValor(listaGasto) {
    let menor = gasto[0];
    for (let i = 1; i < listaGasto.length; i++) {
        if (gasto[i].gasto < menor.gasto) {
            menor = gasto[i];
        }
    }
    return menor;
}    

//Botton

botaoDesfazer.addEventListener('click', function () {
    console.log('clicou em Desfazer última');
    if (listaGasto.length === 0) {
        telaAviso.textContent = 'Não há nenhum gasto na lista.';
    } else {
        const removido = listaGasto.pop();
        telaAviso.textContent = removido.descricao + ' saiu da lista.';
        mostrarFila();
    }
});
