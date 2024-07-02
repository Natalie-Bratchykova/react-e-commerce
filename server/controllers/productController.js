const crypto = require("crypto");
const path = require("path");
const { Product, ProductInfo } = require("../models/models");
const ApiError = require("../error/apiError");
const { Sequelize } = require("../db");
const { Op } = require("sequelize");
class ProductController {
  async createProduct(req, res, next) {
    try {
      const { name, price, typeId, brandId, info } = req.body;

      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send("No files were uploaded.");
      }
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
        infoArray.map(async (info) => {
          console.log(info);
          return await ProductInfo.create({
            title: info.title,
            description: info.description,
            productId: product.id,
          });
        });
      }

      return res.json({ product });
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async getAllProducts(req, res, next) {
    try {
      const products = await Product.findAll();
      return res.json({ products });
    } catch (error) {
      return res.json(error);
    }
  }

  async getProducts(req, res) {
    try {
      console.log(req.baseUrl);
      let { typeId, brandId, page, limit } = req.query;
      page = page || 1;
      limit = limit || 3;

      let offset = page * limit - limit;
      let products;

      if (!typeId && !brandId) {
        products = await Product.findAndCountAll({ limit, offset });
      }

      if (!brandId && typeId) {
        products = await Product.findAndCountAll({
          where: { typeId },
          limit,
          offset,
        });
      }

      if (!typeId && brandId) {
        console.log(`brand id = ${brandId}`);
        if (Number(brandId)) {
          products = await Product.findAndCountAll({
            where: { brandId },
            limit,
            offset,
          });
        }
      }

      if (typeId && brandId) {
        products = await Product.findAndCountAll({
          where: { typeId, brandId },
          limit,
          offset,
        });
      }
      return res.json({ products });
    } catch (error) {
      res.json(error);
    }
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

  async getProductByName(req, res, next) {
    try {
      const { name } = req.params;
      const products = await Product.findAll({
        where: { name: { [Op.like]: `%${name}%` } },
      });

      return res.json({ products });
    } catch (error) {
      return res.json(error);
    }
  }

  async getProductInfo(req, res, next) {
    try {
      const { id } = req.params;
      const productInfo = await ProductInfo.findAll({
        where: { productId: id },
      });
      return res.json({ productInfo });
    } catch (error) {
      return res.json(error);
    }
  }

  async deleteProduct(req, res, next) {
    try {
      const { productId } = req.body;
      const deletedProd = await Product.destroy({ where: { id: productId } });
      return res.json({ message: "deleted " });
    } catch (error) {
      return res.json(error);
    }
  }
}

module.exports = new ProductController();
