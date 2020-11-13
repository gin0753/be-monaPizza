const { router } = require("../../loaders");
const courseControllers = require("../../controllers/courses");
const blogController = require("../../controllers/blog/index");
const validateLogin = require("../../middleware/validateLogin");
const clientControllers = require("../../controllers/client");
const validateId = require("../../middleware/validateId");
const codeControllers = require("../../controllers/proCode");
const menuControllers = require("../../controllers/Menu");

router.get("/courses", courseControllers.index);
router.post("/courses", courseControllers.store);
router.get("/courses/:id", courseControllers.show);
router.patch("/courses/:id", courseControllers.update);
router.delete("/courses/:id", courseControllers.destroy);

router.get("/client/:id", validateId, clientControllers.showUser);
router.post("/client", clientControllers.storeUser);
router.put("/client/:id", validateId, clientControllers.updateUser);
router.delete("/client/:id", validateId, clientControllers.deleteUser);

router.get("/shopping-cart/:promoCode", codeControllers.getCode);
router.post("/shopping-cart", codeControllers.createCode);
router.put("/shopping-cart/:promoCode", codeControllers.updateCode);
router.delete("/shopping-cart/:promoCode", codeControllers.deleteCode);
//As a shop manager, I want to add/edit/delete/check my pizzas.
router.get('/pizza', pizzaControllers.getAllPizza);
router.get('/pizza/:id', pizzaControllers.getPizzaById);
router.get('/pizza/:id', pizzaControllers.getPizzaByName);
router.post('/pizza', pizzaControllers.addPizza);
router.patch('/pizza/:id', pizzaControllers.updatePizza);
router.delete('/pizza/:id', pizzaControllers.deletePizza);
//****blog router function****
//both shop manager and customer can check blog posts.
router.get("/blog/:page/:pageSize", blogController.getBlog);
//only shop manager can create, delete and modify blog.
router.post("/blog", validateLogin, blogController.createBlog);
router.put("/blog/:id", validateLogin, blogController.updateBlog);
router.delete("/blog/:id", validateLogin, blogController.deleteBlog);

router.get("/menu/:name/:size", menuControllers.showOnePizza);
router.post("/menu/:page/:pageSize", menuControllers.showBulkPizza);
router.put("/menu/:id", validateId, menuControllers.updatePizza);
router.delete("/menu/:id", validateId, menuControllers.deletePizza);

module.exports.router = router;
