'use strict';

const loader= require("./src/loaders");
const {router} = require("./src/routes/v1/api");
const config = require('./src/config/app');
const http = require("http");
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');

loader.app.use(loader.cors());
loader.app.use(bodyParser());
loader.app.use(router.routes());
loader.init();
http.createServer(loader.app.callback()).listen(config.port);


const Users = {};

const ClientSchema = {
    Country: String,
    FirstName: String,
    LastName: String,
    CompanyName: String,
    Street: String,
    OptionalAddr: String,
    City: String,
    County: String,
    Postcode: Number,
    Email: String,
    Phone: Number
};

// module.exports = {
//     Client: mongoose.model('Client', ClientSchema)
// }

const Client = mongoose.model('Client', ClientSchema);

router.get('/user/:id', async (ctx) => {
    const {id} = ctx.params;
    const respond = await Client.findOne({_id: new mongoose.Types.ObjectId(id)});
    if(respond){
        ctx.body = respond;
    }
    else{
        ctx.status = 404;
        ctx.body = {
            message: `${id} not found!`
        }
    }
});

router.post('/user', async (ctx) => {
    const {body} = ctx.request;
    const client = new Client(body);
    const {_id} = await client.save();
    ctx.status = 201;
    ctx.body = {
        message: 'Client Info Stored!',
        _id
    }
});

router.put('/user/:id', async (ctx) => {
      const {id} = ctx.params;
      const {body} = ctx.request;
      const respond = await Client.updateMany(
          {_id: new mongoose.Types.ObjectId(id)}, 
          {$set: {
            Country: body.Country,
            FirstName: body.FirstName,
            LastName: body.LastName,
            CompanyName: body.CompanyName,
            Street: body.Street,
            OptionalAddr: body.OptionalAddr,
            City: body.City,
            County: body.County,
            Postcode: body.Postcode,
            Email: body.Email,
            Phone: body.Phone
          }}
     );
     if(respond){
        ctx.body = {
            message: 'Updated Successfully!'
        }
     }
     else{
         ctx.status = 404;
         ctx.body = {
            message: `${id} not found!`
        }
     }
});

loader.app.listen(8080, async()=>{
    console.log('Server start at: 8080');
});