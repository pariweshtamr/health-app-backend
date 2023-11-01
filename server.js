import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"
import mongoClient from "./lib/db.js"
import authRoute from "./routes/auth.js"
import userRoute from "./routes/user.js"
import doctorRoute from "./routes/doctor.js"
import reviewRoute from "./routes/review.js"

dotenv.config()

const app = express()
const port = process.env.PORT || 8000

const corsOptions = {
  origin: true,
}

// Connect db
mongoClient()

// middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOptions))

app.get("/", (req, res) => {
  res.send("You have reached health app server!")
})

// Routers
app.use("/api/v1/auth", authRoute)
app.use("/api/v1/users", userRoute)
app.use("/api/v1/doctors", doctorRoute)
app.use("/api/v1/reviews", reviewRoute)

// Global error handler
app.use((error, req, res, next) => {
  const errorStatus = error.status || 500
  const errorMsg = error.message || "Something went wrong!"

  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMsg,
    stack: error.stack,
  })
})

app.listen(port, (error) => {
  error ? console.log(error) : console.log(`Server is running on port ${port}`)
})
