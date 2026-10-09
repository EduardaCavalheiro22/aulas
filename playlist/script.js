//Selector
const campoMusica = document.querySelector('.campo-musica');
const aviso = document.querySelector('.aviso');
const telaFila = document.querySelector('.filaAgora')
const musicaAgora = document.querySelector('.musicaAgora')

const botaoFim = document.querySelector('.botao-fim');
const botaoDepois = document.querySelector('.botao-depois');
const botaoDesfazer = document.querySelector('.botao-desfazer');
const botaoRemove = document.querySelector('.botao-remove');
const botaoPular = document.querySelector('.botao-pular');
const lista = document.querySelector('.lista')

const fila = ['Earrings', 'BabyDoll', 'Needy'];


//Botões

// input: guarda cada letra;
campoMusica.addEventListener('input', function () {
    console.log('digitou: ' + campoMusica.value);
});

botaoFim.addEventListener('click', function () {
    console.log('clicou em Fim da fila');
});

botaoDepois.addEventListener('click', function () {
    console.log('clicou em Tocar depois desta');
});

botaoDesfazer.addEventListener('click', function () {
    console.log('clicou em Desfazer última');
});

botaoRemove.addEventListener('click', function () {
    console.log('clicou em Remover da fila');
});

botaoPular.addEventListener('click', function () {
    console.log('clicou em Próxima');
});


//Lista
function montarItensDaFila(fila) {
    let itens = '';
    for (let i = 0; i < fila.length; i++) {
        itens = itens + `<li>${fila[i]}</li>`;
    }
    return itens;
}

function montarAvisoDaNovaMusica(musica, fila) {
    if (musica === '') {
        return 'Escreva o nome da música.';
    }
    if (fila.includes(musica)) {
        return musica + ' já está na lista.';
    }
    return '';
}

//Funcoes Tela

function mostrarFila() {
    lista.innerHTML = montarItensDaFila(fila);
    telaFila.textContent = montarTextoDaContagem(fila.length);
}

function lerMusica() {
    return campoMusica.value.trim();
}

mostrarFila();


//Tocando agora

function montarTextoDaContagem(quantidade) {
    if (quantidade === 0) {
        return 'Nenhuma música na fila';
    }
    if (quantidade === 1) {
        return '1 música na fila';
    }
    return quantidade + ' músicas na fila';
}

//Listener

campoMusica.addEventListener('input', function () {
    aviso.textContent = '';
});

campoMusica.addEventListener('submit', function (evento) {
    evento.preventDefault();

    const musica = lerMusica();
    aviso.textContent = montarAvisoDaNovaMusica(musica, fila);

    if (aviso.textContent === '') {
        fila.push(musica);
        limparCampo();
        mostrarFila();
    }
});

//Listener Botões


//entra no fim da fila
botaoFim.addEventListener('click', function (evento) {
    evento.preventDefault();

    const musica = lerMusica();
    aviso.textContent = montarAvisoDaNovaMusica(musica, fila);

    if (aviso.textContent === '') {
        fila.push(musica);
        limparCampo();
        mostrarFila();
    }
});

//entra no inicio da fila (proximo a ser tocado)
botaoDepois.addEventListener('click', function () {
    const musica = lerMusica();
    aviso.textContent = montarAvisoDaNovaMusica(musica, fila);

    if (aviso.textContent === '') {
        fila.unshift(musica);
        limparCampo();
        mostrarFila();
    }
});

//Remove a ultima e avisa qual foi a ultima removida.
botaoDesfazer.addEventListener('click', function () {
    if (fila.length === 0) {
        aviso.textContent = 'Não há nenhuma musica na fila.';
    } else {
        const removido = fila.pop();
        aviso.textContent = removido + ' saiu da fila.';
        mostrarFila();
    }
});

//Acha o item e remove.
botaoRemove.addEventListener('click', function () {
    const musica = lerMusica();
    const posicao = fila.indexOf(musica);

    if (musica === '') {
        aviso.textContent = 'Escreva o nome.';
    } else if (posicao === -1) {
        aviso.textContent = musica + ' não está na lista.';
    } else {
        fila.splice(posicao, 1);
        aviso.textContent = musica + ' foi removido.';
        limparCampo();
        mostrarFila();
    }
});

//painel tocando agora (botao pular)
botaoPular.addEventListener('click', function () {
    if (fila.length === 0) {
        aviso.textContent = 'Não há nenhuma musica tocando agora.';
    } else {
        musicaAgora.textContent = fila.shift();
        aviso.textContent = '';
        mostrarFila();
    }
});