/* ===========================================================
   Lista de espera — versão final

   A lista de espera é um array de nomes. Cada botão faz UMA
   operação no array e depois chama a mostrarEspera(), que
   redesenha a lista a partir dele.

     Entrar na fila      push      põe no fim
     Preferencial        unshift   põe no começo
     Chamar próximo      shift     tira do começo
     Desfazer último     pop       tira do fim
     Desistiu            indexOf + splice   tira do meio
     (nome repetido)     includes  já está na lista?
   =========================================================== */


/* -----------------------------------------------------------
   Funções que só devolvem
   ----------------------------------------------------------- */

// Um <li> para cada nome da lista.
function montarItensDaEspera(espera) {
    let itens = '';
    for (let i = 0; i < espera.length; i++) {
        itens = itens + `<li>${espera[i]}</li>`;
    }
    return itens;
}

// montarTextoDaContagem(0) → 'Ninguém esperando'
// montarTextoDaContagem(1) → '1 pessoa esperando'
// montarTextoDaContagem(3) → '3 pessoas esperando'
function montarTextoDaContagem(quantidade) {
    if (quantidade === 0) {
        return 'Ninguém esperando';
    }
    if (quantidade === 1) {
        return '1 pessoa esperando';
    }
    return quantidade + ' pessoas esperando';
}

// Devolve o problema do nome novo, ou '' se estiver tudo certo.
function montarAvisoDoNovoNome(nome, espera) {
    if (nome === '') {
        return 'Escreva o nome.';
    }
    if (espera.includes(nome)) {
        return nome + ' já está na lista.';
    }
    return '';
}


/* -----------------------------------------------------------
   Selecionar e lembrar
   ----------------------------------------------------------- */

const cadastro = document.querySelector('.cadastro');
const campoNome = document.querySelector('.campo-nome');
const aviso = document.querySelector('.aviso');

const botaoPreferencial = document.querySelector('.botao-preferencial');
const botaoDesistiu = document.querySelector('.botao-desistiu');
const botaoDesfazer = document.querySelector('.botao-desfazer');
const botaoChamar = document.querySelector('.botao-chamar');

const telaContagem = document.querySelector('.contagem');
const telaNomeChamado = document.querySelector('.nome-chamado');
const telaLista = document.querySelector('.lista');

// Começa com três pessoas, para já ter o que ver.
const fila = ['Ana', 'Bruno', 'Carla'];


/* -----------------------------------------------------------
   Funções que mexem na tela
   ----------------------------------------------------------- */

// Redesenha a lista inteira a partir do array.
// Toda operação na lista termina chamando esta função.
function mostrarFila() {
    telaLista.innerHTML = montarItensDaEspera(fila);
    telaContagem.textContent = montarTextoDaContagem(fila.length);
}

function lerNome() {
    return campoNome.value.trim();
}

function limparCampo() {
    campoNome.value = '';
}

mostrarFila();


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
        mostrarFila();
    }
});

// unshift: entra no começo, é o próximo a ser chamado
botaoPreferencial.addEventListener('click', function () {
    const nome = lerNome();
    aviso.textContent = montarAvisoDoNovoNome(nome, fila);

    if (aviso.textContent === '') {
        fila.unshift(nome);
        limparCampo();
        mostrarFila();
    }
});

// shift: sai do começo, e devolve quem saiu
botaoChamar.addEventListener('click', function () {
    if (fila.length === 0) {
        aviso.textContent = 'Não tem ninguém esperando.';
    } else {
        telaNomeChamado.textContent = fila.shift();
        aviso.textContent = '';
        mostrarFila();
    }
});

// pop: sai do fim, e também devolve quem saiu
botaoDesfazer.addEventListener('click', function () {
    if (fila.length === 0) {
        aviso.textContent = 'Não tem ninguém esperando.';
    } else {
        const removido = fila.pop();
        aviso.textContent = removido + ' saiu da lista.';
        mostrarFila();
    }
});

// indexOf + splice: acha a posição e tira dali
botaoDesistiu.addEventListener('click', function () {
    const nome = lerNome();
    const posicao = fila.indexOf(nome);

    if (nome === '') {
        aviso.textContent = 'Escreva o nome.';
    } else if (posicao === -1) {
        aviso.textContent = nome + ' não está na lista.';
    } else {
        fila.splice(posicao, 1);
        aviso.textContent = nome + ' desistiu.';
        limparCampo();
        mostrarFila();
    }
});
