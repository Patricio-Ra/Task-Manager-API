const express = require('express');
require('./db/mongoose');
const User = require('./models/user');
const Task = require('./models/task');

const app = express();


// Configs
const port = process.env.PORT || 3000;
app.use(express.json());


// Endpoints: CREATE
// POST Users
app.post('/users', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        res.status(201).send(user);
    } catch (e) {
        res.status(400).send(e);
    };
});

// POST Tasks
app.post('/tasks', async (req, res) => {
    const task = new Task(req.body);
    try {
        await task.save();
        res.status(201).send(task);
    } catch (e) {
        res.status(400).send(e);
    };
});


// Endpoints: READ ALL
// GET Users
app.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users)
    } catch (error) {
        res.status(500).send();
    };
});

// GET Tasks
app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.send(tasks);
    } catch (e) {
        res.status(500).send();
    };
});


// Endpoints: READ ONE.
// GET Users ID
app.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send();
        };
        res.send(user);
    } catch (e) {
        res.status(500).send();
    };
});

// GET Tasks ID
app.get('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).send();
        };
        res.send(task);
    } catch (e) {
        res.status(500).send();
    };
});


// Endpoints: UPGRADE
// Users
app.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'age', 'email', 'password'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid update within.'});
    };

    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
        if (!user) {
            return res.status(404).send();
        };
        res.send(user);
    } catch (e) {
        res.status(400).send(e);
    };
});

// Tasks
app.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));
    if (!isValidOperation) {
        return res.status(400).send({error: 'Invalid update within.'});
    };

    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!task) {
            return res.status(404).send();
        };
        res.send(task);
    } catch (e) {
        res.status(400).send();
    };
});


// Endpoints: DELETE
// Users
app.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send();
        };
        res.send(user);
    } catch (e) {
        res.status(500).send();
    };
});

// Tasks
app.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).send();
        };
        res.send(task);
    } catch (e) {
        res.status(500).send();
    };
});

// Listen
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});