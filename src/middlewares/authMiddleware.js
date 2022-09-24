const jwt = require("jsonwebtoken");
const authValidation = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({
      message: "Not authorized",
    });
  }
  const [, token] = authorization.split(" ");

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);

    req.user = user.id;
    req.token = token;
    next();
  } catch (err) {
    res.status(401).json({
      message: "Not authorized",
    });
  }
};

module.exports = { authValidation };
