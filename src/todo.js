export default function createTodo(
  title,
  description,
  date,
  project,
  priority,
) {
  let completed = false;
  const getStatus = () => completed;
  const toggleCompleted = () => {
    completed = !completed;
  };
  return {
    title,
    description,
    date,
    project,
    priority,
    toggleCompleted,
    getStatus,
  };
}
window.createTodo = createTodo;
