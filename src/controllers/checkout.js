const stripe = require("stripe")("sk_test_51Hqd19DahGEftvCwTq7hrLvteF6vtR9rtAoKgkpoIokbFHvbsjI3mXNZSav7Cd7lKgxc6H6cIUySRKNklTFwv8H500SRE7dwHa")

exports.processPayment = async (ctx) => {
    try{
        const {token, product} = ctx.request.body;
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        })

        const charge = await stripe.charges.create({
            amount: product.price,
            currency: 'aud',
            customer: customer.id,
            receipt_email: token.email,
            description: 'Purchased pizza',
        });
        ctx.status = 200;
    }
    catch (e) {
        console.log(e);
        ctx.status = 422;
    }
}