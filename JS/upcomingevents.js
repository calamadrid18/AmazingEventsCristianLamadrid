import { imprimirCheckBox, imprimirSelect, imprimirCards,  filtrosCruzados, filtroFechaUpcoming, search} from "../modules/function.js";

const URL_API = 'https://mindhub-xj03.onrender.com/api/amazing';

const contenedorChecks = document.getElementById("contenedorChecks");
const select = document.getElementById("selects");
const contenedoresCards = document.getElementById("contenedoresCards");
const searchDiv = (document.querySelector(".name"));

fetch(URL_API)
  .then(response => response.json())
  .then(data => {
    const events = data.events;
    const currentDate= data.currentDate;
    const arrayNombreEvents = events.map(objetoEvents => objetoEvents.name);
    let upComingEvents=filtroFechaUpcoming(events,currentDate)
    console.log(upComingEvents);
    imprimirCards(upComingEvents, contenedoresCards);

    let listaCategorias = new Set(upComingEvents.map(objetoEvents => objetoEvents.category));
    imprimirCheckBox(contenedorChecks, Array.from(listaCategorias));

    contenedorChecks.addEventListener("change", () => {
      const returnCruzados = filtrosCruzados(upComingEvents, null);
      imprimirCards(returnCruzados, contenedoresCards);
    });

    select.addEventListener("change", () => {
      const selectedValue = select.value;
      const returnCruzados = filtrosCruzados(upComingEvents, selectedValue);
      imprimirCards(returnCruzados, contenedoresCards);
    });
  })
  .catch(err => console.log(err));

  searchDiv.addEventListener("keyup",()=>{
    let impEvents= document.querySelectorAll(".tarjeta")
    console.log(impEvents);
    let searchValue = searchDiv.value;
    search(searchValue,impEvents)
  })