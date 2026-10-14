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
