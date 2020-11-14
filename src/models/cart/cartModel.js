const mongoose = require('mongoose');


const Schema = mongoose.Schema;
 
const CartSchema = new Schema({
  user: { type : Schema.Types.ObjectId, required : true },
  pizza: { type : Schema.Types.ObjectId, required : true },
  qty: { type : Number, required : true },
  status: { type : String, required : true },
  totalPrice: { type : Number, required : true }
  // time: { type : Date, default: dateSydney }
});

module.exports = mongoose.model("Cart", CartSchema)