const filtro = document.getElementById("filtro");

let grafico;

console.log("JS funcionando");

const form = document.getElementById("form");
const descricao = document.getElementById("descricao");
const valor = document.getElementById("valor");
const tipo = document.getElementById("tipo");

const lista = document.getElementById("lista");
const saldo = document.getElementById("saldo");
const entradas = document.getElementById("entradas");
const saidas = document.getElementById("saidas");

let transacoes = JSON.parse(localStorage.getItem("transacoes")) || [];

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const transacao = {
        descricao: descricao.value,
        valor: Number(valor.value),
        tipo: tipo.value
    };

    transacoes.push(transacao);

    atualizarTela() 
    localStorage.setItem("transacoes", JSON.stringify(transacoes));

        form.reset();
    });

    function atualizarTela() {
        lista.innerHTML = "";

        let total = 0;
        let totalEntradas = 0;
        let totalSaidas = 0;

        let listaFiltrada = transacoes;

        if (filtro.value !== "todos") {
            listaFiltrada = transacoes.filter(t => t.tipo === filtro.value);
        }

        listaFiltrada.forEach((t, index) => {
            const li = document.createElement("li");

            li.innerHTML = `
            ${t.descricao} - R$ ${t.valor}
            <button onclick="remover(${index})">X</button>
            `;

            li.classList.add(t.tipo);

            lista.appendChild(li);

            if (t.tipo === "entrada") {
                total += t.valor;
                totalEntradas += t.valor;
            } else {
                total -= t.valor;
                totalSaidas += t.valor;
            }

        });

        saldo.textContent = total.toFixed(2);
        entradas.textContent = totalEntradas.toFixed(2);
        saidas.textContent = totalSaidas.toFixed(2);

        const ctx = document.getElementById("grafico").getContext("2d");
        if (grafico){
            grafico.destroy();
        }

        grafico = new Chart(ctx, {
            type: "doughnut",
            data: {
                labels: filtro.value === "todos"
                 ? ["Entradas", "Saídas"]
                 : filtro.value === "entrada"
                 ? ["Entradas"]
                 : ["Saídas"],
               datasets: [{
                    data: filtro.value === "entrada"
                    ? [totalEntradas, 0]
                    : filtro.value === "saida"
                    ? [0, totalSaidas]
                    : [totalEntradas, totalSaidas],
                    backgroundColor: ["green", "red"]
                }]
            }
        });
    }

    window.remover = function(index) {
        transacoes.splice(index, 1);
        atualizarTela();
    }

    atualizarTela();

    const botaoModo = document.getElementById("modo");

    botaoModo.addEventListener("click", () => {
        document.body.classList.toggle("dark");
    });

    filtro.addEventListener("change", atualizarTela);

  