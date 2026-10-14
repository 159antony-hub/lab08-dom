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
