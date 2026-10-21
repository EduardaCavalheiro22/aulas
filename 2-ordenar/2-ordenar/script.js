/* ===========================================================
   Minha playlist — etapa 4 (21/10): ordenar

   A ordem escolhida fica numa variável, como o filtro. A
   renderizar() monta uma lista NOVA: filtrada e depois
   ordenada. O array musicas continua na ordem em que as
   músicas entraram.

   Como a tela mostra uma lista nova, o i do for não é mais
   a posição no array musicas. Por isso o remover procura a
   música com indexOf na hora do clique.
   =========================================================== */


/* -----------------------------------------------------------
   Funções que só devolvem
   ----------------------------------------------------------- */

// A música aparece com este filtro?
// passaNoFiltro({ titulo: 'APT.', genero: 'pop' }, 'pop')   → true
// passaNoFiltro({ titulo: 'APT.', genero: 'pop' }, 'rock')  → false
// passaNoFiltro({ titulo: 'APT.', genero: 'pop' }, 'todos') → true
function passaNoFiltro(musica, genero) {
    return genero === 'todos' || musica.genero === genero;
}

// Devolve uma lista NOVA, só com as músicas que passam no
// filtro. A lista original não muda.
// filtrarMusicas(musicas, 'rock') → as 2 músicas de rock
function filtrarMusicas(musicas, genero) {
    return musicas.filter(musica => passaNoFiltro(musica, genero));
}

// Devolve uma lista NOVA, ordenada. A lista original não muda:
// o toSorted() é o sort() que não mexe no array.
//
// A função de comparação recebe duas músicas, a e b:
//   devolve um número negativo → a vem antes
//   devolve um número positivo → b vem antes
// O localeCompare faz essa conta para textos, e sabe que o
// "ô" vem junto com o "o", e não depois do "z".
//
// ordenarMusicas(musicas, 'titulo-az') → de APT. até Vai Malandra
function ordenarMusicas(musicas, ordem) {
    if (ordem === 'titulo-az') {
        return musicas.toSorted((a, b) => {
            const resultadoComparacao = a.titulo.localeCompare(b.titulo);
            console.log(`a = ${a.titulo}, b = ${b.titulo} ---- resultado: ${resultadoComparacao}`);
            return resultadoComparacao;
        });
    }
    if (ordem === 'titulo-za') {
        return musicas.toSorted((a, b) => b.titulo.localeCompare(a.titulo));
    }
    if (ordem === 'genero') {
        return musicas.toSorted((a, b) => a.genero.localeCompare(b.genero));
    }
    // 'chegada': a ordem do próprio array
    return musicas;
}

// Quantas músicas de um gênero?
// contarDoGenero(musicas, 'rock') → 2
function contarDoGenero(musicas, genero) {
    let quantidade = 0;
    for (let i = 0; i < musicas.length; i++) {
        if (musicas[i].genero === genero) {
            quantidade = quantidade + 1;
        }
    }
    return quantidade;
}

// Quanto a parte é do total, de 0 a 100.
// calcularPorcentagem(3, 6) → 50
// calcularPorcentagem(1, 4) → 25
// calcularPorcentagem(0, 0) → 0   (sem isso, 0 / 0 dá NaN)
function calcularPorcentagem(parte, total) {
    if (total === 0) {
        return 0;
    }
    return parte / total * 100;
}

// montarTextoDaContagem(0, 0) → 'Nenhuma música'
// montarTextoDaContagem(6, 6) → '6 músicas'
// montarTextoDaContagem(2, 6) → 'Mostrando 2 de 6 músicas'
function montarTextoDaContagem(mostradas, total) {
    if (total === 0) {
        return 'Nenhuma música';
    }
    if (total === 1) {
        return '1 música';
    }
    if (mostradas === total) {
        return total + ' músicas';
    }
    return 'Mostrando ' + mostradas + ' de ' + total + ' músicas';
}


/* -----------------------------------------------------------
   Selecionar e lembrar
   ----------------------------------------------------------- */

const formulario = document.querySelector('.formulario');
const campoTitulo = document.querySelector('.campo-titulo');
const campoGenero = document.querySelector('.campo-genero');
const campoFiltro = document.querySelector('.campo-filtro');
const campoOrdem = document.querySelector('.campo-ordem');
const aviso = document.querySelector('.aviso');

const telaContagem = document.querySelector('.contagem');
const telaLista = document.querySelector('.lista');
const telaGeneros = document.querySelector('.lista-generos');

const iconeRemover = `
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <path d="M6 6 L18 18 M18 6 L6 18"
              stroke="currentColor" stroke-width="3" stroke-linecap="round" />
    </svg>`;

// Cada música é um objeto: o título e o gênero.
const musicas = [
    { titulo: 'APT.', genero: 'pop' },
    { titulo: 'The Emptiness Machine', genero: 'rock' },
    { titulo: 'Vai Malandra', genero: 'funk' },
    { titulo: 'Espresso', genero: 'pop' },
    { titulo: 'Bohemian Rhapsody', genero: 'rock' },
    { titulo: 'BIRDS OF A FEATHER', genero: 'pop' }
];

