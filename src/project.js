export default function createProject(title) {
  let todos = [];
  let completed = false;
  const addTodo = (todo) => {
    todos.push(todo);
  };

  const completeProject = () => {
    completed = true;
  };
  const deleteTodo = (todo) => {
    todos = todos.filter((element) => {
      element !== todo;
    });
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
  };
}
