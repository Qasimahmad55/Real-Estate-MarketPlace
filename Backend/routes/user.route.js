import express from "express"
import { Router } from "express"
import { testRoute } from "../controllers/user.controller.js"
const router = Router()

router.get("/test", testRoute)
export default router