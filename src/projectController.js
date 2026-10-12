import { projectManager } from "./projectsManager.js";

export const controller = (() => {
  const addTodoBtn = document.getElementById("add-todo-btn");
  const modal = document.getElementById("todo-modal");
  const closeBtn = document.querySelector(".close");
  const projectList = document.getElementById("project-list");
  addTodoBtn.addEventListener("click", () => {
    modal.classList.remove("hidden");
  });

  closeBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });
  const renderApp = (projects) => {
    projectList.innerHTML = "";

    projects.forEach((project) => {
      const title = document.createElement("li");
      title.classList.add("project-item");
      title.innerHTML = project.title;
      projectList.appendChild(title);
      title.addEventListener("click", () => {
        projectManager.selectProject(project);
        console.log(projectManager.getSelected());
        renderApp(projects);
      });

      if (projectManager.getSelected() == project) {
        title.classList.add("active");
      }
    });
  };
  return { renderApp };
})();
