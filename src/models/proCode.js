'use strict';

const mongoose = require('mongoose');

const CodeSchema = {
    codeNum: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
};

module.exports = mongoose.model('Code', CodeSchema);
