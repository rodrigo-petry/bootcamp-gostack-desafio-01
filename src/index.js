const express = require('express');

const server = express();

server.use(express.json());

const projects = [];

/*
  * Count the number of request of application
*/
function countRequests(req, res, next) {
  console.count("Number of requests");

  return next();
}

/* 
* Verify if the project with the params ID exists on application
*/
function checkProjectExists(req, res, next) {
  const { id } = req.body;

  const project = projects.find(p => p.id == id);

  if (!project) {
    return res.status(400).json({ error: 'No project found with this id' })
  }

  next();
}

server.use(countRequests);

/* 
  * Lists all registered projects
*/
server.get('/projects', (req, res) => {
  return res.json(projects);
});

/* 
* Create a new project for application
*/
server.post('/projects', (req, res) => {
  const { id, title } = req.body;

  const project = {
    id,
    title,
    tasks: []
  }

  projects.push(project);

  return res.json(projects);
});

/* 
  * Edit an already created project by ID passed in route params
*/
server.put('/projects/:id', checkProjectExists, (req, res) => {
  const { id } = req.params;
  const title = req.body;

  const project = projects.find(p => p.id == id);
  
  project.title = title;

  return res.json(projects);
});

/**
  * Delete an already create project by ID passed in route params
*/
server.delete('/projects/:id', checkProjectExists, (req, res) => {
  const { id } = req.params;
  
  const projectIndex = projects.findIndex(p => p.id == id);

  project.splice(projectIndex, 1);

  return res.json(projects);
});

/**
  * Add a new taks in array by ID of project
*/
server.post('/projects/:id/tasks', checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.tasks.push(title);

  return res.json(projects);
});

server.listen(3000);