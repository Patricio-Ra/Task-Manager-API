require('./db/mongoose');
const express = require('express');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();
const port = process.env.PORT || 3000;

// Register Middlewares
app.use((req, res, next) => {
    res.status(503).send('API under maintenance. Please try again soon.');
});
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

// Listen
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});