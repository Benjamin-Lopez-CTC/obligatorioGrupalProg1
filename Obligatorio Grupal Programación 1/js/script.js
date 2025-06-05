let container = document.querySelector(".container");

function cargarEventos(eventos) {
    container.innerHTML = " ";
    eventos.forEach(evento => {
        container.innerHTML += mostrarEvento(evento);
    });
}

cargarEventos(eventos);

function mostrarEvento(evento) {
    return `<div class="cartaEvento">
            <div class="imgEvento"><img src='${evento.imagen}'></div>
            <div class="eventoTexto">
            <p class="evento">${evento.tipo}</p>
            <p class="precio">$ ${evento.precio}</p>
            <button class="comprar" id="${evento.codigo}">Comprar</button>
            </div>`;
}