const crypto = require("crypto");
const path = require("path");
const { Product, ProductInfo } = require("../models/models");
const ApiError = require("../error/apiError");
class ProductController {
  async createProduct(req, res, next) {
    try {
      const { name, price, typeId, brandId, info } = req.body;
      const { image } = req.files;

      const fileName = crypto.randomUUID() + ".jpg";
      image.mv(path.resolve(__dirname, "..", "static", fileName));

      const product = await Product.create({
        name,
        price,
        typeId,
        brandId,
        image: fileName,
      });
      console.log(product);

      if (info) {
        const infoArray = JSON.parse(info);
        infoArray.map(
          async (info) =>
            await ProductInfo.create({
              title: info.title,
              description: info.description,
              productId: info.productId,
            })
        );
      }

      return res.json({ product });
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async getProducts(req, res) {
    let { typeId, brandId, page, limit } = req.query;
    page = page || 1;
    limit = limit || 3;
    let offset = page * limit - limit;
    let products;

    if (!typeId && !brandId) {
      console.log("cond 1");
      products = await Product.findAndCountAll({ limit, offset });
    }

    if (!brandId && typeId) {
      console.log("cond 2");
      products = await Product.findAndCountAll({
        where: { typeId },
        limit,
        offset,
      });
    }

    if (!typeId && brandId) {
      console.log("cond 3");
      products = await Product.findAndCountAll({
        where: { brandId },
        limit,
        offset,
      });
    }

    if (typeId && brandId) {
      console.log("cond 4");
      products = await Product.findAndCountAll({
        where: { typeId, brandId },
        limit,
        offset,
      });
    }
    return res.json({ products });
  }

  async getProductById(req, res, next) {
    try {
      const { id } = req.params;
      const product = await Product.findOne({ where: { id } });
      return res.json({ product });
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }
}

module.exports = new ProductController();
