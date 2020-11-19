const { router } = require("../../loaders");

const courseControllers = require("../../controllers/courses");
const registerControllers = require("../../controllers/register");
const loginControllers = require("../../controllers/login");
const googleLoginControllers = require("../../controllers/googleLogin");
const verifyToken = require("../../middleware/verifyToken");
const blogController = require("../../controllers/blog/index");
const validateLogin = require("../../middleware/validateLogin");
const clientControllers = require("../../controllers/client");
const validateId = require("../../middleware/validateId");

const menuControllers = require("../../controllers/Menu");
const pizzaControllers = require("../../controllers/pizza");

const cartController = require("../../controllers/cart/cartController");
const validateCart = require("../../middleware/cartValidation");



// ******************************* Model: menu **************************

router.get("/menu/:name/:size", menuControllers.showOnePizza);
router.post("/menu/:page/:pageSize", menuControllers.showBulkPizza);
router.put("/menu/:id", validateId, menuControllers.updatePizza);
router.delete("/menu/:id", validateId, menuControllers.deletePizza);

// ******************************* Model: cart **************************


router.get("/cart/:id", validateCart.validateId, cartController.getCartById);
// http://localhost:3000/cart?userId="..."&pizzaName="..."&pizzaSize="..."
router.get("/cart", validateCart.validatePizzaInfo, cartController.getCartByInfo);
router.get("/cart/:userId/:page/:pageSize", validateCart.validatePageNum, cartController.getCartByUser);
router.post("/cart", cartController.createCart);
router.put("/cart/:id", validateCart.validateId, cartController.updateCart);
router.delete("/cart/:id", validateCart.validateId, cartController.deleteCart);



// ***************************** Log in *****************************

router.post('/register', registerControllers.store);
router.post('/login', loginControllers.store);
router.post('/googleLogin', googleLoginControllers.store);











// *********************** Tutor's Demo ****************************
router.get("/courses", courseControllers.index);
router.post("/courses", courseControllers.store);
router.get("/courses/:id", courseControllers.show);
router.patch("/courses/:id", courseControllers.update);
router.delete("/courses/:id", courseControllers.destroy);

// ********************************* Old version ****************** 

router.get("/client/:id", validateId, clientControllers.showUser);
router.post("/client", clientControllers.storeUser);
router.put("/client/:id", validateId, clientControllers.updateUser);
router.delete("/client/:id", validateId, clientControllers.deleteUser);

//As a shop manager, I want to add/edit/delete/check my pizzas.
router.get('/pizza', pizzaControllers.getAllPizza);
router.get('/pizza/:id', pizzaControllers.getPizzaById);
router.get('/pizza/:id', pizzaControllers.getPizzaByName);
router.post('/pizza', pizzaControllers.addPizza);
router.patch('/pizza/:id', pizzaControllers.updatePizza);
router.delete('/pizza/:id', pizzaControllers.deletePizza);

// ********************************* Old version ****************** 




//****blog router function****
//both shop manager and customer can check blog posts.
router.get("/blog/:page/:pageSize", blogController.getBlog);
//only shop manager can create, delete and modify blog.
router.post("/blog", validateLogin, blogController.createBlog);
router.put("/blog/:id", validateLogin, blogController.updateBlog);
router.delete("/blog/:id", validateLogin, blogController.deleteBlog);





module.exports.router = router;
