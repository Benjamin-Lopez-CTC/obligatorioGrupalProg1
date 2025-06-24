let container = document.querySelector(".container");

function obtenerEventosDeLocalStorage() {
    let eventosString = localStorage.getItem('eventos');
    return eventosString ? JSON.parse(eventosString) : [];
}

let eventosLS = obtenerEventosDeLocalStorage();
container.innerHTML = tablaEventos(eventosLS);

function tablaEventos(eventos) {
    let tabla = '';

    tabla += '<table class="tabla">';
    tabla += '<tr>';
    tabla += '<th>Evento</th>';
    tabla += '<th>Precio</th>';
    tabla += '<th>Cantidad vendida</th>';
    tabla += '<th>Total de ingresos</th>';
    tabla += '</tr>';

    eventos.forEach(evento => {
        tabla += '<tr>';
        tabla += '<td>' + evento.tipo + '</td>';
        tabla += '<td>' + evento.precio + '</td>';
        tabla += '<td>' + evento.cantidadVendida + '</td>';
        tabla += '<td>' + (evento.cantidadVendida * evento.precio) + '</td>';
    });

    tabla += '</table>';

    return tabla;
}