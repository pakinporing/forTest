const jwt = require('jsonwebtoken');
const createError = require('../utils/createError');
const tryCatch = require('../utils/tryCatch');
const prisma = require('../config/prisma');

exports.auth = tryCatch(async (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    createError(401, 'unauthenticated');
  }
  // console.log('sdsdsd',authorization)
  const accessToken = authorization.split(' ')[1];
  if (!accessToken) {
    createError(401, 'unauthenticated');
    return;
  }

  const payload = jwt.verify(accessToken, process.env.SECRET_KEY);

  const user = await prisma.user.findUnique({ where: { id: payload.user.id } });
  if (!user) {
    createError(400, 'user not found');
  }

  delete user.password;

  req.user = user;
  next();
});
