import "./styles.css";
import createTodo from "./todo.js";
import createProject from "./project.js";
import { projectManager } from "./projectsManager.js";
import { controller } from "./projectController.js";

const Default = createProject("Default");
projectManager.addProject(Default);
projectManager.selectProject(Default);
Default.addTodo(
  createTodo(
    "Hey",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, obcaecati. Praesentium, incidunt iure perspiciatis ullam veniam esse! Alias facilis sint nesciunt provident ipsum voluptatum. Et ut at voluptates fugit repellat.",
    "2026-00-00",
    "",
    "low",
  ),
);
const projects = projectManager.getProjects();
controller.renderApp(projects);
