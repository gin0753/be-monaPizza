'use strict';

const mongoose = require('mongoose');

const MenuSchema = new mongoose.Schema(
    {   
        PizzaName: {
            type: String,
            required: true,
            unique: true
        },
        Description:{
            type: String,
            required: true
        },
        Price: {
            type: Object,
            required:true
        }
    },    
);

const Menu = mongoose.model('Menu', MenuSchema);
module.exports = Menu;