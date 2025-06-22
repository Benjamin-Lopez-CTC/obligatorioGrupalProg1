import { Evento } from './claseEventos.js';

let carritoEventos = [];

export let eventos = [
    new Evento("./images/obra_1.png", 1, "Un Viaje En El Tiempo", "Eventos", 1500, 0),
    new Evento("./images/concierto_1.png", 2, "Wonder Matinée", "Conciertos", 1375, 0),
    new Evento("./images/obra_2.png", 3, "Las Chicas Solo Buscan Divertirse", "Eventos", 1750, 0),
    new Evento("./images/deporte_1.png", 4, "Cruz Azul vs América", "Deportes", 1750, 0),
    new Evento("./images/obra_3.png", 5, "Tarico On The Rotemberg", "Eventos", 1420, 0),
    new Evento("./images/obra_4.png", 6, "Los Mosqueteros Del Rey", "Eventos" , 1690, 0),
    new Evento("./images/concierto_2.png", 7, "Polenta", "Conciertos", 1220, 0),
    new Evento("./images/obra_5.png", 8, "Hermanos En Llamas", "Eventos", 1980, 0),
    new Evento("./images/obra_6.png", 9, "Eugenio & Culini", "Eventos", 1310, 0),
]

let evento = {
    codigo:0,
    tipo:"",
    categoria:"",
    precio:0,
};