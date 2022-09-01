const env = process.env.NODE_ENV || "development";
const config = require("../config/config.json")[env];
const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; 
  if (!token)
    return res.status(401).send({ auth: false, message: "No token provided." });

  jwt.verify(token, config.jwt.secret, function (err, decoded) {
    if (err)
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });
    next();
  });
};

module.exports = { verifyToken }
