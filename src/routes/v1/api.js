const { router } = require("../../loaders");
const courseControllers = require("../../controllers/courses");
const blogController = require("../../controllers/blog/index");
const validateLogin = require("../../middleware/validateLogin");
const clientControllers = require("../../controllers/client");
const validateId = require("../../middleware/validateId");
const codeControllers = require("../../controllers/proCode");
const validateId = require("../../middleware/validateId");

router.get("/courses", courseControllers.index);
router.post("/courses", courseControllers.store);
router.get("/courses/:id", courseControllers.show);
router.patch("/courses/:id", courseControllers.update);
router.delete("/courses/:id", courseControllers.destroy);
router.get("/client/:id", validateId, clientControllers.show);
router.post("/client", clientControllers.store);
router.put("/client/:id", validateId, clientControllers.update);
router.get("/shopping-cart/:promoCode", codeControllers.getCode);
router.post("/shopping-cart", codeControllers.createCode);
router.put("/shopping-cart/:promoCode", codeControllers.updateCode);
router.delete("/shopping-cart/:promoCode", codeControllers.deleteCode);

//****blog router function****
//both shop manager and customer can check blog posts.
router.get("/blog/:page/:pageSize", blogController.getBlog);
//only shop manager can create, delete and modify blog.
router.post("/blog", validateLogin, blogController.createBlog);
router.put("/blog/:id", validateLogin, blogController.updateBlog);
router.delete("/blog/:id", validateLogin, blogController.deleteBlog);

module.exports.router = router;
