const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
    debugger;
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, 'thisismytaskapplication');
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });
        if (!user) {
            throw new Error();
        };
        req.user = user;
        next();
    } catch (e) {
        res.status(401).send('Please authenticate.');
    };
};

module.exports = auth;