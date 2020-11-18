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
        }, 
        Size:{
            type: Array,
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