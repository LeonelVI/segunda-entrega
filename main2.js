const productos = document.getElementById("productos");
const carritoTienda = document.getElementById("carrito");
const totalElement = document.getElementById("total");

const productosTienda = [
    { id: 1, imagen: "/img/Mate.jpg", titulo: "Mate imperial", precio: 35000, categoria: "Mates" },
    { id: 2, imagen: "/img/Mate2.jpg", titulo: "Mate imperial + bombilla", precio: 40000, categoria: "Mates" },
    { id: 3, imagen: "/img/termo stanley.jpg", titulo: "Termo 1lt Stanley", precio: 80000, categoria: "Termos" },
    { id: 4, imagen: "/img/Mate.jpg", titulo: "Termo 1lt acero inoxidable", precio: 45000, categoria: "Termos" },
    { id: 5, imagen: "/img/bombilla3.jpg", titulo: "Bombilla pico loro", precio: 15000, categoria: "Bombillas" },
    { id: 6, imagen: "/img/bombilla4.jpeg", titulo: "Bombilla alpaca", precio: 25000, categoria: "Bombillas" },
];

// Cargar carrito desde localStorage
const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

const renderProductos = () => {
    productos.innerHTML = "";
    productosTienda.forEach(el => {
        const card = `
        <div class="contenedor">
            <img src="${el.imagen}" alt="${el.titulo}">
            <h3 class="titulo-producto">${el.titulo}</h3>
            <p class="precio">$${el.precio}</p>
            <p class="categoria">${el.categoria}</p>
            <button class="btnAgregar" data-id="${el.id}">Agregar</button>
        </div>
        `;
        productos.innerHTML += card;
    });
};

const renderCarrito = () => {
    carritoTienda.innerHTML = "";
    let total = 0;
    carrito.forEach((el, index) => {
        carritoTienda.innerHTML += `
        <div class="producto-carrito">
            ${el.titulo} - $${el.precio} x ${el.cantidad}
            <button class="btnEliminar" data-index="${index}">Eliminar</button>
        </div>
        `;
        total += el.precio * el.cantidad;
    });
    totalElement.textContent = `Total: $${total}`;
    localStorage.setItem('carrito', JSON.stringify(carrito)); // Guardar en localStorage
};

const agregarAlCarrito = (id) => {
    const producto = productosTienda.find(p => p.id === id);
    if (producto) {
        const index = carrito.findIndex(p => p.id === id);
        if (index > -1) {
            carrito[index].cantidad += 1;
        } else {
            carrito.push({ ...producto, cantidad: 1 });
        }
        renderCarrito();
    }
};

const eliminarDelCarrito = (index) => {
    carrito.splice(index, 1);
    renderCarrito();
};

const vaciarCarrito = () => {
    carrito.length = 0; // Vaciar el array
    renderCarrito();
};

const finalizarCompra = () => {
    if (carrito.length === 0) {
        alert("El carrito está vacío. No puedes finalizar la compra.");
    } else {
        alert("¡Gracias por tu compra! Tu pedido ha sido recibido.");
        vaciarCarrito(); // Opcional: Vaciar el carrito después de finalizar la compra
    }
};

productos.addEventListener("click", (e) => {
    if (e.target.classList.contains("btnAgregar")) {
        const id = parseInt(e.target.getAttribute("data-id"));
        agregarAlCarrito(id);
    }
});

carritoTienda.addEventListener("click", (e) => {
    if (e.target.classList.contains("btnEliminar")) {
        const index = parseInt(e.target.getAttribute("data-index"));
        eliminarDelCarrito(index);
    }
});

renderProductos();
renderCarrito();