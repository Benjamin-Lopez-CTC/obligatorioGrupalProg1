import { eventos } from "./eventos.js";

let container = document.querySelector(".container");
let filtroCategoria = document.getElementById("seleccionarCategoria");

function cargarEventos(eventos) {
    //Se limpia el div
    container.innerHTML = "";
    //Por cada evento se le agrega al div los elementos que crea la funcion mostrarEventos
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
            <div class="imgEvento"><img class="imgSize" src='${evento.imagen}'></div>
            <p class="categoria">${evento.categoria}</p>
            <div class="eventoTexto">
            <p class="tipo">${evento.tipo}</p>
            <p class="importe">$ ${evento.precio}</p>
            <button class="comprar" id="${evento.codigo}">Comprar</button>
            </div>`;
}

document.querySelector('.container').addEventListener('click', function(e) {
    if (e.target.classList.contains('comprar')) {
        let tipo = document.querySelector('.tipo').value;
        let precio = document.querySelector('.importe').value;

        let eventoCarrito = {
            tipo: tipo,
            precio: parseInt(precio)
        };

        let idPersona = document.getElementById('seleccionarPersona').value;
        let carrito = obtenerCarritoDeLS(idPersona);
        carrito.push(eventoCarrito);
        guardarCarritoEnLS(idPersona, carrito);
        mostrarCarrito(carrito);
        alert('Evento agregado al carrito');
    }
});

// Filtrar por categoría

//Cuando el usuario cambia de opción se ejecuta la función
filtroCategoria.addEventListener("change", () => {
    //Se guarda la opcion elegida en una variable
    let categoria = filtroCategoria.value;
    //Se obtienen los eventos del LS y se guardan en una variable
    let eventosAlmacenados = obtenerEventosDeLocalStorage();
    //Si no hay eventos en el LS se llama a los valores por defecto
    if (eventosAlmacenados.length === 0) {
        eventosAlmacenados = eventos;
    };

    let categoriaFiltrada = [];
    //Si la opción seleccionada es "Todos" se muestran todos los eventos que hay en el LS
    if (categoria === "Todos") {
        categoriaFiltrada = eventosAlmacenados;
    } else {
        //Sino se le hace un filtro al LS para mostrar los eventos que tengan la misma categoria que la seleccionada
        categoriaFiltrada = eventosAlmacenados.filter(evento => evento.categoria === categoria);
    }
    //A la funcion cargarEventos se le pasa los eventos ya filtrados
    cargarEventos(categoriaFiltrada);
})

function guardarCarritoEnLS(idPersona, carrito) {
    let carritos = JSON.parse(localStorage.getItem('carritos')) || {};
    carritos[idPersona] = carrito;
    localStorage.setItem('carritos', JSON.stringify(carritos));
}

function obtenerCarritoDeLS(idPersona) {
    let carritos = JSON.parse(localStorage.getItem('carritos')) || {};
    let carrito = carritos[idPersona];
    // Si no es un array, devuelve un array vacío
    return Array.isArray(carrito) ? carrito : [];
}

function mostrarCarrito(carrito) {
    let compra = document.querySelector('.carrito');
    if (!compra) return; // Si no existe, no hace nada
    
    compra.innerHTML = ""
    carrito.forEach(evento => {
        compra.innerHTML += `
        <li>
            <p>Evento: ${evento.tipo}</p>
            <p>Precio: $${evento.precio}</p>
            <button class="eliminarCheckout">Eliminar</button>
        </li>`
    });
}

let personas = [
    { id: 0, nombre: "Benjamín", eventos: []},
    { id: 1, nombre: "Felipe", eventos: []},
    { id: 2, nombre: "Carlos", eventos: []},
];

document.getElementById('seleccionarPersona').addEventListener('change', function() {
    let idPersona = this.value;
    let carrito = obtenerCarritoDeLS(idPersona);
    mostrarCarrito(carrito)
})