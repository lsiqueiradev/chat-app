const jwt = require('jsonwebtoken');
const config = require('../../config/auht.json');

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const [, token] = authHeader.split(' ');
  if (token) {
    try {
      const decoded = await jwt.verify(token, config.secretKey);
      req.userLogged = decoded;
      next();
    } catch (e) {
      res.status(401).send({ message: 'Token é inválido' });
    }
  } else {
    res.status(401).send({ message: 'Token deve ser informado' });
  }
};