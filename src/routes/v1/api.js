const { router } = require("../../loaders");
const  courseControllers = require("../../controllers/courses");
const clientControllers = require("../../controllers/client");
const validateId =require("../../middleware/validateId");

router.get('/courses', courseControllers.index);
router.post('/courses', courseControllers.store);
router.get('/courses/:id', courseControllers.show);
router.patch('/courses/:id', courseControllers.update);
router.delete('/courses/:id', courseControllers.destroy);
router.get('/user/:id', validateId, clientControllers.show);
router.post('/user', clientControllers.store);
router.put('/user/:id', validateId, clientControllers.update);
module.exports.router = router;


