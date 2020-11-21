const mongoose = require('mongoose');

const Schema = mongoose.Schema;
 
const ObjectId = Schema.Types.ObjectId;

const CartSchema = new Schema({
    userId: { 
        type: ObjectId,
        required: true
    },
    pizzaName: {
        type: String,
        required: true
    },
    pizzaSize: {
        type: String,
        required: true
    },
    pizzaPrice: {
        type: Number,
        required: true
    },
    qty: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    status: String
});

module.exports = mongoose.model("Cart", CartSchema)