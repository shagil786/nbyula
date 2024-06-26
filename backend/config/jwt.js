const jwt = require("express-jwt");

function authJwt() {
  const secret = process.env.secret;
  const api = process.env.BASE_URL;
  return jwt
    .expressjwt({
      secret,
      algorithms: ["HS256"],
    })
    .unless({
      path: [`${api}/jobs/signup`, `${api}/jobs/login`],
    });
}

module.exports = authJwt;
