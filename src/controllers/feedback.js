'use strict';

const Feedback = require('../models/Feedback');

exports.addFeedback = async(ctx) => {
    const { body } = ctx.request;
    const feedback = new Feedback(body);
    feedback.save();
    ctx.status = 201;
    ctx.body = {
        message: `Feedback Has Been Created!`
    }
}