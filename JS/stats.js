import { maxAsistencia, minAsistencia, maxCapacidad, filtroFechaUpcoming, segundaTabla, filtroFechaPast, tercerTabla } from "../Modules/functions.js";

const URL_API = 'https://mindhub-xj03.onrender.com/api/amazing';

let $mayorPorcentaje = document.getElementById('mayorPje');
let $minimoPorcentaje = document.getElementById('minimoPje');
let $maxCapacidad = document.getElementById('maxCapacidad');
let $segundaTabla = document.getElementById('segundaTabla');
let $tercerTabla = document.getElementById('tercerTabla');

fetch ( URL_API )
    .then(response => response.json())
    .then( ({events, currentDate}) => {
        $mayorPorcentaje.innerHTML = maxAsistencia(events);
        $minimoPorcentaje.innerHTML = minAsistencia(events);
        $maxCapacidad.innerHTML = maxCapacidad(events);
        let listaCategorias = [...new Set(events.map( tarjeta => tarjeta.category ))];
        let eventosUpcoming = filtroFechaUpcoming(events, currentDate);
        $segundaTabla.innerHTML = segundaTabla(listaCategorias, eventosUpcoming);
        console.log(segundaTabla(listaCategorias, eventosUpcoming))
        let eventosPast = filtroFechaPast(events, currentDate);
        $tercerTabla.innerHTML = tercerTabla(listaCategorias, eventosPast);
    })
    .catch( err => console.log(err))