const Router = require("express");
const productController = require("../controllers/productController");
const checkRoleMiddleware = require("../middleware/checkRoleMiddleware");
const router = new Router();

router.get("/", productController.getProducts);
router.get("/all", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.get("/name/:name", productController.getProductByName);
router.get("/info/:id", productController.getProductInfo);
router.post("/", checkRoleMiddleware("admin"), productController.createProduct);
router.post(
  "/delete",
  checkRoleMiddleware("admin"),
  productController.deleteProduct
);

module.exports = router;
