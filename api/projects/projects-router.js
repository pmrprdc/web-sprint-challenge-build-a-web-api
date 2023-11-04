// Write your "projects" router here!
const express = require('express')
const projectsRouter = express.Router();
const Projects = require('./projects-model')
const {checkProjectExists} = require('./projects-middleware')


projectsRouter.get('/', async(req,res)=>{
    try{
        const allProjects = await Projects.get();
        return res.status(201).json(allProjects)
    }catch(err){
        return res.status(500).json({message: "error!"})
    }
    
   
})



projectsRouter.get('/:id',checkProjectExists, async(req,res)=>{
    try{
        const project = await Projects.get(req.params.id);
         return  res.status(201).json(project)
        
    }catch(err){
        return res.status(500).json({message: "error!"})
    }
}  )

projectsRouter.post('/', async(req,res)=>{
    const {description, name} = req.body;
    if(!name || !description){
        return res.status(400).json({
            message: "Please provide a name and description"
        })
    }
    try{
        const newProject = await Projects.insert(req.body);
        return  res.status(201).json(newProject)
    }catch(err){
        return res.status(500).json({message: "something went wrong!"})

    }
}  
)

projectsRouter.put('/:id',checkProjectExists, async (req, res) => {
    try {
      const { id } = req.params;
      const { completed, name, description } = req.body;
  
      // Check if any required fields are missing
      if (typeof completed !== 'boolean' || !name || !description) {
        return res.status(400).json({
          message: 'Please include a valid name, description, and a completed status (boolean).',
        });
      }
  
     
  
      // Update the project
      const updatedProject = await Projects.update(id, req.body);
  
      return res.json(updatedProject);
    } catch (err) {
      console.error('Error updating project:', err);
      return res.status(500).json({
        message: 'Something went wrong while updating the project.',
      });
    }
  });




  projectsRouter.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const project = await Projects.get(id);
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }
      await Projects.remove(id);
      return res.json({ message: 'Project deleted successfully' });
    } catch (err) {
      console.error('Error deleting project:', err);
      res.status(500).json({ message: 'Something went wrong while trying to delete the project' });
    }
  });

  projectsRouter.get('/:id/actions', async (req, res) => {
    try {
      const { id } = req.params;
      const project = await Projects.get(id);
  
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }
  
      // Assuming that you have a method to get actions associated with the project by ID
      const actions = await Projects.getProjectActions(id);
  
      // Check if there are actions for the project
      if (actions.length > 0) {
        return res.status(200).json(actions);
      } else {
        return res.status(200).json([]); // Return an empty array if no actions found
      }
    } catch (err) {
      console.error('Error getting project actions:', err);
      res.status(500).json({ message: 'Something went wrong while trying to fetch project actions' });
    }
  });
  
  






module.exports = projectsRouter;