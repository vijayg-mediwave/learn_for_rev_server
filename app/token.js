const jwt = require("jsonwebtoken");

const createToken = (payload) => {
  const token = jwt.sign(
    {
      ...payload,
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
    },
    process.env.JWT_SECRET_KEY
  );
  return token;
};

const verifyToken = ({ token }) => {
  return jwt.verify(token, process.env.JWT_SECRET_KEY);
};

module.exports = {
  createToken,
  verifyToken,
};
