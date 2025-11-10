// import express from "express";
import { Router } from "express";
import { createListing, deleteListing, updateListing, getListing } from "../controllers/listing.controller.js";
import { verifyUser } from "../utils/verifyToken.js";
const router = Router()
router.post("/create", verifyUser, createListing)
router.delete("/delete/:id", verifyUser, deleteListing)
router.post("/update/:id", verifyUser, updateListing)
router.get("/get/:id", getListing)

export default router
