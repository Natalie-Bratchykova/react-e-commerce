const bcrypt = require("bcrypt");
const { User, Basket } = require("../models/models");
const ApiError = require("../error/apiError");
const tokenService = require("../services/tokenService");

class UserController {
  async registration(req, res) {
    const { email, password, roles } = req.body;
    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      return ApiError.badRequest("User with such email already exists");
    }

    const hashPassword = await bcrypt.hash(password, 7);
    const user = await User.create({ email, password: hashPassword });
    const userBasket = await Basket.create({ userId: user.id });
    const accessToken = tokenService.generateTokens({
      id: user.id,
      email,
      roles: user.roles,
    }).accessToken;
    res.json({ accessToken });
  }
  async login(req, res, next) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      next(ApiError.badRequest("There is no user with such email"));
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      next(ApiError.badRequest("password is not correct for user " + email));
    }
    const token = tokenService.generateTokens({
      id: user.id,
      email,
      roles: user.roles,
    }).accessToken;

    return res.json({ token });
  }

  async authCheck(req, res) {
    const accessToken = tokenService.generateTokens({
      id: req.user.id,
      email: req.user.email,
      roles: req.user.roles,
    }).accessToken;

    return accessToken;
  }

  async logout(req, res) {}
}

module.exports = new UserController();
