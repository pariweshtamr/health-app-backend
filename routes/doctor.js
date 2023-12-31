import express from "express"
import {
  deleteDoctor,
  getAllDoctors,
  getDoctorProfile,
  getSingleDoctor,
  updateDoctor,
} from "../controllers/doctorController.js"
import { restrict, verifyUser } from "../middlewares/authMiddleware.js"
import reviewRouter from "./review.js"

const router = express.Router()

// nested route
router.use("/:doctorId/reviews", reviewRouter)

router.get("/:_id", getSingleDoctor)
router.get("/", getAllDoctors)
router.put("/:_id", verifyUser, restrict(["doctor"]), updateDoctor)
router.get("/:_id", verifyUser, restrict(["doctor"]), deleteDoctor)
router.get("/profile/me", verifyUser, restrict(["doctor"]), getDoctorProfile)

export default router
