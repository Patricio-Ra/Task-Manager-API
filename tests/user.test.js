const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user');
const { userOneId, userOne, setupDatabase } = require('./fixtures/db');

// Life-cicle method.
beforeEach(setupDatabase);

// Singup tests.
test('Should singup a new user', async () => {
    const response = await request(app)
        .post('/users')
        .send({
            name: 'Patricio',
            email: 'patricio@example.com',
            password: 'SomePass88'
        }).expect(201);
    const user = await User.findById(response.body.user._id);
    expect(user).not.toBeNull();
    expect(user.password).not.toBe('SomePass88');
    expect(response.body).toMatchObject({
        user: {
            name: 'Patricio'
        },
        token: user.tokens[0].token
    });
});

// Login tests.
test('Should login existing user', async () => {
    const response = await request(app)
        .post('/users/login')
        .send({
            email: userOne.email,
            password: userOne.password
        }).expect(200);
    const user = await User.findById(userOneId);
    expect(response.body.token).toBe(user.tokens[1].token);
});

test('Should not login nonexisting user', async () => {
    await request(app)
        .post('/users/login')
        .send({
            email: userOne.email,
            password: 'nonexistingpasswd'
        }).expect(400);

    await request(app)
        .post('/users/login')
        .send({
            email: 'nonexistingemail@example.com',
            password: userOne.password
        }).expect(400);
});

// Read user.
test('Should get user profile', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);
});

test('Should not get user profile for unauthorized user', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401);
});

// Delete user.
test('Should delete the user', async () => {
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);
    const user = await User.findById(userOneId);
    expect(user).toBeNull();
});

test('Should not delete account for unauthorized user', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401);
});

// Upload User Avatar.
test('Should upload an avatar', async () => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', './tests/fixtures/profile-pic.jpg')
        .expect(200);
    const user = await User.findById(userOneId);
    expect(user.avatar).toEqual(expect.any(Buffer));
});

// Update users.
test('Should update valid user fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({ name: 'Changed Test User', age: 10 })
        .expect(200);
    const user = await User.findById(userOneId);
    //expect(user).toMatchObject({ name: 'Changed Test User', age: 10 });
    expect(user.name).toEqual('Changed Test User');
    expect(user.age).toEqual(10);
});

test('Should not update invalid users fields', async () => {
    const response = await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({ nonExistingField: 'SomeValue' })
        .expect(400);
    expect(response.body.error).toEqual('Invalid update within.');
});