import mongoose from "mongoose";

// Define the schema for the Shorty model
const ShortySchema = new mongoose.Schema(
  {
    // User ID associated with the shorty
    userId: {
      type: String,
      required: true,
    },
    // Short message content
    message: {
      type: String,
      required: true,
      max: 280, // Maximum character limit
    },
    // Array of user IDs who liked the shorty
    likes: {
      type: Array,
      defaultValue: [], // Initial value is an empty array
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Create and export the Shorty model using the defined schema
export default mongoose.model("Shorty", ShortySchema);
