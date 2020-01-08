require('./config/mongoose');
const express = require('express');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');
const imageRouter = require('./routers/image');

const app = express();
const PORT = process.env.PORT;

// Body-Parser.
app.use(express.json());
// Routers.
app.use(userRouter);
app.use(taskRouter);
app.use(imageRouter);

// Listen
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});