// Write your "actions" router here!
const express = require('express')
const actionsRouter = express.Router();
const Actions = require("./actions-model")

actionsRouter.get('/', async(req,res)=>{
    res.send("actions router functional")
})






module.exports = actionsRouter;