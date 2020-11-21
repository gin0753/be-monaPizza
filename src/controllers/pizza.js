const Course = require('../models/course');
const PizzaModel = require('../models/pizza');

//get all pizza
exports.getAllPizza = (ctx) => {
  const pizza = PizzaModel.find();
  ctx.body = {msg: pizza}
} 
//get pizza by id
exports.getPizzaById = (ctx) => {
  const { pizzaId } = ctx.request.query;
  const pizza = PizzaModel.findById(pizzaId);
  if (!pizza) {
    ctx.body = {
      code: 404,
      msg: "pizza not found"
    }
  }else {
    ctx.body = {
      msg: pizza
    }
  }
}
//get pizza by name
exports.getPizzaByName = (ctx) => {
  const pizzaName = ctx.request.query;
  const pizza = PizzaModel.findById(pizzaId);
  if (!pizza) {
    ctx.body = {
      code: 404,
      msg: "pizza not found"
    }
  }else {
    ctx.body = {
      msg: pizza
    }
  }
}
//add pizza
exports.addPizza = (ctx) => {
  const { body } = ctx.request;
  const pizza = new PizzaModel(body);
  pizza.save();
  ctx.body = {
    code: 201,
    msg: pizza
  } 
}
//update pizza by id
exports.updatePizza = (ctx) => {
  const { pizzaId } = ctx.request.query;
  const { body } = ctx.request;
  const newPizza = PizzaModel.findByIdAndUpdate(
    pizzaId,
    body,
    { new: true }
  );
  if (!newPizza) {
    ctx.body = {
      code: 404,
      msg: "pizza not found"
    }
  } else {
    ctx.body = {
      msg: newPizza
    }
  }
}
//delete pizza
exports.deletePizza = (ctx) => {
  const { pizzaId } = ctx.request.query;
  const deletedPizza = PizzaModel.findByIdAndDelete(pizzaId);
  if (!deletedPizza) {
    ctx.body = {
      code: 404,
      msg: "pizza not found"
    }
  } else {
    ctx.status = 200;
  }
}