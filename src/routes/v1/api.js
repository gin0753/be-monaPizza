const { router } = require("../../loaders");
const courseControllers = require("../../controllers/courses");
const clientControllers = require("../../controllers/client");
const codeControllers = require("../../controllers/proCode")
const validateId = require("../../middleware/validateId");

router.get('/courses', courseControllers.index);
router.post('/courses', courseControllers.store);
router.get('/courses/:id', courseControllers.show);
router.patch('/courses/:id', courseControllers.update);
router.delete('/courses/:id', courseControllers.destroy);
router.get('/client/:id', validateId, clientControllers.show);
router.post('/client', clientControllers.store);
router.put('/client/:id', validateId, clientControllers.update);
router.get("/shopping-cart/:promoCode", codeControllers.getCode);
router.post("/shopping-cart", codeControllers.createCode);
router.put("/shopping-cart/:promoCode", codeControllers.updateCode);
router.delete("/shopping-cart/:promoCode", codeControllers.deleteCode);
module.exports.router = router;


