const { router } = require("../../loaders");
const courseControllers = require("../../controllers/courses");
const blogController = require("../../controllers/blog/index");
const validateLogin = require("../../middleware/validateLogin");

router.get("/courses", courseControllers.index);
router.post("/courses", courseControllers.store);
router.get("/courses/:id", courseControllers.show);
router.patch("/courses/:id", courseControllers.update);
router.delete("/courses/:id", courseControllers.destroy);

//****blog router function****
//both shop manager and customer can check blog posts.
router.get("/blog/:page/:pageSize", blogController.getBlog);

//only shop manager can create, delete and modify blog.
router.post("/blog", validateLogin, blogController.createBlog);
router.put("/blog/:id", validateLogin, blogController.updateBlog);
router.delete("/blog/:id", validateLogin, blogController.deleteBlog);

module.exports.router = router;
