import "./styles.css";
import createTodo from "./todo.js";
import createProject from "./project.js";
import { projectManager } from "./projectsManager.js";
import { controller } from "./projectController.js";

const savedData = localStorage.getItem("Projects");

if (savedData) {
  const parsedProjects = JSON.parse(savedData);

  parsedProjects.forEach((element) => {
    if (!element || !element.title) {
      return;
    }
    const rawTodos = JSON.parse(localStorage.getItem(element.title) || "[]");
    const cookedTodos = [];
    rawTodos.forEach((todo) => {
      const hydratedTodo = createTodo(
        todo.title,
        todo.description,
        todo.date,
        todo.project,
        todo.priority,
        todo.completed,
      );
      cookedTodos.push(hydratedTodo);
    });
    const restoredProject = createProject(element.title, cookedTodos);

    projectManager.addProject(restoredProject, false);
  });
}

function createDefault() {
  const currentProjects = projectManager.getProjects();
  const defaultExists = currentProjects.find(
    (project) => project.title === "Default",
  );

  if (defaultExists) {
    return;
  }

  const Default = createProject("Default");
  projectManager.addProject(Default, true);
  projectManager.selectProject(Default);
}

const allProjects = projectManager.getProjects();
if (allProjects.length > 0) {
  const defaultProject =
    allProjects.find((p) => p.title === "Default") || allProjects[0];
  projectManager.selectProject(defaultProject);
}
console.log();
createDefault();

controller.renderApp(allProjects);
