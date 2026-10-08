import "./styles.css";
import ToDo from "./todo.js";

const todo = new ToDo(
  "Hacer Tarea",
  "Hacer la tarea de la semana",
  new Date(),
  "Academico",
  "10",
);
console.log(todo);
