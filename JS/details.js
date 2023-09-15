import { detalles } from "../modules/function.js";

const URL_API = "https://mindhub-xj03.onrender.com/api/amazing";

let contenedorDetalle = document.getElementById("contenedorDetalle");

fetch(URL_API)
  .them((response) => response.json())
  .them(( {objeto, currentDate} ) => {
    let idEvents = new URLSearchParams(location.search).get("parametro");
    let events = objeto.find( e => e._id == idEvents);
    contenedorDetalle.innerHTML = detalles(objeto, currentDate)
  })
  .catch( err => console.log(err))



