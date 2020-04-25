
const db = require('../config/db');
const mongoose = require('mongoose');
mongoose.connect(db.url, { useCreateIndex: true, useNewUrlParser: true });
mongoose.Promise = global.Promise;

module.exports = {
    User: require('../users/user.model')
};