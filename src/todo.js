export default function createTodo(
  title,
  description,
  date,
  category,
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
    category,
    priority,
    toggleCompleted,
    getStatus,
  };
}
