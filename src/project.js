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
  const getTodos = () => {
    const data = JSON.parse(localStorage.getItem(title) || "[]");

    const newData = data.map((element) =>
      createTodo(
        element.title,
        element.description,
        element.date,
        element.project,
        element.priority,
      ),
    );
    console.log(newData);
    return newData;
  };
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
