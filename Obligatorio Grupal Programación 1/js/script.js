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
    // Obtener los eventos y carritos almacenados de localStorage
    let eventosAlmacenados = obtenerEventosDeLocalStorage();
    let idPersona = this.document.getElementById('seleccionarPersona').value;
    let carritosAlmacenados = obtenerCarritoDeLS(idPersona);
    // Cargar los eventos en la página
    eventosAlmacenados.length > 0 ? cargarEventos(eventosAlmacenados) : cargarEventos(eventos);
    mostrarCarrito(carritosAlmacenados);
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

document.querySelector('.container').addEventListener('click', function(e) {
    if (e.target.classList.contains('comprar')) {
        // Buscar la carta del evento a añadir al carrito
        let carta = e.target.closest('.cartaEvento');
        let tipo = carta.querySelector('.tipo').textContent;
        let precio = carta.querySelector('.importe').textContent.replace('$', '');

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
    
    
    compra.innerHTML = "";
    let totalCompra = 0;
    carrito.forEach(evento => {
        compra.innerHTML += `
        <li>
            <div class='detalles'>
                <p>Evento: ${evento.tipo}</p>
                <p>Precio: $${evento.precio}</p>
            </div>
            <button class="eliminarCheckout">Eliminar</button>
        </li>`
        totalCompra += evento.precio;
    });

    // Mostrar el total en el elemento con id="total" y aplicar un descuento si se compran mas de dos espectáculos
    if (carrito.length > 2) {
        document.getElementById('total').textContent = `Total: $${totalCompra * 0.90}`;
    } else {
        document.getElementById('total').textContent = `Total: $${totalCompra}`;
    };
}

document.querySelector('.carrito').addEventListener('click', function(e) {
    if (e.target.classList.contains('eliminarCheckout')) {
        // Encontrar el indice del <li> clickeado
        const li = e.target.closest('li');
        const lis = Array.from(document.querySelectorAll('.carrito li'));
        const index = lis.indexOf(li);

        // Obtener el id de la persona seleccionada
        let idPersona = document.getElementById('seleccionarPersona').value;
        let carrito = obtenerCarritoDeLS(idPersona);

        // Eliminar el evento del carrito
        carrito.splice(index, 1);

        // Guardar en LS y mostrar el carrito actualizado
        guardarCarritoEnLS(idPersona, carrito);
        mostrarCarrito(carrito);
    }
});

// Limpiar el carrito de la persona al hacer click en finalizar compra
document.querySelector('.checkout').addEventListener('click', function() {
    let idPersona = document.getElementById('seleccionarPersona').value;
    let carrito = obtenerCarritoDeLS(idPersona);

    if (carrito.length > 0) {
        let confirmCheckout = confirm('¿Está seguro de que desea continuar con el pago?');
        if(confirmCheckout) {
            let carritos = JSON.parse(localStorage.getItem('carritos')) || {};
            carritos[idPersona] = [];
            localStorage.setItem('carritos', JSON.stringify(carritos));
            mostrarCarrito([]);
            alert('Compra realizada exitosamente');
        }
    } else {
        alert('No tiene artículos en el carrito para comprar');
    };
});

// Mostrar el nombre de la persona en el título del carrito
function actualizarNombrePersona() {
    const select = document.getElementById('seleccionarPersona');
    const nombre = select.options[select.selectedIndex].textContent;
    document.getElementById('nombrePersona').textContent = nombre;
};

window.addEventListener('load', actualizarNombrePersona);
document.getElementById('seleccionarPersona').addEventListener('change', function() {
    actualizarNombrePersona();
    let idPersona = this.value;
    let carrito = obtenerCarritoDeLS(idPersona);
    mostrarCarrito(carrito);
});