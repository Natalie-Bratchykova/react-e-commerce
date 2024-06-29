const Router = require("express");
const brandController = require("../controllers/brandController");
const checkRoleMiddleware = require("../middleware/checkRoleMiddleware");
const router = new Router();

router.get("/", brandController.getBrand);
router.get("/:id", brandController.getBrandById);
router.post("/", checkRoleMiddleware('admin'), brandController.createBrand);

module.exports = router;
