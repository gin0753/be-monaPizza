'use strict';

const Users = require('../models/user');
const Nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken'); 
const jwtSecret = 'jwtSecret';

exports.store = async (ctx) => {
    const findUser = await Users.findOne({ Email: ctx.request.body.Email}).exec();
    const {body} = ctx.request;
    const user = new Users(body);
    const {_id} = await user.save();

    if(findUser){
      ctx.status = 409;
      ctx.body = {
        message: 'User Exists!',
      }
    }
    else{
      try{
        const emailToken = jwt.sign({user: _id}, jwtSecret, {expiresIn: '1d'}); 
     
        const verificationURL = `http://127.0.0.1:8000/confirmation/${emailToken}`
     
        let transporter = Nodemailer.createTransport({
          host: "smtp.ethereal.email",
          service: "Gmail",
          port: 587,
          secure: false,
          auth: {
            user: "no.replymonapizza@gmail.com",
            pass: "197346285Mm"
          },
        })
    
        let mailOptions = ({
          from: 'no.replymonapizza@gmail.com',
          to:  'ginrobin0204@gmail.com', 
          subject: "Email Confirmation",
          html: `<b>Please click the link to confirm your Email: <a href="${verificationURL}">${verificationURL}</a></b>`, // html body
        });
    
        await transporter.sendMail(mailOptions, async(err) => {
          if(err){
            ctx.status = 500;
            ctx.body = {
              message: err.message
            }
          } 
        })
        
        ctx.status = 201;
        ctx.body = {
          message: 'User Created!',
          _id,
          token: emailToken
        }
      } catch (err){
        ctx.status = 422;
        ctx.body = {
          message: err.message
        }
      }
    }
}









  