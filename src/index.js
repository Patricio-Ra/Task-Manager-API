require('./db/mongoose');
const express = require('express');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');
const imageRouter = require('./routers/image');

const app = express();
const port = process.env.PORT || 3000;


// Body-Parser.
app.use(express.json());
// Routers.
app.use(userRouter);
app.use(taskRouter);
app.use(imageRouter);


// Listen
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});