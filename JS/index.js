const menu= document.querySelector(".buttonJS")
const menuList=document.querySelector(".perro")
console.log(menu);
console.log(menuList);

menu.addEventListener('click' , function() {
    menuList.classList.toggle('d-none')        
})