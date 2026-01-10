import jwt from "jsonwebtoken";

const secretKey = "process.env.JWT_SECRET";

export function setUser(user) {
  return jwt.sign(
    { _id: user._id, email: user.email },
    secretKey,
    { expiresIn: "1h" }
  );
}

export function getUser(token) {
  if (!token) return null;
  try {
    return jwt.verify(token, secretKey);
  } catch {
    return null;
  }
}
