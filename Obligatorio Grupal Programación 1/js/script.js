let container = document.querySelector(".container");
let filtroCategoria = document.getElementById("seleccionarCategoria");

function cargarEventos(eventos) {
    container.innerHTML = "";
    eventos.forEach(evento => {
        container.innerHTML += mostrarEvento(evento);
    });
}

// Al cargar la página
window.addEventListener('load', function() {
    // Obtener los eventos almacenados de localStorage
    let eventosAlmacenados = obtenerEventosDeLocalStorage();
    // Cargar los eventos en la página
    eventosAlmacenados.length > 0 ? cargarEventos(eventosAlmacenados) : cargarEventos(eventos);
});

function obtenerEventosDeLocalStorage() {
    let eventosString = localStorage.getItem('eventos');
    return eventosString ? JSON.parse(eventosString) : [];
}

function mostrarEvento(evento) {
    return `<div class="cartaEvento">
            <div class="imgEvento"><img src='${evento.imagen}'></div>
            <p class="categoria">${evento.categoria}</p>
            <div class="eventoTexto">
            <p class="tipo">${evento.tipo}</p>
            <p class="importe">$ ${evento.precio}</p>
            <button class="comprar" id="${evento.codigo}">Comprar</button>
            </div>`;
}

// Filtrar por categoría
filtroCategoria.addEventListener("change", () => {
    let categoria = filtroCategoria.value;
    let categoriaFiltrada = [];

    if (categoria === "Todos") {
        categoriaFiltrada = eventos;
    } else {
        categoriaFiltrada = obtenerEventosDeLocalStorage().filter(evento => evento.categoria === categoria);
    }
    cargarEventos(categoriaFiltrada);
})
