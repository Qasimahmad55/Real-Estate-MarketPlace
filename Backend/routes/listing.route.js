// import express from "express";
import { Router } from "express";
import { createListing } from "../controllers/listing.controller.js";
import { verifyUser } from "../utils/verifyToken.js";
const router = Router()
router.post("/create", verifyUser, createListing)


export default router
