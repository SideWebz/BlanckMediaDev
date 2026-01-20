const fs = require('fs');
const path = require('path');

const projectsFile = path.join(__dirname, '../data/projects.json');

const readProjects = () => {
  try {
    const data = fs.readFileSync(projectsFile, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
};

const writeProjects = (projects) => {
  fs.writeFileSync(projectsFile, JSON.stringify(projects, null, 2));
};

const getAllProjects = () => readProjects();

const getProjectById = (id) => {
  const projects = readProjects();
  return projects.find(p => String(p.id) === String(id));
};

const addProject = ({ title, slug, brand, coverImage, sections }) => {
  const projects = readProjects();
  const newProject = {
    id: Date.now(),
    title,
    slug: slug || String(Date.now()),
    brand: brand || '',
    coverImage: coverImage || null,
    sections: sections || [],
    createdAt: new Date().toISOString()
  };
  projects.unshift(newProject);
  writeProjects(projects);
  return newProject;
};

const updateProject = (id, updates) => {
  const projects = readProjects();
  const idx = projects.findIndex(p => String(p.id) === String(id));
  if (idx === -1) return null;
  projects[idx] = Object.assign({}, projects[idx], updates);
  writeProjects(projects);
  return projects[idx];
};

const getProjectsByBrand = (brand) => {
  const projects = readProjects();
  return projects.filter(p => p.brand && p.brand.toLowerCase() === brand.toLowerCase());
};

const deleteProject = (id) => {
  const projects = readProjects();
  const filtered = projects.filter(p => String(p.id) !== String(id));
  writeProjects(filtered);
  return filtered;
};

module.exports = {
  getAllProjects,
  getProjectById,
  addProject,
  updateProject,
  deleteProject,
  getProjectsByBrand
};
