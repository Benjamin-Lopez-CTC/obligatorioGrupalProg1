import { Evento } from './claseEventos.js';

let carritoEventos = [];

export let eventos = [
    new Evento("./images/obra_1.png", 1, "Un Viaje En El Tiempo", "Diego Ramos", "Eventos", "2025-08-27", 1500, 0),
    new Evento("./images/concierto_1.png", 2, "Wonder Matinée", "Wonder", "Conciertos", "2026-03-15", 1375, 0),
    new Evento("./images/obra_2.png", 3, "Las Chicas Solo Buscan Divertirse", "Aldo Funes", "Eventos", "2025-11-10", 1750, 0),
    new Evento("./images/deporte_1.png", 4, "Cruz Azul vs América", "Concacaf", "Deportes", "2026-07-05", 1750, 0),
    new Evento("./images/obra_3.png", 5, "Tarico On The Rotemberg", "Juan Jose Campanella", "Eventos", "2026-01-22", 1420, 0),
    new Evento("./images/obra_4.png", 6, "Los Mosqueteros Del Rey", "Manuel Gonzáles Gil", "Eventos" , "2025-12-18", 1690, 0),
    new Evento("./images/concierto_2.png", 7, "Polenta", "Hormiga", "Conciertos", "2026-09-09", 1220, 0),
    new Evento("./images/obra_5.png", 8, "Hermanos En Llamas", "Aldo Funes", "Eventos", "2025-10-03", 1980, 0),
    new Evento("./images/obra_6.png", 9, "Eugenio & Culini", "MDQ", "Eventos", "2026-05-27", 1310, 0),
]

let evento = {
    codigo:0,
    tipo:"",
    categoria:"",
    precio:0,
};