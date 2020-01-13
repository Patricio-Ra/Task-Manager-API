const request = require('supertest');
const Task = require('../src/models/task');
const app = require('../src/app');
const { userOneId, userOne, setupDatabase } = require('./fixtures/db');

// Life-cicle method.
beforeEach(setupDatabase);

test('Should create task for user', async () => {
    const response = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({ 
            description: 'The Testing Task'
        })
        .expect(201);
    const task = await Task.findById(response.body._id);
    expect(task).not.toBeNull();
    expect(task.owner).toEqual(userOne._id);
});