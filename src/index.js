import "./styles.css";
import createTodo from "./todo.js";
import createProject from "./project.js";
import { projectManager } from "./projectsManager.js";
import { controller } from "./projectController.js";

const Default = createProject("Default");
projectManager.addProject(Default);
projectManager.selectProject(Default);

const projects = projectManager.getProjects();
controller.renderApp(projects);
