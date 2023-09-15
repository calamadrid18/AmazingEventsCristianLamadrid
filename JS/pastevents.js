import { imprimirCheckBox, imprimirSelect, imprimirCards,  filtrosCruzados, filtroFechaPastEvents, search} from "../modules/function.js";

const URL_API = 'https://mindhub-xj03.onrender.com/api/amazing';


const contenedorChecks = document.getElementById("contenedorChecks");
const select = document.getElementById("selects");
const contenedoresCards = document.getElementById("contenedoresCards");
const searchDiv = (document.querySelector(".nina"));

fetch(URL_API)
  .then(response => response.json())
  .then(data => {
    const events = data.events;
    const currentDate= data.currentDate;
    const arrayNombreEvents = events.map(objetoEvents => objetoEvents.name);
    let pastEvents=filtroFechaPastEvents(events,currentDate)
    imprimirCards(pastEvents, contenedoresCards);

    let listaCategorias = new Set(pastEvents.map(objetoEvents => objetoEvents.category));
    imprimirCheckBox(contenedorChecks, Array.from(listaCategorias));

    contenedorChecks.addEventListener("change", () => {
      const returnCruzados = filtrosCruzados(pastEvents, null);
      imprimirCards(returnCruzados, contenedoresCards);
    });

    select.addEventListener("change", () => {
      const selectedValue = select.value;
      const returnCruzados = filtrosCruzados(pastEvents, selectedValue);
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
