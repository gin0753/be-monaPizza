const { router } = require("../../loaders");
const courseControllers = require("../../controllers/courses");
const registerControllers = require("../../controllers/register");
const loginControllers = require("../../controllers/login");
const verifyToken = require("../../middleware/verifyToken");


router.get('/courses', courseControllers.index);
router.post('/courses', courseControllers.store);
router.get('/courses/:id', courseControllers.show);
router.patch('/courses/:id', courseControllers.update);
router.delete('/courses/:id', courseControllers.destroy);
router.post('/register', registerControllers.store);
router.get('/login', verifyToken, loginControllers.show);
router.post('/login', verifyToken, loginControllers.store);
module.exports.router = router;
