// Import required modules
import express from "express";
import cors from 'cors';
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

// Import route modules
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auths.js";
import shortyRoutes from "./routes/shorties.js";

// Create an Express application
const app = express();

// Use CORS middleware for handling cross-origin requests
app.use(cors());

// Load environment variables from a .env file
dotenv.config();

// Function to connect to the MongoDB database
const connect = () => {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(process.env.MONGO) // Connect to the MongoDB database using the MONGO URL from environment variables
    .then(() => {
      console.log("Connected to MongoDB database");
    })
    .catch((err) => {
      throw err;
    });
};

// Use cookie parser middleware to handle cookies in requests
app.use(cookieParser());

// Use JSON parsing middleware to handle JSON data in requests
app.use(express.json());

// Set up routes
app.use("/api/users", userRoutes); // Mount the userRoutes at /api/users
app.use("/api/auth", authRoutes); // Mount the authRoutes at /api/auth
app.use("/api/shorties", shortyRoutes); // Mount the shortyRoutes at /api/shorties

// Start the server and listen on port 8000
app.listen(8000, () => {
  connect(); // Connect to the MongoDB database
  console.log("Listening on port 8000");
});
