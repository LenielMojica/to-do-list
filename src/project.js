export default function createProject(title, todos) {
  let completed = false;
  const completeProject = () => {
    completed = true;
  };
  const getStatus = () => completed;
  return { title, completeProject, todos, getStatus };
}
