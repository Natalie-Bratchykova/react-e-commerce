const jwt = require("jsonwebtoken");
module.exports = function (role) {
  return function (req, res, next) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        return res.status(401).json({ message: "User is not authorized" });
      }
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      if (!decoded.roles.includes(role)) {
        return res
          .status(403)
          .json({ message: "User has no permission for such action" });
      }

      next();
    } catch (error) {
      return res.status(401).json({ message: "User is not authorized" });
    }
  };
};
