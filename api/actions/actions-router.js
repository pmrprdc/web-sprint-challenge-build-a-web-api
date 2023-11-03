// Write your "actions" router here!
const express = require('express')
const actionsRouter = express.Router();
const Actions = require("./actions-model")

actionsRouter.get('/', async(req,res)=>{
    res.status(200).json({
        message: "actions router able to return json"
    })
})






module.exports = actionsRouter;