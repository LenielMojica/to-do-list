export default function Project(title) {
  let todos = [];
  let completed = false;
  const addTodo = (todo) => {
    todos.push(todo);
  };

  const completeProject = () => {
    completed = true;
  };
  const getStatus = () => completed;
  const getTodos = () => todos;
  return {
    title,
    completeProject,
    getStatus,
    addTodo,
    getTodos,
  };
}
