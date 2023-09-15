


/*---------------------------- CrearEstructuraCheckbox------------------------------------*/

export function crearEstructuraCheck(string) {
    return `
    <label>
         <input type="checkbox" name="category" value="${string}">${string} 
    </label>
    `;
  }

/*---------------------------- imprimirCheckbox------------------------------------*/

export function imprimirCheckBox(referenciaHTML, arrayString) {
    let estructura = "";
    for (const stringEvents of arrayString) {
      estructura += crearEstructuraCheck(stringEvents);
    }
  
    referenciaHTML.innerHTML = estructura;
  }
  



/*---------------------------- crearEstructuraSelect ------------------------------------*/
export function crearEstructuraSelect(string) {
    return `<option value="${string}">${string}</option>`;
  }

/*----------------------------  imprimirSelect ------------------------------------*/
export function imprimirSelect(array, refernciaHTML) {
    let estructura = "";
    for (let stringNombre of array) {
      estructura += crearEstructuraSelect(stringNombre);
    }
    refernciaHTML.innerHTML = estructura;
  }
  
  

/*----------------------------  crearCards ------------------------------------*/
export function crearEstructuraCards(objeto) {
    return `<div class="col-lg-3 col-md-4 col-sm-12 pb-3 pt-3 d-block tarjeta">
    <div class="card" style="width: 18rem;">
    <img src="${objeto.image}" class="card-img-top custom-card-img" alt="food">
    <div class="card-body">
        <h5 class="card-title">${objeto.name}</h5>
        <div style="height: 80px;">
        <p class="card-text">${objeto.description}</p>
        </div>
        <div class="d-flex justify-content-between">
        <h5>Price: ${objeto.price}</h5>
        <a href="./detail.html?parameter=${objeto._id}">Details</a>
        </div>
    </div>
    </div>
  </div>
    `;
  }

/*----------------------------  imprimirCards ------------------------------------*/
export function imprimirCards(array, refernciaHTML) {
    let estructura = "";
    for (const objetoT of array) {
      estructura += crearEstructuraCards(objetoT);
     
    }
    refernciaHTML.innerHTML = estructura;
  }
  
export function imprimirCardsPast (pastEvents, refernciaHTML){
  let estructura = "";
  for (const objetoT of pastEvents) {
    estructura += crearEstructuraCards(objetoT);
    console.log(estructura);
  }
  refernciaHTML.innerHTML = estructura;
}

/*----------------------------  FiltroCheck ------------------------------------*/
export function filtradoPorCheck(array) {
    const checkboxes = document.querySelectorAll(
      "input[name='category']:checked"
    );
    const checkedValues = Array.from(checkboxes).map(
      (checkbox) => checkbox.value
    );
    const objetosFiltradosCheck = array.filter((objeto) =>
      checkedValues.includes(objeto.category)
    );
    console.log(objetosFiltradosCheck);
    return objetosFiltradosCheck;
  }



/*----------------------------FiltroSelect---------------------------------*/
export function filtradosPorSelect(array, selectOption) {
    const arrayFiltradosPorSelect = array.filter((objeto) =>
      objeto.name.includes(selectOption)
    );
    return arrayFiltradosPorSelect;
  }

/*-----------------------------Filtro Cruzado------------------------------*/
export function filtrosCruzados(array, selectOption) {
    let filteredArray;
    console.log(filteredArray)
    if (selectOption) {
      filteredArray = filtradosPorSelect(array, selectOption);
    } else {
      filteredArray = filtradoPorCheck(array);
    }
    return filteredArray;
  }

/*------------------------------Tarjeta Detalles ---------------------------*/
export function detalles(objeto, fecha){
    let propiedad = objeto.date >= fecha ? "estimate" : "assistance"
    return `<div class="col-lg-3 col-md-4 col-sm-12 pb-3 pt-3" tarjeta d-none>
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
  </div>`
}


/*--------------------------------PRIMERA-TABLA-- -----------------------------*/
export function maxAsistencia(eventos){
    let porcentMayor = 1; 
    let eventoMayor; 
    eventos.forEach( evento => {
        let calculo = (evento.assistance*100)/evento.capacity
        if(calculo > porcentMayor){
            porcentMayor = calculo;
            eventoMayor = evento;
        }
    });
    return `${eventoMayor.name} ${porcentMayor.toFixed(1)}%`;
}

export function minAsistencia(eventos){
    let porcentMenor = 100;
    let eventoMenor;
    eventos.forEach( evento => {
        let calculo = (evento.assistance*100)/evento.capacity
        if(calculo < porcentMenor){
            porcentMenor = calculo;
            eventoMenor = evento;
        }
    });
    return `${eventoMenor.name} ${porcentMenor.toFixed(1)}%`;
}

export function maxCapacidad(eventos){
    let maxCapacidad = 1;
    let eventoMaxCapacidad;
    eventos.forEach( evento => {
        if(evento.capacity > maxCapacidad){
            maxCapacidad = evento.capacity;
            eventoMaxCapacidad = evento;
        }
    });
    return `${eventoMaxCapacidad.name} ${maxCapacidad}`;
};

/*--------------------------------SEGUNDA-TABLA-- -----------------------------*/
export function segundaTabla(categorias, eventos){
    let tabla = `
        <tr>
            <td>Categories</td>
            <td>Revenues</td>
            <td>Percentage of assistance</td>
        </tr>`;
    categorias.forEach(categoria => {
        let eventoPorCat = eventos.filter(evento => evento.category == categoria)
        let ganancia = 0;
        let porcentaje = 0;
        eventoPorCat.forEach(e => {
                ganancia += (e.estimate * e.price)
                porcentaje += (e.estimate * 100 / e.capacity)/(eventoPorCat.length)
        })
        tabla += `
        <tr>
            <td>${categoria}</td>
            <td>$${ganancia.toLocaleString()}</td>
            <td>${porcentaje.toFixed(2)}%</td>
        </tr>`
    });
    return tabla;
}

/*--------------------------------TERCERA-TABLA-- -----------------------------*/
export function tercerTabla(categorias, eventos){
  console.log(eventos);
    let tabla = `
        <tr>
            <td>Categories</td>
            <td>Revenues</td>
            <td>Percentage of assistance</td>
        </tr>`;
    //
    categorias.forEach(categoria => {
        let eventoPorCat = eventos.filter(evento => evento.category == categoria)
        let ganancia = 0;
        let porcentaje = 0;
        eventoPorCat.forEach(e => {

            ganancia += (e.assistance * e.price)
            porcentaje += (e.assistance * 100 / e.capacity)/(eventoPorCat.length)
        })
        tabla += `
        <tr>
            <td>${categoria}</td>
            <td>$${ganancia.toLocaleString()}</td>
            <td>${porcentaje.toFixed(2)}%</td>
        </tr>`
    });
    return tabla;
}

export function filtroFechaUpcoming(events, currentDate){
let upConmingEvents= events.filter(evento => evento.date>currentDate);
return upConmingEvents;
}
/*------------------------------------------*/
export function filtroFechaPastEvents(events, currentDate){

  let pastEvents= events.filter(evento => evento.date<currentDate);
  
  return pastEvents;
  }
/*------------------------------------------*/
export function search(searchValue, impEvents) {
  console.log(searchValue);
  for (let i = 0; i < impEvents.length; i++) {
    let valor = (impEvents[i].textContent).toLowerCase();
    if (!valor.includes(searchValue)) {
      impEvents[i].classList.add("d-none")
    }else{
      impEvents[i].classList.remove("d-none")
    };
  }
  
 
  
}
   