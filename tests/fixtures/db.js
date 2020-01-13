const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../../src/models/user');
const Task = require('../../src/models/task');

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
    _id: userOneId,
    name: 'Test User',
    email: 'testuser@example.com',
    password: 'SomeTestingPasssword22',
    tokens: [{
        token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
    }]
};

const userTwoId = new mongoose.Types.ObjectId();
const userTwo = {
    _id: userTwoId,
    name: 'Test User 2',
    email: 'testuser2@example.com',
    password: 'SomeTestingPasssword22',
    tokens: [{
        token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET)
    }]
};

const taskOne = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Task number one',
    completed: false,
    owner: userOne._id
};

const taskTwo = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Task number two',
    completed: true,
    owner: userOne._id
};

const taskThree = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Task number three',
    completed: false,
    owner: userTwo._id
};

const setupDatabase = async () => {
    await User.deleteMany();
    await Task.deleteMany();
    await new User(userOne).save();
    await new User(userTwo).save();
    await new Task(taskOne).save();
    await new Task(taskTwo).save();
    await new Task(taskThree).save();
};

module.exports = {
    userOneId,
    userTwoId,
    userOne,
    userTwo,
    taskOne,
    setupDatabase
}