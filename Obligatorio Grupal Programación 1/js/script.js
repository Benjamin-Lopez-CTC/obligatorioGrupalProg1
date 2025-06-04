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
            <div class="imgEvento"><img src='${evento.imagen}'</img></div>
            <div class="evento"><p>${evento.tipo}</p></div>
            <div class="precio"><p>$ ${evento.precio}</p></div>
            <div class="comprar"><button id="${evento.codigo}">Comprar</button></div>
            </div>`;
}