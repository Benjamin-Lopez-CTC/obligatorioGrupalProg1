let container = document.querySelector(".container");
let filtroCategoria = document.getElementById("seleccionarCategoria");

function cargarEventos(eventos) {
    container.innerHTML = "";
    eventos.forEach(evento => {
        container.innerHTML += mostrarEvento(evento);
    });
}

cargarEventos(eventos);

function mostrarEvento(evento) {
    return `<div class="cartaEvento">
            <div class="imgEvento"><img src='${evento.imagen}'></div>
            <p class="categoria">${evento.categoria}</p>
            <div class="eventoTexto">
            <p class="evento">${evento.tipo}</p>
            <p class="precio">$ ${evento.precio}</p>
            <button class="comprar" id="${evento.codigo}">Comprar</button>
            </div>`;
}

filtroCategoria.addEventListener("change", () => {
    let categoria = filtroCategoria.value;
    let categoriaFiltrada = [];

    if (categoria === "todos") {
        categoriaFiltrada = eventos;
    } else {
        categoriaFiltrada = eventos.filter(evento => evento.categoria === categoria);
    }
    cargarEventos(categoriaFiltrada);
})