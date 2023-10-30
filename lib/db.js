import mongoose from "mongoose"

const mongoClient = () => {
  if (!process.env.MONGODB_URI) {
    console.log(
      "MONGODB_URI is not defined. Please create MONGODB_URI and provide a MongoDB connection string"
    )
  }

  try {
    const connectionString = mongoose.connect(process.env.MONGODB_URI)
    if (!connectionString) {
      return console.log("Failed to connect MongoDB")
    }
    console.log("MongoDB Connected!")
  } catch (error) {
    console.log(error)
  }
}

export default mongoClient
