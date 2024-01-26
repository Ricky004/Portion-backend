import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express() // define express app

// define cors middleware to enable Cross-Origin Resource Sharing
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}))

// define all middlewares here
app.use(express.json({ limit: "50kb" }))
app.use(express.urlencoded({ extended: true, limit: "50kb" }))
app.use(express.static("public"))
app.use(cookieParser())


// routes import
import userRouter from "./routes/user.routes.js"
import documentRouter from "./routes/document.routes.js"

// routes declaration 
app.use("/api/v1/users", userRouter)
app.use("/api/v1/users", documentRouter)

export { app }
