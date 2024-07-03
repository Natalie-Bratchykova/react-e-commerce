const { Basket, BasketProduct, Product } = require("../models/models");
const statisticsService = require("../services/statisticsService");
class StatisticsController {
  async getPopularProductsList(req, res, next) {
    try {
        console.log('get all baskets info is working');
      const allBasketInfo = await statisticsService.getAllBasketsInfo();

      
      console.log(allBasketInfo);
      return res.json({ allBasketInfo });
    } catch (error) {
      res.json(error);
    }
  }
}

module.exports = new StatisticsController();
