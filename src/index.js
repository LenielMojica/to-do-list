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

    const restoredProject = createProject(element.title);

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
