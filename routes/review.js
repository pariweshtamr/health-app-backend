import express from "express"
import { createReview, getAllReviews } from "../controllers/reviewController.js"
import { restrict, verifyUser } from "../middlewares/authMiddleware.js"

const router = express.Router({ mergeParams: true })

router.get("/", verifyUser, getAllReviews)
router.post("/", verifyUser, restrict(["patient"]), createReview)

export default router
