import { imprimirCheckBox, imprimirSelect, imprimirCards,  filtrosCruzados, search } from "../modules/function.js";

const URL_API = 'https://mindhub-xj03.onrender.com/api/amazing';

const contenedorChecks = document.getElementById("contenedorChecks");
const select = document.getElementById("selects");
const contenedoresCards = document.getElementById("contenedoresCards");
const searchDiv = (document.querySelector(".nina"));



console.log(searchDiv);

fetch(URL_API)
  .then(response => response.json())
  .then(data => {
    const events = data.events;
    const arrayNombreEvents = events.map(objetoEvents => objetoEvents.name);


    imprimirCards(events, contenedoresCards);

    let listaCategorias = new Set(events.map(objetoEvents => objetoEvents.category));
    imprimirCheckBox(contenedorChecks, Array.from(listaCategorias));

    contenedorChecks.addEventListener("change", () => {
      const returnCruzados = filtrosCruzados(events, null);
      imprimirCards(returnCruzados, contenedoresCards);
    });

    select.addEventListener("change", () => {
      const selectedValue = select.value;
      const returnCruzados = filtrosCruzados(events, selectedValue);
      imprimirCards(returnCruzados, contenedoresCards);
    })
    ;
    searchValue.addEventListener('click',(event)=>{

      console.log("hola");
      search(searchValue)
    })
    holA.addEventListener("click",(event)=>{
      console.log(event.target)
      console.log("aqui si es"+ event.target.value);
    })
   
  })
  .catch(err => console.log(err))

  searchDiv.addEventListener("keyup",()=>{
    let impEvents= document.querySelectorAll(".tarjeta")
    let searchValue = searchDiv.value;
    search(searchValue,impEvents)
  })