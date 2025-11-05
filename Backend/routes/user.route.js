import express from "express"
import { Router } from "express"
import { testRoute, updateUser, } from "../controllers/user.controller.js"
import { verifyUser } from "../utils/verifyToken.js"
const router = Router()

router.get("/test", testRoute)
router.post("/update/:id", verifyUser, updateUser)
export default router