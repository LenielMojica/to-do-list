import { projectManager } from "./projectsManager.js";

export const controller = (() => {
  const addTodoBtn = document.getElementById("add-todo-btn");
  const modal = document.getElementById("todo-modal");
  const closeBtn = document.querySelector(".close");
  const projectList = document.getElementById("project-list");
  const currentProjectTitle = document.getElementById("current-project-title");
  const todoContainer = document.getElementById("todo-container");
  addTodoBtn.addEventListener("click", () => {
    modal.classList.remove("hidden");
  });
  console.log(projectManager.getSelected());
  closeBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  const renderTodos = () => {
    const project = projectManager.getSelected();
    currentProjectTitle.textContent = project.title;
    project.getTodos().forEach((todo) => {
      const todoCard = document.createElement("div");
      todoCard.classList.add("todo-card");
      todoContainer.appendChild(todoCard);
      const todoLeftSide = document.createElement("div");
      todoLeftSide.classList.add("todo-left");
      todoCard.appendChild(todoLeftSide);
      const todoCheckBox = document.createElement("input");
      todoCheckBox.setAttribute("type", "checkbox");
      todoCheckBox.classList.add("todo-checkbox");
      const todoTitle = document.createElement("span");
      todoTitle.classList.add("todo-title");
      todoLeftSide.appendChild(todoCheckBox);
      todoLeftSide.appendChild(todoTitle);
      todoTitle.innerHTML = todo.title;
      const todoRightSide = document.createElement("div");
      todoRightSide.classList.add("todo-right");
      todoCard.appendChild(todoRightSide);
      const date = document.createElement("span");
      const priority = document.createElement("span");
      const deleteBtn = document.createElement("button");
      date.classList.add("todo-date");
      priority.classList.add("priority-badge", todo.priority);
      deleteBtn.classList.add("btn-delete");
      todoRightSide.appendChild(date);
      todoRightSide.appendChild(priority);
      todoRightSide.appendChild(deleteBtn);
      priority.innerHTML = todo.priority;
      date.innerHTML = todo.date;
      deleteBtn.innerHTML = "🗑️";
    });
  };
  const renderApp = (projects) => {
    renderTodos();
    projectList.innerHTML = "";

    projects.forEach((project) => {
      const title = document.createElement("li");
      title.classList.add("project-item");
      title.innerHTML = project.title;
      projectList.appendChild(title);
      title.addEventListener("click", () => {
        todoContainer.innerHTML = "";
        projectManager.selectProject(project);

        renderApp(projects);
      });

      if (projectManager.getSelected() == project) {
        title.classList.add("active");
      }
    });
  };
  return { renderApp };
})();
