const { router } = require("../../loaders");
const courseControllers = require("../../controllers/courses");
const registerControllers = require("../../controllers/register");
const loginControllers = require("../../controllers/login");
const googleLoginControllers = require("../../controllers/googleLogin");
const verifyToken = require("../../middleware/verifyToken");

router.get('/courses', courseControllers.index);
router.post('/courses', courseControllers.store);
router.get('/courses/:id', courseControllers.show);
router.patch('/courses/:id', courseControllers.update);
router.delete('/courses/:id', courseControllers.destroy);
router.post('/register', registerControllers.store);
router.post('/login', loginControllers.store);
router.post('/googleLogin', googleLoginControllers.store);
module.exports.router = router;
