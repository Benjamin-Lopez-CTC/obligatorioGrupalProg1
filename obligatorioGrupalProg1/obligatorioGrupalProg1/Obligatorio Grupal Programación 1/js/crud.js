function guardarEventosEnLocalStorage(eventos) {
    localStorage.setItem("eventos", JSON.stringify(eventos));
}

// Al cargar la página
window.addEventListener('load', function() {
    // Obtener los eventos almacenados de localStorage
    let eventosAlmacenados = obtenerEventosDeLocalStorage();
    // Cargar los eventos en la página
    eventosAlmacenados.length > 0 ? cargarEventos(eventosAlmacenados) : cargarEventos(eventos);
});

document.querySelector("#evento-form").addEventListener("submit", (e) => {
    e.preventDefault();
    // Obtener los valores del form
    let imagen = document.querySelector("#imagen").value; 
    let tipo = document.querySelector("#tipo").value; 
    let categoria = document.querySelector("#categoria").value; 
    let precio = document.querySelector("#precio").value; 
    // Validaciones simples
    if (imagen == "" || tipo == "" || precio == "" || categoria == "") {
        alert("Por favor llene todos los campos");
    } else {
        let eventosStorage = obtenerEventosDeLocalStorage();
        
        let cantidad = eventosStorage.length > 0 ? eventosStorage.length : eventos.length;
        // Crear un nuevo objeto evento
        let evento = {
            imagen: "./images/" + imagen.slice(12),
            codigo: cantidad + 1,
            tipo: tipo,
            categoria: categoria,
            precio: parseInt(precio)
        };
        // Agregar el nuevo evento al array

        if (eventosStorage.length <= 0) {
            eventos.push(evento);
            guardarEventosEnLocalStorage(eventos);
            cargarEventos(eventos);
        } else {
            eventosStorage.push(evento);
            guardarEventosEnLocalStorage(eventosStorage);
            cargarEventos(eventosStorage);
        }
        alert("Alta dada correctamente");
        document.querySelector("#imagen").value = ""; 
        document.querySelector("#tipo").value = ""; 
        document.querySelector("#categoria").value = "";
        document.querySelector("#precio").value = "";
    }
});

function obtenerEventosDeLocalStorage() {
    let eventosString = localStorage.getItem("eventos");
    return eventosString ? JSON.parse(eventosString) : [];
}

let mostrarEventos = document.querySelector(".mostrarEventos");

function cargarEventos(eventos) {
    mostrarEventos.innerHTML = "";
    eventos.forEach(evento => {
        mostrarEventos.innerHTML += mostrarEvento(evento);
    });
}

function mostrarEvento(evento) {
    return `<div class="cartaEvento">
            <div class="imgEvento"><img class="imgSize" src='../${evento.imagen}'></div>
            <p class="categoria">${evento.categoria}</p>
            <div class="eventoTexto">
            <p class="tipo">${evento.tipo}</p>
            <p class="importe">$ ${evento.precio}</p>
            <button class="comprar" id="${evento.codigo}">Comprar</button>
            <button onclick="eliminarEvento(${evento.codigo})">Eliminar</button>
            </div>`;
}

function eliminarEvento(codigo) {
    let confirmar = confirm("¿Seguro que querés eliminar este evento?");
    if (confirmar) {
        
        let eventosLS = obtenerEventosDeLocalStorage();
        let indice = eventosLS.findIndex((evento) => Number(evento.codigo) === Number(codigo));
        if (indice !== -1) {
            eventosLS.splice(indice, 1);
            guardarEventosEnLocalStorage(eventosLS);
            cargarEventos(eventosLS);
            alert("Evento eliminado correctamente");
        }
    }
}



//
document.addEventListener("DOMContentLoaded", () => {
  cargarEventos(obtenerEventosDeLocalStorage());
});
