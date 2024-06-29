const bcrypt = require("bcrypt");
const { User, Basket } = require("../models/models");
const ApiError = require("../error/apiError");
const tokenService = require("../services/tokenService");
const { validationResult } = require("express-validator");
class UserController {
  async registration(req, res, next) {
    try {
      const result = validationResult(req);
      if (result.isEmpty()) {
        console.log("You started to register your account");
        const { email, password, roles } = req.body;
        const candidate = await User.findOne({ where: { email } });
        if (candidate) {
          return next(
            ApiError.badRequest("User with such email already exists")
          );
        }

        const hashPassword = await bcrypt.hash(password, 7);
        const user = await User.create({ email, password: hashPassword });
        const userBasket = await Basket.create({ userId: user.id });
        const token = tokenService.generateTokens({
          id: user.id,
          email,
          roles: user.roles,
        }).accessToken;
        console.log("Token after authorization");
        console.log(token);
        res.json({ token });
      } else {
        res.send({ errors: result.array() });
      }
    } catch (error) {
      res.json(error);
    }
  }
  async login(req, res, next) {
    try {
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
    } catch (error) {
      res.json({ message: error });
    }
  }

  async authCheck(req, res) {
    try {
      console.log("AUTH CHECK METHOD ");
      console.log(req.user);
      const token = tokenService.generateTokens({
        id: req.user.id,
        email: req.user.email,
        roles: req.user.roles,
      }).accessToken;

      return res.json({ token });
    } catch (error) {
      res.json(error);
    }
  }

  async logout(req, res) {}
}

module.exports = new UserController();
