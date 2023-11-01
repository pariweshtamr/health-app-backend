import DoctorSchema from "../models/DoctorSchema.js"
import ReviewSchema from "../models/ReviewSchema.js"

export const getAllReviews = async (req, res, next) => {
  try {
    const reviews = await ReviewSchema.find({})
    res
      .status(200)
      .json({ status: "success", message: "Successful", data: reviews })
  } catch (error) {
    next(error)
  }
}

// create review
export const createReview = async (req, res, next) => {
  try {
    if (!req.body.doctor) req.body.doctor = req.params.doctorId
    if (!req.body.user) req.body.user = req.userId

    const savedReview = await ReviewSchema(req.body).save()

    if (!savedReview?._id) {
      return res.json({ status: " error", message: "Failed to save review!" })
    }

    await DoctorSchema.findByIdAndUpdate(req.body.doctor, {
      $push: { reviews: savedReview._id },
    })

    res.status(200).json({
      status: "success",
      message: "Review has been submitted!",
      data: savedReview,
    })
  } catch (error) {
    next(error)
  }
}
