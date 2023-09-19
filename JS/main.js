import {
  imprimirCheckBox,
  imprimirCards,
  filtrosCruzados,
  search,
} from "../modules/function.js";

const URL_API = "https://mindhub-xj03.onrender.com/api/amazing";

const contenedorChecks = document.getElementById("contenedorChecks");
const select = document.getElementById("selects");
const contenedoresCards = document.getElementById("contenedoresCards");
const searchInput = document.querySelector(".name");

let allEvents = []; // Declaración de la variable allEvents

fetch(URL_API)
  .then((response) => response.json())
  .then((data) => {
    allEvents = data.events; // Asignación de los eventos originales a allEvents
    console.log(allEvents);

    imprimirCards(allEvents, contenedoresCards);

    let listaCategorias = new Set(
      allEvents.map((objetoEvents) => objetoEvents.category)
    );
    imprimirCheckBox(contenedorChecks, Array.from(listaCategorias));

    contenedorChecks.addEventListener("change", () => {
      const checkboxes = document.querySelectorAll(
        "input[type=checkbox]:checked"
      );
      const selectedCategories = Array.from(checkboxes).map(
        (checkbox) => checkbox.value
      );
      let filteredEvents = [];

      if (selectedCategories.length === 0) {
        // Si no se selecciona ninguna categoría, mostrar todos los eventos originales
        filteredEvents = allEvents;
      } else {
        // Aplicar filtros individuales para cada categoría seleccionada
        selectedCategories.forEach((category) => {
          const filteredByCategory = allEvents.filter(
            (evento) => evento.category === category
          );
          filteredEvents = [...filteredEvents, ...filteredByCategory];
        });
      }

      imprimirCards(filteredEvents, contenedoresCards);
    });

    select.addEventListener("change", () => {
      actualizarResultadoDeBusqueda(); // Actualiza los resultados de búsqueda
    });

    searchInput.addEventListener("keyup", () => {
      actualizarResultadoDeBusqueda(); // Actualiza los resultados de búsqueda
    });
  })
  .catch((err) => console.log(err));

searchInput.addEventListener("keyup", () => {
  actualizarResultadoDeBusqueda(); // Actualiza los resultados de búsqueda
});

// Función para obtener las categorías seleccionadas en las casillas de verificación
function obtenerCategoriasSeleccionadas() {
  const checkboxes = document.querySelectorAll("input[type=checkbox]:checked");
  const selectedCategories = Array.from(checkboxes).map(
    (checkbox) => checkbox.value
  );
  return selectedCategories;
}

// Función para actualizar los resultados de búsqueda y mostrar las tarjetas correspondientes
function actualizarResultadoDeBusqueda() {
  const selectedCategories = obtenerCategoriasSeleccionadas();
  const searchValue = searchInput.value.toLowerCase().trim();

  // Filtrar eventos en función de categorías seleccionadas
  let filteredEvents = filtrosCruzados(allEvents, selectedCategories);

  if (searchValue !== "") {
    filteredEvents = filteredEvents.filter((evento) =>
      evento.name.toLowerCase().includes(searchValue)
    );
  }

  imprimirCards(filteredEvents, contenedoresCards);
}
