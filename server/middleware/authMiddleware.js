const jwt = require("jsonwebtoken");
module.exports = function (req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ message: "User is not authorized (no token)" });
    }
    const decoded = jwt.decode(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "User is not authorized (token is wrong)" });
  }
};
