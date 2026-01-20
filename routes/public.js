const express = require('express');
const router = express.Router();
const { getAllProjects, getProjectById, getProjectsByBrand } = require('../utils/projectManager');

// Home page
router.get('/', (req, res) => {
  res.render('home', { title: 'Home' });
});

// Services page
router.get('/services', (req, res) => {
  res.render('services', { title: 'Services' });
});

// Contact page
router.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contact' });
});

// Work (projects list)
router.get('/work', (req, res) => {
  const projects = getAllProjects();
  res.render('work', { title: 'Work', projects });
});

// Individual project page
router.get('/projects/:id', (req, res) => {
  const project = getProjectById(req.params.id);
  if (!project) return res.status(404).render('404', { layout: 'main' });
  
  // Get related projects from same brand
  const relatedProjects = project.brand ? getProjectsByBrand(project.brand).filter(p => String(p.id) !== String(project.id)).slice(0, 3) : [];
  
  res.render('project', { 
    title: project.title, 
    project,
    relatedProjects
  });
});

module.exports = router;
