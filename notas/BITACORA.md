# Bitacora de JavaScript interactivo

Laboratorio 08: JavaScript Interactivo - DOM, Eventos y Objetos.
Navegador usado: Google Chrome

## Ejercicio 2: Seleccionar y modificar el DOM

| Instruccion                  | Que cambio en la pantalla                             | Se mantiene al recargar (Si/No) |
| ---------------------------- | ----------------------------------------------------- | ------------------------------- |
| textContent desde la consola | El titulo paso a decir "Hola desde la consola"        | No                              |
| textContent desde app.js     | El titulo paso a decir "Hola TECSUP"                  | Si                              |
| style.color                  | El titulo se puso de color azul                       | Si                              |
| classList.add                | El parrafo quedo con fondo amarillo (clase destacado) | Si                              |
| createElement + appendChild  | La lista muestra un tercer elemento: JavaScript       | Si                              |

Codigo usado en app.js:

```js
const titulo = document.querySelector("#titulo");
titulo.textContent = "Hola TECSUP";
titulo.style.color = "blue";

const mensaje = document.querySelector(".mensaje");
mensaje.classList.add("destacado");

const lista = document.querySelector("#lista");
const nuevo = document.createElement("li");
nuevo.textContent = "JavaScript";
lista.appendChild(nuevo);
```

## Ejercicio 3: Evento click

| Tipo de evento | Que accion lo dispara                                 | Cuanto suma por accion                   |
| -------------- | ----------------------------------------------------- | ---------------------------------------- |
| click          | Un clic sobre el boton Sumar 1                        | 1                                        |
| dblclick       | Un doble clic rapido sobre el boton                   | 1 por cada doble clic                    |
| mouseover      | Pasar el puntero por encima del boton, sin hacer clic | 1 cada vez que el puntero entra al boton |

En la consola, evento.type mostro el texto click, que es el tipo de evento que ocurrio.
evento.target mostro el elemento que recibio el evento: el boton Sumar 1 (`<button id="btnSumar">`).

```js
btnSumar.addEventListener("click", (evento) => {
  clics = clics + 1;
  contador.textContent = clics;
  console.log(evento.type, evento.target);
});
```

## Ejercicio 4: Eventos input y submit

| Prueba                                  | Que paso en la pantalla                                                       | Se recargo la pagina (Si/No) |
| --------------------------------------- | ----------------------------------------------------------------------------- | ---------------------------- |
| Escribir en el campo nombre             | El texto "Hola, ..." cambio letra por letra con lo que escribi                | No                           |
| Enviar sin preventDefault               | El mensaje "Enviado" aparecio un instante y desaparecio; el campo quedo vacio | Si                           |
| Enviar con preventDefault, correo sin @ | Aparecio "Correo no valido: falta @" en rojo                                  | No                           |
| Enviar con preventDefault, correo con @ | Aparecio "Enviado: " seguido del correo                                       | No                           |

```js
formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();

  if (!correo.value.includes("@")) {
    resultado.textContent = "Correo no valido: falta @";
    resultado.classList.add("error");
  } else {
    resultado.textContent = "Enviado: " + correo.value;
    resultado.classList.remove("error");
  }
});
```

## Ejercicio 5: Clases y objetos

Comprobacion con calculadora:

| Llamada                    | Calculo        | Resultado           |
| -------------------------- | -------------- | ------------------- |
| laptop.descripcion()       | No hay calculo | Laptop - S/ 2500.00 |
| mouse.conDescuento(0.25)   | 45 x 0,75      | 33.75               |
| teclado.conDescuento(0.10) | 120 x 0,90     | 108                 |

| Objeto  | nombre  | precio | descripcion()       | conDescuento(0.25) |
| ------- | ------- | ------ | ------------------- | ------------------ |
| laptop  | Laptop  | 2500   | Laptop - S/ 2500.00 | 1875               |
| mouse   | Mouse   | 45     | Mouse - S/ 45.00    | 33.75              |
| teclado | Teclado | 120    | Teclado - S/ 120.00 | 90                 |
| monitor | Monitor | 680    | Monitor - S/ 680.00 | 510                |

Ventaja 1: la clase define una sola vez los atributos y los metodos, y cada producto nuevo se crea con una linea (new Producto).
Ventaja 2: para agregar el monitor solo cree un objeto y lo puse en el arreglo; la pagina lo mostro sin tocar el HTML.

```js
class Producto {
  constructor(nombre, precio) {
    this.nombre = nombre;
    this.precio = precio;
  }

  conDescuento(pct) {
    return this.precio * (1 - pct);
  }

  descripcion() {
    return this.nombre + " - S/ " + this.precio.toFixed(2);
  }
}
```

## Ejercicio 6: DOM, eventos y objetos juntos

| Prueba          | Total que muestra la pagina                                                                     | Correcto (Si/No) |
| --------------- | ----------------------------------------------------------------------------------------------- | ---------------- |
| Cuaderno 12.50  | 12.50                                                                                           | Si               |
| + Lapicero 3.20 | 15.70                                                                                           | Si               |
| + Mochila 89.90 | 105.60                                                                                          | Si               |
| Sin Number()    | No muestra nada: el producto no aparece y la consola dice this.precio.toFixed is not a function | No               |

| Pieza  | Linea de tu codigo donde aparece                                             | Para que sirve                                         |
| ------ | ---------------------------------------------------------------------------- | ------------------------------------------------------ |
| DOM    | `const li = document.createElement("li");` y `listaCarrito.appendChild(li);` | Crear el elemento de la lista y mostrarlo en la pagina |
| Evento | `formProducto.addEventListener("submit", (evento) => {`                      | Reaccionar cuando el usuario envia el formulario       |
| Objeto | `const producto = new Producto(prodNombre.value, Number(prodPrecio.value));` | Crear un objeto con los datos que escribio el usuario  |

```js
formProducto.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const producto = new Producto(prodNombre.value, Number(prodPrecio.value));
  carrito.agregar(producto);

  const li = document.createElement("li");
  li.textContent = producto.descripcion();
  listaCarrito.appendChild(li);

  total.textContent = carrito.total().toFixed(2);
  formProducto.reset();
});
```
