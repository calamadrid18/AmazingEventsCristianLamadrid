function detalles(objeto, fecha){
    let propiedad = objeto.date >= fecha ? "estimate" : "assistance"
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
  </div>`
}


