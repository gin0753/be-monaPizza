const { router } = require("../../loaders");
const  courseControllers = require("../../controllers/courses");


router.get('/courses', courseControllers.index);
router.post('/courses', courseControllers.store);
router.get('/courses/:id', courseControllers.show);
router.patch('/courses/:id', courseControllers.update);
router.delete('/courses/:id', courseControllers.destroy);
module.exports.router = router;
