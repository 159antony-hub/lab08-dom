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
