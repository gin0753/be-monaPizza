'use strict';

const mongoose = require('mongoose');

const MenuSchema = new mongoose.Schema(
    {   
        PizzaName: {
            type: String,
            required: true
        },
        Description:{
            type: String,
            required: true
        },
        PizzaImage: { 
            required: false
            // data: Buffer, 
            // contentType: String 
        }, 
        Size:{
            type: String,
            required: true
        },
        Price: {
            type: Number,
            required:true
        }
    },    
);

const Menu = mongoose.model('Menu', MenuSchema);
module.exports = Menu;