import { detalles } from "../modules/function.js";
const URL_API = 'https://mindhub-xj03.onrender.com/api/amazing';

let contenedorDetalle = document.getElementById("contenedorDetalle");

fetch(URL_API)
  .then((response) => response.json())
  .then(( {events, currentDate} ) => {
    
    let idEvents = new URLSearchParams(location.search).get("parameter");
    console.log(idEvents);
    let event = events.find( e => e._id == idEvents);
    contenedorDetalle.innerHTML = detalles(event, currentDate)
  })
  .catch( err => console.log(err))



