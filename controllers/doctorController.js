import BookingSchema from "../models/BookingSchema.js"
import DoctorSchema from "../models/DoctorSchema.js"

export const updateDoctor = async (req, res, next) => {
  const { _id } = req.params
  try {
    const updatedDoctor = await DoctorSchema.findByIdAndUpdate(
      _id,
      { $set: req.body },
      { new: true }
    )
    if (!updatedDoctor?._id) {
      return res
        .status(500)
        .json({ status: "error", message: "Failed to update user data!" })
    }
    res.status(200).json({
      status: "success",
      message: "User data updated successfully!",
    })
  } catch (error) {
    next(error)
  }
}
export const deleteDoctor = async (req, res, next) => {
  const { _id } = req.params
  try {
    await DoctorSchema.findByIdAndDelete(_id)

    res.status(200).json({
      status: "success",
      message: "User data deleted successfully!",
    })
  } catch (error) {
    next(error)
  }
}

export const getSingleDoctor = async (req, res, next) => {
  const { _id } = req.params
  try {
    const doctor = await DoctorSchema.findById(_id)
      .populate("reviews")
      .select("-password -__v")
    if (!doctor?._id) {
      return res
        .status(500)
        .json({ status: "error", message: "No User found!" })
    }
    const { password, __v, ...rest } = doctor._doc
    res.status(200).json({
      status: "success",
      message: "Doctor found!",
      user: { ...rest },
    })
  } catch (error) {
    next(error)
  }
}
export const getAllDoctors = async (req, res, next) => {
  try {
    const { query } = req.query
    let doctors
    if (query) {
      doctors = await DoctorSchema.find({
        isApproved: "approved",
        $or: [
          { name: { $regex: query, $options: "i" } },
          { specialization: { $regex: query, $options: "i" } },
        ],
      }).select("-password -__v")
    } else {
      doctors = await DoctorSchema.find({ isApproved: "approved" }).select(
        "-password -__v"
      )
    }

    res.status(200).json({
      status: "success",
      message: "Doctors found!",
      doctors,
    })
  } catch (error) {
    next(error)
  }
}

export const getDoctorProfile = async (req, res, next) => {
  const doctorId = req.userId
  try {
    const doctor = await DoctorSchema.findById(doctorId)

    if (!doctor?._id) {
      return res
        .status(404)
        .json({ status: "error", message: "Doctor not found!" })
    }

    const { password, __v, ...rest } = doctor._doc
    const appointments = await BookingSchema.find({ doctor: doctorId })

    res.status(200).json({
      status: "success",
      message: "Doctor info recieved!",
      data: { ...rest, appointments },
    })
  } catch (error) {
    next(error)
  }
}
