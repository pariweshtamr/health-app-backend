import { comparePassword, hashPassword } from "../helpers/bcrypt.helper.js"
import { generateToken } from "../helpers/jwt.helper.js"
import Doctor from "../models/DoctorSchema.js"
import User from "../models/UserSchema.js"

export const register = async (req, res, next) => {
  const { email, password, role } = req.body
  let user = null
  try {
    if (role === "patient") {
      user = await User.findOne({ email })
    } else if (role === "doctor") {
      user = await Doctor.findOne({ email })
    }

    // check if user exists
    if (user?._id) {
      return res.status(500).json({
        status: "error",
        message: "An account with this email already exists! Please login.",
      })
    }

    // If user does not exist ---> proceed to hash password
    const hashPass = hashPassword(password)
    req.body.password = hashPass
    if (role === "patient") {
      user = await User(req.body).save()
    }
    if (role === "doctor") {
      user = await Doctor(req.body).save()
    }

    if (!user?._id) {
      return res.json({ status: "error", message: "Unable to register!" })
    }
    res
      .status(200)
      .json({ status: "success", message: "Registration successful!" })
  } catch (error) {
    next(error)
  }
}

export const login = async (req, res, next) => {
  const { email } = req.body
  try {
    let user = null
    const patient = await User.findOne({ email })
    const doctor = await Doctor.findOne({ email })

    if (patient) {
      user = patient
    }
    if (doctor) {
      user = doctor
    }

    //   check if user exists
    if (!user?._id) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found!" })
    }

    //   compare password before authorizing
    const isPassMatched = comparePassword(req.body.password, user.password)

    if (!isPassMatched) {
      return res
        .status(400)
        .json({ status: "error", message: "Invalid credentials!" })
    }

    //   generate token
    const token = await generateToken({ _id: user._id, role: user.role })

    const { password, appointments, __v, ...rest } = user._doc

    res.status(200).json({
      status: "success",
      message: "Login successful!",
      token,
      user: { ...rest },
    })
  } catch (error) {
    next(error)
  }
}
