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
app.post('/users', (req, res) => {
    const user = new User(req.body);
    user.save().then(user => {
        res.status(201).send(user);
    }).catch(e => {
        res.status(400).send(e);
    });
});

// POST Tasks
app.post('/tasks', (req, res) => {
    const task = new Task(req.body);
    task.save().then(task => {
        res.status(201).send(task);
    }).catch(e => {
        res.status(400).send(e);
    });
});


// Endpoints: READ ALL
// GET Users
app.get('/users', (req, res) => {
    User.find({}).then(users => {
        res.send(users);
    }).catch(e => {
        res.status(500).send();
    });
});

// GET Tasks
app.get('/tasks', (req, res) => {
    Task.find({}).then(tasks => {
        res.send(tasks);
    }).catch(e => {
        res.status(500).send();
    });
});


// Endpoints: READ ONE.
// GET Users ID
app.get('/users/:id', (req, res) => {
    const _id = req.params.id;
    User.findById(_id).then(user => {
        if (!user) {
            return res.status(404).send();
        };
        res.send(user);
    }).catch(e => {
        res.status(500).send();
    });
});

// GET Tasks ID
app.get('/tasks/:id', (req, res) => {
    const _id = req.params.id;
    Task.findById(_id).then(task => {
        if (!task) {
            return res.status(404).send();
        };
        res.send(task);
    }).catch(e => {
        res.status(500).send();
    });
});




// Listen
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});