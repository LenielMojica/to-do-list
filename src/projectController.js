import createProject from "./project.js";

import { projectManager } from "./projectsManager.js";

export const controller = (() => {
  const addTodoBtn = document.getElementById("add-todo-btn");
  const todoModal = document.getElementById("todo-modal");
  const closeBtn = document.querySelector(".close");
  const projectList = document.getElementById("project-list");
  const currentProjectTitle = document.getElementById("current-project-title");
  const todoContainer = document.getElementById("todo-container");
  const todoForm = document.getElementById("todo-form");
  const projectForm = document.getElementById("project-form");
  const addProjectBtn = document.getElementById("add-project-btn");
  const projectModal = document.getElementById("project-modal");
  addTodoBtn.addEventListener("click", () => {
    todoModal.classList.remove("hidden");
  });
  addProjectBtn.addEventListener("click", () => {
    projectModal.classList.remove("hidden");
  });
  closeBtn.addEventListener("click", () => {
    todoForm.reset();
    todoModal.classList.add("hidden");
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
      todoCheckBox.addEventListener("click", () => {
        todo.toggleCompleted();
      });

      todoCheckBox.setAttribute("type", "checkbox");
      todoCheckBox.classList.add("todo-checkbox");
      if (todo.getStatus()) {
        todoCheckBox.checked = true;
      }
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
      deleteBtn.addEventListener("click", () => {
        todoContainer.innerHTML = "";
        console.log(project.deleteTodo(todo));
      });
    });
  };
  const renderProjects = (projects) => {
    projectList.innerHTML = "";

    projects.forEach((project) => {
      const title = document.createElement("li");
      title.classList.add("project-item");
      title.innerHTML = project.title;
      projectList.appendChild(title);
      title.addEventListener("click", () => {
        todoContainer.innerHTML = "";
        projectManager.selectProject(project);

        renderProjects(projects);
        renderTodos();
      });

      if (projectManager.getSelected() == project) {
        title.classList.add("active");
      }
    });
  };
  const renderApp = (projects) => {
    renderTodos();
    renderProjects(projects);
  };
  projectForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    projectManager.addProject(createProject(data.get("title")));
    projectForm.reset();
    projectModal.classList.add("hidden");
    renderProjects(projectManager.getProjects());
  });
  todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(e.target);

    const project = projectManager.getSelected();
    project.addTodo(
      createTodo(
        data.get("title"),
        data.get("description"),
        data.get("date"),
        "",
        data.get("priority"),
      ),
    );
    todoForm.reset();
    todoModal.classList.add("hidden");
    renderTodos();
  });
  return { renderApp };
})();
