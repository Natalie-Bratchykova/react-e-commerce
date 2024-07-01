const { Basket, BasketProduct } = require("../models/models");

class BasketController {
  async getBasket(req, res, next) {
    try {
      const { userId } = req.params;
      const userBasket = await Basket.findOne({ where: { userId: userId } });
      const userBasketProducts = await BasketProduct.findAll({
        where: { basketId: userBasket.id },
      });
      return res.json({ userBasketProducts });
    } catch (error) {
      return res.json(error);
    }
  }

  async addToBasket(req, res, next) {
    try {
      const { userId } = req.params;
      const { productId } = req.body;
      const userBasket = await Basket.findOne({ where: { userId: userId } });
      const userBasketInfo = await BasketProduct.create({
        basketId: userBasket.id,
        userId: userId,
        productId: productId,
      });

      return res.json("Product was added to basket successfully");
    } catch (error) {
      return res.json("Product was not added to basket");
    }
  }

  async deleteFromBasket(req, res, next) {
    try {
      const { basketProductId } = req.body;
      const deleteRow = await BasketProduct.destroy({
        where: { id: basketProductId },
      });
      console.log('deleted row');
      console.log(deleteRow);
      return res.json(deleteRow);
    } catch (error) {
      return res.json(error);
    }
  }
}

module.exports = new BasketController();
