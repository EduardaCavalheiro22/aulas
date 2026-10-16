
/* -----------------------------------------------------------
   Funções que só devolvem
   ----------------------------------------------------------- */

function montarTextoDaContagem(quantidade) {
    if (quantidade === 0) {
        return 'Ninguém esperando';
    }
    if (quantidade === 1) {
        return '1 pessoa esperando';
    }
    return quantidade + ' pessoas esperando';
}

function montarAvisoDoNovoNome(nome, espera) {
    if (nome === '') {
        return 'Escreva o nome.';
    }
    if (espera.includes(nome)) {
        return nome + ' já está na lista.';
    }
    return '';
}

const cadastro = document.querySelector('.cadastro');
const campoNome = document.querySelector('.campo-nome');
const aviso = document.querySelector('.aviso');

const botaoPreferencial = document.querySelector('.botao-preferencial');
const botaoDesfazer = document.querySelector('.botao-desfazer');
const botaoChamar = document.querySelector('.botao-chamar');

const telaContagem = document.querySelector('.contagem');
const telaMusicaTocada = document.querySelector('.nome-chamado');
const telaLista = document.querySelector('.lista');
const telaChamados = document.querySelector('.lista-chamados');

const iconeRemover = `
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <path d="M6 6 L18 18 M18 6 L6 18"
              stroke="currentColor" stroke-width="3" stroke-linecap="round" />
    </svg>`;


const espera = ['Ana', 'Bruno', 'Carla'];
const fila = [];


/* -----------------------------------------------------------
   Funções que criam elementos
   ----------------------------------------------------------- */

// Cria um <li> com o nome e um botão com ícone, peça por peça.
// O nome vai pelo textContent: se alguém digitar <b>Ana</b>,
// aparece escrito <b>Ana</b>, e não Ana em negrito.
function criarItemDaEspera(nome, posicao) {
    const item = document.createElement('li');

    const textoDoNome = document.createElement('span');
    textoDoNome.textContent = nome;

    const botaoDesistiu = document.createElement('button');
    botaoDesistiu.type = 'button';
    botaoDesistiu.classList.add('botao-remover');

    // O ícone é um texto que NÓS escrevemos, então aqui o
    // innerHTML pode. O que a pessoa digitou nunca vai por ele.
    botaoDesistiu.innerHTML = iconeRemover;

    // Um botão só com ícone não tem texto para o leitor de
    // tela ler. O aria-label é esse texto: "Tirar Ana da fila".
    botaoDesistiu.setAttribute('aria-label', 'Tirar ' + nome + ' da fila');

    // Cada item ganha o próprio botão, e cada botão sabe a
    // posição do seu nome: não precisa mais do indexOf.
    botaoDesistiu.addEventListener('click', function () {
        fila.splice(posicao, 1);
        aviso.textContent = nome + ' desistiu.';
        renderizar();
    });

    item.appendChild(textoDoNome);

    // Só o primeiro da lista ganha a etiqueta "próximo".
    // Um elemento pode ser criado ou não, dependendo de um if.
    if (posicao === 0) {
        const etiqueta = document.createElement('span');
        etiqueta.textContent = 'próximo';
        etiqueta.classList.add('etiqueta');
        item.appendChild(etiqueta);
    }

    item.appendChild(botaoDesistiu);
    return item;
}

// Cria o <li> de quem já foi chamado: só o nome.
function criarItemDoChamado(nome) {
    const item = document.createElement('li');
    item.textContent = nome;
    return item;
}


/* -----------------------------------------------------------
   Funções que mexem na tela
   ----------------------------------------------------------- */

// Redesenha a lista inteira a partir do array.
// Toda operação na lista termina chamando esta função.
function renderizar() {
    telaLista.innerHTML = '';

    for (let i = 0; i < fila.length; i++) {
        telaLista.appendChild(criarItemDaEspera(fila[i], i));
    }

    // A segunda lista: o mesmo jeito, com o outro array.
    telaChamados.innerHTML = '';
    for (let i = 0; i < fila.length; i++) {
        telaChamados.appendChild(criarItemDoChamado(fila[i]));
    }

    // Quem está sendo chamado agora é o último dos chamados.
    if (fila.length === 0) {
        telaMusicaTocada.textContent = 'Ninguém';
    } else {
        telaMusicaTocada.textContent = fila[fila.length - 1];
    }

    telaContagem.textContent = montarTextoDaContagem(fila.length);

    // Sem ninguém esperando, não há quem chamar.
    botaoChamar.disabled = fila.length === 0;
}

function lerNome() {
    return campoNome.value.trim();
}

function limparCampo() {
    campoNome.value = '';
}

renderizar();


/* -----------------------------------------------------------
   Escutar
   ----------------------------------------------------------- */

// input: começou a digitar de novo, o aviso antigo sai.
campoNome.addEventListener('input', function () {
    aviso.textContent = '';
});

// push: entra no fim
cadastro.addEventListener('submit', function (evento) {
    evento.preventDefault();

    const nome = lerNome();
    aviso.textContent = montarAvisoDoNovoNome(nome, fila);

    if (aviso.textContent === '') {
        fila.push(nome);
        limparCampo();
        renderizar();
    }
});

// unshift: entra no começo, é o próximo a ser chamado
botaoPreferencial.addEventListener('click', function () {
    const nome = lerNome();
    aviso.textContent = montarAvisoDoNovoNome(nome, fila);

    if (aviso.textContent === '') {
        fila.unshift(nome);
        limparCampo();
        renderizar();
    }
});

// shift: sai do começo e devolve quem saiu. Quem saiu vai
// para o fim dos chamados (push).
// Não precisa conferir se a lista está vazia: nesse caso, o
// botão já está desabilitado pela renderizar().
botaoChamar.addEventListener('click', function () {
    fila.push(fila.shift());
    aviso.textContent = '';
    renderizar();
});

// pop: sai do fim, e também devolve quem saiu
botaoDesfazer.addEventListener('click', function () {
    if (fila.length === 0) {
        aviso.textContent = 'Não tem ninguém esperando.';
    } else {
        const removido = fila.pop();
        aviso.textContent = removido + ' saiu da lista.';
        renderizar();
    }
});
