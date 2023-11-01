import UserSchema from "../models/UserSchema.js"

export const updateUser = async (req, res, next) => {
  const { _id } = req.params
  try {
    const updatedUser = await UserSchema.findByIdAndUpdate(
      _id,
      { $set: req.body },
      { new: true }
    )
    if (!updatedUser?._id) {
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
export const deleteUser = async (req, res, next) => {
  const { _id } = req.params
  try {
    await UserSchema.findByIdAndDelete(_id)

    res.status(200).json({
      status: "success",
      message: "User data deleted successfully!",
    })
  } catch (error) {
    next(error)
  }
}

export const getSingleUser = async (req, res, next) => {
  const { _id } = req.params
  try {
    const user = await UserSchema.findById(_id).select("-password -__v")
    if (!user?._id) {
      return res
        .status(500)
        .json({ status: "error", message: "No User found!" })
    }
    const { password, __v, ...rest } = user._doc
    res.status(200).json({
      status: "success",
      message: "User found!",
      user: { ...rest },
    })
  } catch (error) {
    next(error)
  }
}
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await UserSchema.find({}).select("-password -__v")

    res.status(200).json({
      status: "success",
      message: "Users found!",
      users,
    })
  } catch (error) {
    next(error)
  }
}
