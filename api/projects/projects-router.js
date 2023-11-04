// Write your "projects" router here!
const express = require('express')
const projectsRouter = express.Router();
const Projects = require('./projects-model')



projectsRouter.get('/', async(req,res)=>{
    try{
        const allProjects = await Projects.get();
        return res.status(201).json(allProjects)
    }catch(err){
        return res.status(500).json({message: "error!"})
    }
    
   
})



projectsRouter.get('/:id', async(req,res)=>{
    try{
        const project = await Projects.get(req.params.id);
        if(!project){
          return  res.status(404).json({message: "not FOUND"})
        }else{
          return  res.status(201).json(project)
        }
    }catch(err){
        return res.status(500).json({message: "error!"})
    }
}  )

projectsRouter.post('/', async(req,res)=>{
    try{
        const newProject = await Projects.insert(req.body);
        return  res.status(201).json(newProject)
    }catch(err){
        return res.status(500).json({message: "error!"})

    }
}  
)






module.exports = projectsRouter;