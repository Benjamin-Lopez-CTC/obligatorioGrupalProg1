let carritoEventos = [];

let eventos = [
    { imagen: "./images/obra_1.png", codigo: 1, tipo: "Un Viaje En El Tiempo", precio: 1500},
    { imagen: "./images/obra_2.png", codigo: 2, tipo: "Las Chicas Solo Buscan Divertirse", precio: 1750},
    { imagen: "./images/obra_3.png", codigo: 3, tipo: "Tarico On The Rotemberg", precio: 1420},
    { imagen: "./images/obra_4.png", codigo: 4, tipo: "Los Mosqueteros Del Rey", precio: 1690},
    { imagen: "./images/obra_5.png", codigo: 5, tipo: "Hermanos En Llamas", precio: 1980},
    { imagen: "./images/obra_6.png", codigo: 6, tipo: "Eugenio & Culini", precio: 1310},
];

let personas = [
    { id: 0, nombre: "Benjamín", eventos: []},
    { id: 1, nombre: "Felipe", eventos: []},
    { id: 2, nombre: "Carlos", eventos: []},
];

let evento = {
    codigo:0,
    tipo:"",
    precio:0,
};