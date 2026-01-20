const express = require('express');
const router = express.Router();
const { getAllUsers, addUser, deleteUser, findUserByUsername } = require('../utils/userManager');
const bcrypt = require('bcryptjs');
const { getAllProjects, getProjectById, addProject, updateProject, deleteProject, getProjectsByBrand } = require('../utils/projectManager');
// multer will be required at runtime if installed
let multer;
try { multer = require('multer'); } catch (e) { multer = null; }

// configure multer storage if available
let uploadMiddleware = null;
if (multer) {
  const path = require('path');
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const uploadsDir = path.join(__dirname, '..', 'public', 'uploads');
      const fs = require('fs');
      if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
      cb(null, uploadsDir);
    },
    filename: function (req, file, cb) {
      const ext = file.originalname.split('.').pop();
      const name = Date.now() + '-' + Math.random().toString(36).substring(2,8) + '.' + ext;
      cb(null, name);
    }
  });
  uploadMiddleware = multer({ storage });
}

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.session.userId) {
    return next();
  }
  res.redirect('/admin/login');
};

// Login page - GET
router.get('/login', (req, res) => {
  if (req.session.userId) {
    return res.redirect('/admin/dashboard');
  }
  res.render('admin/login', { layout: 'admin' });
});

// Login - POST
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Check if user exists in database
  const user = findUserByUsername(username);

  if (!user) {
    return res.render('admin/login', { layout: 'admin', error: 'Invalid credentials' });
  }

  // Compare password with stored hash
  bcrypt.compare(password, user.password, (err, isMatch) => {
    if (isMatch) {
      req.session.userId = user.id;
      req.session.username = username;
      req.session.firstName = user.firstName;
      req.session.lastName = user.lastName;
      return res.redirect('/admin/dashboard');
    }
    res.render('admin/login', { layout: 'admin', error: 'Invalid credentials' });
  });
});

// Dashboard - protected route
router.get('/dashboard', isAuthenticated, (req, res) => {
  res.render('admin/dashboard', { 
    layout: 'admin',
    username: req.session.username 
  });
});

// Users Management - GET
router.get('/users', isAuthenticated, (req, res) => {
  const users = getAllUsers();
  res.render('admin/users', {
    layout: 'admin',
    username: req.session.username,
    users: users
  });
});

// Add User - POST
router.post('/users/add', isAuthenticated, (req, res) => {
  const { username, firstName, lastName, password } = req.body;

  if (!username || !firstName || !lastName || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Check if username already exists
  const existingUser = findUserByUsername(username);
  if (existingUser) {
    return res.status(400).json({ error: 'Username already exists' });
  }

  addUser(username, firstName, lastName, password, (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Error creating user' });
    }
    res.json({ success: true, user });
  });
});

// Delete User - POST
router.post('/users/delete/:id', isAuthenticated, (req, res) => {
  const userId = req.params.id;
  deleteUser(userId);
  res.json({ success: true });
});

// Projects - list
router.get('/projects', isAuthenticated, (req, res) => {
  const projects = getAllProjects();
  res.render('admin/projects', {
    layout: 'admin',
    username: req.session.username,
    projects
  });
});

// Projects - new form
router.get('/projects/new', isAuthenticated, (req, res) => {
  res.render('admin/project_form', {
    layout: 'admin',
    username: req.session.username,
    project: null
  });
});

// Projects - add
router.post('/projects/add', isAuthenticated, (req, res) => {
  const { title, slug, brand, coverImage, sections } = req.body;
  let parsedSections = [];
  try {
    parsedSections = sections ? JSON.parse(sections) : [];
  } catch (e) {
    return res.status(400).json({ error: 'Invalid sections data' });
  }

  const proj = addProject({ title, slug, brand, coverImage, sections: parsedSections });
  res.json({ success: true, project: proj });
});

// Projects - delete
router.post('/projects/delete/:id', isAuthenticated, (req, res) => {
  const id = req.params.id;
  deleteProject(id);
  res.json({ success: true });
});

// Upload base64 file (simple, no external deps)
router.post('/upload-base64', isAuthenticated, (req, res) => {
  const { filename, data } = req.body;
  if (!filename || !data) return res.status(400).json({ error: 'Invalid upload' });

  const uploadsDir = require('path').join(__dirname, '..', 'public', 'uploads');
  const fs = require('fs');
  if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

  const ext = filename.split('.').pop();
  const name = Date.now() + '-' + Math.random().toString(36).substring(2,8) + '.' + ext;
  const filePath = require('path').join(uploadsDir, name);

  // data is expected like: data:image/png;base64,AAAA
  const parts = data.split(',');
  const b64 = parts.length > 1 ? parts[1] : parts[0];
  const buf = Buffer.from(b64, 'base64');
  fs.writeFileSync(filePath, buf);

  const urlPath = '/uploads/' + name;
  res.json({ success: true, url: urlPath });
});

// Multer multipart upload endpoint (if multer is installed)
router.post('/upload', isAuthenticated, (req, res) => {
  if (!uploadMiddleware) return res.status(500).json({ error: 'Multer not installed' });
  uploadMiddleware.single('file')(req, res, function(err) {
    if (err) return res.status(500).json({ error: 'Upload failed' });
    if (!req.file) return res.status(400).json({ error: 'No file' });
    const urlPath = '/uploads/' + req.file.filename;
    res.json({ success: true, url: urlPath });
  });
});

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.send('Error logging out');
    res.redirect('/');
  });
});

module.exports = router;

