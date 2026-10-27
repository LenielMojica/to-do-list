export default function createTodo(
  title,
  description,
  date,
  project,
  priority,
  isCompleted = false,
) {
  let completed = isCompleted;
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
    get completed() {
      return completed;
    },
  };
}
window.createTodo = createTodo;
