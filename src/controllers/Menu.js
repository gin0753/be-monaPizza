'use strict';

const Menu = require('../models/Menu');
const mongoose = require('mongoose');

exports.storePizza = async (ctx) => {
    const {body} = ctx.request;
    const pizza = new Menu(body);
    const {_id} = await pizza.save();
    ctx.status = 201;
    ctx.body = {
        message: 'Product Created!',
        _id
    }
}

exports.showOnePizza = async (ctx) => {
    const { name, size} = ctx.params;
    const respond = await Menu.findOne({PizzaName: name, Size: size});
    if(respond){
        ctx.body = respond;
    }
    else{
        ctx.status = 404;
        ctx.body = {
            message: `${name} or ${size} not found!`
        }
    }
}

exports.showBulkPizza = async (ctx) => {
    let { page, pageSize } = ctx.params;
    page = +page;
    pageSize = +pageSize;
    const skip = (page - 1) * pageSize;
    const total = await Menu.find().count();
    const pizzas = await Menu.find({}).skip(skip).limit(pageSize);

    ctx.body = {
        pizzas,
        total,
    }
}

exports.addPizza = async(ctx) => {
<<<<<<< HEAD
        const { body } = ctx.request;
        const pizza = new Menu(body);
        pizza.save();
        ctx.body = {
          code: 201,
          msg: pizza
        }
=======
    const { body } = ctx.request;
    const pizza = new Menu(body);
    pizza.save();
    ctx.body = {
        code: 201,
        msg: pizza
    }
>>>>>>> develop
}

exports.updatePizza = async (ctx) => {
    const {id} = ctx.params;
    const {body} = ctx.request;
    const {n} = await Menu.updateOne(
        {_id: new mongoose.Types.ObjectId(id)}, 
        {$set: body}
   );
   if(n !== 0){
      ctx.body = {
          message: 'Updated Successfully!'
      }
   }
   else{
       ctx.status = 404;
       ctx.body = {
          message: `Invalid ID : ${id}!`
      }
   }
}

exports.deletePizza = async (ctx) => {
    const { id } = ctx.params;
    const { n } = await Menu.deleteOne({ _id: new mongoose.Types.ObjectId(id)});
    if (n === 0) {
      ctx.body = {
        message: `${id} not found!`,
      };
      ctx.status = 404;
    } else {
      ctx.body = {
        message: `${id} deleted!`,
      };
      ctx.status = 200;
    }
  };
  