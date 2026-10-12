export const projectManager = (() => {
  let projects = [];
  function addProject(project) {
    projects.push(project);
  }
  let selectedProject = null;
  function selectProject(project) {
    selectedProject = project;
  }
  const getSelected = () => selectedProject;
  const getProjects = () => projects;
  return { getProjects, addProject, selectProject, getSelected };
})();
