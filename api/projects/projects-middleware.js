// add middlewares here related to projects
// add middlewares here related to actions

const Projects = require('./projects-model')


async function checkProjectExists(req,res,next) {
    try {
        const project = await Projects.get(req.params.id);
        if (project) {
          req.project = project;
          next();
        } else {
          next({ status: 404, message: 'Project not found' });
        }
      } catch (err) {
        next(err);
      }

    
}




module.exports = { checkProjectExists}