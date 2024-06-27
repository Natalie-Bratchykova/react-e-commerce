const Router = require("express");
const typeController = require("../controllers/typeController");
const checkRoleMiddleware = require("../middleware/checkRoleMiddleware");
const router = new Router();

router.get("/", typeController.getType);
router.post("/", checkRoleMiddleware("admin"), typeController.createType);

module.exports = router;
