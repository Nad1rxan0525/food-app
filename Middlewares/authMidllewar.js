const jwt = require("jsonwebtoken");

const authMiddlewere = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Token mavjud emas",
      });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).send({
          success: false,
          message: "Un-Authorize User",
        });
      } else {
        if (!req.body) {
          req.body = {};
        }
        req.body.id = decode.id;
    
        next();
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Auth API",
      error,
    });
  }
};

module.exports = authMiddlewere;
