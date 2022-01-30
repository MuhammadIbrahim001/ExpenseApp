const jwt = require("jsonwebtoken");

const secret =
  "3bfe086acbbe5c49e297d51f9b622a676ccb042e0e051285c1d21eb82545b5f947ceae3858ddfc0df8ba833dd353b2035d85983abec2a5ade75cf5c1536e55cc";

function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null)
    return res.status(401).send({ error: "No token provided" });

  jwt.verify(token, secret, (err, id) => {
    if (err) return res.status(403).send({ error: "Token is not valid" });
    req.token = token;
    next();
  });
}

function createToken(uid) {
  return jwt.sign(uid, secret);
}

module.exports = { verifyToken, createToken };
