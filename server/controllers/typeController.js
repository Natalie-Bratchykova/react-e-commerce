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
}

module.exports = new TypeController();
