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
        } else {
            eventosStorage.push(evento);
            guardarEventosEnLocalStorage(eventosStorage);
        }
        alert("Alta dada correctamente");
    }
});

function obtenerEventosDeLocalStorage() {
    let eventosString = localStorage.getItem("eventos");
    return eventosString ? JSON.parse(eventosString) : [];
}
