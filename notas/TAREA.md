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

```js
// Tarea v2: DOM + eventos (click, input, submit)
const lista = document.querySelector("#lista");
const pendientes = document.querySelector("#pendientes");
const formTarea = document.querySelector("#formTarea");
const textoTarea = document.querySelector("#textoTarea");
const contadorCaracteres = document.querySelector("#contadorCaracteres");
const mensaje = document.querySelector("#mensaje");

let tareas = [
  { texto: "Repasar DOM", hecha: false },
  { texto: "Practicar eventos", hecha: false },
  { texto: "Terminar el laboratorio 08", hecha: false }
];

function dibujar() {
  lista.textContent = "";

  tareas.forEach((tarea, indice) => {
    const li = document.createElement("li");
    li.textContent = tarea.texto;
    if (tarea.hecha) {
      li.classList.add("hecha");
    }

    // evento click: marcar o desmarcar la tarea
    li.addEventListener("click", () => {
      tarea.hecha = !tarea.hecha;
      dibujar();
    });

    const btnBorrar = document.createElement("button");
    btnBorrar.textContent = "Borrar";

    // evento click: borrar la tarea (sin marcarla)
    btnBorrar.addEventListener("click", (evento) => {
      evento.stopPropagation();
      tareas.splice(indice, 1);
      dibujar();
    });

    li.appendChild(btnBorrar);
    lista.appendChild(li);
  });

  pendientes.textContent = tareas.filter((t) => !t.hecha).length;
}

// evento input: contar caracteres mientras se escribe
textoTarea.addEventListener("input", () => {
  contadorCaracteres.textContent = textoTarea.value.length + " / 60";
});

// evento submit: validar y agregar
formTarea.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const texto = textoTarea.value.trim();

  if (texto.length < 3) {
    mensaje.textContent = "Escribe al menos 3 caracteres";
    mensaje.className = "error";
    return;
  }

  tareas.push({ texto: texto, hecha: false });
  mensaje.textContent = "Tarea agregada";
  mensaje.className = "ok";
  formTarea.reset();
  contadorCaracteres.textContent = "0 / 60";
  dibujar();
});

dibujar();
```

**Que agregue:** un formulario con un campo de texto y tres tipos de eventos: `input` (contador de caracteres mientras escribo), `submit` (agrega la tarea) y `click` (marcar una tarea y borrarla con su boton). El submit usa preventDefault y valida que el texto tenga al menos 3 caracteres, mostrando el mensaje en la pagina. Los li se vuelven a crear en la funcion dibujar().

**Por que:** una lista que no se puede cambiar no sirve; los eventos hacen que la interfaz responda al usuario sin recargar la pagina. En el boton Borrar use stopPropagation para que borrar no marque la tarea como hecha.

**Que cambio en el comportamiento:** ahora puedo agregar, tachar y borrar tareas, el contador de pendientes se actualiza solo y si escribo menos de 3 caracteres aparece un error en rojo.

## Version 3: con clases y objetos

## Donde uso DOM, eventos y objetos

## Pruebas realizadas

## Por que disene asi mi clase

