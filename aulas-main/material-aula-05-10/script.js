/* ===========================================================
   Clique no alvo — versão final

   - Math.random() sorteia a posição do alvo.
   - setInterval é o cronômetro: roda a cada segundo, sozinho.
   - setTimeout faz o alvo fugir se a pessoa demorar.
   - clearInterval e clearTimeout cancelam os dois.
   =========================================================== */

const DURACAO = 30;          // segundos de partida
const TEMPO_DO_ALVO = 1200;  // milissegundos até o alvo fugir


/* -----------------------------------------------------------
   Funções que só devolvem
   ----------------------------------------------------------- */

// Sorteia um número inteiro entre o mínimo e o máximo, os dois
// incluídos. sortearNumero(1, 6) → 1, 2, 3, 4, 5 ou 6, como um dado.
//
// Lendo de dentro para fora, com sortearNumero(1, 6):
//
//   Math.random()          um número quebrado de 0 a 0,999...
//                          (pode dar 0, nunca dá 1)
//
//   maximo - minimo + 1    quantos números existem no intervalo:
//                          6 - 1 + 1 = 6. O + 1 é porque a
//                          subtração conta os vãos entre os
//                          números, não os números. Sem ele, o 6
//                          nunca sairia.
//
//   Math.random() * 6      estica: de 0 a 5,999... (nunca 6)
//
//   Math.floor(...)        corta a parte decimal: 0, 1, 2, 3, 4
//                          ou 5, todos com a mesma chance.
//                          (Math.round daria metade da chance
//                          para as pontas.)
//
//   + minimo               empurra para o começo certo: 1 a 6.
function sortearNumero(minimo, maximo) {    
    return Math.floor(Math.random() * (maximo - minimo + 1)) + minimo;
}

function bateuRecorde(pontos, recorde) {
    return pontos > recorde;
}

// montarMensagemDeFim(12, 15) → 'Fim! 12 pontos. O recorde é 15.'
function montarMensagemDeFim(pontos, recorde) {
    if (bateuRecorde(pontos, recorde)) {
        return 'Novo recorde: ' + pontos + ' pontos!';
    }
    return 'Fim! ' + pontos + ' pontos. O recorde é ' + recorde + '.';
}


/* -----------------------------------------------------------
   Selecionar e lembrar
   ----------------------------------------------------------- */

const alvo = document.querySelector('.alvo');
const botaoComecar = document.querySelector('.botao-comecar');
const mensagem = document.querySelector('.mensagem');

const telaPontos = document.querySelector('.pontos');
const telaTempo = document.querySelector('.tempo');
const telaRecorde = document.querySelector('.recorde');

const jogo = {
    pontos: 0,
    tempoRestante: DURACAO,
    recorde: 0
};

// O número que o setInterval devolve: é com ele que o
// clearInterval sabe qual cronômetro parar.
let cronometro;

// O mesmo para o setTimeout da fuga do alvo.
let fuga;


/* -----------------------------------------------------------
   Funções que mexem na tela ou no jogo
   ----------------------------------------------------------- */

// Move o alvo e marca a próxima fuga. Se a pessoa acertar
// antes, a fuga marcada é cancelada e outra é marcada.
function moverAlvo() {
    alvo.style.left = sortearNumero(10, 90) + '%';
    alvo.style.top = sortearNumero(10, 90) + '%';

    clearTimeout(fuga);
    fuga = setTimeout(function () {
        moverAlvo();
    }, TEMPO_DO_ALVO);
}

function mostrarPlacar() {
    telaPontos.textContent = jogo.pontos;
    telaTempo.textContent = jogo.tempoRestante;
    telaRecorde.textContent = jogo.recorde;
}

function iniciarJogo() {
    jogo.pontos = 0;
    jogo.tempoRestante = DURACAO;

    // Sem isto, clicar duas vezes em Começar cria dois
    // cronômetros, e o tempo cai de dois em dois.
    botaoComecar.disabled = true;
    mensagem.textContent = 'Vai!';

    alvo.classList.remove('escondido');
    moverAlvo();
    mostrarPlacar();

    cronometro = setInterval(function () {
        passarUmSegundo();
    }, 1000);
}

function passarUmSegundo() {
    jogo.tempoRestante = jogo.tempoRestante - 1;
    mostrarPlacar();

    if (jogo.tempoRestante === 0) {
        encerrarJogo();
    }
}

function encerrarJogo() {
    // Sem isto, o tempo continua: -1, -2, -3...
    clearInterval(cronometro);
    // Sem isto, o alvo escondido continua fugindo.
    clearTimeout(fuga);

    mensagem.textContent = montarMensagemDeFim(jogo.pontos, jogo.recorde);
    if (bateuRecorde(jogo.pontos, jogo.recorde)) {
        jogo.recorde = jogo.pontos;
    }

    alvo.classList.add('escondido');
    botaoComecar.disabled = false;
    botaoComecar.textContent = 'Jogar de novo';
    mostrarPlacar();
}


/* -----------------------------------------------------------
   Escutar
   ----------------------------------------------------------- */

botaoComecar.addEventListener('click', function () {
    iniciarJogo();
});

alvo.addEventListener('click', function () {
    jogo.pontos = jogo.pontos + 1;
    mostrarPlacar();
    moverAlvo();
});
