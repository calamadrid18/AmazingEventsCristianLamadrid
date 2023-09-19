import { imprimirCheckBox, imprimirSelect, imprimirCards, filtrosCruzados, filtroFechaUpcoming, search } from "../modules/function.js";

const URL_API = 'https://mindhub-xj03.onrender.com/api/amazing';

const contenedorChecks = document.getElementById("contenedorChecks");
const select = document.getElementById("selects");
const contenedoresCards = document.getElementById("contenedoresCards");
const searchDiv = document.querySelector(".name");

fetch(URL_API)
  .then(response => response.json())
  .then(data => {
    const events = data.events;
    const currentDate = data.currentDate;
    const arrayNombreEvents = events.map(objetoEvents => objetoEvents.name);
    let upComingEvents = filtroFechaUpcoming(events, currentDate);
    console.log(upComingEvents);
    imprimirCards(upComingEvents, contenedoresCards);

    let listaCategorias = new Set(upComingEvents.map(objetoEvents => objetoEvents.category));
    imprimirCheckBox(contenedorChecks, Array.from(listaCategorias));

    contenedorChecks.addEventListener("change", () => {
      const selectedCategories = obtenerCategoriasSeleccionadas();
      const eventosFiltrados = filtradoPorCheckUpcoming(upComingEvents, selectedCategories);
      imprimirCards(eventosFiltrados, contenedoresCards);
    });

    select.addEventListener("change", () => {
      const selectedValue = select.value;
      const returnCruzados = filtrosCruzados(upComingEvents, selectedValue);
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

// Función para filtrar eventos futuros en función de las categorías seleccionadas
function filtradoPorCheckUpcoming(upComingEvents, selectedCategories) {
  if (!selectedCategories || selectedCategories.length === 0) {
    // Si no se seleccionan categorías, devolver todos los eventos futuros
    return upComingEvents;
  } else {
    // Filtrar eventos futuros en función de las categorías seleccionadas
    return upComingEvents.filter(evento => selectedCategories.includes(evento.category));
  }
}