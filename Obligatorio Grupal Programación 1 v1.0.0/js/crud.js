import { Evento } from "./claseEventos.js";
import { eventos } from "./eventos.js";

let codigoEventoAEditar = null;

function guardarEventosEnLocalStorage(eventos) {
    localStorage.setItem("eventos", JSON.stringify(eventos));
}

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
    } else if (isNaN(Number(precio)) || Number(precio) < 1) {
        alert("El precio ingresado no es un numero o es un numero negativo, intente nuevamente");
    } else {
        let eventosStorage = obtenerEventosDeLocalStorage();
        let cantidad = eventosStorage.length > 0 ? eventosStorage.length : eventos.length;
        // Crear un nuevo objeto evento
        let evento = new Evento(
            "./images/" + imagen.slice(12),
            cantidad + 1,
            tipo,
            categoria,
            parseInt(precio),
            0
        );
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
        // Luego de dar el alta limpia los campos
        document.querySelector("#imagen").value = ""; 
        document.querySelector("#tipo").value = ""; 
        document.querySelector("#categoria").value = "";
        document.querySelector("#precio").value = "";
    };
});

document.querySelector('#editarEvento').addEventListener('submit', (e) => {
    e.preventDefault();
    // Obtener los nuevos datos del form
    let nuevaImagen = document.querySelector('#editarImagen').value;
    let nuevoTipo = document.querySelector('#editarNombre').value;
    let nuevaCategoria = document.querySelector('#editarCategoria').value;
    let nuevoPrecio = document.querySelector('#editarPrecio').value;
    // Validación
    if (nuevaImagen == "" || nuevoTipo == "" || nuevaCategoria == "" || nuevoPrecio == "") {
        alert("Por favor llene todos los campos");
    } else {
        let eventosStorage = obtenerEventosDeLocalStorage();
        // Encontrar el evento que llamó a la función modificarEvento a través del codigo del mismo
        let evento = eventosStorage.find(e => Number(e.codigo) === Number(codigoEventoAEditar));
        if (evento) {
            evento.tipo = nuevoTipo;
            evento.categoria = nuevaCategoria;
            evento.precio = parseInt(nuevoPrecio);
            evento.imagen = "./images/" + nuevaImagen.slice(12);
            
            // Guardar la lista de eventos modificada en localStorage para despues cargarla al mismo tiempo
            guardarEventosEnLocalStorage(eventosStorage);
            cargarEventos(eventosStorage);
            document.getElementById('popup').style.display = 'none';
            alert('Evento modificado correctamente');
        }
    }
})

document.querySelector('.cancelar').addEventListener('click', function() {
    document.getElementById('popup').style.display = 'none';
    document.querySelector('#editarNombre').value = '';
    document.querySelector('#editarCategoria').value = '';
    document.querySelector('#editarPrecio').value = '';
    document.querySelector('#editarImagen').value = '';
})

function modificarEvento(codigo) {
    codigoEventoAEditar = codigo;
    // Obtener los eventos de localStorage
    let eventosStorage = obtenerEventosDeLocalStorage();
    // Encontrar el evento con el mismo indice que el ingresado en la función
    let evento = eventosStorage.find(e => Number(e.codigo) === Number(codigo));
    // Si encuentra dicho evento
    if (evento) {
        // Ingresarle al formulario del popup los datos existentes del evento
        document.querySelector('#editarNombre').value = evento.tipo;
        document.querySelector('#editarCategoria').value = evento.categoria;
        document.querySelector('#editarPrecio').value = evento.precio;
        // No se necesita ingresar la imagen
        document.getElementById('popup').style.display = 'block';
    }
}
// Hacer global la función
window.modificarEvento = modificarEvento;

function obtenerEventosDeLocalStorage() {
    let eventosString = localStorage.getItem("eventos");
    return eventosString ? JSON.parse(eventosString) : [];
}

let mostrarEventos = document.querySelector(".mostrarEventos");

function cargarEventos(eventos) {
    //Se limpia el div
    mostrarEventos.innerHTML = '';
    //Por cada evento se le agrega al div los elementos que crea la funcion mostrarEventos
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
            <button onclick="modificarEvento(${evento.codigo})" class="modificar" >Modificar</button>
            <button onclick="eliminarEvento(${evento.codigo})" class="eliminar">Eliminar</button>
            </div>`;
}

function eliminarEvento(codigo) {
    let confirmar = confirm("¿Seguro que querés eliminar este evento?");
    //Si el usuario selecciona la opcion aceptar
    if (confirmar) {
        
        //Se guardan los eventos del LS en una variable
        let eventosLS = obtenerEventosDeLocalStorage();
        //Se busca en el LS el evento que tenga el mismo codigo que el del evento seleccionado para eliminar
        let indice = eventosLS.findIndex((evento) => Number(evento.codigo) === Number(codigo));
        //Si se encuentra un evento
        if (indice !== -1) {
            //Se elimina del LS
            eventosLS.splice(indice, 1);
            //Se guarda en el LS los eventos despues de eliminar uno
            guardarEventosEnLocalStorage(eventosLS);
            //Muestra los eventos actualizados
            cargarEventos(eventosLS);
            alert("Evento eliminado correctamente");
        }
    }
}

// Esto permite que la función eliminarEvento() funcione al ser llamada desde la card en HTML
window.eliminarEvento = eliminarEvento;

document.addEventListener("DOMContentLoaded", () => {
    cargarEventos(obtenerEventosDeLocalStorage());
});