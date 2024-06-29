const Router = require("express");
const productController = require("../controllers/productController");
const checkRoleMiddleware = require("../middleware/checkRoleMiddleware");
const router = new Router();

router.get("/", productController.getProducts);
router.get("/:id", productController.getProductById);
router.get("/name/:name", productController.getProductByName);
router.post("/", checkRoleMiddleware("admin"), productController.createProduct);

module.exports = router;
