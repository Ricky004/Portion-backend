import dotenv from "dotenv"
import { connectDB } from "./database/config.js"
import { app } from "./app.js"

dotenv.config({
    path: './env'
})

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8080, () => {
        console.log(`server is running at PORT:
        ${process.env.PORT}`)
    })
})
.catch((err) => {
    console.log("MONGODB connection failed", err)
})
