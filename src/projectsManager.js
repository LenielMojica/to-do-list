export const projectManager = (() => {
  let projects = [];
  function addProject(project, shouldSave = false) {
    projects.push(project);
    if (shouldSave) {
      const parsedProjects = JSON.parse(
        localStorage.getItem("Projects") || "[]",
      );
      parsedProjects.push(project);
      localStorage.setItem("Projects", JSON.stringify(parsedProjects));
    }
  }
  function removeProject(project) {
    const index = projects.indexOf(project);

    projects.splice(index, 1);

    const parsedProjects = JSON.parse(localStorage.getItem("Projects") || "[]");
    parsedProjects.splice(index, 1);
    localStorage.setItem("Projects", JSON.stringify(parsedProjects));
  }
  let selectedProject = null;
  function selectProject(project) {
    selectedProject = project;
  }
  const getSelected = () => selectedProject;
  const getProjects = () => projects;
  return { getProjects, addProject, selectProject, getSelected, removeProject };
})();
