const { router } = require("../../loaders");

const registerControllers = require("../../controllers/register");
const loginControllers = require("../../controllers/login");
const googleLoginControllers = require("../../controllers/googleLogin");
const blogController = require("../../controllers/blog/index");
const clientControllers = require("../../controllers/client");
const orderControllers = require("../../controllers/order");
const menuControllers = require("../../controllers/Menu");
const pizzaControllers = require("../../controllers/pizza");
const cartController = require("../../controllers/cart/cartController");
const paymentController = require("../../controllers/checkout");
const promoCodeController = require("../../controllers/promoCode/proCode");
const loginConfirmation = require("../../controllers/loginConfirmation");
const feedbackController = require("../../controllers/feedback");

const validateCode = require("../../middleware/codeValidation");
const validateCart = require("../../middleware/cartValidation");
const validateId = require("../../middleware/validateId");
const validateLogin = require("../../middleware/validateLogin");
const verifyToken = require("../../middleware/verifyToken");
const verifyRole = require("../../middleware/verifyRole");

// ******************************* menu **************************

router.get("/menu/:name/:size", menuControllers.showOnePizza);
router.post("/menu/:page/:pageSize", menuControllers.showBulkPizza);
router.post("/menu", verifyToken, verifyRole('ROLE.ADMIN'), menuControllers.addPizza);
router.put("/menu/:userId/:pizzaName", verifyToken, verifyRole('ROLE.ADMIN'), menuControllers.updatePizza);
router.delete("/menu/:userId/:pizzaName", verifyToken, verifyRole('ROLE.ADMIN'), menuControllers.deletePizza);

// ***************************** cart **************************

router.get("/cart/:id", validateCart.validateId, cartController.getCartById);
// http://localhost:3000/cart?userId="..."&pizzaName="..."&pizzaSize="..."
router.get("/cart", validateCart.validatePizzaInfo, cartController.getCartByInfo);
router.get("/cart/:userId/:page/:pageSize", validateCart.validatePageNum, cartController.getCartByUser);
router.post("/cart", cartController.createCart);
router.put("/cart/:id", validateCart.validateId, cartController.updateCart);
router.delete("/cart/:id", validateCart.validateId, cartController.deleteCart);
router.delete("/cart", cartController.deleteBulkCart);

// ***************************** promoCode **************************

// promoCode is a six digital number
router.get("/promoCode/:id", validateCode.validateId, promoCodeController.getCodeById);
router.get("/promoCode", validateCode.validateCodeInfo, promoCodeController.getCodeByNum);
router.post("/promoCode", validateCode.validateCodePost, promoCodeController.createCode);
router.put("/promoCode/:id", validateCode.validateId, promoCodeController.updateCode);
router.delete("/promoCode/:id", validateCode.validateId, promoCodeController.deleteCode);

// ***************************** log in *****************************

router.get('/login/:userId/:currentPassword', loginControllers.matchPassword);
router.post('/register', registerControllers.store);
router.post('/login', loginControllers.store);
router.post('/googleLogin', googleLoginControllers.store);
router.put('/login/:userId', loginControllers.updatePassword);

// ***************************** email confirmation *****************************

router.get('/confirmation/:token', loginConfirmation.emailConfirm);
// router.post('/resend', userController.resendTokenPost);

// ***************************** Order *****************************

router.get('/order/:id', orderControllers.displayOneOrder);
router.get('/order/:userId/:page/:pageSize', orderControllers.displayClientOrder);
router.post('/order', orderControllers.generateOrder);
router.post('/order/:status/:page/:pageSize', orderControllers.displayPeningOrders);
router.put('/order/:id', orderControllers.updateOneOrder)
router.delete('/order/:id', orderControllers.deleteOrder);

// ***************************** client *****************************

router.get("/client/:userId", clientControllers.showUser);
router.post("/client", clientControllers.storeUser);
router.put("/client/:userId", clientControllers.updateUser);
router.delete("/client/:id", validateId, clientControllers.deleteUser);

// ***************************** pizza *****************************

router.get('/pizza', pizzaControllers.getAllPizza);
router.get('/pizza/:id', pizzaControllers.getPizzaById);
router.get('/pizza/:id', pizzaControllers.getPizzaByName);
router.post('/pizza', pizzaControllers.addPizza);
router.patch('/pizza/:id', pizzaControllers.updatePizza);
router.delete('/pizza/:id', pizzaControllers.deletePizza);

// ***************************** feedback *****************************
router.post('/feedback', feedbackController.addFeedback);

// ***************************** blog *****************************

//both shop manager and customer can check blog posts.
router.get("/blog/:page/:pageSize", blogController.getBlog);
//only shop manager can create, delete and modify blog.
router.post("/blog", validateLogin, blogController.createBlog);
router.put("/blog/:id", validateLogin, blogController.updateBlog);
router.delete("/blog/:id", validateLogin, blogController.deleteBlog);

// ***************************** payment *****************************

router.post("/checkout", verifyToken, paymentController.processPayment)


module.exports.router = router;