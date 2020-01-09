const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL,
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then(connection => {
        console.log('DB connection stablish..');
    })
    .catch(error => {
        console.log('Could not connect to DB: ' + error);
    });
