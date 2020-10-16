const mongosse = require('mongoose');

const courseSchema = new mongosse.Schema(
    {
        user_id: {
            type: Number,
            required: true,
        },
        price: {
            type: Number,
            required: true,
            trim: true,
        },
        comments: {
            type: String,
            required: true,
            trim: true,
        },
    }, {timestamps: true},
);


const Course = mongosse.model('Course', courseSchema);
module.exports = Course;
