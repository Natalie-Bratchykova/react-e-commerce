const Router = require("express");
const router = new Router();
const authMiddleware = require("../middleware/authMiddleware");
const basketController = require("../controllers/basketController");

router.get("/:userId", authMiddleware, basketController.getBasket);
router.post("/:userId", authMiddleware, basketController.addToBasket);
router.post("/", authMiddleware, basketController.deleteFromBasket)

module.exports = router;
