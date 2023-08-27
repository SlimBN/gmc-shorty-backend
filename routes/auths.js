import express from "express";
import { signin, signup } from "../controllers/auth.js";

// Create a router instance
const router = express.Router();

// Define routes for user authentication
router.post("/signup", signup); // Route to handle user signup
router.post("/signin", signin); // Route to handle user signin

// Export the router
export default router;
