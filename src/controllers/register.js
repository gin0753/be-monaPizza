'use strict';

const Users = require('../models/user');
const Nodemailer = require('nodemailer');


exports.store = async (ctx) => {
    const findUser = await Users.findOne({ Email: ctx.request.body.Email}).exec();

    let transporter = Nodemailer.createTransport({
      host: "smtp.ethereal.email",
      service: "gmail",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "no.replymonapizza@gmail.com", // generated ethereal user
        pass: "197346285Mm", // generated ethereal password
      },
    })

    let mailOptions = ({
      from: 'no.replymonapizza@gmail.com', // sender address
      to:  'ginrobin0204@gmail.com', // list of receivers
      subject: "Email Confirmation", // Subject line
      text: "Please click the link to confirm your Email", // plain text body
      html: "<b>Please click the link to confirm your Email</b>", // html body
    });

    if(findUser){
      ctx.status = 409;
      ctx.body = {
        message: 'User Exists!',
      }
    }
    else{
      try{
        await transporter.sendMail(mailOptions)
        const {body} = ctx.request;
        const user = new Users(body);
        const {_id} = await user.save();
        ctx.status = 201;
        ctx.body = {
          message: 'User Created!',
          _id
        }
      } catch (err){
        ctx.status = 422;
        ctx.body = {
          message: err
        }
      }
    }
}









  