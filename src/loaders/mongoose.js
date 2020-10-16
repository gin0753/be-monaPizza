const mongoose = require('mongoose');

module.exports = async function () {
    const connection = await mongoose.connect('mongodb+srv://admin:admin@cluster0.c7jps.mongodb.net/lms?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    });
    return connection.connection.db;
};
