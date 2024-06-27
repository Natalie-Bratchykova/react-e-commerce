const Router = require("express");
const userController = require("../controllers/userController");
const { check } = require("express-validator");
const authMiddleware = require("../middleware/authMiddleware");
const router = new Router();

router.post(
  "/registration",
  [
    check("email", "Please, input email").isEmail(),
    check(
      "password",
      "Password's length should be between 10 and 50 characters"
    ).isLength({ min: 5, max: 50 }),
  ],
  userController.registration
);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/auth", authMiddleware, userController.authCheck);

module.exports = router;
