const mongoose = require('mongoose');
const Course = require('../models/course');

//get all courses
exports.index =  (ctx) => {
    ctx.body = "abc";
};

//show 1 course
exports.show = (ctx) => {

};

//create course
exports.store = (ctx) => {
    let {body} = ctx.request;
    const course = new Course(body);

    course.save();
    ctx.status = 200;
    ctx.body = {message: course};
};

//update course
exports.update = (ctx) => {
};

//delete course
exports.destroy = (ctx) => {

};
