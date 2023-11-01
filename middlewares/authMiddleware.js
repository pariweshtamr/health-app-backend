import { verifyToken } from "../helpers/jwt.helper.js"
import DoctorSchema from "../models/DoctorSchema.js"
import UserSchema from "../models/UserSchema.js"

export const verifyUser = async (req, res, next) => {
  // get token from headers
  const { authorization } = req.headers

  //   check if token exists
  if (!authorization) {
    return res
      .status(401)
      .json({ status: "error", message: "No token! Authorization denied." })
  }

  try {
    const token = authorization.split(" ")[1]

    //    verify token
    const decoded = await verifyToken(token)
    if (decoded === "jwt expired") {
      return res.status(403).json({
        status: "error",
        message: "jwt expired!",
      })
    }

    req.userId = decoded._id
    req.role = decoded.role
    next()
  } catch (error) {
    res.status(401).json({ status: "error", message: "Invalid token" })
  }
}

export const restrict = (roles) => async (req, res, next) => {
  const userId = req.userId

  let user
  const patient = await UserSchema.findById(userId)
  const doctor = await DoctorSchema.findById(userId)
  if (patient) {
    user = patient
  }
  if (doctor) {
    user = doctor
  }

  if (!roles.includes(user.role)) {
    return res
      .status(401)
      .json({ status: "error", message: "You are not authorized!" })
  }
  next()
}
