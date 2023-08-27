import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import {
  createShorty,
  deleteShorty,
  likeOrDislike,
  getAllShorties,
  getUserShorties,
  getExploreShorties,
} from "../controllers/shorty.js";

// Create a router instance
const router = express.Router();

// Create a Shorty
router.post("/", verifyToken, createShorty);

// Delete a Shorty
router.delete("/:id", verifyToken, deleteShorty);

// Like or Dislike a Shorty
router.put("/:id/like", likeOrDislike);

// Get all timeline shorties
router.get("/timeline/:id", getAllShorties);

// Get user Shorties only
router.get("/user/all/:id", getUserShorties);

// Explore shorties
router.get("/explore", getExploreShorties);

// Export the router
export default router;
