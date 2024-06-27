const { Brand } = require("../models/models");

class BrandController {
  async createBrand(req, res) {
    const { name } = req.body;
    const brand = await Brand.create({ name });
    return res.json({ brand });
  }

  async getBrand(req, res) {
    const brands = await Brand.findAll();
    return res.json({ brands });
  }
}

module.exports = new BrandController();
