const menu = document.querySelector(".buttonJS")
const menuList = document.querySelector(".perro")
console.log(menu);
console.log(menuList);

menu.addEventListener('click', function () {
    menuList.classList.toggle('d-none')
})



const misTarjetas = document.querySelector(".misTarjetas");
for (let i = 0; i < data.events.length; i++) {
    if (data.events[i].date<"2023-01-01"){
        let nuevaEtiqueta = document.createElement("div");
    nuevaEtiqueta.innerHTML = `<div class="col-lg-3 col-md-4 col-sm-12 pb-3 pt-3">
<div class="card" style="width: 18rem;">
    <img src="${data.events[i].image}" class="card-img-top custom-card-img" alt="food">
    <div class="card-body">
        <h5 class="card-title">${data.events[i].name}</h5>
        <div style="height: 80px;">
        <p class="card-text">${data.events[i].description}</p>
        </div>
        <div class="d-flex justify-content-between">
        <h5>Price: ${data.events[i].price}</h5>
        <a href="./detail.html">Details</a>
        </div>
    </div>
</div>
</div>`
misTarjetas.appendChild(nuevaEtiqueta)
    }
    
}