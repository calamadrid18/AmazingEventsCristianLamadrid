const contenedorChecks = document.getElementById("contenedorChecks");
const select = document.getElementById("selects");
const contenedoresCards = document.getElementById("contenedoresCards");
const arraycategoryRepetidos = data.events.map(
  (objetoEvents) => objetoEvents.category
);

const set = new Set(arraycategoryRepetidos);
const arrayCategory = Array.from(set);

function crearEstructuraCheck(string) {
  return `
  <label>
       <input type="checkbox" name="category" value="${string}">${string} 
  </label>
  `;
}

function imprimirCheckBox(referenciaHTML, arrayString) {
  let estructura = "";
  for (const stringEvents of arrayString) {
    estructura += crearEstructuraCheck(stringEvents);
  }

  referenciaHTML.innerHTML = estructura;
}
imprimirCheckBox(contenedorChecks, arrayCategory);

const arrayNombreEvents = data.events.map((objetoEvents) => objetoEvents.name);
function crearEstructuraSelect(string) {
  return `<option value="${string}">${string}</option>`;
}
function imprimirSelect(array, refernciaHTML) {
  let estructura = "";
  for (let stringNombre of array) {
    estructura += crearEstructuraSelect(stringNombre);
  }
  refernciaHTML.innerHTML = estructura;
}

imprimirSelect(arrayNombreEvents, select);

function crearEstructuraCards(objeto) {
  return `<div class="col-lg-3 col-md-4 col-sm-12 pb-3 pt-3">
  <div class="card" style="width: 18rem;">
  <img src="${objeto.image}" class="card-img-top custom-card-img" alt="food">
  <div class="card-body">
      <h5 class="card-title">${objeto.name}</h5>
      <div style="height: 80px;">
      <p class="card-text">${objeto.description}</p>
      </div>
      <div class="d-flex justify-content-between">
      <h5>Price: ${objeto.price}</h5>
      <a href="./detail.html">Details</a>
      </div>
  </div>
  </div>
</div>
  `;
}

function imprimirCards(array, refernciaHTML) {
  let estructura = "";
  for (const objeto of array) {
    estructura += crearEstructuraCards(objeto);
  }
  refernciaHTML.innerHTML = estructura;
}
imprimirCards(data.events, contenedoresCards);

contenedorChecks.addEventListener("change", () => {
  const returnCruzados = filtrosCruzados(data.events, null);
  imprimirCards(returnCruzados, contenedoresCards);
});

select.addEventListener("change", () => {
  const selectedValue = select.value;

  const returnCruzados = filtrosCruzados(data.events, selectedValue);
  imprimirCards(returnCruzados, contenedoresCards);
});

function filtradoPorCheck(array) {
  const checkboxes = document.querySelectorAll(
    "input[name='category']:checked"
  );
  const checkedValues = Array.from(checkboxes).map(
    (checkbox) => checkbox.value
  );
  const objetosFiltradosCheck = array.filter((objeto) =>
    checkedValues.includes(objeto.category)
  );

  return objetosFiltradosCheck;
}

function filtradosPorSelect(array, selectOption) {
  const arrayFiltradosPorSelect = array.filter((objeto) =>
    objeto.name.includes(selectOption)
  );
  return arrayFiltradosPorSelect;
}

function filtrosCruzados(array, selectOption) {
  let filteredArray;
  if (selectOption) {
    filteredArray = filtradosPorSelect(array, selectOption);
  } else {
    filteredArray = filtradoPorCheck(array);
  }

  return filteredArray;
}