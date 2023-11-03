import express from "express"
import {
  deleteUser,
  getAllUsers,
  getMyAppointments,
  getSingleUser,
  getUserProfile,
  updateUser,
} from "../controllers/userController.js"
import { restrict, verifyUser } from "../middlewares/authMiddleware.js"

const router = express.Router()

router.get("/:_id", verifyUser, restrict(["patient"]), getSingleUser)
router.get("/", verifyUser, restrict(["admin"]), getAllUsers)
router.put("/:_id", verifyUser, restrict(["patient"]), updateUser)
router.get("/:_id", verifyUser, restrict(["patient"]), deleteUser)
router.get("/profile/me", verifyUser, restrict(["patient"]), getUserProfile)
router.get(
  "/appointments/my-appointments",
  verifyUser,
  restrict(["patient"]),
  getMyAppointments
)

export default router
