require('./config/mongoose');
const express = require('express');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();

// Body-Parser.
app.use(express.json());
// Routers.
app.use(userRouter);
app.use(taskRouter);

module.exports = app;