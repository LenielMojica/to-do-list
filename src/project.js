import createTodo from "./todo.js";

export default function createProject(title, todos = []) {
  let completed = false;
  const addTodo = (todo) => {
    todos.push(todo);
    const data = JSON.parse(localStorage.getItem(todo.project) || "[]");

    data.push(todo);
    localStorage.setItem(todo.project, JSON.stringify(data));
  };
  const saveTodos = () => {
    localStorage.setItem(title, JSON.stringify(todos));
  };

  const completeProject = () => {
    completed = true;
  };

  const deleteTodo = (todo) => {
    todos = todos.filter((element) => element !== todo);

    localStorage.setItem(title, JSON.stringify(todos));
    return todos;
  };
  const getStatus = () => completed;
  const getTodos = () => todos;
  return {
    title,
    completeProject,
    getStatus,
    addTodo,
    getTodos,
    deleteTodo,
    todos,
    saveTodos,
  };
}
