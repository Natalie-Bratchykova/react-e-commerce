const { Type } = require("../models/models");

class TypeController {
  async createType(req, res) {
    console.log(req.body);
    const { name } = req.body;
    console.log(name);
    const type = await Type.create({ name });
    return res.json({ type });
  }
  async getType(req, res) {
    const types = await Type.findAll();
    return res.json({ types });
  }

  async getTypeById(req, res) {
    const { id } = req.params;
    console.log(req.params);
    const type = await Type.findOne({ where: { id } });
    return res.json({ type });
  }
}

module.exports = new TypeController();
