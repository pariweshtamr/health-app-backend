import express from "express"
import {
  deleteUser,
  getAllUsers,
  getSingleUser,
  updateUser,
} from "../controllers/userController.js"
import { restrict, verifyUser } from "../middlewares/authMiddleware.js"

const router = express.Router()

router.get("/:_id", verifyUser, restrict(["admin"]), getSingleUser)
router.get("/", verifyUser, restrict(["admin"]), getAllUsers)
router.put("/:_id", verifyUser, restrict(["patient"]), updateUser)
router.get("/:_id", verifyUser, restrict(["patient"]), deleteUser)

export default router
