const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

const connectionURL = 'mongodb://127.0.0.1:27017';
const dbName = 'task-manager';

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
        return console.log('Could not connect to the DB!', error);
    };

    const db = client.db(dbName);
    
    const users = db.collection('users');
    const tasks = db.collection('tasks');

    // users.insertOne({
    //     name: 'Patanego',
    //     age: 13*7
    // }, (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert document (user).', error);
    //     };
    //     console.log(result.ops);
    // });

    // users.insertMany([
    //     {
    //         name: 'Papá',
    //         age: 63
    //     },
    //     {
    //         name: 'Mama',
    //         age: 60
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert documents (users).', error);
    //     };
    //     console.log(result.ops);
    // });

    tasks.insertMany([
        {
            description: 'Finish Node.js course',
            completed: false
        },
        {
            description: 'Finish C# and JS Vanilla courses',
            completed: true
        },
        {
            description: 'Finish Accenture Academy and SQL basics',
            completed: true
        }
    ], (error, result) => {
        if (error) {
            console.log('Unable to insert documents (tasks).', error);
        };
        console.log(result.ops);
    });
});