// Os gêneros que existem, na ordem do gráfico.
const GENEROS = ['pop', 'rock', 'funk'];

// O gênero escolhido no filtro. É let porque muda.
let generoEscolhido = 'todos';

// A ordem escolhida. Também let, porque muda.
let ordemEscolhida = 'chegada';


/* -----------------------------------------------------------
   Funções que criam elementos
   ----------------------------------------------------------- */

// Não recebe mais a posição: na tela, a música pode estar
// numa ordem diferente da do array.
function criarItemDaMusica(musica) {
    const item = document.createElement('li');

    // O atributo data-genero não aparece na tela. Ele está ali
    // para o CSS escolher a cor: li[data-genero="pop"].
    item.setAttribute('data-genero', musica.genero);

    const titulo = document.createElement('span');
    titulo.classList.add('titulo');
    titulo.textContent = musica.titulo;

    const etiqueta = document.createElement('span');
    etiqueta.classList.add('etiqueta');
    etiqueta.textContent = musica.genero;

    const botaoRemover = document.createElement('button');
    botaoRemover.type = 'button';
    botaoRemover.classList.add('botao-remover');
    botaoRemover.innerHTML = iconeRemover;
    botaoRemover.setAttribute('aria-label', 'Remover ' + musica.titulo);

    // Na hora do clique, procura ONDE essa música está no
    // array de verdade. O indexOf acha o objeto certo porque
    // compara a referência: é a mesma música, não uma cópia.
    botaoRemover.addEventListener('click', function () {
        musicas.splice(musicas.indexOf(musica), 1);
        aviso.textContent = musica.titulo + ' saiu da playlist.';
        renderizar();
    });

    item.appendChild(titulo);
    item.appendChild(etiqueta);
    item.appendChild(botaoRemover);
    return item;
}


// Uma barra do gráfico:
// <li data-genero="pop">
//     <div class="legenda-da-barra"><span>pop</span><span>3 (50%)</span></div>
//     <div class="trilho"><div class="barra" style="width: 50%"></div></div>
// </li>
function criarBarraDoGenero(genero, quantidade) {
    const porcentagem = calcularPorcentagem(quantidade, musicas.length);

    const item = document.createElement('li');
    item.setAttribute('data-genero', genero);

    const legenda = document.createElement('div');
    legenda.classList.add('legenda-da-barra');

    const nome = document.createElement('span');
    nome.textContent = genero;

    const numero = document.createElement('span');
    numero.textContent = quantidade + ' (' + Math.round(porcentagem) + '%)';

    legenda.appendChild(nome);
    legenda.appendChild(numero);

    // O trilho é só desenho: quem lê a tela já ouviu o número
    // na legenda, então o leitor de tela pode pular o trilho.
    const trilho = document.createElement('div');
    trilho.classList.add('trilho');
    trilho.setAttribute('aria-hidden', 'true');

    const barra = document.createElement('div');
    barra.classList.add('barra');

    // A única linha de CSS que o JavaScript escreve: a largura.
    barra.style.width = porcentagem + '%';

    trilho.appendChild(barra);
    item.appendChild(legenda);
    item.appendChild(trilho);
    return item;
}


/* -----------------------------------------------------------
   Desenhar a tela a partir dos dados
   ----------------------------------------------------------- */

function renderizar() {
    telaLista.innerHTML = '';

    // Uma lista nova, só para a tela: filtrada e ordenada.
    const musicasFiltradas = filtrarMusicas(musicas, generoEscolhido);
    const visiveis = ordenarMusicas(musicasFiltradas, ordemEscolhida);

    for (let i = 0; i < visiveis.length; i++) {
        telaLista.appendChild(criarItemDaMusica(visiveis[i]));
    }

    // O gráfico conta TODAS as músicas, com qualquer filtro.
    telaGeneros.innerHTML = '';
    for (let i = 0; i < GENEROS.length; i++) {
        const quantidade = contarDoGenero(musicas, GENEROS[i]);
        telaGeneros.appendChild(criarBarraDoGenero(GENEROS[i], quantidade));
    }

    telaContagem.textContent = montarTextoDaContagem(visiveis.length, musicas.length);
}

renderizar();


/* -----------------------------------------------------------
   Escutar
   ----------------------------------------------------------- */

campoTitulo.addEventListener('input', function () {
    aviso.textContent = '';
});

formulario.addEventListener('submit', function (evento) {
    evento.preventDefault();

    const musica = {
        titulo: campoTitulo.value.trim(),
        genero: campoGenero.value
    };

    if (musica.titulo === '') {
        aviso.textContent = 'Escreva o nome da música.';
    } else {
        musicas.push(musica);
        campoTitulo.value = '';
        renderizar();
    }
});

// change: escolheu outro gênero no filtro.
// Muda a variável e desenha de novo. O array não muda.
campoFiltro.addEventListener('change', function () {
    generoEscolhido = campoFiltro.value;
    renderizar();
});

// Trocou a ordem: muda a variável e desenha de novo.
campoOrdem.addEventListener('change', function () {
    ordemEscolhida = campoOrdem.value;
    renderizar();
});
