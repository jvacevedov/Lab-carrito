let cantidadDeItems=0;
let totalAcumulado=0;
let listBtnAgregar = document.querySelectorAll('.btn-agregar');
console.log(listBtnAgregar)
let btnClearCart = document.getElementById("btn-vaciar")
console.log(btnClearCart)

listBtnAgregar.forEach(element => {
    element.addEventListener("click",leerProducto)
});

btnClearCart.addEventListener("click", removeItems);

function leerProducto(){
    let producto =this.dataset.nombre
    let precio=this.dataset.precio
    agregarAlCarrito(producto,precio)
}

function updateBadge(){
    let totalProductos = document.getElementById("badge");
    totalProductos.textContent=cantidadDeItems;
}

function updateTotal(){
    let totalProductos = document.getElementById("total");
    totalProductos.textContent="$"+totalAcumulado.toLocaleString('es-CO');

    let textcondicionalTotal = document.getElementById("condicionalTotal")
    if (cantidadDeItems !== 0){
        textcondicionalTotal.classList.add("d-none");
    } else {
        textcondicionalTotal.classList.remove("d-none");
    }
}

function agregarAlCarrito(producto,precio){
    console.log(producto,precio);
    precio=Number(precio);
    cantidadDeItems=cantidadDeItems+1;
    totalAcumulado=totalAcumulado+precio; 
    updateBadge();
    updateTotal();

    let contenedorProductoAgregado=document.createElement("div");
    contenedorProductoAgregado.classList.add("row", "border", "rounded", "align-items-center","product-card");
    
    let columnaNombre=document.createElement("div");
    columnaNombre.classList.add("col-6");
    
    let textoColumnaNombre=document.createElement("p");
    textoColumnaNombre.textContent=producto
    textoColumnaNombre.classList.add("text-center", "mb-0");

    let columnaPrecio=document.createElement("div");
    columnaPrecio.classList.add("col-4");

    let textoColumnaPrecio=document.createElement("p");
    textoColumnaPrecio.textContent = "$ " + precio.toLocaleString('es-CO');
    textoColumnaPrecio.classList.add("text-center", "mb-0");

    let columnaBtnBorrar=document.createElement("div");
    columnaBtnBorrar.classList.add("col-2", "d-flex", "justify-content-end")

    let btnEliminar = document.createElement("button")
    btnEliminar.innerHTML='<i class="fa-solid fa-trash-can"></i>';
    btnEliminar.classList.add("btn", "btn-eliminar", "btn-danger");
    
    
    contenedorProductoAgregado.appendChild(columnaNombre);
    columnaNombre.appendChild(textoColumnaNombre);

    contenedorProductoAgregado.appendChild(columnaPrecio);
    columnaPrecio.appendChild(textoColumnaPrecio);

    contenedorProductoAgregado.appendChild(columnaBtnBorrar);
    columnaBtnBorrar.appendChild(btnEliminar);

    document.getElementById("lista-carrito-div").appendChild(contenedorProductoAgregado);

    contenedorProductoAgregado.querySelector('.btn-eliminar')
        .addEventListener('click', () => {
            eliminarItem(contenedorProductoAgregado, precio);
        });

    // let productoAgregado = document.createElement("li");
    // let texto = document.createElement("span");
    // texto.textContent = producto + " $" + precio;
    // productoAgregado.classList.add("list-group-item","li-product");
    // productoAgregado.appendChild(texto);
    // document.getElementById("lista-carrito").appendChild(productoAgregado);

    // let btnEliminar = document.createElement("button")
    // btnEliminar.innerHTML='<i class="fa-solid fa-trash-can"></i>';
    // btnEliminar.classList.add("btn", "btn-eliminar", "btn-danger");
    // productoAgregado.appendChild(btnEliminar);
    // productoAgregado.querySelector('.btn-eliminar')
    //     .addEventListener('click', () => {
    //         eliminarItem(productoAgregado, precio);
    //     });  
}

function eliminarItem(div, precio) {
    cantidadDeItems=cantidadDeItems-1;
    totalAcumulado=totalAcumulado-precio; 
    div.remove();
    updateBadge();
    updateTotal(); 
}

function removeItems(){
    let listProductsInCar = document.querySelectorAll('.product-card');
    console.log(listProductsInCar)
    listProductsInCar.forEach(element=>{
        element.remove();
    });
    cantidadDeItems=0;
    totalAcumulado=0;
    updateBadge();
    updateTotal();
}