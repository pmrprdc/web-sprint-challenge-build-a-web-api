const express = require('express');
const server = express();
const actionsRouter = require("./actions/actions-router")

// Configure your server here
server.use(express.json())
// Build your actions router in /api/actions/actions-router.js
server.use("/api/actions", actionsRouter)
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

module.exports = server;
