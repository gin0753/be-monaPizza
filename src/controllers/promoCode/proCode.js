'use strict';

const mongoose = require('mongoose');
const Code = require('../../models/proCode');

exports.getCodeById = async (ctx) => {

    const { id } = ctx.params;

    const res = await Code.findOne({ _id: id });


    if (res) {
        ctx.status = 200;
        ctx.body = res;
    } else {
        ctx.status = 404;
        ctx.body = {
            message: "Nothing is found"
        }
    }

}

exports.getCodeByNum = async (ctx) => {

    const { codeNum } = ctx.request.query;

    const res = await Code.findOne({ codeNum });

    if (res) {
        ctx.status = 200;
        ctx.body = res;
    } else {
        ctx.status = 404;
        ctx.body = {
            message: "It is not found"
        }
    }
}

exports.createCode = async (ctx) => {
    // {
    //     "codeNum": 2566,
    //     "discount": 5
    // }
    const { body } = ctx.request;

    const code = new Code(body);
    const { _id } = await code.save();

    ctx.status = 201;
    ctx.body = {
        _id,
        message: "Successfully created"
    }

}

exports.updateCode = async (ctx) => {
    const { body } = ctx.request;
    const { id } = ctx.params;


    const { n } = await Code.updateOne(
        { codeNum: id },
        {
            $set: body,
        }
    );

    if (n === 0) {
        ctx.body = {
            message: `${id} not found!`,
        };
        ctx.status = 404;
    } else {
        ctx.status = 200;
    }

}

exports.deleteCode = async (ctx) => {
    const { id } = ctx.params;
    const { n } = await Code.deleteOne({ codeNum: id });
    if (n === 0) {
        ctx.body = {
            message: `${id} not found!`,
        };
        ctx.status = 404;
    } else {
        ctx.status = 200;
    }
}