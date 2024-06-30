const { Brand } = require("../models/models");

class BrandController {
  async createBrand(req, res) {
    try {
      const { name } = req.body;
      const brand = await Brand.create({ name });
      return res.json({ brand });
    } catch (error) {
      res.json(error);
    }
  }

  async getBrand(req, res) {
    const brands = await Brand.findAll();
    return res.json({ brands });
  }

  async getBrandById(req, res) {
    const { id } = req.params;
    const brand = await Brand.findOne({ where: { id } });
    return res.json({ brand });
  }
}

module.exports = new BrandController();
