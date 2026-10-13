import "./styles.css";
import createTodo from "./todo.js";
import createProject from "./project.js";
import { projectManager } from "./projectsManager.js";
import { controller } from "./projectController.js";
const Default = createProject("Default");
projectManager.addProject(Default);
projectManager.selectProject(Default);
const project2 = createProject("None");

projectManager.addProject(project2);
const todo1 = createTodo("Limpiar", "Limpiar", "01-02-2026", "", "low");
Default.addTodo(todo1);
const projects = projectManager.getProjects();
controller.renderApp(projects);
