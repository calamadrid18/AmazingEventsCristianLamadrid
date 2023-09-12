const menu = document.querySelector(".buttonJS");
const menuList = document.querySelector(".perro");

menu.addEventListener("click", function () {
  menuList.classList.toggle("d-none");
});

const misTarjetas = document.querySelector(".misTarjetas");
const categoryCheckboxes = document.querySelectorAll('input[name="category"]');
const arrayCategoryCheckbox= Array.from(categoryCheckboxes);
console.log(arrayCategoryCheckbox);

let selectedCategory = "todos";


function handleCheckboxChange(event) {
  misTarjetas.innerHTML = "";
  const newCategory = event.target.value;
  selectedCategory = newCategory;
  let prueba = arrayCategoryCheckbox.filter(check => check.checked==true);
  

  for (let i = 0; i < data.events.length; i++) {
    const event = data.events[i];
    if (isChecked("todos") || isChecked(event.category)) {
      let nuevaEtiqueta = document.createElement("div");
      nuevaEtiqueta.innerHTML = `<div class="col-lg-3 col-md-4 col-sm-12 pb-3 pt-3">
            <div class="card" style="width: 18rem;">
            <img src="${event.image}" class="card-img-top custom-card-img" alt="food">
            <div class="card-body">
                <h5 class="card-title">${event.name}</h5>
                <div style="height: 80px;">
                <p class="card-text">${event.description}</p>
                </div>
                <div class="d-flex justify-content-between">
                <h5>Price: ${event.price}</h5>
                <a href="./detail.html">Details</a>
                </div>
            </div>
            </div>
        </div>`;
      misTarjetas.appendChild(nuevaEtiqueta);
    }
  }
  if (prueba<1) {
    let nuevaEtiqueta = document.createElement("div");
    nuevaEtiqueta.innerHTML="<div>no hay eventos seleccionados</div>"
    misTarjetas.appendChild(nuevaEtiqueta)
  }
}

for (const checkbox of categoryCheckboxes) {
  checkbox.addEventListener("change", handleCheckboxChange);
}

function isChecked(value) {
  const checkbox = document.querySelector(
    `input[name="category"][value="${value}"]`
  );
 
  return checkbox && checkbox.checked;
}

handleCheckboxChange({
  target: document.querySelector('input[name="category"][value="todos"]'),
});

const formularioBuscador = document.getElementById("formularioBuscador");
const buscadorInput = document.getElementById("buscadorInput");

function mostrarAlerta(buscador) {
  alert(`${buscador}`);
}

formularioBuscador.addEventListener("submit", function (e) {
  e.preventDefault();
  const buscador = buscadorInput.value.toLowerCase();
  mostrarAlerta(buscador);
});

