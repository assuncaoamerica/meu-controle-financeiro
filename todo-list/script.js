let editandoIndex = null;

const form = document.getElementById("form");
const input = document.getElementById("tarefa");
const lista = document.getElementById("lista");

let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
let filtroAtual = "todas";

form.addEventListener("submit", function(e) {
    e.preventDefault();

    if (editandoIndex !== null) {
        tarefas[editandoIndex].texto = input.value;
        editandoIndex = null;

        document.querySelector("button[type='submit']").textContent = "Adicionar";
    } else {
        tarefas.push({
            texto: input.value,
            concluida: false
        });
    }

    salvar();
    atualizarTela();
    form.reset();
});

function atualizarTela() {
    lista.innerHTML = "";

    let listaFiltrada = tarefas;

    if (filtroAtual === "pendentes") {
        listaFiltrada = tarefas.filter(t => !t.concluida);
    }

    if (filtroAtual === "concluidas") {
        listaFiltrada = tarefas.filter(t => t.concluida);
    }

    listaFiltrada.forEach((t, index) => {
        const li = document.createElement("li");

        li.innerHTML = `
<span onclick="toggle(${index})">${t.texto}</span>
<div>
    <button onclick="editar(${index})">✏️</button>
    <button onclick="remover(${index})">X</button>
</div>
`;
        if (t.concluida) {
            li.classList.add("concluida");
        }

        lista.appendChild(li);
    });

    const contador = document.getElementById("contador");
const pendentes = tarefas.filter(t => !t.concluida).length;

contador.textContent = `Você tem ${pendentes} tarefas pendentes`;
}

window.toggle = function(index) {
    tarefas[index].concluida = !tarefas[index].concluida;
    salvar();
    atualizarTela();
}

window.remover = function(index) {
    tarefas.splice(index, 1);
    salvar();
    atualizarTela();
}

window.filtrar = function(tipo) {
    filtroAtual = tipo;
    atualizarTela();
}

function salvar() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

atualizarTela();

window.editar = function(index) {
    input.value = tarefas[index].texto;
    editandoIndex = index;

    document.querySelector("button[type='submit']").textContent = "Salvar";
}

const botaoModo = document.getElementById("modo");

// carregar tema salvo
if (localStorage.getItem("modo") === "dark") {
    document.body.classList.add("dark");
}

// clique no botão
botaoModo.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        localStorage.setItem("modo", "dark");
    } else {
        localStorage.setItem("modo", "light");
    }
});