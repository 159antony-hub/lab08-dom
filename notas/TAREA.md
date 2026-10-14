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

```js
// Tarea v3: DOM + eventos + clases y objetos
class Tarea {
  constructor(texto) {
    this.texto = texto;
    this.hecha = false;
  }

  alternar() {
    this.hecha = !this.hecha;
  }

  descripcion() {
    return (this.hecha ? "Hecha: " : "Pendiente: ") + this.texto;
  }
}

class ListaTareas {
  constructor() {
    this.tareas = [];
  }

  validar(texto) {
    if (texto.length < 3) {
      return "Escribe al menos 3 caracteres";
    }
    const repetida = this.tareas.some(
      (t) => t.texto.toLowerCase() === texto.toLowerCase()
    );
    if (repetida) {
      return "Esa tarea ya existe";
    }
    return "";
  }

  agregar(tarea) {
    this.tareas.push(tarea);
  }

  eliminar(tarea) {
    this.tareas = this.tareas.filter((t) => t !== tarea);
  }

  pendientes() {
    return this.tareas.filter((t) => !t.hecha).length;
  }
}

const ul = document.querySelector("#lista");
const pendientes = document.querySelector("#pendientes");
const formTarea = document.querySelector("#formTarea");
const textoTarea = document.querySelector("#textoTarea");
const contadorCaracteres = document.querySelector("#contadorCaracteres");
const mensaje = document.querySelector("#mensaje");

const misTareas = new ListaTareas();
["Repasar DOM", "Practicar eventos", "Terminar el laboratorio 08"].forEach(
  (texto) => misTareas.agregar(new Tarea(texto))
);

function dibujar() {
  ul.textContent = "";

  misTareas.tareas.forEach((tarea) => {
    const li = document.createElement("li");
    li.textContent = tarea.texto;
    li.title = tarea.descripcion();
    if (tarea.hecha) {
      li.classList.add("hecha");
    }

    li.addEventListener("click", () => {
      tarea.alternar();
      dibujar();
    });

    const btnBorrar = document.createElement("button");
    btnBorrar.textContent = "Borrar";
    btnBorrar.addEventListener("click", (evento) => {
      evento.stopPropagation();
      misTareas.eliminar(tarea);
      dibujar();
    });

    li.appendChild(btnBorrar);
    ul.appendChild(li);
  });

  pendientes.textContent = misTareas.pendientes();
}

textoTarea.addEventListener("input", () => {
  contadorCaracteres.textContent = textoTarea.value.length + " / 60";
});

formTarea.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const texto = textoTarea.value.trim();

  const error = misTareas.validar(texto);
  if (error !== "") {
    mensaje.textContent = error;
    mensaje.className = "error";
    return;
  }

  misTareas.agregar(new Tarea(texto));
  mensaje.textContent = "Tarea agregada";
  mensaje.className = "ok";
  formTarea.reset();
  contadorCaracteres.textContent = "0 / 60";
  dibujar();
});

dibujar();
```

**Que agregue:** la clase `Tarea` (atributos texto y hecha; metodos alternar y descripcion) y la clase `ListaTareas` (atributo tareas; metodos validar, agregar, eliminar y pendientes). Los datos ya no son objetos sueltos sino instancias, y la validacion salio del evento hacia la clase. Tambien se valida que la tarea no este repetida.

**Por que:** en la v2 la logica de los datos y la del DOM estaban mezcladas. Con las clases, cada objeto sabe hacer sus propias cosas y el codigo del DOM solo se encarga de mostrar.

**Que cambio en el comportamiento:** a simple vista casi nada, salvo el nuevo error "Esa tarea ya existe"; el cambio importante esta en como esta organizado el codigo.

## Donde uso DOM, eventos y objetos

| Parte | Linea del codigo final | Para que sirve |
|-------|------------------------|----------------|
| DOM | `const li = document.createElement("li");` y `ul.appendChild(li);` | Crear cada tarea y mostrarla en la lista |
| DOM | `pendientes.textContent = misTareas.pendientes();` | Actualizar el numero de pendientes en pantalla |
| DOM | `li.classList.add("hecha");` | Tachar visualmente una tarea terminada |
| Evento | `formTarea.addEventListener("submit", (evento) => {` | Agregar una tarea validada al enviar el formulario |
| Evento | `textoTarea.addEventListener("input", () => {` | Mostrar cuantos caracteres llevo escritos |
| Evento | `li.addEventListener("click", () => {` y `btnBorrar.addEventListener("click", ...)` | Marcar y borrar tareas |
| Objeto | `misTareas.agregar(new Tarea(texto));` | Crear un objeto Tarea y guardarlo en la lista |
| Objeto | `const error = misTareas.validar(texto);` | Pedirle a la lista que valide el dato |

## Pruebas realizadas

| Accion | Resultado esperado | Resultado obtenido | Cumple (Si / No) |
|--------|--------------------|--------------------|------------------|
| Escribir "Estudiar Git" y presionar Agregar | La tarea aparece al final y pendientes sube en 1 | Aparecio la tarea y pendientes paso de 3 a 4 con el mensaje "Tarea agregada" | Si |
| Presionar Agregar con el campo vacio | Mensaje de error visible y no se agrega nada | Aparecio "Escribe al menos 3 caracteres" en rojo y la lista no cambio | Si |
| Escribir "ab" y presionar Agregar | Error por tener menos de 3 caracteres | Aparecio el mismo mensaje en rojo | Si |
| Agregar "repasar dom" (ya existe con otras mayusculas) | Error de tarea repetida | Aparecio "Esa tarea ya existe" | Si |
| Hacer clic en una tarea | Se tacha y pendientes baja en 1 | La tarea quedo tachada y pendientes bajo en 1 | Si |
| Hacer clic otra vez en la misma tarea | Se destacha y pendientes sube en 1 | Volvio a verse normal y pendientes subio en 1 | Si |
| Hacer clic en Borrar de una tarea | La tarea desaparece sin marcarse antes | Desaparecio y pendientes se actualizo | Si |
| Escribir 5 letras en el campo | El contador muestra 5 / 60 | Mostro 5 / 60 | Si |

## Por que disene asi mi clase

Una tarea necesita solo dos datos para esta app: su `texto` y si esta `hecha`, por eso la clase Tarea tiene esos dos atributos y nada mas. Sus metodos son las cosas que una tarea sabe hacer por si sola: `alternar()` cambia su estado y `descripcion()` la describe en texto. Aparte hice la clase ListaTareas, que guarda el arreglo de tareas y sabe validar, agregar, eliminar y contar pendientes, porque esas acciones afectan a todas las tareas y no a una sola. Asi, el codigo del DOM no toca los datos directamente: le pide las cosas a los objetos y solo dibuja el resultado.
