// Write your "projects" router here!
const express = require('express')
const projectsRouter = express.Router();
const Projects = require('./projects-model')



projectsRouter.get('/', async(req,res)=>{

    const allProjects = await Projects.get();
    res.status(201).json(allProjects)
})


module.exports = projectsRouter;