//import { maxAsistencia, minAsistencia, maxCapacidad, filtroFechaUpcoming, segundaTabla, filtroFechaPast, tercerTabla } from "../modules/function";
import { maxAsistencia, minAsistencia, maxCapacidad, filtroFechaUpcoming, segundaTabla, tercerTabla,filtroFechaPastEvents} from "../modules/function.js";
const URL_API = 'https://mindhub-xj03.onrender.com/api/amazing';

let $mayorPorcentaje = document.getElementById('mayorPje');
let $minimoPorcentaje = document.getElementById('minimoPje');
let $maxCapacidad = document.getElementById('maxCapacidad');
let $segundaTabla = document.getElementById('segundaTabla');
let $tercerTabla = document.getElementById('tercerTabla');
console.log("hola");

fetch ( URL_API )
    .then(response => response.json()).then(data=>{
        let currentDate = data.currentDate;
        let events= data.events;
        let eventosUpcoming=filtroFechaUpcoming(events,currentDate)
        let pastEvents=filtroFechaPastEvents(events,currentDate)
        let listaCategoriasUpComing = [...new Set(eventosUpcoming.map( tarjeta => tarjeta.category ))];
        let listaCategoriasPastEvents=[...new Set(pastEvents.map( tarjeta => tarjeta.category ))];
        $mayorPorcentaje.innerHTML = maxAsistencia(events);
        $minimoPorcentaje.innerHTML = minAsistencia(events);
        $maxCapacidad.innerHTML = maxCapacidad(events);
        $segundaTabla.innerHTML=segundaTabla(listaCategoriasUpComing,eventosUpcoming)
        $tercerTabla.innerHTML=tercerTabla(listaCategoriasPastEvents,pastEvents)       
    })

    /*.catch( err => console.log(err)) $mayorPorcentaje.innerHTML = maxAsistencia(events);
    $minimoPorcentaje.innerHTML = minAsistencia(events);
    $maxCapacidad.innerHTML = maxCapacidad(events);
    let listaCategorias = [...new Set(events.map( tarjeta => tarjeta.category ))];
    let eventosUpcoming = filtroFechaUpcoming(events, currentDate);
    $segundaTabla.innerHTML = segundaTabla(listaCategorias, eventosUpcoming);
    console.log(segundaTabla(listaCategorias, eventosUpcoming))
    let eventosPast = filtroFechaPast(events, currentDate);
    $tercerTabla.innerHTML = tercerTabla(listaCategorias, eventosPast);*/