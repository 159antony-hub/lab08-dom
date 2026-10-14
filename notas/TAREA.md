# Tarea: Mi componente interactivo

## Componente elegido

Una lista de tareas de estudio. Permite agregar tareas, marcarlas como hechas, borrarlas y ve cuantas quedan pendientes. La elegi porque la uso para organizar mis entregas.

## Version 1: solo DOM

```js
// Tarea v1: solo DOM
const titulo = document.querySelector("#titulo");
titulo.textContent = "Mis tareas de estudio";

const lista = document.querySelector("#lista");
const pendientes = document.querySelector("#pendientes");

const tareas = ["Repasar DOM", "Practicar eventos", "Terminar el laboratorio 08"];

tareas.forEach((texto) => {
  const li = document.createElement("li");
  li.textContent = texto;
  lista.appendChild(li);
});

pendientes.textContent = tareas.length;
```

**Que agregue:** una pagina con un titulo, una lista vacia y un contador. Desde app.js selecciono los elementos con querySelector, cambio el titulo con textContent y creo un li por cada tarea de un arreglo con createElement y appendChild.

**Por que:** queria partir de lo mas simple: comprobar que puedo leer y modificar el DOM antes de agregar interaccion.

**Que cambio en el comportamiento:** la pagina muestra tres tareas y el numero de pendientes, pero es una pagina fija: no reacciona a nada y para cambiar las tareas hay que editar app.js.

## Version 2: con eventos

## Version 3: con clases y objetos

## Donde uso DOM, eventos y objetos

## Pruebas realizadas

## Por que disene asi mi clase

