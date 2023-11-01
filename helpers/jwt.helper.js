import jwt from "jsonwebtoken"

export const generateToken = async (payload) => {
  const token = jwt.sign(payload, process.env.JWT_TOKEN_KEY, {
    expiresIn: "7d",
  })
  return token
}

export const verifyToken = async (token) => {
  try {
    return jwt.verify(token, process.env.JWT_TOKEN_KEY)
  } catch (error) {
    return error.message
  }
}
