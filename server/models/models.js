const sequelize = require("../db");
const { DataTypes, DATE } = require("sequelize");

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: {
    type: DataTypes.STRING,
    unique: true,
    validate: { isEmail: true, notEmpty: true },
  },
  password: {
    type: DataTypes.STRING,
    validate: { notEmpty: true, len: [5, 50] },
  },
  roles: { type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: ["user"] },
});

const Basket = sequelize.define("basket", {
  id: { type: DataTypes.INTEGER, primaryKey, autoIncrement },
});

const BasketProduct = sequelize.define("basket_product", {
  id: { type: DataTypes.INTEGER, primaryKey, autoIncrement },
});

const Product = sequelize.define("product", {
  id: { type: DataTypes.INTEGER, primaryKey, autoIncrement },
  name: { type: DataTypes.STRING, unique, allowNull: false },
  price: { type: DataTypes.DECIMAL, allowNull: false },
  rating: { type: DataTypes.INTEGER, defaultValue: 0 },
  image: { type: DataTypes.STRING, allowNull: false },
});

const Brand = sequelize.define("brand", {
  id: { type: DataTypes.INTEGER, primaryKey, autoIncrement },
  name: { type: DataTypes.STRING, unique, allowNull: false },
});

const Type = sequelize.define("type", {
  id: { type: DataTypes.INTEGER, primaryKey, autoIncrement },
  name: { type: DataTypes.STRING, unique, allowNull: false },
});
const Rating = sequelize.define("rating", {
  id: { type: DataTypes.INTEGER, primaryKey, autoIncrement },
  rate: { type: DataTypes.INTEGER, allowNull: false },
});
const ProductInfo = sequelize.define("product_info", {
  id: { type: DataTypes.INTEGER, primaryKey, autoIncrement },
  title: { type: DataTypes.STRING, unique, allowNull: false },
  description: { type: DataTypes.STRING, unique, allowNull: false },
});

const TypeBrand = sequelize.define("type_brand", {
  id: { type: DataTypes.INTEGER, primaryKey, autoIncrement },
});
User.hasOne(Basket);
Basket.belongsTo(User);
User.hasMany(Rating);
Rating.belongsTo(User);
Basket.hasMany(BasketProduct);
BasketProduct.belongsTo(Basket);
Type.hasMany(Product);
Product.belongsTo(Type);
Brand.hasMany(Product);
Product.belongsTo(Brand);
Product.hasMany(Rating);
Rating.belongsTo(Product);

Product.hasMany(BasketProduct);
BasketProduct.belongsTo(Product);

Type.belongsToMany(Brand, { through: TypeBrand });
Brand.belongsToMany(Type, { through: TypeBrand });

Product.hasMany(ProductInfo);
ProductInfo.belongsTo(Product);

module.exports = {
  User,
  Product,
  Basket,
  BasketProduct,
  ProductInfo,
  Type,
  Brand,
  Rating,
  TypeBrand,
};