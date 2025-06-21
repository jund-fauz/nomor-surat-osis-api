import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({ message: "Token required" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.akun = verifiedToken;
    req.akun_id = verifiedToken.id;
    next();
  } catch (error) {
    console.error("Token Error:", error);
    return res.status(401).json({ message: "Token invalid or expired" });
  }
};
