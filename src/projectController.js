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
  const expandedModal = document.createElement("div");
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
    todoContainer.innerHTML = "";
    const project = projectManager.getSelected();

    currentProjectTitle.textContent = project.title;
    if (project.getTodos() == []) return;
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
        project.saveTodos();
      });

      todoCheckBox.setAttribute("type", "checkbox");
      todoCheckBox.classList.add("todo-checkbox");
      todoCheckBox.checked = todo.getStatus() ? true : false;
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
        project.deleteTodo(todo);

        renderTodos();
      });
      todoCard.addEventListener("click", (event) => {
        expandedModal.innerHTML = "";
        if (event.target !== event.currentTarget) return;
        const body = document.body;

        const modalContentContainer = document.createElement("div");
        const modalHeader = document.createElement("div");

        const title = document.createElement("input");
        title.setAttribute("type", "text");
        title.classList.add("todo-title");
        const descriptionLabel = document.createElement("h3");
        const descriptionContainer = document.createElement("div");
        const dateContainer = document.createElement("div");
        const completedLabel = document.createElement("span");

        completedLabel.innerHTML = todo.getStatus()
          ? "Completed"
          : "Not completed";
        const otherDetailsContainer = document.createElement("div");
        otherDetailsContainer.classList.add("other-details");
        descriptionLabel.innerHTML = "Description:";

        const priority = document.createElement("select");

        priority.classList.add(
          "priority-badge",
          todo.priority,
          "priority-extended",
        );

        const priorityOptions = ["Low", "Medium", "High"];
        priorityOptions.forEach((levelText) => {
          const option = document.createElement("option");

          option.value = levelText.toLowerCase();

          option.textContent = levelText;

          priority.appendChild(option);
        });
        priority.value = todo.priority ? todo.priority.toLowerCase() : "low";
        priority.addEventListener("change", (e) => {
          const newPriority = e.target.value;

          todo.priority = newPriority;

          priority.classList.remove("low", "medium", "high");
          priority.classList.add(newPriority);
          project.saveTodos();
          renderTodos();
        });
        title.addEventListener("change", (e) => {
          todo.title = e.target.value;

          project.saveTodos();
        });
        const markComplete = document.createElement("button");
        markComplete.addEventListener("click", () => {
          todo.toggleCompleted();
          completedLabel.innerHTML = todo.getStatus()
            ? "Completed"
            : "Not completed";
          markComplete.innerHTML = todo.getStatus() ? "Undo" : "Mark Completed";
          project.saveTodos();
          renderTodos();
        });
        const deleteBtn = document.createElement("button");
        deleteBtn.addEventListener("click", () => {
          const project = projectManager.getSelected();
          project.deleteTodo(todo);
          expandedModal.classList.add("hidden");
          renderTodos();
        });
        deleteBtn.innerHTML = "Delete";
        deleteBtn.classList.add("delete-btn");
        markComplete.innerHTML = todo.getStatus() ? "Undo" : "Mark Completed";
        markComplete.classList.add("mark-btn");
        const btnContainer = document.createElement("div");
        btnContainer.classList.add("btn-container");
        btnContainer.appendChild(markComplete);
        btnContainer.appendChild(deleteBtn);

        const description = document.createElement("textarea");
        description.addEventListener("change", (e) => {
          todo.description = e.target.value;
          project.saveTodos();
        });
        description.setAttribute("rows", "5");
        description.setAttribute("cols", "40");
        const mainContent = document.createElement("div");
        mainContent.classList.add("main-content-extended");
        const dateLabel = document.createElement("h3");
        dateLabel.innerHTML = "Date:";
        const date = document.createElement("input");
        date.setAttribute("type", "date");
        date.classList.add("todo-date-extended");
        date.value = todo.date;
        date.addEventListener("change", () => {
          todo.date = date.value;
          project.saveTodos();
        });
        description.value = todo.description;
        const closeBtn = document.createElement("button");

        closeBtn.innerHTML = "X";
        title.value = todo.title;
        modalHeader.classList.add("extended-header");
        modalContentContainer.classList.add("modal-content");

        expandedModal.classList.add("modal", "hidden");
        closeBtn.classList.add("close");
        body.appendChild(expandedModal);

        expandedModal.classList.remove("hidden");
        expandedModal.appendChild(modalContentContainer);
        modalContentContainer.appendChild(modalHeader);
        modalHeader.appendChild(title);
        modalHeader.appendChild(closeBtn);
        modalContentContainer.appendChild(mainContent);
        descriptionContainer.appendChild(descriptionLabel);
        descriptionContainer.appendChild(description);
        mainContent.appendChild(descriptionContainer);
        dateContainer.appendChild(dateLabel);
        dateContainer.appendChild(date);
        mainContent.appendChild(dateContainer);
        otherDetailsContainer.appendChild(priority);

        otherDetailsContainer.appendChild(completedLabel);
        otherDetailsContainer.appendChild(btnContainer);

        mainContent.appendChild(otherDetailsContainer);

        closeBtn.addEventListener("click", () => {
          if (
            !todo.title ||
            todo.title.length < 1 ||
            !todo.description ||
            !todo.priority ||
            !todo.date
          ) {
            return alert("Check the title length or the other fields");
          }
          expandedModal.classList.add("hidden");

          renderTodos();
        });
      });
    });
  };
  const renderProjects = (projects) => {
    projectList.innerHTML = "";

    projects.forEach((project) => {
      const title = document.createElement("li");
      const deleteBtn = document.createElement("button");

      deleteBtn.classList.add("btn-delete");
      deleteBtn.innerHTML = "🗑️";
      deleteBtn.addEventListener("click", (event) => {
        if (event.target !== event.currentTarget) return;

        projectManager.removeProject(JSON.stringify(project));
        renderProjects(projects);
      });
      title.classList.add("project-item");
      title.innerHTML = project.title;
      title.appendChild(deleteBtn);
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
    renderProjects(projects);
    renderTodos();
  };
  projectForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(e.target);

    projectManager.addProject(createProject(data.get("title")), true);
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
        project.title,
        data.get("priority").toLowerCase(),
      ),
    );
    todoForm.reset();
    todoModal.classList.add("hidden");
    renderTodos();
  });
  return { renderApp };
})();
