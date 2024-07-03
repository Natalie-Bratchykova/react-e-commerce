const userRouter = require("./userRouter");
const typeRouter = require("./typeRouter");
const brandRouter = require("./brandRouter");
const productRouter = require("./productRouter");
const basketRouter = require("./basketRouter");
const Router = require("express");
const router = new Router();

router.use("/user", userRouter);
router.use("/user/basket", basketRouter);
router.use("/type", typeRouter);
router.use("/brand", brandRouter);
router.use("/product", productRouter);

module.exports = router;
