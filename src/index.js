require('./db/mongoose');
const express = require('express');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();
const port = process.env.PORT || 3000;

// General Middlewares
// Body-Parser.
app.use(express.json());
// Routers.
app.use(userRouter);
app.use(taskRouter);


// Listen
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});