import express from "express"
import { Router } from "express"
import { testRoute, updateUser, deleteUser } from "../controllers/user.controller.js"
import { verifyUser } from "../utils/verifyToken.js"
const router = Router()

router.get("/test", testRoute)
router.post("/update/:id", verifyUser, updateUser)
router.delete("/delete/:id", verifyUser, deleteUser)
export default router