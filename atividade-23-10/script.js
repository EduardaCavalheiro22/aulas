const entregas = [
    {
        materia: "Matemática",
        tipo: "prova",
        data: "2026-10-28",
        feita: false
    },
    {
        materia: "História",
        tipo: "trabalho",
        data: "2026-11-04",
        feita: false
    },
    {
        materia: "Português",
        tipo: "trabalho",
        data: "2026-10-20",
        feita: true
    },
    {
        materia: "Inglês",
        tipo: "apresentacao",
        data: "2026-10-30",
        feita: false
    }
];

const formulario = document.getElementById("formulario");
const campoMateria = document.getElementById("materia");
const campoTipo = document.getElementById("tipo");
const campoData = document.getElementById("data");
const listaEntregas = document.getElementById("listaEntregas");

const totalPendentes = document.getElementById("totalPendentes");
const proximaEntrega = document.getElementById("proximaEntrega");

const nomesTipos = {
    prova: "prova",
    trabalho: "trabalho",
    apresentacao: "apresentação"
};

function formatarData(data) {
    const [ano, mes, dia] = data.split("-");
    return `${dia}/${mes}`;
}

function renderizar() {
    listaEntregas.replaceChildren();
    const entregasOrdenadas = [...entregas].sort((a, b) => {
        return a.data.localeCompare(b.data);
    });

    entregasOrdenadas.forEach((entrega) => {
        const item = document.createElement("li");
        item.classList.add("entrega");
        item.dataset.tipo = entrega.tipo;

        if (entrega.feita) {
            item.classList.add("feita");
        }

        const data = document.createElement("span");
        data.classList.add("data");
        data.textContent = formatarData(entrega.data);

        const informacoes = document.createElement("div");
        informacoes.classList.add("informacoes");

        const materia = document.createElement("strong");
        materia.textContent = entrega.materia;

        const etiqueta = document.createElement("div");
        etiqueta.classList.add("etiqueta");

        const tipo = document.createElement("span");
        tipo.classList.add(entrega.tipo);
        tipo.textContent = nomesTipos[entrega.tipo];

        etiqueta.appendChild(tipo);
        informacoes.append(materia, etiqueta);

        const botoes = document.createElement("div");
        botoes.classList.add("botoes");

        const botaoFeita = document.createElement("button");
        botaoFeita.classList.add("feita");
        botaoFeita.textContent = entrega.feita ? "Reabrir" : "Feita";

        const botaoApagar = document.createElement("button");
        botaoApagar.classList.add("apagar");
        botaoApagar.textContent = "Apagar";

        botaoApagar.addEventListener("click", () => {
            const indice = entregas.indexOf(entrega);

            if (indice !== -1) {
                entregas.splice(indice, 1);
                renderizar();
            }
        });

        botoes.append(botaoFeita, botaoApagar);
        item.append(data, informacoes, botoes);
        listaEntregas.appendChild(item);
    });

    atualizarResumo();
}

function atualizarResumo() {
    const pendentes = entregas.filter((entrega) => !entrega.feita);

    totalPendentes.textContent = `Pendentes: ${pendentes.length}`;

    if (pendentes.length === 0) {
        proximaEntrega.textContent = "Próxima entrega: Nada pendente";
        return;
    }

    const proxima = [...pendentes].sort((a, b) => {
        return a.data.localeCompare(b.data);
    })[0];

    proximaEntrega.textContent =
        `Próxima entrega: ${proxima.materia} - ${formatarData(proxima.data)}`;
}

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const materia = campoMateria.value.trim();
    const tipo = campoTipo.value;
    const data = campoData.value;

    if (!materia || !tipo || !data) {
        return;
    }

    entregas.push({
        materia: materia,
        tipo: tipo,
        data: data,
        feita: false
    });

    formulario.reset();
    renderizar();

    console.log(entregas);
});

renderizar();

console.log(entregas);