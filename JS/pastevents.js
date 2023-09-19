import { imprimirCheckBox, imprimirSelect, imprimirCards,  filtrosCruzados, filtroFechaPastEvents, search } from "../modules/function.js";

const URL_API = 'https://mindhub-xj03.onrender.com/api/amazing';

const contenedorChecks = document.getElementById("contenedorChecks");
const select = document.getElementById("selects");
const contenedoresCards = document.getElementById("contenedoresCards");
const searchDiv = (document.querySelector(".name"));

fetch(URL_API)
  .then(response => response.json())
  .then(data => {
    const events = data.events;
    const currentDate = data.currentDate;

    // Filtra eventos del pasado
    const pastEvents = filtroFechaPastEvents(events, currentDate);

    imprimirCards(pastEvents, contenedoresCards);

    let listaCategorias = new Set(pastEvents.map(objetoEvents => objetoEvents.category));
    imprimirCheckBox(contenedorChecks, Array.from(listaCategorias));

    contenedorChecks.addEventListener("change", () => {
      const selectedCategories = obtenerCategoriasSeleccionadas();
      const eventosFiltrados = filtradoPorCheck(pastEvents, selectedCategories);
      imprimirCards(eventosFiltrados, contenedoresCards);
    });

    select.addEventListener("change", () => {
      const selectedValue = select.value;
      const returnCruzados = filtrosCruzados(pastEvents, selectedValue);
      imprimirCards(returnCruzados, contenedoresCards);
    });
  })
  .catch(err => console.log(err));

searchDiv.addEventListener("keyup", () => {
  let impEvents = document.querySelectorAll(".tarjeta");
  let searchValue = searchDiv.value;
  search(searchValue, impEvents);
});

// Función para obtener las categorías seleccionadas en las casillas de verificación
function obtenerCategoriasSeleccionadas() {
  const checkboxes = document.querySelectorAll("input[type=checkbox]:checked");
  const selectedCategories = Array.from(checkboxes).map(checkbox => checkbox.value);
  return selectedCategories;
}


function filtradoPorCheck(events, selectedCategories) {
  if (!selectedCategories || selectedCategories.length === 0) {
    // Si no se seleccionan categorías, devolver todos los eventos
    return events;
  } else {
    // Filtrar eventos en función de las categorías seleccionadas
    return events.filter((evento) => selectedCategories.includes(evento.category));
  }
}