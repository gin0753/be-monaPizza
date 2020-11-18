const mongoose = require('mongoose');

module.exports = async function () {
    const connection = await mongoose.connect('mongodb+srv://admin:admin@cluster0.wonw4.mongodb.net/Mona-pizza?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    });
    console.log(mongoose.connection.readyState);
    if (mongoose.connection.readyState === 0) {
        console.log("Database Error");
    }
    else { console.log("Successfully connected to database.");}
    return connection.connection.db;
};
