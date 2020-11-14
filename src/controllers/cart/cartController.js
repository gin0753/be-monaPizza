const Cart = require("../../models/cart/cartModel");
const Menu = require("../../models/Menu");

const getById = async (ctx) => {
    const { id } = ctx.params;

    const res = await Cart.findOne({ _id: id })
    if (res) {
        ctx.status = 200;
        ctx.body = res
    } else {
        ctx.status = 404;
        ctx.body = {
            message: "Nothing is found"
        }
    }
}

const getByInfo = async (ctx) => {
    const { userId, pizzaId } = ctx.request.query;

    if (pizzaId === undefined) {
        const res = await Cart.find({ user: userId })

        if (res) {
            ctx.status = 200;
            ctx.body = res;
        } else {
            ctx.status = 404;
            ctx.body = {
                message: "Failed to load pizzas"
            }
        }

    } else {
        // const res = await Cart.findOne({ user: userId, pizza: pizzaId });
        const res = await Cart.find({
            $or: [
                { user: userId },
                { pizza: pizzaId }
            ]
        })

        if (res) {
            ctx.status = 200;
            ctx.body = res;
        } else {
            ctx.status = 404;
            ctx.body = {
                message: "This record is not found"
            }
        }
    }
}


const createCartRecord = async (ctx) => {

    const { body } = ctx.request;
    const { user, pizza } = body;

    const res_findMenu = await Menu.findOne({ _id: pizza })

    if (res_findMenu) {
        const { Price } = res_findMenu;

        const newObj = {
            user,
            pizza,
            qty: 1,
            totalPrice: Price,
            status: "pending"
            // change to "fulfilled" once this order is done
        }

        const cart = new Cart(newObj);
        const res = await cart.save(newObj);

        if (res) {
            ctx.status = 201;
            ctx.body = {
                _id: res._id,
                message: "Successfully created a record in cart"
            }
        } else {
            ctx.status = 404;
            ctx.body = {
                message: "Failed to create a record in cart"
            }
        }
    } else {
        ctx.status = 404;
        ctx.body = {
            message: "Failed to find the pizza"
        }
    }


}


const updateCart = async (ctx) => {

    const { id } = ctx.params;
    const { body } = ctx.request;
    const { action } = body;

    if (action === "Add") {

        const res_findOne = await Cart.findOne({ _id: id });

        if (res_findOne) {

            const res_updateOne = await Cart.updateOne(
                { _id: id },
                {
                    $set: {
                        qty: res_findOne.qty + 1,
                        totalPrice: res_findOne.totalPrice * (res_findOne.qty + 1) / (res_findOne.qty)
                    }
                }
            )

            const { n } = res_updateOne;

            if (n > 0) {
                ctx.status = 200;
                ctx.body = {
                    _id: id,
                    message: "Successfully added one pizza for this user"
                }
            } else {
                ctx.status = 404;
                ctx.body = {
                    message: "Failed to add pizzas"
                }
            }

        } else {
            ctx.status = 404;
            ctx.body = {
                message: "Failed to find the cart record"
            }
        }

    } else if (action === "Delete") {

        const res_findOne = await Cart.findOne({ _id: id });

        if (res_findOne) {

            const { qty, totalPrice } = res_findOne;

            if (qty > 0) {

                const res_updateOne = await Cart.updateOne(
                    { _id: id },
                    {
                        $set: {
                            qty: qty - 1,
                            totalPrice: totalPrice * (qty - 1) / qty
                        }
                    }
                )

                const { n } = res_updateOne;

                if (n > 0) {
                    ctx.status = 200;
                    ctx.body = {
                        _id: id,
                        message: "Successfully deleted one pizza for this user"
                    }
                } else {
                    ctx.status = 404;
                    ctx.body = {
                        message: "Failed to add pizzas"
                    }
                }

            } else {
                const res = await Cart.deleteOne({ _id: id });

                if (res) {
                    ctx.status = 200;
                    ctx.body = {
                        _id: id,
                        message: "Successfully deleted the record"
                    }
                } else {
                    ctx.status = 404;
                    ctx.body = {
                        message: "Failed to delete the record"
                    }
                }
            }


        } else {
            ctx.status = 404;
            ctx.body = {
                message: "Failed to find the record"
            }
        }

    } else {
        ctx.status = 400;
        ctx.body = {
            message: "Please have the correct action 'Add' or 'Delete'"
        }
    }

}

const deleteCart = async (ctx) => {

    const { id } = ctx.params;

    const res = await Cart.deleteOne({ _id: id });

    if (res) {
        ctx.status = 200;
        ctx.body = {
            _id: id,
            message: "Successfully deleted the record"
        }
    } else {
        ctx.status = 404;
        ctx.body = {
            message: "Failed to delete the record"
        }
    }
}

module.exports = {
    getById,
    getByInfo,
    createCartRecord,
    updateCart,
    deleteCart
}