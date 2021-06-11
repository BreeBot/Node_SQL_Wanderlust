import express from "express"
import adventuresRouter from "./api/v1/adventuresRouter.js"
import clientRouter from "./clientRouter.js"

const rootRouter = new express.Router()

rootRouter.use("/api/v1/adventures", adventuresRouter)

rootRouter.use("/", clientRouter)

export default rootRouter
