// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectID;

const { MongoClient, ObjectID } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const dbName = 'task-manager';

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
        return console.log('Could not connect to the DB!', error);
    };

    const db = client.db(dbName);
    
    const users = db.collection('users');
    const tasks = db.collection('tasks');

    // users.findOne({ _id: new ObjectID("5dfaccba579afa1350f92520")}, (error, user) => {
    //     if (error) {
    //         return console.log('Unable to fetch.', error);
    //     };
    //     console.log(user);
    // });

    // users.find({ age: 31 }).toArray((error, users) => {
    //     if (error) {
    //         return console.log('Unable to fetch.', error);
    //     };
    //     console.log(users);
    // });

    // users.find({ age: 31 }).count((error, count) => {
    //     if (error) {
    //         return console.log('Unable to fetch.', error);
    //     };
    //     console.log(count);
    // });

    // tasks.findOne({_id: new ObjectID("5dfbf2141431bd52a836159c")}, (error, task) => {
    //     if (error) {
    //         return console.log(error);
    //     };
    //     console.log(task);
    // });

    // tasks.find({completed: false}).toArray((error, tasks) => {
    //     if (error) {
    //         return console.log(error);
    //     };
    //     console.log(tasks);
    // });

});
