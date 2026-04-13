let cantidadDeItems=0;
let totalAcumulado=0;
let listBtnAgregar = document.querySelectorAll('.btn-agregar');
console.log(listBtnAgregar)

listBtnAgregar.forEach(element => {
    element.addEventListener("click",leerProducto)
});

function leerProducto(){
    let producto =this.dataset.nombre
    let precio=this.dataset.precio
    agregarAlCarrito(producto,precio)
}

function updateBadge(){
    cantidadDeItems=cantidadDeItems+1;
    let totalProductos = document.getElementById("badge");
    totalProductos.textContent=cantidadDeItems;
}

function updateTotal(precio){
    let totalProductos = document.getElementById("total");
    totalAcumulado=totalAcumulado+precio;
    totalProductos.textContent="$"+totalAcumulado.toLocaleString('es-CO');
}

function agregarAlCarrito(producto,precio){
    console.log(producto,precio);
    updateBadge();
    updateTotal(Number(precio));
    let productoAgregado = document.createElement("li");
    let texto = document.createElement("span");
    texto.textContent = producto + " $" + precio;
    productoAgregado.appendChild(texto)
    document.getElementById("lista-carrito").appendChild(productoAgregado);

    let btnEliminar = document.createElement("button")
    btnEliminar.innerHTML='<i class="fa-solid fa-trash-can"></i>';
    btnEliminar.classList.add("btn", "btn-eliminar", "btn-danger");
    productoAgregado.appendChild(btnEliminar);
    productoAgregado.querySelector('.btn-eliminar')
        .addEventListener('click', () => {
            eliminarItem(productoAgregado, precio);
        });
}

function eliminarItem(li, precio) {
    li.remove();
    cantidadDeItems = cantidadDeItems - 1;
    updateBadge();
    updateTotal(-Number(precio));
 
}